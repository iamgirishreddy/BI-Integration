const mongoose = require('mongoose');
const Event = require('./models/Event');
require('dotenv').config();

const sampleEvents = [
  {
    title: "React Hooks Masterclass",
    date: new Date("2024-09-15T10:00:00Z"),
    type: "online",
    thumbnail: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=250&fit=crop",
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
    thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop",
    description: "Join us for an evening of networking with local tech professionals.",
    sessionTimings: "6:30 PM - 9:00 PM",
    speakers: ["Local Tech Community"],
    price: 0,
    venue: "Tech Hub Center, 123 Main St, San Francisco, CA",
    tags: ["networking", "career", "local", "community"]
  },
  {
    title: "Tech Conference 2025",
    date: new Date("2025-09-20T09:00:00Z"),
    type: "offline",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
    description: "Annual gathering of tech enthusiasts, developers, and industry leaders. Network with professionals and learn about the latest tech trends.",
    sessionTimings: "9:00 AM - 5:00 PM",
    speakers: ["Alice Kim", "David Lee", "Rachel Green"],
    price: 1200,
    venue: "Tech Arena, Bandra Kurla Complex, Mumbai",
    tags: ["technology", "conference", "networking", "innovation"]
  },
  {
    title: "Digital Marketing Workshop",
    date: new Date("2025-09-25T14:00:00Z"),
    type: "offline",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    description: "Learn effective digital marketing strategies, social media marketing, SEO, and content marketing from industry experts.",
    sessionTimings: "2:00 PM - 6:00 PM",
    speakers: ["Marketing Experts", "Social Media Guru"],
    price: 800,
    venue: "Marketing Hub, Cyber City, Gurgaon",
    tags: ["marketing", "digital", "seo", "social media"]
  },
  {
    title: "Full Stack Development Bootcamp",
    date: new Date("2025-10-02T10:00:00Z"),
    type: "online",
    thumbnail: "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=400&h=250&fit=crop",
    description: "Comprehensive bootcamp covering frontend (React) and backend (Node.js/Express) development. Build real-world projects.",
    sessionTimings: "10:00 AM - 4:00 PM EST",
    speakers: ["Alex Rodriguez", "Emily Davis"],
    price: 150,
    venue: "",
    tags: ["fullstack", "react", "nodejs", "express", "mongodb"]
  },
  {
    title: "AI & Machine Learning Summit",
    date: new Date("2025-10-08T11:00:00Z"),
    type: "offline",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
    description: "Explore the future of artificial intelligence and machine learning with hands-on workshops and expert talks.",
    sessionTimings: "11:00 AM - 7:00 PM",
    speakers: ["Dr. James Wilson", "AI Research Team"],
    price: 2000,
    venue: "Convention Center, Whitefield, Bangalore",
    tags: ["ai", "machine learning", "technology", "research"]
  },
  {
    title: "Startup Networking Event",
    date: new Date("2025-10-12T18:00:00Z"),
    type: "offline",
    thumbnail: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop",
    description: "Connect with fellow entrepreneurs, investors, and startup enthusiasts. Perfect for building valuable business relationships.",
    sessionTimings: "6:00 PM - 9:00 PM",
    speakers: ["Startup Community"],
    price: 0,
    venue: "Startup Hub, Koramangala, Bangalore",
    tags: ["startup", "networking", "entrepreneurship", "business"]
  },
  {
    title: "Web Design & UX Workshop",
    date: new Date("2025-10-15T13:00:00Z"),
    type: "online",
    thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=250&fit=crop",
    description: "Master modern web design principles, user experience design, and create stunning interfaces that users love.",
    sessionTimings: "1:00 PM - 5:00 PM EST",
    speakers: ["Design Team", "UX Specialists"],
    price: 75,
    venue: "",
    tags: ["design", "ux", "ui", "web design", "creative"]
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
