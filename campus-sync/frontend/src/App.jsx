import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Clubs from "./pages/Clubs";
import ClubDetail from "./pages/ClubDetail";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Analytics from "./pages/Analytics";
import Contact from "./pages/Contact";
import Leaderboard from "./pages/Leaderboard";
import News from "./pages/News";
import Notifications from "./pages/Notifications";
import OrganizerPanel from "./pages/OrganizerPanel";
import Registration from "./pages/Registration";
import SuperAdminPanel from "./pages/SuperAdminPanel";

// Layout
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Basic */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/contact" element={<Contact />} />

        {/* Clubs */}
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/clubs/:id" element={<ClubDetail />} />

        {/* Events */}
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />

        {/* Panels */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/organizer" element={<OrganizerPanel />} />
        <Route path="/admin" element={<SuperAdminPanel />} />

        {/* Features */}
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/news" element={<News />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/register" element={<Registration />} />

        {/* Fallback */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;