import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { 
  Users, MapPin, Calendar, Link as LinkIcon, Mail,
  Facebook, Twitter, Instagram, Linkedin, Globe,
  CheckCircle2, Plus, ArrowLeft, Compass, User,
  Bell, ChevronRight, Award
} from 'lucide-react';

// --- Detailed Mock Data for a Single Club ---
const CLUB = {
  id: 1,
  name: "Tech Innovators Society",
  category: "Technical",
  members: 340,
  established: "2018",
  facultyAdvisor: "Dr. Alan Turing",
  email: "contact@techinnovators.edu",
  website: "www.techinnovators.io",
  banner: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600",
  logo: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=200",
  description: `The Tech Innovators Society is the premier technology and engineering club at the university. We are a community of builders, thinkers, and creators passionate about pushing the boundaries of what's possible.

  Our mission is to foster a culture of innovation and provide students with the resources, mentorship, and platform they need to turn their ideas into reality. We regularly host workshops on emerging technologies like Artificial Intelligence, Web3, and Robotics.`,
  mission: "To empower students with practical technical skills and bridge the gap between academic learning and industry requirements.",
  socials: {
    instagram: "#",
    linkedin: "#",
    twitter: "#",
    github: "#"
  },
  announcements: [
    { id: 1, title: "Core Team Applications Open!", date: "2 days ago", isNew: true },
    { id: 2, title: "Venue change for Saturday's workshop", date: "1 week ago", isNew: false }
  ],
  team: [
    { name: "Sarah Chen", role: "President", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" },
    { name: "James Wilson", role: "Vice President", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150" },
    { name: "Priya Sharma", role: "Technical Head", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150" },
    { name: "David Kim", role: "Events Manager", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" }
  ],
  upcomingEvents: [
    {
      id: 101,
      title: "Annual Tech Symposium 2026",
      date: "Apr 28, 2026",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 102,
      title: "React Native Bootcamp",
      date: "May 12, 2026",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400"
    }
  ]
};

export default function ClubDetail() {
  const [isMember, setIsMember] = useState(false);
  const [activeTab, setActiveTab] = useState('about'); // 'about', 'events', 'team'

  return (
    
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
        
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

        {/* Hero Banner Header */}
        <div className="bg-white border-b border-slate-200">
          {/* Banner Image */}
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            <img 
              src={CLUB.banner} 
              alt="Club Banner" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
            
            <div className="absolute top-6 left-4 md:left-8 z-10">
              <Link to="/clubs" className="flex items-center text-white/90 hover:text-white text-sm font-medium transition backdrop-blur-md bg-black/30 px-4 py-2 rounded-full border border-white/10">
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Directory
              </Link>
            </div>
          </div>

          {/* Club Info Section (Overlapping Banner) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between -mt-16 md:-mt-20 pb-8 gap-6">
              
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                <img 
                  src={CLUB.logo} 
                  alt="Club Logo" 
                  className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-white shadow-xl bg-white object-cover shrink-0 z-10"
                />
                <div className="z-10 mt-2 md:mt-0 md:pb-2">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                    {CLUB.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-2">
                    {CLUB.name}
                  </h1>
                  <div className="flex flex-wrap items-center text-sm font-medium text-slate-500 gap-4">
                    <span className="flex items-center"><Users className="w-4 h-4 mr-1.5 text-slate-400" /> {CLUB.members} Members</span>
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5 text-slate-400" /> Est. {CLUB.established}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button 
                  onClick={() => setIsMember(!isMember)}
                  className={`flex-1 md:flex-none flex items-center justify-center px-6 py-3 rounded-xl font-bold transition shadow-sm ${
                    isMember 
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isMember ? (
                    <><CheckCircle2 className="w-5 h-5 mr-2" /> Joined</>
                  ) : (
                    <><Plus className="w-5 h-5 mr-2" /> Join Club</>
                  )}
                </button>
                <button className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition shadow-sm">
                  <Mail className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* Navigation Tabs */}
            <div className="flex overflow-x-auto hide-scrollbar border-t border-slate-100 pt-2">
              <button 
                onClick={() => setActiveTab('about')}
                className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'about' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                About Club
              </button>
              <button 
                onClick={() => setActiveTab('events')}
                className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'events' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Events & Activities
              </button>
              <button 
                onClick={() => setActiveTab('team')}
                className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'team' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                Leadership Team
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col lg:flex-row gap-8">
          
          {/* Left Column (Dynamic Content based on Tabs) */}
          <div className="w-full lg:w-2/3 space-y-6">
            
            {/* --- ABOUT TAB --- */}
            {activeTab === 'about' && (
              <div className="animate-in fade-in duration-500 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Who We Are</h2>
                  <div className="prose prose-slate max-w-none text-slate-600 whitespace-pre-line">
                    {CLUB.description}
                  </div>
                </div>

                <div className="bg-indigo-600 rounded-2xl shadow-sm p-6 md:p-8 text-white relative overflow-hidden">
                  <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
                    <Award className="w-48 h-48 -mr-10 -mt-10" />
                  </div>
                  <h2 className="text-xl font-bold mb-3 relative z-10">Our Mission</h2>
                  <p className="text-indigo-100 text-lg leading-relaxed relative z-10 font-medium">
                    "{CLUB.mission}"
                  </p>
                </div>
              </div>
            )}

            {/* --- EVENTS TAB --- */}
            {activeTab === 'events' && (
              <div className="animate-in fade-in duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Upcoming Events</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  {CLUB.upcomingEvents.map(event => (
                    <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition group">
                      <div className="h-40 overflow-hidden relative">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center text-indigo-600 text-xs font-bold mb-2">
                          <Calendar className="w-3.5 h-3.5 mr-1" /> {event.date}
                        </div>
                        <h3 className="font-bold text-slate-900 mb-4 line-clamp-1 group-hover:text-indigo-600 transition">{event.title}</h3>
                        <Link to={`/events/${event.id}`} className="block w-full py-2 text-center bg-slate-50 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-100 transition">
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-6">Past Events Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Mock gallery images */}
                  <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400" className="rounded-xl h-32 w-full object-cover hover:opacity-90 cursor-pointer transition" alt="gallery" />
                  <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=400" className="rounded-xl h-32 w-full object-cover hover:opacity-90 cursor-pointer transition" alt="gallery" />
                  <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=400" className="rounded-xl h-32 w-full object-cover hover:opacity-90 cursor-pointer transition" alt="gallery" />
                </div>
              </div>
            )}

            {/* --- TEAM TAB --- */}
            {activeTab === 'team' && (
              <div className="animate-in fade-in duration-500">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-indigo-600" /> Core Leadership Board
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {CLUB.team.map((member, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:shadow-sm hover:border-slate-200 transition bg-slate-50">
                        <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full object-cover shadow-sm" />
                        <div>
                          <h4 className="font-bold text-slate-900">{member.name}</h4>
                          <p className="text-sm font-semibold text-indigo-600">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column (Sidebar) */}
          <div className="w-full lg:w-1/3 space-y-6">
            
            {/* Quick Info & Socials */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Contact & Links</h3>
              
              <ul className="space-y-4 mb-6 text-sm text-slate-600">
                <li className="flex items-start">
                  <User className="w-5 h-5 mr-3 text-slate-400 shrink-0" />
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold mb-0.5">Faculty Advisor</span>
                    <span className="font-medium text-slate-900">{CLUB.facultyAdvisor}</span>
                  </div>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-slate-400 shrink-0" />
                  <a href={`mailto:${CLUB.email}`} className="hover:text-indigo-600 transition truncate">{CLUB.email}</a>
                </li>
                <li className="flex items-center">
                  <Globe className="w-5 h-5 mr-3 text-slate-400 shrink-0" />
                  <a href="#" className="hover:text-indigo-600 transition truncate">{CLUB.website}</a>
                </li>
              </ul>

              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-t border-slate-100 pt-4">Social Media</h3>
              <div className="flex gap-3">
                <a href={CLUB.socials.instagram} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200 transition">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href={CLUB.socials.linkedin} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href={CLUB.socials.twitter} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 transition">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Announcements Feed */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center">
                  <Bell className="w-4 h-4 mr-2 text-indigo-600" /> Notice Board
                </h3>
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {CLUB.announcements.length}
                </span>
              </div>
              
              <div className="space-y-4">
                {CLUB.announcements.map(notice => (
                  <div key={notice.id} className="border-l-2 border-indigo-500 pl-3 py-1">
                    <div className="flex items-center gap-2 mb-1">
                      {notice.isNew && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>}
                      <span className="text-xs text-slate-500 font-medium">{notice.date}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition cursor-pointer">
                      {notice.title}
                    </p>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition flex items-center justify-center">
                View All Notices <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

          </div>

        </div>
      </div>

  );
}