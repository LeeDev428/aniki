const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

// Optional auth — sets req.user if token present, but doesn't reject guests
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
    }
  } catch {
    // Invalid token — treat as guest
  }
  next();
};

// Create order (can be guest or authenticated)
router.post('/', optionalAuth, async (req, res) => {
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

    // Decrement stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
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

// Get all orders (admin) — MUST be before /:id to avoid route conflict
router.get('/all', admin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const query = {};
    if (status) query.status = status;

    const orders = await Order.find(query)
      .sort('-createdAt')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .populate('user', 'username email')
      .populate('items.product', 'name images');

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single order — after /all to avoid route conflict
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
router.patch('/:id/status', admin, async (req, res) => {
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
