import React, { useState } from 'react';
import { Link, useNavigate, BrowserRouter, useInRouterContext } from 'react-router-dom';
import { 
  Mail, Lock, User, Compass, ArrowRight, 
  Camera, BookOpen, Building, CheckCircle2, ChevronLeft,
  AlertCircle, Loader2
} from 'lucide-react';
const BASE_URL = import.meta.env.VITE_API_URL;
function AuthContent() {
  const [view, setView] = useState('login');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const redirectUser = (user) => {
    if (user?.role === "admin" || user?.role === "organizer") {
      navigate("/organizer");
    } else {
      navigate("/dashboard");
    }
  };

  // --- API Call: Login ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('{BASE_URL}/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
    
      const text = await response.text();

let data;
try {
  data = JSON.parse(text);
} catch (err) {
  console.error("Invalid JSON from backend:", text);
  throw new Error("Server error — not returning JSON");
}

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token & user data to local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      redirectUser(data.user);
      console.log("role", data.user.role);

      // Redirect to dashboard
    //   navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- API Call: Register ---
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('{BASE_URL}/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: role
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Save token & user data to local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user || data));
      console.log("registered respose", data);

      // Move to setup view (or dashboard)
      const userData = data.user || data;

if (userData.role === "organizer") {
  navigate("/organizer");
} else {
  navigate("/dashboard");
}

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- UI Components ---
  const ErrorMessage = () => {
    if (!error) return null;
    return (
      <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-lg text-sm flex items-center">
        <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
        {error}
      </div>
    );
  };

  const LoginView = () => (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
        <p className="text-slate-500">Enter your credentials to access your campus dashboard.</p>
      </div>

      <ErrorMessage />

      <form className="space-y-5" onSubmit={handleLogin}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all" 
              placeholder="student@college.edu" 
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <button type="button" onClick={() => setView('forgot')} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">Forgot password?</button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all" 
              placeholder="••••••••" 
            />
          </div>
        </div>

        <button 
          disabled={loading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 transition-colors mt-4"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        Don't have an account?{' '}
        <button onClick={() => { setView('register'); setError(''); }} className="font-semibold text-indigo-600 hover:text-indigo-800">Create one now</button>
      </p>
    </div>
  );

  const RegisterView = () => (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h2>
        <p className="text-slate-500">Join CampusSync to manage your college life.</p>
      </div>

      <ErrorMessage />

      <form className="space-y-4" onSubmit={handleRegister}>
        
        {/* Role Selection */}
        <div className="flex p-1 bg-slate-100 rounded-lg mb-4">
          {['student', 'organizer'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={(e) => {
  e.preventDefault();   // 🔥 THIS FIXES IT
  setRole(r);
}}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${role === r ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {r}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none" 
              placeholder="John Doe" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">College Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none" 
              placeholder="john.d@college.edu" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required 
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none" 
              placeholder="••••••••" 
            />
          </div>
        </div>

        <button 
          disabled={loading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 transition-colors mt-6"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Account <ArrowRight className="ml-2 w-4 h-4" /></>}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <button onClick={() => { setView('login'); setError(''); }} className="font-semibold text-indigo-600 hover:text-indigo-800">Sign in</button>
      </p>
    </div>
  );

  const ForgotPasswordView = () => (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={() => setView('login')} className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to login
      </button>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Reset Password</h2>
        <p className="text-slate-500">Enter your college email and we'll send you an OTP to reset your password.</p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400" />
            </div>
            <input type="email" className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none" placeholder="student@college.edu" />
          </div>
        </div>

        <button className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors">
          Send OTP
        </button>
      </form>
    </div>
  );

  const ProfileSetupView = () => (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="mb-8 text-center">
        <div className="w-20 h-20 bg-indigo-100 rounded-full mx-auto flex items-center justify-center mb-4 border-2 border-dashed border-indigo-300 cursor-pointer hover:bg-indigo-50 transition-colors relative group">
          <Camera className="w-8 h-8 text-indigo-400 group-hover:text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Registration Successful!</h2>
        <p className="text-slate-500 text-sm">Help us personalize your event recommendations.</p>
      </div>

      <form className="space-y-5" onSubmit={(e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role === "organizer") {
    navigate("/organizer");
  } else {
    navigate("/dashboard");
  }
}}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
            <div className="relative">
              <Building className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <select className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none text-sm appearance-none bg-white">
                <option>Computer Science</option>
                <option>Mechanical</option>
                <option>Electronics</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <select className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none text-sm appearance-none bg-white">
                <option>First Year</option>
                <option>Second Year</option>
                <option>Third Year</option>
                <option>Final Year</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Interests (Select 3+)</label>
          <div className="flex flex-wrap gap-2">
            {['Coding', 'Robotics', 'Music', 'Sports', 'Debate', 'Dance', 'Design'].map((interest, idx) => (
              <span key={interest} className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer border ${idx < 3 ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                {interest} {idx < 3 && <CheckCircle2 className="inline w-3 h-3 ml-1" />}
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors mt-8">
          Go to Dashboard
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Panel - Branding/Marketing (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-600 opacity-20 blur-3xl mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-pink-600 opacity-20 blur-3xl mix-blend-screen pointer-events-none"></div>

        <Link to="/" className="relative z-10 flex items-center cursor-pointer w-max">
          <Compass className="h-10 w-10 text-indigo-400" />
          <span className="ml-2 text-3xl font-bold text-white tracking-tight">Campus<span className="text-indigo-400">Sync</span></span>
        </Link>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-6">
            Your Campus Life,<br /> Organized.
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            Discover technical workshops, cultural fests, sports tournaments, and join amazing clubs all in one unified platform.
          </p>
          <div className="space-y-4">
            <div className="flex items-center text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
              <span>One-click event registration</span>
            </div>
            <div className="flex items-center text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
              <span>Digital QR code check-ins</span>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-sm text-slate-400 flex items-center">
            <Link to="/" className="hover:text-white transition flex items-center mr-4">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
            </Link>
            © 2026 CampusSync Events.
          </p>
        </div>
      </div>

      {/* Right Panel - Authentication Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative bg-slate-50 lg:bg-white">
        
        {/* Mobile Header (Shows only on small screens) */}
        <div className="absolute top-8 left-8 flex items-center lg:hidden">
          <Link to="/" className="flex items-center">
            <Compass className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-slate-900 tracking-tight">Campus<span className="text-indigo-600">Sync</span></span>
          </Link>
        </div>

        {view === 'login' && <LoginView />}
        {view === 'register' && <RegisterView />}
        {view === 'forgot' && <ForgotPasswordView />}
        {view === 'setup' && <ProfileSetupView />}
        
      </div>
    </div>
  );
}

// Default Export Component with Context Awareness
export default function Auth() {
  // Check if this component is already rendered inside a <Router>
  // This cleverly prevents the "You cannot render a <Router> inside another <Router>" error
  // while still allowing the standalone preview environment to work perfectly!
  const hasRouter = useInRouterContext();

  if (!hasRouter) {
    return (
      <BrowserRouter>
        <AuthContent />
      </BrowserRouter>
    );
  }

  return <AuthContent />;
}