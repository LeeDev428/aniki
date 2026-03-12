require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');
const connectDB = require('../src/config/db');

const users = [
  {
    username: 'admin',
    email: 'admin@gmail.com',
    password: 'admin123',
    role: 'admin',
    avatar: '',
  },
  {
    username: 'sakura_fan',
    email: 'sakura@gmail.com',
    password: 'password123',
    role: 'customer',
    avatar: '',
  },
  {
    username: 'naruto_uzumaki',
    email: 'naruto@gmail.com',
    password: 'password123',
    role: 'customer',
    avatar: '',
  },
  {
    username: 'miku_collector',
    email: 'miku@gmail.com',
    password: 'password123',
    role: 'customer',
    avatar: '',
  },
];

async function seed() {
  await connectDB();

  try {
    await User.deleteMany({});
    console.log('Cleared existing users');

    const created = [];
    for (const u of users) {
      const user = new User(u); // pre-save hook handles bcrypt
      await user.save();
      created.push(user);
      console.log(`  ✓ Created ${user.role}: ${user.username} (${user.email})`);
    }

    console.log(`\nSeeded ${created.length} users successfully.`);
    console.log('\nAdmin credentials:');
    console.log('  Email:    admin@aniki.com');
    console.log('  Password: admin123');
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nDatabase connection closed.');
  }
}

seed();
