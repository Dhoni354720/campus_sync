import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { 
  ShieldAlert, Users, LayoutDashboard, CheckSquare, 
  Settings, LogOut, Bell, Compass, CheckCircle2, 
  XCircle, TrendingUp, Building, Calendar, AlertTriangle,
  Search, Filter, MoreVertical, Shield
} from 'lucide-react';

// --- Mock Super Admin Data ---
const ADMIN = {
  name: "Dr. Robert Smith",
  role: "System Administrator",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
};

const SYSTEM_STATS = {
  totalUsers: 8542,
  activeClubs: 45,
  totalEvents: 312,
  pendingApprovals: 8
};

const PENDING_APPROVALS = [
  { id: 1, type: "Event", name: "Global Web3 Hackathon", submitter: "Tech Innovators Society", date: "May 10, 2026", status: "Pending" },
  { id: 2, type: "Club", name: "Cybersecurity Taskforce", submitter: "Prof. Alan Turing", date: "N/A", status: "Pending" },
  { id: 3, type: "Event", name: "Inter-college Debate", submitter: "The Debate Society", date: "May 18, 2026", status: "Pending" }
];

const USER_DIRECTORY = [
  { id: 1, name: "Alex Johnson", email: "alex.j@college.edu", role: "Student", status: "Active" },
  { id: 2, name: "Sarah Chen", email: "schen@college.edu", role: "Organizer", status: "Active" },
  { id: 3, name: "Dr. Emily White", email: "ewhite@college.edu", role: "Faculty", status: "Active" },
  { id: 4, name: "Michael Chang", email: "mchang@college.edu", role: "Student", status: "Suspended" },
];

