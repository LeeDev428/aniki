const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  nameJapanese: String,
  slug: {
    type: String,
    unique: true
  },
  description: String,
  price: {
    type: Number,
    required: true,
    min: 0
  },
  comparePrice: {
    type: Number,
    min: 0
  },
  images: [{
    url: String,
    alt: String
  }],
  category: {
    type: String,
    enum: ['figures', 'funko', 'model-kits', 'accessories', 'pre-orders'],
    default: 'figures'
  },
  brand: {
    type: String,
    enum: ['banpresto', 'kotobukiya', 'good-smile', 'megahouse', 'bandai', 'funko', 'other'],
    default: 'other'
  },
  franchise: String, // e.g., "One Piece", "Naruto", "Dragon Ball"
  character: String,
  height: String, // e.g., "21cm"
  material: String,
  stock: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['in-stock', 'out-of-stock', 'pre-order', 'coming-soon'],
    default: 'in-stock'
  },
  releaseDate: Date,
  featured: {
    type: Boolean,
    default: false
  },
  isNew: {
    type: Boolean,
    default: false
  },
  tags: [String]
}, { timestamps: true });

// Auto-generate slug from name
productSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
