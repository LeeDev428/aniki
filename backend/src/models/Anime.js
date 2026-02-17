const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  titleJapanese: String,
  synopsis: String,
  coverImage: String,
  bannerImage: String,
  episodes: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['airing', 'completed', 'upcoming'],
    default: 'upcoming'
  },
  genres: [String],
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  year: Number,
  season: {
    type: String,
    enum: ['winter', 'spring', 'summer', 'fall']
  },
  studio: String,
  featured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Anime', animeSchema);