export default function SuperAdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Sidebar Menu Items
  const MENU_ITEMS = [
    { id: 'dashboard', label: 'System Overview', icon: LayoutDashboard },
    { id: 'approvals', label: 'Pending Approvals', icon: CheckSquare, badge: SYSTEM_STATS.pendingApprovals },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'roles', label: 'Roles & Permissions', icon: ShieldAlert },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  // --- Sub-components ---

  const renderDashboard = () => (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">System Overview</h2>
        <button className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
          Generate Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wider">Total Users</p>
            <p className="text-3xl font-extrabold text-slate-900">{SYSTEM_STATS.totalUsers.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center"><Users className="w-6 h-6" /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wider">Active Clubs</p>
            <p className="text-3xl font-extrabold text-slate-900">{SYSTEM_STATS.activeClubs}</p>
          </div>
          <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center"><Building className="w-6 h-6" /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wider">Total Events</p>
            <p className="text-3xl font-extrabold text-slate-900">{SYSTEM_STATS.totalEvents}</p>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center"><Calendar className="w-6 h-6" /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-sm flex items-center justify-between ring-1 ring-rose-100">
          <div>
            <p className="text-rose-500 text-sm font-semibold mb-1 uppercase tracking-wider">Approvals Needed</p>
            <p className="text-3xl font-extrabold text-rose-600">{SYSTEM_STATS.pendingApprovals}</p>
          </div>
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center"><AlertTriangle className="w-6 h-6" /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Chart Placeholder */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Platform Activity (Semester)</h3>
            <select className="bg-slate-50 border border-slate-200 text-xs rounded-md px-2 py-1 outline-none">
              <option>Spring 2026</option>
              <option>Fall 2025</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 border-b border-slate-100 pb-2 relative">
            {/* Simple CSS graph representation */}
            <div className="absolute top-0 left-0 w-full h-px bg-slate-100"></div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100"></div>
            {[30, 45, 60, 80, 55, 90, 70, 85].map((val, idx) => (
              <div key={idx} className="w-full flex justify-center group relative">
                <div className="w-3/4 bg-slate-800 rounded-t-sm" style={{ height: `${val}%` }}></div>
                <div className="absolute -top-8 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                  {val * 10} Users
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs font-semibold text-slate-400 px-2">
            <span>Week 1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span><span>W7</span><span>W8</span>
          </div>
        </div>

        {/* System Logs */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent System Logs</h3>
          <div className="space-y-4">
            {[
              { log: "New Club 'Robotics Core' approved.", time: "10 mins ago", type: "success" },
              { log: "Payment gateway key updated.", time: "2 hours ago", type: "warning" },
              { log: "Mass email sent to 'All Students'.", time: "5 hours ago", type: "info" },
              { log: "Failed login attempt (Admin).", time: "1 day ago", type: "danger" },
            ].map((log, i) => (
              <div key={i} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  log.type === 'success' ? 'bg-emerald-500' : 
                  log.type === 'warning' ? 'bg-amber-500' : 
                  log.type === 'danger' ? 'bg-rose-500' : 'bg-blue-500'
                }`}></div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{log.log}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderApprovals = () => (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Pending Approvals</h2>
        <p className="text-slate-500 text-sm">Review newly submitted events and clubs before they are visible to students.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">Request Type</th>
                <th className="p-4 font-bold">Name / Title</th>
                <th className="p-4 font-bold">Submitted By</th>
                <th className="p-4 font-bold">Proposed Date</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {PENDING_APPROVALS.map(req => (
                <tr key={req.id} className="hover:bg-slate-50 transition">
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                      req.type === 'Event' ? 'bg-indigo-100 text-indigo-700' : 'bg-pink-100 text-pink-700'
                    }`}>
                      {req.type}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-900">{req.name}</td>
                  <td className="p-4 text-slate-600">{req.submitter}</td>
                  <td className="p-4 text-slate-600">{req.date}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <button className="px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold flex items-center transition">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
                    </button>
                    <button className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 border border-rose-200 rounded-lg text-xs font-bold flex items-center transition">
                      <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">User Directory</h2>
          <p className="text-slate-500 text-sm">Manage students, faculty, and organizers.</p>
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-800 transition">
          Add User Manually
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 bg-slate-50">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search users by name, email, or role..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-indigo-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-indigo-600">
              <option>All Roles</option>
              <option>Student</option>
              <option>Organizer</option>
              <option>Faculty</option>
              <option>Admin</option>
            </select>
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg flex items-center hover:bg-slate-50 transition">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">User Name</th>
                <th className="p-4 font-bold">Email</th>
                <th className="p-4 font-bold">System Role</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {USER_DIRECTORY.map(user => (
                <tr key={user.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-bold text-slate-900">{user.name}</td>
                  <td className="p-4 text-slate-600">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                      user.role === 'Student' ? 'bg-blue-50 text-blue-700' :
                      user.role === 'Organizer' ? 'bg-indigo-50 text-indigo-700' :
                      'bg-purple-50 text-purple-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`flex items-center text-xs font-bold ${
                      user.status === 'Active' ? 'text-emerald-600' : 'text-rose-500'
                    }`}>
                      {user.status === 'Active' ? <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> : <XCircle className="w-3.5 h-3.5 mr-1" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end">
                    <button className="p-1.5 text-slate-400 hover:text-slate-900 transition rounded-md hover:bg-slate-200">
                      <MoreVertical className="w-4 h-4" />
                    </button>
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
    
      <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col">
        
        {/* Super Admin Navbar (Darker, distinct theme) */}
        <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center cursor-pointer">
                <Shield className="h-8 w-8 text-rose-500" />
                <span className="ml-2 text-xl font-bold tracking-tight">CampusSync</span>
                <span className="ml-3 px-2 py-0.5 bg-rose-500 text-white text-[10px] font-extrabold uppercase tracking-wider rounded border border-rose-600 hidden sm:block">Super Admin</span>
              </Link>
              
              <div className="flex items-center space-x-4 md:space-x-6">
                <button className="relative text-slate-300 hover:text-white transition">
                  <Bell className="w-5 h-5" />
                  {SYSTEM_STATS.pendingApprovals > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {SYSTEM_STATS.pendingApprovals}
                    </span>
                  )}
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-bold leading-none mb-1">{ADMIN.name}</p>
                    <p className="text-xs text-slate-400 font-medium leading-none">System Admin</p>
                  </div>
                  <img src={ADMIN.avatar} alt="Profile" className="w-9 h-9 rounded-full object-cover border-2 border-slate-600" />
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Layout */}
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-8">
          
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
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isActive 
                          ? 'bg-slate-900 text-white shadow-md' 
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-slate-300' : 'text-slate-400'}`} />
                        {item.label}
                      </div>
                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${isActive ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-600'}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <button className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors">
                  <LogOut className="w-5 h-5 mr-3 text-rose-400" />
                  Log Out
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'approvals' && renderApprovals()}
            {activeTab === 'users' && renderUsers()}
            
            {(activeTab === 'roles' || activeTab === 'settings') && (
               <div className="animate-in fade-in duration-500">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 capitalize">{itemLabel(activeTab)}</h2>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-12 text-center text-slate-500 border-dashed">
                    <Settings className="w-12 h-12 text-slate-300 mx-auto mb-4 animate-spin-slow" />
                    <p className="text-lg font-medium text-slate-700 mb-2">Configuration Panel</p>
                    <p className="text-sm max-w-md mx-auto">
                      Here admins can configure SMTP settings, connect Stripe/Razorpay accounts, manage categories/tags, and edit global university branding.
                    </p>
                  </div>
               </div>
            )}
          </main>

        </div>
      </div>
    
  );

  // Helper for placeholder title
  function itemLabel(id) {
    return MENU_ITEMS.find(i => i.id === id)?.label || id;
  }
}