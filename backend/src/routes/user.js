const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get current user profile
router.get('/me', auth, async (req, res) => {
  res.json(req.user);
});

// Update profile
router.patch('/me', auth, async (req, res) => {
  try {
    const updates = {};
    const allowedFields = ['username', 'avatar'];
    
    allowedFields.forEach(field => {
      if (req.body[field]) updates[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user stats
router.patch('/stats', auth, async (req, res) => {
  try {
    const { episodesWatched, chaptersRead, completedAnime, completedManga } = req.body;
    const statsUpdate = {};

    if (episodesWatched !== undefined) statsUpdate['stats.episodesWatched'] = episodesWatched;
    if (chaptersRead !== undefined) statsUpdate['stats.chaptersRead'] = chaptersRead;
    if (completedAnime !== undefined) statsUpdate['stats.completedAnime'] = completedAnime;
    if (completedManga !== undefined) statsUpdate['stats.completedManga'] = completedManga;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: statsUpdate },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add to watchlist
router.post('/watchlist/:animeId', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { watchlist: req.params.animeId } },
      { new: true }
    ).populate('watchlist');

    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove from watchlist
router.delete('/watchlist/:animeId', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { watchlist: req.params.animeId } },
      { new: true }
    ).populate('watchlist');

    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add to readlist
router.post('/readlist/:mangaId', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { readlist: req.params.mangaId } },
      { new: true }
    ).populate('readlist');

    res.json(user.readlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove from readlist
router.delete('/readlist/:mangaId', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { readlist: req.params.mangaId } },
      { new: true }
    ).populate('readlist');

    res.json(user.readlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
