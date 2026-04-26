import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { 
  BarChart3, CalendarPlus, Users, Megaphone, Award, 
  Settings, LogOut, Bell, Compass, Plus, MoreVertical,
  Edit, Trash2, QrCode, Download, CheckCircle2, XCircle,
  Image as ImageIcon, MapPin, Clock, FileText, ChevronLeft
} from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_URL;
// --- Mock Organizer Data ---
const ORGANIZER = {
  name: "Tech Innovators Society",
  role: "Club Admin",
  avatar: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=150",
  stats: {
    totalEvents: 14,
    totalRegistrations: 1250,
    revenue: "₹45,000",
    avgAttendance: "85%"
  }
};

const MANAGE_EVENTS = [
  { id: 101, title: "Annual Tech Symposium 2026", date: "Apr 28, 2026", status: "Published", registrations: 156, capacity: 200 },
  { id: 102, title: "React Native Bootcamp", date: "May 12, 2026", status: "Draft", registrations: 0, capacity: 50 },
  { id: 103, title: "AI Workshop Series", date: "Mar 15, 2026", status: "Completed", registrations: 120, capacity: 120 }
];

const ATTENDEES = [
  { id: 1, name: "Alex Johnson", rollNo: "CS22B104", ticket: "Individual", status: "Checked In" },
  { id: 2, name: "Priya Sharma", rollNo: "EC22B056", ticket: "Team", status: "Pending" },
  { id: 3, name: "Rahul Verma", rollNo: "ME21B012", ticket: "Individual", status: "Pending" },
  { id: 4, name: "Anita Desai", rollNo: "CS22B089", ticket: "Individual", status: "Checked In" },
];

