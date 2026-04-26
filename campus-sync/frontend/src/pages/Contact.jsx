import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { 
  Search, MessageCircle, Mail, Phone, MapPin, 
  ChevronDown, ChevronUp, Send, AlertTriangle, 
  FileQuestion, Compass, User, LifeBuoy, Book
} from 'lucide-react';

// --- Mock FAQ Data ---
const FAQS = [
  {
    id: 1,
    category: "Events",
    q: "How do I cancel my event registration?",
    a: "You can cancel your registration by going to 'My Dashboard' -> 'My Events'. Click on the event details and select 'Cancel Registration'. Please note that paid events must be canceled at least 48 hours in advance for a full refund."
  },
  {
    id: 2,
    category: "Clubs",
    q: "Can I join multiple clubs?",
    a: "Yes! You can join up to 3 active clubs per semester. Some premium or highly active clubs might require an interview or portfolio submission before approval."
  },
  {
    id: 3,
    category: "Account",
    q: "How do I update my department or year?",
    a: "Go to your 'Profile Settings' in the Dashboard. From there, you can update your academic details. Changes might take up to 24 hours to reflect across the platform."
  },
  {
    id: 4,
    category: "Certificates",
    q: "Why haven't I received my certificate yet?",
    a: "E-certificates are usually generated 24-48 hours after an event concludes. Make sure your attendance was marked by scanning the QR code at the venue. If it's been more than 3 days, please contact the specific club organizer."
  },
  {
    id: 5,
    category: "Technical",
    q: "The payment gateway failed but money was deducted. What should I do?",
    a: "Don't panic. Failed transactions are automatically refunded by our payment partner within 5-7 business days. If you still want to register, you can try again immediately. Use the contact form below if the issue persists."
  }
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
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
                <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
                <Link to="/events" className="hover:text-indigo-600 transition">Events</Link>
                <Link to="/clubs" className="hover:text-indigo-600 transition">Clubs</Link>
                <span className="text-indigo-600 border-b-2 border-indigo-600 px-1 py-5">Help Center</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  <User className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-600 opacity-20 blur-3xl mix-blend-screen"></div>
          </div>
          
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <LifeBuoy className="w-12 h-12 text-indigo-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">How can we help you?</h1>
            
            {/* Search Bar */}
            <div className="bg-white p-2 rounded-2xl flex items-center shadow-lg focus-within:ring-4 focus-within:ring-indigo-500/30 transition-all">
              <div className="flex-1 flex items-center pl-4">
                <Search className="text-slate-400 w-6 h-6 mr-3" />
                <input 
                  type="text" 
                  placeholder="Search for articles, questions, or topics..." 
                  className="w-full bg-transparent border-none outline-none text-slate-900 py-3 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <p className="mt-4 text-slate-400 text-sm">Common searches: certificates, cancellation, joining clubs</p>
          </div>
        </div>

        {/* Quick Topics */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 flex items-start gap-4 hover:-translate-y-1 transition-transform cursor-pointer group">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Book className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 text-lg">Knowledge Base</h3>
                <p className="text-sm text-slate-500">Read guides and tutorials on how to use the CampusSync platform.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 flex items-start gap-4 hover:-translate-y-1 transition-transform cursor-pointer group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <FileQuestion className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 text-lg">Event Policies</h3>
                <p className="text-sm text-slate-500">Learn about refunds, attendance rules, and college guidelines.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 flex items-start gap-4 hover:-translate-y-1 transition-transform cursor-pointer group">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 text-lg">Report an Issue</h3>
                <p className="text-sm text-slate-500">Found a bug or experiencing technical difficulties? Let us know.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col lg:flex-row gap-12 pb-20">
          
          {/* Left Column: Contact Form */}
          <div className="w-full lg:w-5/12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Support</h2>
            <p className="text-slate-500 mb-8">
              Can't find what you're looking for? Send us a message and our support team will get back to you within 24 hours.
            </p>

            <form className="space-y-5 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                  <input type="text" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none focus:bg-white transition" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">College ID</label>
                  <input type="text" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none focus:bg-white transition" placeholder="CS22B104" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                <input type="email" required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none focus:bg-white transition" placeholder="john.d@college.edu" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Issue Category</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none focus:bg-white transition cursor-pointer appearance-none">
                  <option>Payment / Refund Issue</option>
                  <option>Certificate Not Received</option>
                  <option>Account / Login Problem</option>
                  <option>Bug Report</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Message</label>
                <textarea rows="4" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none focus:bg-white transition resize-none" placeholder="Please describe your issue in detail..."></textarea>
              </div>

              <button type="submit" className="w-full bg-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition shadow-md flex items-center justify-center">
                <Send className="w-4 h-4 mr-2" /> Send Message
              </button>
            </form>

            {/* Direct Contact Links */}
            <div className="mt-8 space-y-4">
              <a href="mailto:support@campussync.edu" className="flex items-center p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 transition group">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mr-4 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Email Us</p>
                  <p className="text-sm text-slate-500">support@campussync.edu</p>
                </div>
              </a>
              
              <div className="flex items-center p-4 bg-white rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mr-4">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Call Support Helpdesk</p>
                  <p className="text-sm text-slate-500">+1 (555) 123-4567 (9 AM - 5 PM)</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-white rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mr-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Visit IT Office</p>
                  <p className="text-sm text-slate-500">Room 304, Admin Block B</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: FAQs */}
          <div className="w-full lg:w-7/12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            
            {filteredFaqs.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100">
                {filteredFaqs.map((faq, idx) => (
                  <div key={faq.id} className="group">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                      className={`w-full flex items-center justify-between p-6 text-left transition-colors ${openFaq === idx ? 'bg-indigo-50/50' : 'hover:bg-slate-50'}`}
                    >
                      <div className="pr-4">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 block">
                          {faq.category}
                        </span>
                        <span className="font-bold text-slate-900 md:text-lg">
                          {faq.q}
                        </span>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openFaq === idx ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                        {openFaq === idx ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </button>
                    
                    {openFaq === idx && (
                      <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed bg-indigo-50/50 text-sm md:text-base">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 border-dashed p-12 text-center">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-1">No FAQs found</h3>
                <p className="text-slate-500">We couldn't find any questions matching your search.</p>
              </div>
            )}

            {/* Live Chat Widget Placeholder */}
            <div className="mt-8 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Need immediate help?</h3>
                <p className="text-indigo-100 max-w-sm">Our live chat agents are currently online and ready to assist you with registration or payment issues.</p>
              </div>
              <button className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition shadow-sm w-full md:w-auto flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 mr-2" /> Start Live Chat
              </button>
            </div>

          </div>
        </div>
      </div>
    
  );
}