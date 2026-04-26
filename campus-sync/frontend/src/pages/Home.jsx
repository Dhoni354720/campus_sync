import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { 
  Search, Calendar, Users, Trophy, ChevronRight, 
  MapPin, Clock, Bell, BookOpen, Compass, 
  Facebook, Twitter, Instagram, Linkedin, LogIn
} from 'lucide-react';

// --- Mock Data ---
const MOCK_EVENTS = [
  {
    id: 1,
    title: "Annual Tech Symposium 2026",
    category: "Technical",
    date: "Apr 28, 2026",
    time: "10:00 AM",
    venue: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    tags: ["Tech", "Innovation", "Free"],
    seatsLeft: 45
  },
  {
    id: 2,
    title: "Cultural Night: Resonance",
    category: "Cultural",
    date: "May 05, 2026",
    time: "06:00 PM",
    venue: "Open Air Theatre",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    tags: ["Music", "Dance", "Paid"],
    seatsLeft: 120
  },
  {
    id: 3,
    title: "Inter-college Hackathon",
    category: "Technical",
    date: "May 10, 2026",
    time: "09:00 AM",
    venue: "CS Department Labs",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    tags: ["Coding", "Prizes"],
    seatsLeft: 12
  },
  {
    id: 4,
    title: "Leadership Workshop",
    category: "Academic",
    date: "May 15, 2026",
    time: "02:00 PM",
    venue: "Seminar Hall B",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    tags: ["Workshop", "Certification"],
    seatsLeft: 5
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");

  return (
    // The <Router> wrapper is added here so the <Link> components work properly
    // in this isolated preview environment. When you use this inside your App.jsx
    // that already has a <Router>, you can safely remove these <Router> tags.
    
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        
        {/* 1. Announcements Ticker */}
        <div className="bg-indigo-600 text-white px-4 py-2 text-sm flex items-center justify-center">
          <Bell className="w-4 h-4 mr-2 animate-bounce" />
          <span className="font-medium">Notice:</span>
          <span className="ml-2 truncate max-w-2xl">
            Registration for the Spring TechFest 2026 closes in 3 days! Make sure to register your teams.
          </span>
        </div>

        {/* Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center cursor-pointer">
                <Compass className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-slate-800 tracking-tight">Campus<span className="text-indigo-600">Sync</span></span>
              </Link>
              <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
                <Link to="/" className="text-indigo-600">Home</Link>
                <Link to="/events" className="hover:text-indigo-600 transition">Events</Link>
                <Link to="/clubs" className="hover:text-indigo-600 transition">Clubs</Link>
                <Link to="/news" className="hover:text-indigo-600 transition">News</Link>
              </div>
              <div className="flex space-x-4">
                <Link to="/auth" className="text-slate-600 hover:text-indigo-600 font-medium text-sm hidden md:flex items-center">
                  Log In
                </Link>
                <Link to="/auth" className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-indigo-700 transition shadow-md hover:shadow-lg flex items-center">
                  <LogIn className="w-4 h-4 mr-1.5" />
                  Register
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* 2. Hero Banner & Quick Search */}
        <div className="relative bg-slate-900 text-white">
          {/* Abstract Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-12 -right-12 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center">
            <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium border border-white/20 mb-6 backdrop-blur-sm">
              Discover Your Campus Life
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Find the Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">Events & Clubs</span> <br/> On Campus
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10">
              Join thousands of students experiencing the vibrant culture, learning new skills, and making unforgettable memories.
            </p>

            {/* Quick Search Bar */}
            <div className="w-full max-w-4xl bg-white rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row gap-2 relative z-10">
              <div className="flex-1 flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                <Search className="text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search events by name..." 
                  className="bg-transparent border-none outline-none w-full ml-3 text-slate-800 placeholder-slate-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="md:w-48 flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                <select 
                  className="bg-transparent border-none outline-none w-full text-slate-600 cursor-pointer"
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Technical">Technical</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                  <option value="Academic">Academic</option>
                </select>
              </div>
              <div className="md:w-48 flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                <input 
                  type="date" 
                  className="bg-transparent border-none outline-none w-full text-slate-600 cursor-pointer"
                />
              </div>
              <Link to="/events" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center">
                Find Events
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Stats Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-slate-100">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="bg-indigo-100 p-3 rounded-full mb-3 text-indigo-600">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">150+</h3>
              <p className="text-sm text-slate-500 font-medium">Events This Year</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center pl-6">
              <div className="bg-pink-100 p-3 rounded-full mb-3 text-pink-600">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">45</h3>
              <p className="text-sm text-slate-500 font-medium">Active Clubs</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center pl-6">
              <div className="bg-blue-100 p-3 rounded-full mb-3 text-blue-600">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">8,500+</h3>
              <p className="text-sm text-slate-500 font-medium">Students Registered</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center pl-6">
              <div className="bg-emerald-100 p-3 rounded-full mb-3 text-emerald-600">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">12k+</h3>
              <p className="text-sm text-slate-500 font-medium">Certificates Issued</p>
            </div>
          </div>
        </div>

        {/* 4. Quick Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/events" className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition cursor-pointer group block">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-indigo-50 w-12 h-12 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
                  <Calendar className="w-6 h-6" />
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Browse Events</h3>
              <p className="text-slate-500 text-sm">Explore upcoming workshops, fests, and seminars across all departments.</p>
            </Link>
            
            <Link to="/clubs" className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-pink-300 hover:shadow-md transition cursor-pointer group block">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-pink-50 w-12 h-12 rounded-xl flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition">
                  <Users className="w-6 h-6" />
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-pink-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Join a Club</h3>
              <p className="text-slate-500 text-sm">Find your tribe. Connect with technical, cultural, and sports organizations.</p>
            </Link>

            <Link to="/dashboard" className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition cursor-pointer group block">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
                  <Compass className="w-6 h-6" />
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">My Dashboard</h3>
              <p className="text-slate-500 text-sm">Manage your registrations, view tickets, and download your certificates.</p>
            </Link>
          </div>
        </div>

        {/* 5. Upcoming Events Carousel / Grid */}
        <div className="bg-slate-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Upcoming Events</h2>
                <p className="text-slate-500">Don't miss out on these popular happenings on campus.</p>
              </div>
              <Link to="/events" className="hidden md:flex items-center text-indigo-600 font-semibold hover:text-indigo-800">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_EVENTS.map(event => (
                <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <div className="relative h-48 overflow-hidden group">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center text-indigo-600 text-xs font-bold mb-2">
                      <Calendar className="w-3.5 h-3.5 mr-1" /> {event.date} • {event.time}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{event.title}</h3>
                    <div className="flex items-center text-slate-500 text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags.map(tag => (
                          <span key={tag} className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className={`text-sm font-semibold ${event.seatsLeft < 20 ? 'text-rose-500' : 'text-slate-500'}`}>
                          {event.seatsLeft} seats left
                        </span>
                        <Link to={`/events/${event.id}`} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/events" className="w-full mt-8 md:hidden py-3 bg-white border border-slate-200 text-indigo-600 rounded-xl font-semibold flex items-center justify-center">
              View All Events
            </Link>
          </div>
        </div>

        {/* 6. Footer */}
        <footer className="bg-slate-900 text-slate-300 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-slate-800 pb-12">
              
              <div className="lg:col-span-1">
                <div className="flex items-center mb-4">
                  <Compass className="h-8 w-8 text-indigo-400" />
                  <span className="ml-2 text-xl font-bold text-white tracking-tight">Campus<span className="text-indigo-400">Sync</span></span>
                </div>
                <p className="text-sm text-slate-400 mb-6">
                  The ultimate platform to discover, register, and manage college events and club activities effortlessly.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-500 hover:text-white transition">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-indigo-500 hover:text-white transition">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link to="/" className="hover:text-indigo-400 transition">Home</Link></li>
                  <li><Link to="/events" className="hover:text-indigo-400 transition">Browse Events</Link></li>
                  <li><Link to="/clubs" className="hover:text-indigo-400 transition">Explore Clubs</Link></li>
                  <li><Link to="/news" className="hover:text-indigo-400 transition">Notice Board</Link></li>
                  <li><Link to="/leaderboard" className="hover:text-indigo-400 transition">Leaderboard</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-6">Support</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link to="/help" className="hover:text-indigo-400 transition">Help Center & FAQ</Link></li>
                  <li><Link to="/contact" className="hover:text-indigo-400 transition">Contact Student Support</Link></li>
                  <li><Link to="/report" className="hover:text-indigo-400 transition">Report an Issue</Link></li>
                  <li><a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition">Terms of Service</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-6">Contact Us</h4>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 text-indigo-400 shrink-0" />
                    <span>Student Activities Center, Main Campus, Tech University</span>
                  </li>
                  <li className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-3 text-indigo-400 shrink-0" />
                    <span>events@campus-sync.edu</span>
                  </li>
                  <li className="flex items-center">
                    <Users className="w-5 h-5 mr-3 text-indigo-400 shrink-0" />
                    <span>+1 (555) 123-4567</span>
                  </li>
                </ul>
              </div>

            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
              <p>&copy; 2026 CampusSync Events Management. All rights reserved.</p>
              <p className="mt-2 md:mt-0">Designed for a better campus experience.</p>
            </div>
          </div>
        </footer>
      </div>
    
  );
}