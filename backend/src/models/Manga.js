const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  titleJapanese: String,
  synopsis: String,
  coverImage: String,
  chapters: {
    type: Number,
    default: 0
  },
  volumes: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'hiatus'],
    default: 'ongoing'
  },
  genres: [String],
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  author: String,
  artist: String,
  featured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Manga', mangaSchema);
