import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#111", color: "#fff" }}>
      <Link to="/" style={{ marginRight: "10px", color: "white" }}>Home</Link>
      <Link to="/clubs" style={{ marginRight: "10px", color: "white" }}>Clubs</Link>
      <Link to="/events" style={{ marginRight: "10px", color: "white" }}>Events</Link>
      <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
    </nav>
  );
}

export default Navbar;