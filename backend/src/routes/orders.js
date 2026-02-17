const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// Create order (can be guest or authenticated)
router.post('/', async (req, res) => {
  try {
    const { items, shippingAddress, guestEmail, guestName, paymentMethod, notes } = req.body;

    // Calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ message: `Product not found: ${item.productId}` });
      }
      
      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;
      
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });
    }

    const shipping = subtotal >= 50 ? 0 : 5.99; // Free shipping over 50
    const total = subtotal + shipping;

    const orderData = {
      items: orderItems,
      subtotal,
      shipping,
      total,
      shippingAddress,
      paymentMethod,
      notes
    };

    // Attach user or guest info
    if (req.user) {
      orderData.user = req.user._id;
    } else {
      orderData.guestEmail = guestEmail;
      orderData.guestName = guestName;
    }

    const order = new Order(orderData);
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's orders (authenticated)
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort('-createdAt')
      .populate('items.product', 'name images');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name images');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update order status (admin)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const update = {};
    
    if (status) update.status = status;
    if (paymentStatus) update.paymentStatus = paymentStatus;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
