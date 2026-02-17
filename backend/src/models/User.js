const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: ''
  },
  stats: {
    episodesWatched: { type: Number, default: 0 },
    chaptersRead: { type: Number, default: 0 },
    completedAnime: { type: Number, default: 0 },
    completedManga: { type: Number, default: 0 }
  },
  watchlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Anime'
  }],
  readlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manga'
  }]
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
