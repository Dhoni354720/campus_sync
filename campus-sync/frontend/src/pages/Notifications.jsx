import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { 
  Bell, Check, Trash2, Settings, Compass, User,
  Calendar, Users, ShieldAlert, MessageSquare, 
  ChevronRight, ToggleLeft, ToggleRight
} from 'lucide-react';

// --- Mock Data ---
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'event',
    title: 'Upcoming Event Reminder',
    message: 'Your registered event "Annual Tech Symposium 2026" starts tomorrow at 10:00 AM.',
    time: '2 hours ago',
    isRead: false,
    icon: Calendar,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100'
  },
  {
    id: 2,
    type: 'club',
    title: 'New Announcement from Tech Club',
    message: 'The core team applications are now open! Submit your resume by Friday.',
    time: '5 hours ago',
    isRead: false,
    icon: Users,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100'
  },
  {
    id: 3,
    type: 'system',
    title: 'Profile Update Successful',
    message: 'Your department and year have been successfully updated in the system.',
    time: '1 day ago',
    isRead: true,
    icon: ShieldAlert,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100'
  },
  {
    id: 4,
    type: 'event',
    title: 'Certificate Available',
    message: 'Your certificate for "React Native Bootcamp" is now ready to download.',
    time: '2 days ago',
    isRead: true,
    icon: Calendar,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100'
  },
  {
    id: 5,
    type: 'club',
    title: 'Club Meeting Rescheduled',
    message: 'The Debate Society meeting has been moved to Seminar Hall B.',
    time: '3 days ago',
    isRead: true,
    icon: MessageSquare,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100'
  }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState('all'); // 'all', 'event', 'club', 'system'

  // Preferences state
  const [prefs, setPrefs] = useState({
    push: true,
    email: true,
    sms: false,
    marketing: false
  });

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const toggleReadStatus = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const togglePref = (key) => {
    setPrefs({ ...prefs, [key]: !prefs[key] });
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
                <Link to="/dashboard" className="hover:text-indigo-600 transition">Dashboard</Link>
                <Link to="/events" className="hover:text-indigo-600 transition">Events</Link>
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

        {/* Main Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Notification Feed */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
                {unreadCount > 0 && (
                  <span className="bg-rose-100 text-rose-600 px-2.5 py-0.5 rounded-full text-xs font-bold">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <button onClick={handleMarkAllRead} className="text-indigo-600 hover:text-indigo-800 flex items-center transition">
                  <Check className="w-4 h-4 mr-1" /> Mark all as read
                </button>
                <span className="text-slate-300">|</span>
                <button onClick={handleClearAll} className="text-slate-500 hover:text-rose-600 flex items-center transition">
                  <Trash2 className="w-4 h-4 mr-1" /> Clear all
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-6">
              {[
                { id: 'all', label: 'All Alerts' },
                { id: 'event', label: 'Events' },
                { id: 'club', label: 'Clubs' },
                { id: 'system', label: 'System' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                    filter === tab.id 
                      ? 'bg-slate-900 text-white' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map(notification => {
                  const Icon = notification.icon;
                  return (
                    <div 
                      key={notification.id}
                      onClick={() => toggleReadStatus(notification.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex gap-4 ${
                        notification.isRead 
                          ? 'bg-white border-slate-200 shadow-sm opacity-75 hover:opacity-100' 
                          : 'bg-indigo-50/50 border-indigo-100 shadow-md hover:bg-indigo-50'
                      }`}
                    >
                      {/* Unread dot indicator */}
                      {!notification.isRead && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
                      )}

                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notification.bgColor} ${notification.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <h3 className={`text-base truncate pr-4 ${notification.isRead ? 'font-semibold text-slate-800' : 'font-bold text-slate-900'}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs font-medium text-slate-500 shrink-0">
                            {notification.time}
                          </span>
                        </div>
                        <p className={`text-sm line-clamp-2 ${notification.isRead ? 'text-slate-500' : 'text-slate-700 font-medium'}`}>
                          {notification.message}
                        </p>
                      </div>

                      <div className="hidden sm:flex items-center text-slate-300">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 border-dashed p-12 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Bell className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">All Caught Up!</h3>
                  <p className="text-slate-500">You don't have any notifications in this category right now.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Preferences Panel */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Notification Settings</h3>
                  <p className="text-xs text-slate-500">Manage your alerts</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Toggle 1 */}
                <div className="flex items-center justify-between cursor-pointer group" onClick={() => togglePref('push')}>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition">Push Notifications</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Receive alerts in browser</p>
                  </div>
                  {prefs.push ? <ToggleRight className="w-8 h-8 text-indigo-600" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}
                </div>

                {/* Toggle 2 */}
                <div className="flex items-center justify-between cursor-pointer group" onClick={() => togglePref('email')}>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition">Email Alerts</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Daily digest & event updates</p>
                  </div>
                  {prefs.email ? <ToggleRight className="w-8 h-8 text-indigo-600" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}
                </div>

                {/* Toggle 3 */}
                <div className="flex items-center justify-between cursor-pointer group" onClick={() => togglePref('sms')}>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition">SMS Updates</h4>
                    <p className="text-xs text-slate-500 mt-0.5">For urgent event changes</p>
                  </div>
                  {prefs.sms ? <ToggleRight className="w-8 h-8 text-indigo-600" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}
                </div>

                {/* Toggle 4 */}
                <div className="flex items-center justify-between cursor-pointer group" onClick={() => togglePref('marketing')}>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition">Marketing</h4>
                    <p className="text-xs text-slate-500 mt-0.5">New clubs & promotional events</p>
                  </div>
                  {prefs.marketing ? <ToggleRight className="w-8 h-8 text-indigo-600" /> : <ToggleLeft className="w-8 h-8 text-slate-300" />}
                </div>
              </div>

              <button className="w-full mt-8 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition shadow-sm">
                Save Preferences
              </button>
            </div>
          </div>

        </div>
      </div>
    
  );
}