import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { 
  Newspaper, Pin, Search, Filter, Calendar, 
  ChevronRight, ArrowRight, User, Compass,
  BookOpen, Megaphone, Trophy, Zap, Building
} from 'lucide-react';

// --- Mock Data ---
const CATEGORIES = [
  { id: 'All', label: 'All Updates', icon: Newspaper },
  { id: 'Academic', label: 'Academic', icon: BookOpen },
  { id: 'Cultural', label: 'Cultural', icon: Megaphone },
  { id: 'Sports', label: 'Sports', icon: Trophy },
  { id: 'Technical', label: 'Technical', icon: Zap },
  { id: 'Admin', label: 'Administration', icon: Building },
];

const PINNED_NEWS = [
  {
    id: 1,
    title: "Mid-Semester Examination Schedule Released",
    excerpt: "The official timetable for the Spring 2026 mid-semester examinations has been published. Exams will commence from May 20th. Please check your student portal for subject-wise details.",
    date: "April 24, 2026",
    category: "Academic",
    author: "Dean of Academics",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
  }
];

const NEWS_FEED = [
  {
    id: 2,
    title: "Tech Innovators Society wins National Hackathon",
    excerpt: "Our college team 'Byte Bandits' secured the first runner-up position at the national level Smart India Hackathon held in New Delhi.",
    date: "April 22, 2026",
    category: "Technical",
    author: "Tech Club Admin",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Annual Sports Meet Registration Extended",
    excerpt: "Good news for athletes! The deadline for registering for track and field events has been extended by three days. Sign up now via your dashboard.",
    date: "April 20, 2026",
    category: "Sports",
    author: "Sports Council",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Campus Wi-Fi Maintenance Notice",
    excerpt: "The main campus Wi-Fi network will be undergoing scheduled maintenance this Saturday from 2:00 AM to 6:00 AM. Expect intermittent connectivity.",
    date: "April 19, 2026",
    category: "Admin",
    author: "IT Department",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "Guest Lecture: The Future of Renewable Energy",
    excerpt: "Join us next week for an insightful guest lecture by Dr. Alan Green from the Global Sustainability Institute.",
    date: "April 18, 2026",
    category: "Academic",
    author: "Mechanical Dept",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    title: "Auditions for the Spring Musical",
    excerpt: "The Cultural Committee is looking for singers, actors, and stage crew for our upcoming production of 'Les Misérables'.",
    date: "April 15, 2026",
    category: "Cultural",
    author: "Cultural Committee",
    image: "https://images.unsplash.com/photo-1507676184212-d0330a151fbb?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 7,
    title: "Library Hours Extended for Exam Season",
    excerpt: "To help students prepare for upcoming exams, the central library will now remain open until 2:00 AM starting next week.",
    date: "April 14, 2026",
    category: "Admin",
    author: "Chief Librarian",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800",
  }
];

export default function News() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter logic
  const filteredNews = NEWS_FEED.filter(article => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
        
        {/* Simple Navbar */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center cursor-pointer">
                <Compass className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-slate-800 tracking-tight hidden sm:block">Campus<span className="text-indigo-600">Sync</span></span>
              </Link>
              <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
                <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
                <Link to="/events" className="hover:text-indigo-600 transition">Events</Link>
                <Link to="/clubs" className="hover:text-indigo-600 transition">Clubs</Link>
                <span className="text-indigo-600 border-b-2 border-indigo-600 px-1 py-5">News</span>
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
        <div className="bg-slate-900 text-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6">Campus News & Announcements</h1>
            <p className="text-slate-400 max-w-2xl mx-auto mb-8 text-lg">
              Stay updated with the latest happenings, administrative notices, and stories from around the university.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white/10 p-2 rounded-2xl flex items-center backdrop-blur-md border border-white/20 focus-within:bg-white focus-within:text-slate-900 transition-colors group">
              <div className="flex-1 flex items-center pl-4">
                <Search className="text-slate-300 group-focus-within:text-slate-400 w-5 h-5 mr-3 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search articles or announcements..." 
                  className="w-full bg-transparent border-none outline-none text-white group-focus-within:text-slate-900 placeholder-slate-400 py-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition shadow-sm">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar - Categories */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center">
                <Filter className="w-4 h-4 mr-2 text-indigo-600" /> Categories
              </h3>
              <nav className="space-y-2">
                {CATEGORIES.map(category => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        isActive 
                          ? 'bg-indigo-50 text-indigo-700' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                      {category.label}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Subscribe</h3>
                <p className="text-xs text-slate-500 mb-4">Get the latest campus news delivered straight to your inbox.</p>
                <input type="email" placeholder="Email address" className="w-full px-4 py-2 rounded-lg border border-slate-200 text-sm mb-2 outline-none focus:border-indigo-600" />
                <button className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </aside>

          {/* Right Content Area */}
          <main className="flex-1 min-w-0">
            
            {/* Pinned Announcements (Only show if 'All' category is selected and no search) */}
            {activeCategory === 'All' && searchQuery === '' && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Pin className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <h2 className="text-xl font-bold text-slate-900">Important Notices</h2>
                </div>
                
                <div className="space-y-4">
                  {PINNED_NEWS.map(news => (
                    <div key={news.id} className="bg-white rounded-2xl p-1 border-2 border-rose-100 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                      <div className="flex flex-col md:flex-row relative z-10">
                        <div className="md:w-1/3 h-48 md:h-auto rounded-xl overflow-hidden m-2">
                          <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 md:p-6 flex-1 flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="bg-rose-100 text-rose-700 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider">
                              Pinned
                            </span>
                            <span className="text-xs font-medium text-slate-500 flex items-center">
                              <Calendar className="w-3.5 h-3.5 mr-1" /> {news.date}
                            </span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
                            {news.title}
                          </h3>
                          <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                            {news.excerpt}
                          </p>
                          <div className="flex items-center justify-between mt-auto">
                            <span className="text-xs font-semibold text-slate-500">By {news.author}</span>
                            <Link to={`/news/${news.id}`} className="text-indigo-600 text-sm font-bold flex items-center hover:text-indigo-800 transition">
                              Read Full Notice <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* General News Feed Grid */}
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-2">
              <h2 className="text-xl font-bold text-slate-900">
                {searchQuery ? `Search Results for "${searchQuery}"` : 
                 activeCategory === 'All' ? 'Latest Feed' : `${activeCategory} News`}
              </h2>
              <span className="text-sm font-medium text-slate-500">{filteredNews.length} articles</span>
            </div>

            {filteredNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredNews.map(news => (
                  <div key={news.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition group flex flex-col">
                    <div className="h-48 overflow-hidden relative">
                      <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 backdrop-blur-sm text-slate-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                          {news.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-xs font-medium text-slate-500 mb-2 flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1" /> {news.date}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
                        {news.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-1">
                        {news.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                        <span className="text-xs font-semibold text-slate-500">{news.author}</span>
                        <Link to={`/news/${news.id}`} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition">
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 border-dashed p-12 text-center">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-1">No articles found</h3>
                <p className="text-slate-500">We couldn't find any news matching your current search or filter criteria.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="mt-4 text-indigo-600 font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination Placeholder */}
            {filteredNews.length > 0 && (
              <div className="mt-10 flex justify-center">
                <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl shadow-sm hover:bg-slate-50 transition">
                  Load More Articles
                </button>
              </div>
            )}

          </main>
        </div>
      </div>
    
  );
}