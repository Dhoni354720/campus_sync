import React, { useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { 
  Calendar, MapPin, Clock, Users, Share2, 
  Facebook, Twitter, Linkedin, Copy, MessageCircle, 
  ChevronDown, ChevronUp, Map, Award, User, Compass, ArrowLeft,
  CheckCircle2, AlertCircle, Heart
} from 'lucide-react';

const BASE_URL = import.meta.env.VITE_API_URL;
// --- Detailed Mock Data for a Single Event ---

export default function EventDetail() {
  const [openFaq, setOpenFaq] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { id } = useParams();

  const [event, setEvent] = useState(null);
useEffect(() => {
  const fetchEvent = async () => {
    try {
      const res = await fetch(`{BASE_URL}/api/events/${id}`);
      const data = await res.json();

      setEvent({
  ...data,
  date: new Date(data.date).toLocaleDateString(),
  time: new Date(data.date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  }),
  image: data.image || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  tags: data.tags || [],
  agenda: data.agenda || [],
  speakers: data.speakers || [],
  faqs: data.faqs || [],
  comments: data.comments || [],
  club: data.club || { name: "Unknown Club", members: 0, description: "" },
  totalSeats: data.capacity || 100,
  seatsLeft: data.capacity || 100
});

    } catch (err) {
      console.error(err);
    }
    
  };

  fetchEvent();
}, [id]);

if (!event) {
  return <div>Loading...</div>;
}
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

        {/* Hero Banner */}
        <div className="relative h-[40vh] md:h-[50vh] bg-slate-900 w-full overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover opacity-50 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          
          <div className="absolute top-6 left-4 md:left-8 z-10">
            <Link to="/events" className="flex items-center text-white/80 hover:text-white text-sm font-medium transition backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-full">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Events
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32 relative z-10 w-full pb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column (Main Content) */}
            <div className="w-full lg:w-2/3 space-y-8">
              
              {/* Event Title Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {event.category}
                  </span>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {event.mode}
                  </span>
                </div>
                
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                    {event.title}
                  </h1>
                  <button 
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-2 rounded-full border transition ${isBookmarked ? 'bg-rose-50 border-rose-200 text-rose-500' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-rose-500'}`}
                  >
                    <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="flex items-center text-slate-600">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-3 text-indigo-600">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{event.date}</p>
                      <p className="text-xs text-slate-500">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-3 text-indigo-600">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 truncate pr-4">{event.venue}</p>
                      <p className="text-xs text-slate-500">View on map</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">About the Event</h2>
                <div className="prose prose-slate max-w-none text-slate-600 whitespace-pre-line">
                  {event.description}
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  <h3 className="w-full text-sm font-semibold text-slate-900 mb-2">Tags</h3>
                  {(event.tags || []).map(tag => (
                    <span key={tag} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-sm font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Agenda / Schedule */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-indigo-600" /> Agenda
                </h2>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  {event.agenda.map((item, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      {/* Timeline Dot */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-indigo-100 text-indigo-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                      </div>
                      
                      {/* Content Card */}
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-slate-900 text-base">{item.title}</h4>
                        </div>
                        <p className="text-sm text-indigo-600 font-semibold mb-2">{item.time}</p>
                        <p className="text-sm text-slate-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speakers Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-indigo-600" /> Speakers & Guests
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {event.speakers.map((speaker, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center p-4 rounded-xl border border-slate-100 hover:shadow-md transition">
                      <img src={speaker.image} alt={speaker.name} className="w-20 h-20 rounded-full object-cover mb-3 shadow-sm border-2 border-white ring-2 ring-indigo-50" />
                      <h4 className="font-bold text-slate-900">{speaker.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{speaker.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs Accordion */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-indigo-600" /> Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {event.faqs.map((faq, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button 
                        onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                        className="w-full flex items-center justify-between p-4 text-left bg-slate-50 hover:bg-slate-100 transition"
                      >
                        <span className="font-semibold text-slate-800 text-sm">{faq.q}</span>
                        {openFaq === idx ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                      </button>
                      {openFaq === idx && (
                        <div className="p-4 bg-white text-sm text-slate-600 border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments / Q&A */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-indigo-600" /> Discussion
                </h2>
                
                <div className="flex gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex-1 relative">
                    <textarea 
                      placeholder="Ask a question or share your thoughts..." 
                      className="w-full border border-slate-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-indigo-600 resize-none min-h-[80px]"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    ></textarea>
                    <div className="absolute bottom-3 right-3">
                      <button className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                        Post
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {event.comments.map(comment => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shrink-0 text-xs font-bold">
                        {comment.user.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{comment.user}</h4>
                          <span className="text-xs text-slate-400">{comment.time}</span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (Sidebar) */}
            <div className="w-full lg:w-1/3 space-y-6">
              
              {/* Registration Card (Sticky) */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Registration</h3>
                <p className="text-3xl font-extrabold text-indigo-600 mb-4">{event.price}</p>
                
                <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-500">Total Capacity</span>
                    <span className="font-semibold text-slate-900">{event.totalSeats}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-slate-500">Available Seats</span>
                    <span className="font-bold text-rose-500">{event.seatsLeft}</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${((event.totalSeats - event.seatsLeft) / event.totalSeats) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <Link to="/register" className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors mb-4">
                  Register Now
                </Link>
                <p className="text-xs text-center text-slate-500 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-500" /> Easy 1-click registration
                </p>
              </div>

              {/* Organizer Info */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Organized By</h3>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xl mr-4 shrink-0">
                    TC
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{event.club.name}</h4>
                    <p className="text-xs text-slate-500">{event.club.members} Members</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">{event.club.description}</p>
                <button className="w-full py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
                  View Club Profile
                </button>
              </div>

              {/* Location Map Placeholder */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Location</h3>
                <div className="w-full h-48 bg-slate-100 rounded-xl mb-4 relative overflow-hidden border border-slate-200 flex items-center justify-center">
                  <Map className="w-12 h-12 text-slate-300" />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  {/* Pin overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center shadow-lg -translate-y-4 animate-bounce">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <p className="text-sm font-semibold text-slate-900">{event.venue}</p>
                <p className="text-xs text-slate-500 mb-4">Tech University Main Campus</p>
                <button className="w-full py-2 text-indigo-600 bg-indigo-50 rounded-lg text-sm font-medium hover:bg-indigo-100 transition">
                  Get Directions
                </button>
              </div>

              {/* Share Options */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Share with friends</h3>
                <div className="flex gap-3">
                  <button className="flex-1 py-2 flex justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition">
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button className="flex-1 py-2 flex justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="flex-1 py-2 flex justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="flex-1 py-2 flex justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 transition" title="Copy Link">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    
  );
}