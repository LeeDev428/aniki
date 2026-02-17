const express = require('express');
const Manga = require('../models/Manga');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all manga (with pagination)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, genre, status, search } = req.query;
    const query = {};

    if (genre) query.genres = genre;
    if (status) query.status = status;
    if (search) query.title = { $regex: search, $options: 'i' };

    const manga = await Manga.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Manga.countDocuments(query);

    res.json({
      manga,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get featured manga
router.get('/featured', async (req, res) => {
  try {
    const manga = await Manga.find({ featured: true }).limit(5);
    res.json(manga);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single manga
router.get('/:id', async (req, res) => {
  try {
    const manga = await Manga.findById(req.params.id);
    if (!manga) {
      return res.status(404).json({ message: 'Manga not found' });
    }
    res.json(manga);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create manga (protected)
router.post('/', auth, async (req, res) => {
  try {
    const manga = new Manga(req.body);
    await manga.save();
    res.status(201).json(manga);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
