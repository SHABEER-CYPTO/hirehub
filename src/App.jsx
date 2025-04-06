import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import ApplyJob from "./pages/ApplyJob";
import PostJob from "./pages/PostJob";
function Layout() {
  const location = useLocation();

  // Define routes where Sidebar should be hidden
  const hideSidebarRoutes = ["/", "/login", "/register"];

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-layout">
        {!hideSidebarRoutes.includes(location.pathname) && <Sidebar />}
        <div className={`content ${hideSidebarRoutes.includes(location.pathname) ? "full-width" : ""}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/apply" element={<ApplyJob />} />
            <Route path="/post-job" element={<PostJob />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
