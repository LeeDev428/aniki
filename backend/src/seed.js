/**
 * Database Seeder - Run with: node src/seed.js
 * Seeds sample anime and manga data for development
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Anime = require('./models/Anime');
const Manga = require('./models/Manga');

const sampleAnime = [
  {
    title: 'Demon Slayer',
    titleJapanese: '鬼滅の刃',
    synopsis: 'A young boy becomes a demon slayer after his family is slaughtered.',
    coverImage: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
    episodes: 26,
    status: 'completed',
    genres: ['Action', 'Supernatural', 'Drama'],
    rating: 8.5,
    year: 2019,
    season: 'spring',
    studio: 'ufotable',
    featured: true
  },
  {
    title: 'Jujutsu Kaisen',
    titleJapanese: '呪術廻戦',
    synopsis: 'A boy swallows a cursed talisman and joins a secret organization.',
    coverImage: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
    episodes: 24,
    status: 'completed',
    genres: ['Action', 'Supernatural', 'School'],
    rating: 8.7,
    year: 2020,
    season: 'fall',
    studio: 'MAPPA',
    featured: true
  },
  {
    title: 'Attack on Titan',
    titleJapanese: '進撃の巨人',
    synopsis: 'Humanity fights for survival against giant humanoid Titans.',
    coverImage: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
    episodes: 75,
    status: 'completed',
    genres: ['Action', 'Drama', 'Fantasy'],
    rating: 9.0,
    year: 2013,
    season: 'spring',
    studio: 'Wit Studio',
    featured: true
  },
];

const sampleManga = [
  {
    title: 'One Piece',
    titleJapanese: 'ワンピース',
    synopsis: 'Follow Monkey D. Luffy on his journey to become the Pirate King.',
    coverImage: 'https://cdn.myanimelist.net/images/manga/2/253146.jpg',
    chapters: 1100,
    volumes: 106,
    status: 'ongoing',
    genres: ['Action', 'Adventure', 'Comedy'],
    rating: 9.2,
    author: 'Eiichiro Oda',
    featured: true
  },
  {
    title: 'Chainsaw Man',
    titleJapanese: 'チェンソーマン',
    synopsis: 'Denji becomes a devil hunter with the power of chainsaws.',
    coverImage: 'https://cdn.myanimelist.net/images/manga/3/216464.jpg',
    chapters: 170,
    volumes: 16,
    status: 'ongoing',
    genres: ['Action', 'Supernatural', 'Horror'],
    rating: 8.8,
    author: 'Tatsuki Fujimoto',
    featured: true
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Anime.deleteMany({});
    await Manga.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample data
    await Anime.insertMany(sampleAnime);
    await Manga.insertMany(sampleManga);
    console.log('Inserted sample anime and manga');

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
