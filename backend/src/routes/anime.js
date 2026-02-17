const express = require('express');
const Anime = require('../models/Anime');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all anime (with pagination)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, genre, status, search } = req.query;
    const query = {};

    if (genre) query.genres = genre;
    if (status) query.status = status;
    if (search) query.title = { $regex: search, $options: 'i' };

    const anime = await Anime.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Anime.countDocuments(query);

    res.json({
      anime,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get featured anime
router.get('/featured', async (req, res) => {
  try {
    const anime = await Anime.find({ featured: true }).limit(5);
    res.json(anime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single anime
router.get('/:id', async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    if (!anime) {
      return res.status(404).json({ message: 'Anime not found' });
    }
    res.json(anime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create anime (protected - for future admin use)
router.post('/', auth, async (req, res) => {
  try {
    const anime = new Anime(req.body);
    await anime.save();
    res.status(201).json(anime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
