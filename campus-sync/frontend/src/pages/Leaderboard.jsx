import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { 
  Trophy, Medal, Star, Users, User, Compass, 
  ChevronUp, Award, Zap, Target, Hexagon, Calendar
} from 'lucide-react';

// --- Mock Data ---
const STUDENT_LEADERBOARD = [
  { id: 1, rank: 1, name: "Sarah Chen", dept: "Computer Science", points: 1250, events: 15, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" },
  { id: 2, rank: 2, name: "Alex Johnson", dept: "Information Tech", points: 1120, events: 14, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150" },
  { id: 3, rank: 3, name: "Priya Sharma", dept: "Electronics", points: 980, events: 11, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150" },
  { id: 4, rank: 4, name: "David Kim", dept: "Mechanical", points: 850, events: 9, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" },
  { id: 5, rank: 5, name: "Anita Desai", dept: "Computer Science", points: 820, events: 10, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" },
  { id: 6, rank: 6, name: "Rahul Verma", dept: "Business", points: 790, events: 8, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150" },
];

const CLUB_RANKINGS = [
  { id: 1, rank: 1, name: "Tech Innovators Society", score: 98, events: 14, logo: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=150" },
  { id: 2, rank: 2, name: "CodeCrafters", score: 92, events: 12, logo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=150" },
  { id: 3, rank: 3, name: "Spartans Athletics", score: 85, events: 8, logo: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=150" },
  { id: 4, rank: 4, name: "Symphony Music Club", score: 78, events: 6, logo: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=150" },
];

const MY_ACHIEVEMENTS = [
  { id: 1, title: "First Step", desc: "Attended your first college event.", icon: Star, color: "text-amber-500", bg: "bg-amber-100", unlocked: true },
  { id: 2, title: "Social Butterfly", desc: "Joined 3 different clubs.", icon: Users, color: "text-blue-500", bg: "bg-blue-100", unlocked: true },
  { id: 3, title: "Tech Geek", desc: "Attended 5 technical workshops.", icon: Zap, color: "text-indigo-500", bg: "bg-indigo-100", unlocked: false, progress: 60 },
  { id: 4, title: "Top 10%", desc: "Reach the top 10% on the leaderboard.", icon: Target, color: "text-rose-500", bg: "bg-rose-100", unlocked: false, progress: 85 },
  { id: 5, title: "Perfectionist", desc: "100% attendance in a semester.", icon: Hexagon, color: "text-emerald-500", bg: "bg-emerald-100", unlocked: false, progress: 30 },
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState('students'); // 'students', 'clubs', 'achievements'

  const renderStudentLeaderboard = () => {
    const top3 = STUDENT_LEADERBOARD.slice(0, 3);
    const rest = STUDENT_LEADERBOARD.slice(3);

    return (
      <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
        {/* Podium for Top 3 */}
        <div className="flex items-end justify-center gap-2 sm:gap-6 pt-12 pb-16 px-4">
          
          {/* 2nd Place */}
          <div className="flex flex-col items-center relative w-1/3 max-w-[140px]">
            <div className="relative mb-4 group">
              <img src={top3[1].avatar} alt="2nd Place" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-slate-300 shadow-lg group-hover:-translate-y-2 transition-transform duration-300" />
              <div className="absolute -bottom-3 -right-2 bg-slate-100 rounded-full p-1.5 shadow-sm border border-slate-200">
                <Medal className="w-6 h-6 text-slate-400" />
              </div>
            </div>
            <div className="text-center w-full bg-white rounded-t-2xl border-t-4 border-slate-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pt-6 pb-4 px-2 h-32 flex flex-col justify-end">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base truncate w-full">{top3[1].name}</h4>
              <p className="text-xs text-slate-500 mt-1">{top3[1].points} pts</p>
              <div className="text-3xl font-black text-slate-300 mt-auto opacity-50">2</div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center relative w-1/3 max-w-[160px] -mt-12">
            <div className="absolute -top-12 text-yellow-400 animate-bounce">
              <Trophy className="w-10 h-10 drop-shadow-md" />
            </div>
            <div className="relative mb-4 group z-10">
              <img src={top3[0].avatar} alt="1st Place" className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)] group-hover:-translate-y-2 transition-transform duration-300" />
            </div>
            <div className="text-center w-full bg-gradient-to-b from-yellow-50 to-white rounded-t-2xl border-t-4 border-yellow-400 shadow-[0_-4px_10px_-1px_rgba(250,204,21,0.2)] pt-6 pb-4 px-2 h-40 flex flex-col justify-end relative z-0">
              <h4 className="font-bold text-slate-900 text-sm sm:text-lg truncate w-full">{top3[0].name}</h4>
              <p className="text-xs font-bold text-yellow-600 mt-1">{top3[0].points} pts</p>
              <div className="text-4xl font-black text-yellow-200 mt-auto opacity-60">1</div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center relative w-1/3 max-w-[140px]">
            <div className="relative mb-4 group">
              <img src={top3[2].avatar} alt="3rd Place" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-amber-600 shadow-lg group-hover:-translate-y-2 transition-transform duration-300" />
              <div className="absolute -bottom-3 -right-2 bg-amber-50 rounded-full p-1.5 shadow-sm border border-amber-200">
                <Medal className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="text-center w-full bg-white rounded-t-2xl border-t-4 border-amber-600 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pt-6 pb-4 px-2 h-28 flex flex-col justify-end">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base truncate w-full">{top3[2].name}</h4>
              <p className="text-xs text-slate-500 mt-1">{top3[2].points} pts</p>
              <div className="text-3xl font-black text-amber-600 mt-auto opacity-30">3</div>
            </div>
          </div>
          
        </div>

        {/* List for 4th onwards */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {rest.map((student) => (
              <div key={student.id} className="flex items-center p-4 sm:p-5 hover:bg-slate-50 transition">
                <div className="w-8 font-bold text-slate-400 text-center mr-2 sm:mr-4">{student.rank}</div>
                <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 truncate">{student.name}</h4>
                  <p className="text-xs text-slate-500 truncate">{student.dept}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-indigo-600">{student.points} <span className="text-xs text-slate-500 font-medium">pts</span></div>
                  <p className="text-xs text-slate-500">{student.events} events</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderClubRankings = () => (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Top Performing Clubs</h2>
            <p className="text-sm text-slate-300 mt-1">Based on engagement, events hosted, and student feedback.</p>
          </div>
          <Award className="w-10 h-10 text-indigo-400 opacity-50" />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold text-center w-16">Rank</th>
                <th className="p-4 font-bold">Club</th>
                <th className="p-4 font-bold text-center">Events Hosted</th>
                <th className="p-4 font-bold text-right">Engagement Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {CLUB_RANKINGS.map(club => (
                <tr key={club.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 text-center">
                    {club.rank === 1 ? <Trophy className="w-6 h-6 text-yellow-500 mx-auto" /> : 
                     club.rank === 2 ? <Medal className="w-6 h-6 text-slate-400 mx-auto" /> : 
                     club.rank === 3 ? <Medal className="w-6 h-6 text-amber-600 mx-auto" /> : 
                     <span className="font-bold text-slate-400">{club.rank}</span>}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={club.logo} alt={club.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-bold text-slate-900">{club.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center font-semibold text-slate-600">{club.events}</td>
                  <td className="p-4 text-right">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-bold">
                      {club.score} <ChevronUp className="w-4 h-4 ml-1" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Semester Highlights */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-indigo-600" /> Semester Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-md relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
              <Trophy className="w-24 h-24" />
            </div>
            <p className="text-indigo-100 text-sm font-medium mb-1">Campus Rank</p>
            <h3 className="text-4xl font-black">#42</h3>
            <p className="text-xs mt-4">Top 5% of all students</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <p className="text-slate-500 text-sm font-medium mb-1">Events Attended</p>
            <h3 className="text-4xl font-black text-slate-900">14</h3>
            <p className="text-xs text-emerald-600 font-bold mt-4">+4 compared to last semester</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <p className="text-slate-500 text-sm font-medium mb-1">Favorite Category</p>
            <h3 className="text-2xl font-bold text-slate-900">Technical</h3>
            <p className="text-xs text-indigo-600 font-bold mt-4">7 events attended</p>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
          <Award className="w-5 h-5 mr-2 text-indigo-600" /> Badges & Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MY_ACHIEVEMENTS.map(badge => {
            const Icon = badge.icon;
            return (
              <div key={badge.id} className={`bg-white rounded-2xl p-6 border ${badge.unlocked ? 'border-indigo-100 shadow-sm' : 'border-slate-200 grayscale opacity-60'} flex flex-col h-full transition hover:grayscale-0 hover:opacity-100`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${badge.bg} ${badge.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{badge.title}</h3>
                <p className="text-sm text-slate-500 flex-1">{badge.desc}</p>
                
                {!badge.unlocked && badge.progress && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                      <span>Progress</span>
                      <span>{badge.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${badge.bg.replace('100', '500')}`} style={{ width: `${badge.progress}%` }}></div>
                    </div>
                  </div>
                )}
                {badge.unlocked && (
                  <div className="mt-4 text-xs font-bold text-emerald-600 flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Unlocked
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );

  return (
    
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
        
        {/* Navbar */}
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
                <span className="text-indigo-600 border-b-2 border-indigo-600 px-1 py-5">Leaderboard</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  <User className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Header & Tabs */}
        <div className="bg-slate-900 text-white pt-12 pb-6 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Campus Leaderboard</h1>
            <p className="text-slate-300 max-w-xl mx-auto mb-10">
              See who is leading the pack. Attend events, join clubs, and climb the ranks to earn exclusive rewards and recognition.
            </p>

            {/* Tab Navigation */}
            <div className="inline-flex bg-slate-800 p-1 rounded-xl shadow-inner mx-auto max-w-full overflow-x-auto hide-scrollbar">
              {[
                { id: 'students', label: 'Top Students', icon: User },
                { id: 'clubs', label: 'Club Rankings', icon: Users },
                { id: 'achievements', label: 'My Achievements', icon: Star }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 sm:px-6 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                      activeTab === tab.id 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" /> {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full py-8 px-4 sm:px-6 lg:px-8">
          {activeTab === 'students' && renderStudentLeaderboard()}
          {activeTab === 'clubs' && renderClubRankings()}
          {activeTab === 'achievements' && renderAchievements()}
        </div>

      </div>
    
  );
}