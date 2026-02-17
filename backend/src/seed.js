/**
 * Database Seeder - Run with: node src/seed.js
 * Seeds sample anime figure products for development
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: 'ONE PIECE - Monkey D. Luffy Grandista',
    nameJapanese: 'ワンピース ルフィ',
    description: 'High-quality Grandista figure of Monkey D. Luffy from One Piece. Detailed sculpting and vibrant colors.',
    price: 79.99,
    images: [{ url: 'https://m.media-amazon.com/images/I/61vKCSR+qQL._AC_SL1500_.jpg', alt: 'Luffy Grandista Figure' }],
    category: 'figures',
    brand: 'banpresto',
    franchise: 'One Piece',
    character: 'Monkey D. Luffy',
    height: '21cm',
    stock: 15,
    status: 'in-stock',
    featured: true,
    isNew: true
  },
  {
    name: 'DEMON SLAYER - Zenitsu Agatsuma Funko Pop',
    nameJapanese: '鬼滅の刃 善逸',
    description: 'Funko Pop! Animation figure of Zenitsu Agatsuma in his iconic pose.',
    price: 16.99,
    images: [{ url: 'https://m.media-amazon.com/images/I/51+LhKVzURL._AC_SL1000_.jpg', alt: 'Zenitsu Funko Pop' }],
    category: 'funko',
    brand: 'funko',
    franchise: 'Demon Slayer',
    character: 'Zenitsu Agatsuma',
    height: '10cm',
    stock: 30,
    status: 'in-stock',
    featured: true,
    isNew: true
  },
  {
    name: 'NARUTO - Sasuke Uchiha Figure',
    nameJapanese: 'ナルト サスケ',
    description: 'Dynamic action figure of Sasuke Uchiha with Sharingan activated.',
    price: 49.99,
    comparePrice: 59.99,
    images: [{ url: 'https://m.media-amazon.com/images/I/71dCnKbhtVL._AC_SL1500_.jpg', alt: 'Sasuke Figure' }],
    category: 'figures',
    brand: 'banpresto',
    franchise: 'Naruto',
    character: 'Sasuke Uchiha',
    height: '18cm',
    stock: 8,
    status: 'in-stock',
    featured: true,
    isNew: false
  },
  {
    name: 'JUJUTSU KAISEN - Gojo Satoru Premium Figure',
    nameJapanese: '呪術廻戦 五条悟',
    description: 'Premium quality figure of Gojo Satoru with detailed blindfold and uniform.',
    price: 89.99,
    images: [{ url: 'https://m.media-amazon.com/images/I/61zs2Y8AFBL._AC_SL1200_.jpg', alt: 'Gojo Figure' }],
    category: 'figures',
    brand: 'kotobukiya',
    franchise: 'Jujutsu Kaisen',
    character: 'Gojo Satoru',
    height: '25cm',
    stock: 5,
    status: 'in-stock',
    featured: true,
    isNew: true
  },
  {
    name: 'DRAGON BALL - Vegeta Final Flash Figure',
    nameJapanese: 'ドラゴンボール ベジータ',
    description: 'Vegeta performing his iconic Final Flash attack. Incredible detail and pose.',
    price: 69.99,
    images: [{ url: 'https://m.media-amazon.com/images/I/71aHikmA0QL._AC_SL1500_.jpg', alt: 'Vegeta Figure' }],
    category: 'figures',
    brand: 'banpresto',
    franchise: 'Dragon Ball',
    character: 'Vegeta',
    height: '20cm',
    stock: 12,
    status: 'in-stock',
    featured: false,
    isNew: true
  },
  {
    name: 'CHAINSAW MAN - Denji Figure (Pre-Order)',
    nameJapanese: 'チェンソーマン デンジ',
    description: 'Pre-order the highly anticipated Denji figure in chainsaw form. Expected release Q2 2026.',
    price: 129.99,
    images: [{ url: 'https://m.media-amazon.com/images/I/71lk6FqccDL._AC_SL1500_.jpg', alt: 'Denji Figure' }],
    category: 'pre-orders',
    brand: 'kotobukiya',
    franchise: 'Chainsaw Man',
    character: 'Denji',
    height: '28cm',
    stock: 0,
    status: 'pre-order',
    releaseDate: new Date('2026-06-15'),
    featured: true,
    isNew: false
  },
  {
    name: 'ATTACK ON TITAN - Levi Ackerman Nendoroid',
    nameJapanese: '進撃の巨人 リヴァイ',
    description: 'Adorable Nendoroid figure of Levi Ackerman with multiple accessories.',
    price: 54.99,
    images: [{ url: 'https://m.media-amazon.com/images/I/61fZYk-CfTL._AC_SL1200_.jpg', alt: 'Levi Nendoroid' }],
    category: 'figures',
    brand: 'good-smile',
    franchise: 'Attack on Titan',
    character: 'Levi Ackerman',
    height: '10cm',
    stock: 20,
    status: 'in-stock',
    featured: false,
    isNew: false
  },
  {
    name: 'MY HERO ACADEMIA - All Might Figure',
    nameJapanese: '僕のヒーローアカデミア オールマイト',
    description: 'Symbol of Peace All Might in his muscular form. True to anime appearance.',
    price: 74.99,
    images: [{ url: 'https://m.media-amazon.com/images/I/71T3p3YvJeL._AC_SL1500_.jpg', alt: 'All Might Figure' }],
    category: 'figures',
    brand: 'banpresto',
    franchise: 'My Hero Academia',
    character: 'All Might',
    height: '22cm',
    stock: 10,
    status: 'in-stock',
    featured: false,
    isNew: true
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample data
    await Product.insertMany(sampleProducts);
    console.log(`Inserted ${sampleProducts.length} sample products`);

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
