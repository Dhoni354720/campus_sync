const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('./models/Event');

dotenv.config();

const events = [
  {
    title: "Annual Tech Symposium 2026",
    description: "A day-long event featuring workshops on AI and Web3.",
    category: "Technical",
    date: new Date("2026-04-28T10:00:00"),
    venue: "Main Auditorium",
    capacity: 200,
    status: "Published"
  },
  {
    title: "Cultural Night: Resonance",
    description: "An evening of music, dance, and drama performances.",
    category: "Cultural",
    date: new Date("2026-05-05T18:00:00"),
    venue: "Open Air Theatre",
    capacity: 500,
    status: "Published"
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('🌱 Seeding database...');
    await Event.deleteMany({}); // Clears old events
    await Event.insertMany(events);
    console.log('✅ Database Seeded Successfully!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });