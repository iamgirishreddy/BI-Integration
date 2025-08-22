const mongoose = require('mongoose');
const Event = require('./models/Event');
require('dotenv').config();

const sampleEvents = [
  {
    title: "React Hooks Masterclass",
    date: new Date("2024-09-15T10:00:00Z"),
    type: "online",
    thumbnail: "https://placehold.co/300x200?text=React+Hooks",
    description: "Deep dive into React Hooks with hands-on examples. Learn useState, useEffect, useContext and create custom hooks.",
    sessionTimings: "10:00 AM - 1:00 PM EST",
    speakers: ["Sarah Johnson", "Mike Chen"],
    price: 49.99,
    venue: "",
    tags: ["react", "javascript", "frontend", "hooks"]
  },
  {
    title: "Local Tech Networking Event",
    date: new Date("2024-09-20T18:30:00Z"),
    type: "offline",
    thumbnail: "https://placehold.co/300x200?text=Networking",
    description: "Join us for an evening of networking with local tech professionals.",
    sessionTimings: "6:30 PM - 9:00 PM",
    speakers: ["Local Tech Community"],
    price: 0,
    venue: "Tech Hub Center, 123 Main St, San Francisco, CA",
    tags: ["networking", "career", "local", "community"]
  }
  // Add more events from the sample data...
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Event.deleteMany({}); // Clear existing data
    await Event.insertMany(sampleEvents);
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
