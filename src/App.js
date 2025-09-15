import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="bg-blue-600 p-4 text-white shadow-md flex gap-4">
          <Link to="/" className="font-bold">My Blog CMS</Link>
          <Link to="/">Home</Link>
          <Link to="/create">Create Post</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        {/* Routes */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
