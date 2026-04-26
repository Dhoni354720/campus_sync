import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { 
  BarChart3, TrendingUp, Users, Calendar, 
  Download, Filter, ChevronDown, Activity, 
  PieChart, ArrowUpRight, ArrowDownRight, Compass,
  FileText
} from 'lucide-react';

// --- Mock Analytics Data ---
const METRICS = [
  { label: "Total Attendance", value: "4,250", change: "+15%", isPositive: true, icon: Users, color: "indigo" },
  { label: "Avg. Turnout Rate", value: "82%", change: "+5%", isPositive: true, icon: Activity, color: "emerald" },
  { label: "Events Hosted", value: "24", change: "-2", isPositive: false, icon: Calendar, color: "amber" },
  { label: "Student Engagement", value: "68%", change: "+12%", isPositive: true, icon: TrendingUp, color: "pink" }
];

const MONTHLY_DATA = [
  { month: "Jan", attendance: 300, target: 400 },
  { month: "Feb", attendance: 450, target: 400 },
  { month: "Mar", attendance: 600, target: 500 },
  { month: "Apr", attendance: 850, target: 600 },
  { month: "May", attendance: 1200, target: 800 },
  { month: "Jun", attendance: 850, target: 700 }
];

const DEPARTMENT_DATA = [
  { dept: "Computer Science", percentage: 45, color: "bg-indigo-500" },
  { dept: "Mechanical", percentage: 20, color: "bg-pink-500" },
  { dept: "Electronics", percentage: 25, color: "bg-emerald-500" },
  { dept: "Business", percentage: 10, color: "bg-amber-500" }
];

const RECENT_REPORTS = [
  { name: "Spring Fest 2026 Summary", date: "May 15, 2026", size: "2.4 MB" },
  { name: "Q1 Club Activity Report", date: "April 2, 2026", size: "1.8 MB" },
  { name: "Tech Symposium Demographics", date: "May 5, 2026", size: "3.1 MB" }
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('6months');

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
                <Link to="/organizer" className="hover:text-indigo-600 transition">Organizer Panel</Link>
                <Link to="/admin" className="hover:text-indigo-600 transition">Super Admin</Link>
              </div>
              <div className="flex items-center space-x-4">
                 <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                  Reporting Mode
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Analytics & Reports</h1>
              <p className="text-slate-500 mt-1">Deep dive into your event metrics and audience demographics.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <select 
                  className="appearance-none bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg pl-4 pr-10 py-2.5 outline-none focus:border-indigo-600 shadow-sm cursor-pointer"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="30days">Last 30 Days</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="year">This Year</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <button className="bg-slate-900 text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-800 transition flex items-center">
                <Download className="w-4 h-4 mr-2" /> Export PDF
              </button>
            </div>
          </div>

          {/* 1. Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {METRICS.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${metric.color}-50 text-${metric.color}-600`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-md ${metric.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {metric.isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                      {metric.change}
                    </span>
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{metric.value}</h3>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{metric.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            
            {/* 2. Main Bar Chart (Attendance Trends) */}
            <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Attendance Trends</h3>
                  <p className="text-sm text-slate-500">Actual turnout vs Expected target</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold">
                  <div className="flex items-center"><span className="w-3 h-3 rounded-sm bg-indigo-600 mr-2"></span>Actual</div>
                  <div className="flex items-center"><span className="w-3 h-3 rounded-sm bg-slate-200 mr-2"></span>Target</div>
                </div>
              </div>

              {/* CSS Bar Chart Implementation */}
              <div className="h-72 w-full flex items-end justify-between gap-2 sm:gap-6 relative pt-4">
                {/* Y-Axis lines */}
                <div className="absolute top-0 left-0 w-full h-px bg-slate-100"></div>
                <div className="absolute top-1/4 left-0 w-full h-px bg-slate-100"></div>
                <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100"></div>
                <div className="absolute top-3/4 left-0 w-full h-px bg-slate-100"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-slate-200"></div>

                {MONTHLY_DATA.map((data, idx) => {
                  const maxVal = 1500; // Assumed max for scaling
                  const actualHeight = (data.attendance / maxVal) * 100;
                  const targetHeight = (data.target / maxVal) * 100;
                  
                  return (
                    <div key={idx} className="flex-1 flex justify-center items-end h-full relative group">
                      
                      {/* Tooltip */}
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20 pointer-events-none shadow-lg">
                        <span className="font-bold">{data.attendance}</span> attendees
                      </div>

                      {/* Target Bar (Background) */}
                      <div className="absolute bottom-0 w-3/4 sm:w-1/2 bg-slate-100 rounded-t-md z-0" style={{ height: `${targetHeight}%` }}></div>
                      
                      {/* Actual Bar (Foreground) */}
                      <div className="absolute bottom-0 w-3/4 sm:w-1/2 bg-indigo-600 rounded-t-md z-10 transition-all duration-500 hover:bg-indigo-500 cursor-pointer" style={{ height: `${actualHeight}%` }}></div>
                    </div>
                  );
                })}
              </div>
              {/* X-Axis Labels */}
              <div className="flex justify-between mt-4 text-sm font-semibold text-slate-500">
                {MONTHLY_DATA.map(d => <span key={d.month} className="flex-1 text-center">{d.month}</span>)}
              </div>
            </div>

            {/* 3. Department Demographics (Donut/Progress representation) */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Demographics</h3>
                <p className="text-sm text-slate-500 mb-8">Participation by Department</p>
              </div>

              {/* Stacked Progress Bar (Alternative to complex Donut chart) */}
              <div className="w-full h-8 flex rounded-full overflow-hidden mb-8 shadow-inner">
                {DEPARTMENT_DATA.map((dept, idx) => (
                  <div 
                    key={idx} 
                    className={`h-full ${dept.color} hover:opacity-80 transition cursor-pointer`} 
                    style={{ width: `${dept.percentage}%` }}
                    title={`${dept.dept}: ${dept.percentage}%`}
                  ></div>
                ))}
              </div>

              {/* Legend / Breakdown */}
              <div className="space-y-4 flex-1">
                {DEPARTMENT_DATA.map((dept, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-3 ${dept.color}`}></span>
                      <span className="text-sm font-semibold text-slate-700">{dept.dept}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{dept.percentage}%</span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-2.5 bg-slate-50 text-indigo-600 text-sm font-bold rounded-xl hover:bg-slate-100 transition">
                View Full Breakdown
              </button>
            </div>

          </div>

          {/* 4. Generated Reports Archive */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Recent Generated Reports</h3>
              <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">View All</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {RECENT_REPORTS.map((report, idx) => (
                <div key={idx} className="flex items-center p-4 border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition group cursor-pointer">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-indigo-600 group-hover:text-white transition">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{report.name}</h4>
                    <div className="flex items-center text-xs text-slate-500 mt-1">
                      <span>{report.date}</span>
                      <span className="mx-2">•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-slate-300 group-hover:text-indigo-600" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
  );
}