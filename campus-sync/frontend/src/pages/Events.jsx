import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { 
  Search, Filter, Calendar, MapPin, Clock, 
  Grid, List as ListIcon, ChevronDown, ChevronLeft, 
  ChevronRight, Tag, Compass, User
} from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_URL;
// --- Extended Mock Data ---
const MOCK_EVENTS = [
  {
    id: 1,
    title: "Annual Tech Symposium 2026",
    category: "Technical",
    date: "Apr 28, 2026",
    time: "10:00 AM",
    venue: "Main Auditorium",
    mode: "Offline",
    price: "Free",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    tags: ["Tech", "Innovation"],
    seatsLeft: 45,
    club: "Tech Club"
  },
  {
    id: 2,
    title: "Cultural Night: Resonance",
    category: "Cultural",
    date: "May 05, 2026",
    time: "06:00 PM",
    venue: "Open Air Theatre",
    mode: "Offline",
    price: "Paid",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    tags: ["Music", "Dance"],
    seatsLeft: 120,
    club: "Cultural Committee"
  },
  {
    id: 3,
    title: "Global Web3 Hackathon",
    category: "Technical",
    date: "May 10, 2026",
    time: "09:00 AM",
    venue: "Discord / Online",
    mode: "Online",
    price: "Free",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    tags: ["Coding", "Blockchain"],
    seatsLeft: 250,
    club: "DevHub"
  },
  {
    id: 4,
    title: "Leadership Workshop",
    category: "Academic",
    date: "May 15, 2026",
    time: "02:00 PM",
    venue: "Seminar Hall B",
    mode: "Offline",
    price: "Paid",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    tags: ["Workshop", "Certification"],
    seatsLeft: 5,
    club: "Management Society"
  },
  {
    id: 5,
    title: "Inter-department Basketball",
    category: "Sports",
    date: "May 20, 2026",
    time: "04:00 PM",
    venue: "Campus Sports Complex",
    mode: "Offline",
    price: "Free",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800",
    tags: ["Sports", "Tournament"],
    seatsLeft: 50,
    club: "Sports Council"
  },
  {
    id: 6,
    title: "AI in Healthcare Seminar",
    category: "Academic",
    date: "May 22, 2026",
    time: "11:00 AM",
    venue: "Zoom / Online",
    mode: "Online",
    price: "Free",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    tags: ["AI", "Health"],
    seatsLeft: 500,
    club: "Medical Tech Club"
  }
];

