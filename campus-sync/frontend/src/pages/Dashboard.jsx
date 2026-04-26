import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar as CalendarIcon, Users, Award, 
  User, Settings, LogOut, Bell, Compass, QrCode, 
  MapPin, Clock, Download, ChevronRight, Edit3, Tag
} from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_URL;
// --- Mock User & Dashboard Data ---
const STUDENT = {
  name: "Alex Johnson",
  rollNo: "CS22B104",
  department: "Computer Science",
  year: "3rd Year",
  email: "alex.j@college.edu",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
  qrValue: "STD-CS22B104-VALID",
  stats: {
    eventsAttended: 12,
    clubsJoined: 3,
    certificates: 8
  }
};

const MY_EVENTS = [
  {
    id: 101,
    title: "Annual Tech Symposium 2026",
    date: "Apr 28, 2026",
    time: "10:00 AM",
    venue: "Main Auditorium",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400",
    status: "Upcoming",
    ticketId: "TKT-8892"
  },
  {
    id: 102,
    title: "React Native Bootcamp",
    date: "May 12, 2026",
    time: "02:00 PM",
    venue: "CS Lab 3",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400",
    status: "Upcoming",
    ticketId: "TKT-4412"
  }
];

const MY_CLUBS = [
  { id: 1, name: "Tech Innovators Society", role: "Member", members: 340, image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=150" },
  { id: 4, name: "CodeCrafters", role: "Core Team", members: 512, image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=150" }
];

const CERTIFICATES = [
  { id: 1, name: "Intro to Machine Learning Workshop", date: "Feb 14, 2026", issuer: "Tech Club" },
  { id: 2, name: "Inter-college Hackathon Participant", date: "Jan 10, 2026", issuer: "DevHub" },
  { id: 3, name: "Web3 & Blockchain Seminar", date: "Nov 22, 2025", issuer: "TechCorp" }
];

export default function Dashboard() {

    const [events, setEvents] = useState([]);

useEffect(() => {
  const fetchEvents = async () => {
    try {
      const res = await fetch("https://campus-sync-79dz.onrender.com/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchEvents();
}, []);
    const [user, setUser] = useState(null);
useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  setUser(storedUser);
}, []);
useEffect(() => {
  const handleStorageChange = () => {
    const updatedUser = JSON.parse(localStorage.getItem("data"));
    setUser(updatedUser);
  };

  window.addEventListener("storage", handleStorageChange);

  return () => window.removeEventListener("storage", handleStorageChange);
}, []);
  const [activeTab, setActiveTab] = useState('overview');

  // Sidebar Menu Items
  const MENU_ITEMS = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'events', label: 'My Events', icon: CalendarIcon },
    { id: 'clubs', label: 'My Clubs', icon: Users },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'profile', label: 'Profile Settings', icon: User },
  ];
  
  // --- Sub-components for different tabs ---

  const renderOverview = () => (
    <div className="animate-in fade-in duration-500 space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
      
      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Digital ID / QR Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden md:col-span-2 flex flex-col md:flex-row items-center gap-6">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          
          <div className="bg-white p-3 rounded-xl shrink-0 shadow-md">
            {/* Using an icon as a placeholder for an actual QR Code image */}
            <QrCode className="w-24 h-24 text-slate-900" />
            <p className="text-center text-[10px] font-bold text-slate-900 mt-1 uppercase tracking-wider">Scan at Entry</p>
          </div>
          
          <div className="flex-1 text-center md:text-left z-10">
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-3 border border-white/20">
              Digital Campus ID
            </div>
            <h3 className="text-2xl font-bold mb-1">{user?.name || user}</h3>
            <p className="text-indigo-100 font-medium mb-4">{STUDENT.rollNo} • {STUDENT.department}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button className="bg-white text-indigo-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-50 transition">
                Show Full Pass
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wider mb-4">Your Activity</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-slate-700"><CalendarIcon className="w-4 h-4 mr-2 text-indigo-500" /> Events Attended</div>
              <span className="font-bold text-slate-900">{STUDENT.stats.eventsAttended}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center text-slate-700"><Users className="w-4 h-4 mr-2 text-pink-500" /> Active Clubs</div>
              <span className="font-bold text-slate-900">{STUDENT.stats.clubsJoined}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center text-slate-700"><Award className="w-4 h-4 mr-2 text-emerald-500" /> Certificates</div>
              <span className="font-bold text-slate-900">{STUDENT.stats.certificates}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Upcoming Event */}
      <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Next Upcoming Event</h3>
      {events.length > 0 ? (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col sm:flex-row group hover:shadow-md transition">
          <div className="sm:w-64 h-48 sm:h-auto overflow-hidden shrink-0">
            <img src={MY_EVENTS[0].image} alt="Event" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          </div>
          <div className="p-6 flex flex-col flex-1 justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Happening Soon
                </span>
                <span className="text-sm font-semibold text-slate-500">Ticket: {events[0].ticketId}</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">{events[0].title}</h4>
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center text-slate-500 text-sm">
                  <Clock className="w-4 h-4 mr-2 text-indigo-400" /> {events[0].date} at {events[0].time}
                </div>
                <div className="flex items-center text-slate-500 text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-indigo-400" /> {events[0].venue}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to={`/events/${events[0]._id}`} className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition">
                Event Details
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 border-dashed">
          <p className="text-slate-500">You don't have any upcoming events.</p>
          <Link to="/events" className="text-indigo-600 font-semibold mt-2 inline-block">Browse Events</Link>
        </div>
      )}
    </div>
  );

  const registerEvent = async (eventId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://campus-sync-79dz.onrender.com/api/events/${eventId}/register`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    alert("Registered!");

  } catch (err) {
    alert(err.message);
  }
};

  const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

  const renderEvents = () => (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">My Registered Events</h2>
        <Link to="/events" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-4 py-2 rounded-lg transition">
          Browse More
        </Link>
      </div>

      <div className="flex gap-4 border-b border-slate-200 mb-6">
        <button className="pb-3 text-sm font-bold text-indigo-600 border-b-2 border-indigo-600">Upcoming (2)</button>
        <button className="pb-3 text-sm font-medium text-slate-500 hover:text-slate-800 transition">Past Events</button>
        <button className="pb-3 text-sm font-medium text-slate-500 hover:text-slate-800 transition">Bookmarked</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(event => (
          <div key={event._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col">
            <div className="h-40 relative">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                {event.ticketId}
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h4 className="font-bold text-slate-900 text-lg mb-3 leading-tight">{event.title}</h4>
              <div className="space-y-2 mb-6 flex-1">
                <div className="flex items-center text-slate-600 text-sm">
                  <CalendarIcon className="w-4 h-4 mr-2 text-slate-400" /> {formatDate(event.date)} • {event.time}
                </div>
                <div className="flex items-center text-slate-600 text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-slate-400" /> {event.venue}
                </div>
              </div>
              <div className="flex gap-2">
                <button
  onClick={() => registerEvent(event._id)}
  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-bold"
>
  Register
</button>
                <Link to={`/events/${event.id}`} className="flex-1 bg-white border border-slate-200 text-slate-700 py-2 text-center rounded-lg text-sm font-bold hover:bg-slate-50 transition">
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCertificates = () => (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">My Certificates</h2>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {CERTIFICATES.map(cert => (
            <div key={cert.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{cert.name}</h4>
                  <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                    <span className="flex items-center"><CalendarIcon className="w-4 h-4 mr-1" /> {cert.date}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> {cert.issuer}</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center justify-center bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200 transition sm:w-auto w-full">
                <Download className="w-4 h-4 mr-2" /> Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderClubs = () => (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">My Clubs</h2>
        <Link to="/clubs" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition">
          Find More Clubs
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MY_CLUBS.map(club => (
          <div key={club.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center gap-5 hover:shadow-md transition">
            <img src={club.image} alt={club.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
            <div className="flex-1">
              <h4 className="font-bold text-slate-900 text-lg">{club.name}</h4>
              <div className="flex items-center gap-3 text-sm mt-1">
                <span className="font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{club.role}</span>
                <span className="text-slate-500">{club.members} members</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        
        {/* Top Navbar */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center cursor-pointer">
                <Compass className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-slate-800 tracking-tight hidden sm:block">Campus<span className="text-indigo-600">Sync</span></span>
              </Link>
              
              <div className="flex items-center space-x-4 md:space-x-6">
                <button className="relative text-slate-500 hover:text-indigo-600 transition">
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-bold text-slate-900 leading-none mb-1">{user?.name || user}</p>
                    <p className="text-xs text-slate-500 font-medium leading-none">Student</p>
                  </div>
                  <img src={STUDENT.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100" />
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Dashboard Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sticky top-24">
              <nav className="space-y-1.5">
                {MENU_ITEMS.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isActive 
                          ? 'bg-indigo-600 text-white shadow-md' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-indigo-200' : 'text-slate-400'}`} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <button className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors">
                  <LogOut className="w-5 h-5 mr-3 text-rose-400" />
                  Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'events' && renderEvents()}
            {activeTab === 'clubs' && renderClubs()}
            {activeTab === 'certificates' && renderCertificates()}
            {activeTab === 'profile' && (
               <div className="animate-in fade-in duration-500">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Profile Settings</h2>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 text-center text-slate-500 py-20 border-dashed">
                    <Settings className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-lg font-medium text-slate-700">Profile Form Editor</p>
                    <p className="text-sm">Allows changing avatar, department, interests, and password.</p>
                  </div>
               </div>
            )}
          </main>

        </div>
      </div>
    
  );
}