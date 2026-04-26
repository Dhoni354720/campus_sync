import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { 
  Search, Users, Star, ArrowRight, Compass, 
  MapPin, User, Shield, Zap, Music, Trophy, BookOpen
} from 'lucide-react';

// --- Mock Data ---
const CATEGORIES = ["All", "Technical", "Cultural", "Sports", "Literary", "Social"];

const FEATURED_CLUB = {
  id: 1,
  name: "Tech Innovators Society",
  category: "Technical",
  members: 340,
  description: "The premier technical club focusing on AI, Web3, and Robotics. Join us to build the future and participate in national hackathons.",
  banner: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
  logo: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=150",
  upcomingEvents: 3
};

const CLUBS = [
  {
    id: 2,
    name: "Symphony Music Club",
    category: "Cultural",
    members: 185,
    description: "Whether you sing, play an instrument, or just love music, Symphony is your home for jamming and stage performances.",
    banner: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=600",
    icon: Music
  },
  {
    id: 3,
    name: "Spartans Athletics",
    category: "Sports",
    members: 420,
    description: "Official sports council managing inter-college tournaments for basketball, football, cricket, and more.",
    banner: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=600",
    icon: Trophy
  },
  {
    id: 4,
    name: "CodeCrafters",
    category: "Technical",
    members: 512,
    description: "Competitive programming and software development club. We host weekly coding contests and interview prep sessions.",
    banner: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
    icon: Zap
  },
  {
    id: 5,
    name: "The Debate Society",
    category: "Literary",
    members: 95,
    description: "Master the art of public speaking, MUNs, and parliamentary debates. We build confident orators.",
    banner: "https://images.unsplash.com/photo-1541560052-5e137f229371?auto=format&fit=crop&q=80&w=600",
    icon: BookOpen
  },
  {
    id: 6,
    name: "Green Earth Initiative",
    category: "Social",
    members: 210,
    description: "Dedicated to campus sustainability, tree plantation drives, and social awareness campaigns.",
    banner: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600",
    icon: Shield
  }
];

export default function Clubs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter clubs based on category and search query
  const filteredClubs = CLUBS.filter(club => {
    const matchesCategory = activeCategory === 'All' || club.category === activeCategory;
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (

      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        
        {/* Simplified Navbar */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center cursor-pointer">
                <Compass className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-slate-800 tracking-tight">Campus<span className="text-indigo-600">Sync</span></span>
              </Link>
              <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
                <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
                <Link to="/events" className="hover:text-indigo-600 transition">Events</Link>
                <Link to="/clubs" className="text-indigo-600">Clubs</Link>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  <User className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Header & Search */}
        <div className="bg-slate-900 text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-pink-600 opacity-20 blur-3xl mix-blend-screen"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Explore Campus Organizations</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
              Find your community, build new skills, and make memories that will last a lifetime. Join over 45 active student clubs.
            </p>
            
            <div className="max-w-2xl mx-auto bg-white p-2 rounded-2xl flex items-center shadow-lg">
              <div className="flex-1 flex items-center pl-4">
                <Search className="text-slate-400 w-5 h-5 mr-3" />
                <input 
                  type="text" 
                  placeholder="Search clubs by name or keyword..." 
                  className="w-full bg-transparent border-none outline-none text-slate-900 py-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition">
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Featured Club Spotlight (Only show if no search/filter is active) */}
          {activeCategory === 'All' && searchQuery === '' && (
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <Star className="w-6 h-6 text-amber-500 mr-2 fill-amber-500" />
                <h2 className="text-2xl font-bold text-slate-900">Spotlight Club of the Month</h2>
              </div>
              
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 flex flex-col md:flex-row relative group">
                <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                  <img src={FEATURED_CLUB.banner} alt="Featured Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900/80 to-transparent flex items-end md:items-center p-8">
                    <img src={FEATURED_CLUB.logo} alt="Logo" className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg bg-white object-cover" />
                  </div>
                </div>
                
                <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-slate-900 md:bg-white text-white md:text-slate-900">
                  <div className="flex items-center mb-3">
                    <span className="bg-indigo-500 md:bg-indigo-100 text-white md:text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {FEATURED_CLUB.category}
                    </span>
                    <span className="flex items-center ml-4 text-slate-300 md:text-slate-500 text-sm font-medium">
                      <Users className="w-4 h-4 mr-1.5" /> {FEATURED_CLUB.members} Members
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4">{FEATURED_CLUB.name}</h3>
                  <p className="text-slate-300 md:text-slate-600 mb-8 leading-relaxed">
                    {FEATURED_CLUB.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-auto">
                    <Link to="/clubs/1" className="bg-white md:bg-slate-900 text-slate-900 md:text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-100 md:hover:bg-slate-800 transition flex items-center">
                      View Profile
                    </Link>
                    <button className="border border-white/30 md:border-slate-200 text-white md:text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-white/10 md:hover:bg-slate-50 transition">
                      Join Club
                    </button>
                    <span className="text-sm font-medium text-emerald-400 md:text-emerald-600 ml-auto flex items-center">
                      <Zap className="w-4 h-4 mr-1" /> {FEATURED_CLUB.upcomingEvents} Upcoming Events
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Directory Section */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-slate-900">Club Directory</h2>
            
            {/* Horizontal Category Filters */}
            <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 hide-scrollbar gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition border ${
                    activeCategory === category 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Clubs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.length > 0 ? (
              filteredClubs.map(club => {
                const IconComponent = club.icon;
                return (
                  <div key={club.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-shadow duration-300 flex flex-col group">
                    <div className="h-32 overflow-hidden relative">
                      <img src={club.banner} alt={club.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-3 left-4">
                        <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-3 py-1 rounded-full text-xs font-bold">
                          {club.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col relative">
                      {/* Floating Icon Avatar */}
                      <div className="absolute -top-10 right-6 w-14 h-14 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center text-indigo-600 group-hover:-translate-y-1 transition-transform">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-2 pr-12">{club.name}</h3>
                      <p className="text-slate-500 text-sm mb-6 line-clamp-3 flex-1">
                        {club.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                        <div className="flex items-center text-slate-600 text-sm font-medium">
                          <Users className="w-4 h-4 mr-1.5 text-slate-400" /> {club.members}
                        </div>
                        <Link to={`/clubs/${club.id}`} className="text-indigo-600 font-semibold text-sm flex items-center hover:text-indigo-800 transition">
                          View details <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-1">No clubs found</h3>
                <p className="text-slate-500">We couldn't find any clubs matching your current filters.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="mt-4 text-indigo-600 font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    
  );
}