export default function Events() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  // Basic states for filters (in a real app, these would filter the MOCK_EVENTS array)
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const CATEGORIES = ['All', 'Technical', 'Cultural', 'Sports', 'Academic'];
  const [events, setEvents] = useState([]);
  useEffect(() => {
  fetch("{BASE_URL}/api/events")
    .then(res => res.json())
    .then(data => {
      console.log("BACKEND EVENTS:", data);

      const formatted = data.map(event => ({
        id: event._id,
        title: event.title,
        category: event.category || "General",
        date: new Date(event.date).toLocaleDateString(),
        time: new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        venue: event.venue || "TBA",
        mode: event.mode || "Offline",
        price: event.price || "Free",
        image: event.image || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        tags: event.tags || ["Event"],
        seatsLeft: event.seatsLeft || 100,
        club: event.club?.name || "Unknown Club"
      }));

      setEvents(formatted);
    })
    .catch(err => console.error(err));
}, []);

  return (
    
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
        
        {/* Simplified Navbar for standalone preview */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center cursor-pointer">
                <Compass className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-slate-800 tracking-tight">Campus<span className="text-indigo-600">Sync</span></span>
              </Link>
              <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
                <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
                <Link to="/events" className="text-indigo-600">Events</Link>
                <Link to="/clubs" className="hover:text-indigo-600 transition">Clubs</Link>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  <User className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Header */}
        <div className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Discover Events</h1>
                <p className="text-slate-400">Explore and register for upcoming activities on campus.</p>
              </div>
              <div className="flex bg-white/10 p-1 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center pl-3 pr-2">
                  <Search className="w-5 h-5 text-slate-300" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search events..." 
                  className="bg-transparent border-none outline-none text-white placeholder-slate-300 py-2 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition ml-2">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar - Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-indigo-600" /> Filters
                </h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">Clear All</button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Category</h3>
                <div className="space-y-2">
                  {CATEGORIES.map(category => (
                    <label key={category} className="flex items-center group cursor-pointer">
                      <input 
                        type="radio" 
                        name="category"
                        checked={activeCategory === category}
                        onChange={() => setActiveCategory(category)}
                        className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-600 cursor-pointer" 
                      />
                      <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 transition">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-slate-100 mb-6" />

              {/* Mode (Online/Offline) */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Mode</h3>
                <div className="space-y-2">
                  {['Both', 'Offline', 'Online'].map(mode => (
                    <label key={mode} className="flex items-center group cursor-pointer">
                      <input type="radio" name="mode" defaultChecked={mode === 'Both'} className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-600 cursor-pointer" />
                      <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 transition">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="border-slate-100 mb-6" />

              {/* Price (Free/Paid) */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Price</h3>
                <div className="space-y-2">
                  <label className="flex items-center group cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-600 cursor-pointer" />
                    <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 transition">Free Events</span>
                  </label>
                  <label className="flex items-center group cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-600 cursor-pointer" />
                    <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 transition">Paid Events</span>
                  </label>
                </div>
              </div>
              
              <hr className="border-slate-100 mb-6" />

              {/* Date Range */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Date</h3>
                <input type="date" className="w-full text-sm text-slate-600 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600" />
              </div>
            </div>
          </aside>

          {/* Right Area - Results */}
          <main className="flex-1">
            
            {/* Top Bar: Sort & View Toggles */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 gap-4">
              <div className="text-sm text-slate-600">
                Showing <span className="font-bold text-slate-900">{events.length}</span> events
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Sort by:</span>
                  <div className="relative">
                    <select className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg pl-3 pr-8 py-1.5 outline-none focus:ring-2 focus:ring-indigo-600 font-medium cursor-pointer">
                      <option>Upcoming First</option>
                      <option>Popularity</option>
                      <option>Newest Added</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-1">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <ListIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Event Cards Container */}
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
              : "flex flex-col gap-4"
            }>
              {events.map(event => (
                <div 
                  key={event.id} 
                  className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-shadow duration-300 group ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}
                >
                  {/* Image Section */}
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'sm:w-64 sm:h-auto h-48 flex-shrink-0' : 'h-48'}`}>
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm w-max">
                        {event.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm w-max ${event.price === 'Free' ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}`}>
                        {event.price}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-indigo-600 text-xs font-bold">
                          <Calendar className="w-3.5 h-3.5 mr-1" /> {event.date} • {event.time}
                        </div>
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {event.mode}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
                        {event.title}
                      </h3>
                      
                      <div className="space-y-1.5 mb-4">
                        <div className="flex items-center text-slate-500 text-sm">
                          <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0 text-slate-400" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                        <div className="flex items-center text-slate-500 text-sm">
                          <User className="w-4 h-4 mr-1.5 flex-shrink-0 text-slate-400" />
                          <span className="truncate text-xs">By {event.club}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      {/* Tags (Hidden in tight list view on mobile, visible otherwise) */}
                      <div className={`flex flex-wrap gap-2 mb-4 ${viewMode === 'list' ? 'hidden sm:flex' : 'flex'}`}>
                        {event.tags.map(tag => (
                          <span key={tag} className="flex items-center text-slate-500 text-xs font-medium">
                            <Tag className="w-3 h-3 mr-1" /> {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex flex-col">
                          <span className={`text-sm font-semibold ${event.seatsLeft < 20 ? 'text-rose-500' : 'text-slate-600'}`}>
                            {event.seatsLeft} seats left
                          </span>
                        </div>
                        <Link to={`/events/${event.id}`} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition flex items-center">
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-2">
                <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition disabled:opacity-50" disabled>
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-lg bg-indigo-600 text-white font-medium flex items-center justify-center shadow-md">
                  1
                </button>
                <button className="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition flex items-center justify-center">
                  2
                </button>
                <button className="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition flex items-center justify-center">
                  3
                </button>
                <span className="text-slate-400">...</span>
                <button className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-600 transition">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </nav>
            </div>

          </main>
        </div>
      </div>
    
  );
}