export default function OrganizerPanel() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [eventData, setEventData] = useState({
  title: "",
  category: "",
  date: "",
  time: "",
  venue: "",
  description: "",
  capacity: ""
});

  const [events, setEvents] = useState([]);
  useEffect(() => {
  const fetchEvents = async () => {
    try {
      const res = await fetch("{BASE_URL}/api/events");
      const data = await res.json();

      console.log("Fetched events:", data);
      setEvents(data);

    } catch (err) {
      console.error(err);
    }
  };

  fetchEvents();
}, []);
  const handleCreateEvent = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("{BASE_URL}/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // 🔥 IMPORTANT
      },
      body: JSON.stringify(eventData)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create event");
    }

    console.log("Event created:", data);

    setEvents(prev => [...prev, data]);
    // close form
    setIsCreatingEvent(false);

    // OPTIONAL: reload events later
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
  // Sidebar Menu
  const MENU_ITEMS = [
    { id: 'analytics', label: 'Dashboard & Analytics', icon: BarChart3 },
    { id: 'events', label: 'Manage Events', icon: CalendarPlus },
    { id: 'registrations', label: 'Registrations & Check-in', icon: Users },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'certificates', label: 'Certificate Generator', icon: Award },
  ];

  // --- Sub-components ---

  const renderAnalytics = () => (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Organizer Overview</h2>
        <div className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
          Last 30 Days
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Registrations", value: ORGANIZER.stats.totalRegistrations, trend: "+12%", color: "text-indigo-600", bg: "bg-indigo-100" },
          { label: "Revenue (Paid Events)", value: ORGANIZER.stats.revenue, trend: "+5%", color: "text-emerald-600", bg: "bg-emerald-100" },
          { label: "Active Events", value: "2", trend: "Stable", color: "text-amber-600", bg: "bg-amber-100" },
          { label: "Avg. Attendance", value: ORGANIZER.stats.avgAttendance, trend: "+2%", color: "text-blue-600", bg: "bg-blue-100" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-slate-500 text-sm font-semibold mb-1">{stat.label}</h3>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-extrabold text-slate-900">{stat.value}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${stat.bg} ${stat.color}`}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Placeholder for Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Registration Trends</h3>
          <div className="h-64 bg-slate-50 rounded-xl border border-slate-100 flex items-end justify-between p-4 gap-2">
            {/* Mock Bar Chart */}
            {[40, 70, 45, 90, 65, 100, 80].map((height, i) => (
              <div key={i} className="w-full bg-indigo-200 rounded-t-md relative group hover:bg-indigo-600 transition-colors" style={{ height: `${height}%` }}>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">{height * 2}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium px-2">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Action Center</h3>
          <div className="space-y-4">
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3">
              <Bell className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Pending Approvals</h4>
                <p className="text-sm text-slate-600 mt-1">2 events require administrative approval before publishing.</p>
              </div>
            </div>
            <button 
              onClick={() => { setActiveTab('events'); setIsCreatingEvent(true); }}
              className="w-full p-4 border-2 border-dashed border-indigo-200 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 hover:border-indigo-400 transition flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" /> Create New Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderManageEvents = () => {
    if (isCreatingEvent) {
      return (
        <div className="animate-in slide-in-from-right-8 duration-500">
          <button 
            onClick={() => setIsCreatingEvent(false)}
            className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-6 transition"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Event List
          </button>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Create New Event</h2>
          
          <form className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6" onSubmit={e => e.preventDefault()}>
            
            {/* Banner Upload */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Event Banner</label>
              <div className="w-full h-48 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-100 hover:border-indigo-400 transition cursor-pointer">
                <ImageIcon className="w-8 h-8 mb-2 text-slate-400" />
                <span className="font-semibold text-sm">Click to upload image</span>
                <span className="text-xs mt-1">16:9 ratio recommended</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Event Title</label>
                <input type="text"
  value={eventData.title}
  onChange={(e) => setEventData({...eventData, title: e.target.value})} 
  className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600" placeholder="e.g. Hackathon 2026" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                <select
  value={eventData.category}
  onChange={(e) =>
    setEventData({ ...eventData, category: e.target.value })
  }
  className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
>
  <option>Technical</option>
  <option>Cultural</option>
  <option>Sports</option>
</select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Date & Time</label>
                <div className="flex gap-2">
                  <input
  type="date"
  value={eventData.date}
  onChange={(e) =>
    setEventData({ ...eventData, date: e.target.value })
  }
  className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600"
/>
                  <input
  type="time"
  value={eventData.time}
  onChange={(e) =>
    setEventData({ ...eventData, time: e.target.value })
  }
  className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600"
/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Venue</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
  type="text"
  value={eventData.venue}
  onChange={(e) =>
    setEventData({ ...eventData, venue: e.target.value })
  }
  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600"
  placeholder="e.g. Main Auditorium"
/>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
              {/* Mock Rich Text Editor */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex gap-2">
                  <button className="p-1 hover:bg-slate-200 rounded font-bold">B</button>
                  <button className="p-1 hover:bg-slate-200 rounded italic font-serif">I</button>
                  <button className="p-1 hover:bg-slate-200 rounded underline">U</button>
                </div>
                <textarea
  rows="5"
  value={eventData.description}
  onChange={(e) =>
    setEventData({ ...eventData, description: e.target.value })
  }
  className="w-full p-4 outline-none resize-none"
  placeholder="Write event details here..."
></textarea>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Registration Type</label>
                <select className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600 bg-white">
                  <option>Free</option>
                  <option>Paid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Total Capacity</label>
                <input
  type="number"
  value={eventData.capacity}
  onChange={(e) =>
    setEventData({ ...eventData, capacity: e.target.value })
  }
  className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600"
  placeholder="e.g. 150"
/>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
              <button type="button" onClick={() => setIsCreatingEvent(false)} className="px-6 py-2 border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition">
                Cancel
              </button>
              <button type="button" className="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition">
                Save as Draft
              </button>
              <button
  type="button"
  onClick={handleCreateEvent}
  className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
>
  Publish Event
</button>
            </div>
          </form>
        </div>
      );
    }

    

    return (
      <div className="animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-slate-900">Manage Events</h2>
          <button 
            onClick={() => setIsCreatingEvent(true)}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-700 transition flex items-center shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" /> Create Event
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-bold">Event Name</th>
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 font-bold">Registrations</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {events.map(event => (
                  <tr key={event.id} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-bold text-slate-900">{event.title}</td>
                    <td className="p-4 text-slate-600">{event.date}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-200 rounded-full h-1.5">
                          <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${(event.registrations / event.capacity) * 100}%` }}></div>
                        </div>
                        <span className="text-slate-600 text-xs font-medium">{event.registrations}/{event.capacity}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        event.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 
                        event.status === 'Draft' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="p-4 flex justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 transition"><Edit className="w-4 h-4" /></button>
                      <button className="p-1.5 text-slate-400 hover:text-rose-600 transition"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  

  const renderRegistrations = () => (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Registrations & Check-in</h2>
          <p className="text-sm text-slate-500">Select an event to manage attendees.</p>
        </div>
        <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold outline-none focus:border-indigo-600 shadow-sm min-w-[200px]">
          <option>Annual Tech Symposium 2026</option>
          <option>React Native Bootcamp</option>
        </select>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Total Tickets</p>
            <p className="text-2xl font-extrabold text-slate-900">156</p>
          </div>
          <Users className="w-8 h-8 text-indigo-100" />
        </div>
        <div className="flex-1 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Checked In</p>
            <p className="text-2xl font-extrabold text-emerald-600">89</p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-100" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50">
          <input type="text" placeholder="Search by name or Roll No..." className="w-full sm:w-64 px-4 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-indigo-600" />
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg flex items-center justify-center hover:bg-indigo-700 transition">
              <QrCode className="w-4 h-4 mr-2" /> Scan QR
            </button>
            <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-lg flex items-center justify-center hover:bg-slate-50 transition">
              <Download className="w-4 h-4 mr-2" /> Export
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">Attendee Name</th>
                <th className="p-4 font-bold">Roll No</th>
                <th className="p-4 font-bold">Ticket Type</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {ATTENDEES.map(attendee => (
                <tr key={attendee.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-bold text-slate-900">{attendee.name}</td>
                  <td className="p-4 text-slate-600 font-mono text-xs">{attendee.rollNo}</td>
                  <td className="p-4">
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-xs font-semibold">
                      {attendee.ticket}
                    </span>
                  </td>
                  <td className="p-4">
                    {attendee.status === 'Checked In' ? (
                      <span className="flex items-center text-emerald-600 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Checked In
                      </span>
                    ) : (
                      <span className="flex items-center text-amber-500 text-xs font-bold">
                        <Clock className="w-4 h-4 mr-1" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="p-4 flex justify-end">
                    {attendee.status === 'Pending' ? (
                      <button className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-md text-xs font-bold hover:bg-emerald-100 transition">
                        Mark Present
                      </button>
                    ) : (
                      <button className="px-3 py-1 bg-slate-100 text-slate-400 border border-slate-200 rounded-md text-xs font-bold cursor-not-allowed">
                        Done
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
        
        {/* Organizer Navbar */}
        <nav className="bg-indigo-900 text-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center cursor-pointer">
                <Compass className="h-8 w-8 text-indigo-400" />
                <span className="ml-2 text-xl font-bold tracking-tight">Campus<span className="text-indigo-400">Sync</span></span>
                <span className="ml-4 px-2 py-0.5 bg-indigo-800 text-indigo-200 text-xs font-bold rounded-md border border-indigo-700 hidden sm:block">Organizer Panel</span>
              </Link>
              
              <div className="flex items-center space-x-4 md:space-x-6">
                <button className="relative text-indigo-200 hover:text-white transition">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full"></span>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-indigo-800">
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-bold leading-none mb-1">{ORGANIZER.name}</p>
                    <p className="text-xs text-indigo-300 font-medium leading-none">{ORGANIZER.role}</p>
                  </div>
                  <img src={ORGANIZER.avatar} alt="Profile" className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500" />
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
                      onClick={() => { setActiveTab(item.id); setIsCreatingEvent(false); }}
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
                <button className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  <Settings className="w-5 h-5 mr-3 text-slate-400" />
                  Club Settings
                </button>
                <button className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors mt-1">
                  <LogOut className="w-5 h-5 mr-3 text-rose-400" />
                  Switch to Student
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'events' && renderManageEvents()}
            {activeTab === 'registrations' && renderRegistrations()}
            
            {(activeTab === 'announcements' || activeTab === 'certificates') && (
               <div className="animate-in fade-in duration-500">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 capitalize">{activeTab}</h2>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-12 text-center text-slate-500 border-dashed">
                    {activeTab === 'announcements' ? <Megaphone className="w-12 h-12 text-slate-300 mx-auto mb-4" /> : <Award className="w-12 h-12 text-slate-300 mx-auto mb-4" />}
                    <p className="text-lg font-medium text-slate-700 mb-2">Module under construction</p>
                    <p className="text-sm">This feature will allow you to {activeTab === 'announcements' ? 'send emails/push notifications to attendees.' : 'auto-generate e-certificates for checked-in attendees.'}</p>
                  </div>
               </div>
            )}
          </main>

        </div>
      </div>
    
  );
}