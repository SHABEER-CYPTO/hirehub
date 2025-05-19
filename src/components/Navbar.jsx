import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { useAuth } from "./auth/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `relative px-4 py-2 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg"
        : "text-gray-900 hover:bg-gray-100 hover:text-black"
    }`;

  return (
    <nav className="backdrop-blur-xl bg-white/20 shadow-lg sticky top-0 z-50 font-inter transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight text-gray-900 hover:scale-105 transition-transform duration-300"
        >
          HireHub
        </Link>

        <button
          className="md:hidden text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-colors duration-300"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className="hidden md:flex gap-8 items-center">
          <li><NavLink to="/" end className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/about" className={navLinkClass}>About Us</NavLink></li>
          <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>

          {!user ? (
            <>
              <li><NavLink to="/login" className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-5 py-2 rounded-xl font-semibold shadow-lg hover:scale-105">Login</NavLink></li>
              <li><NavLink to="/register" className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-5 py-2 rounded-xl font-semibold shadow-lg hover:scale-105">Register</NavLink></li>
            </>
          ) : (
            <>
              {user.role === "jobseeker" && (
                <li><NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink></li>
              )}
              {user.role === "employer" && (
                <li><NavLink to="/post-job" className={navLinkClass}>Post Job</NavLink></li>
              )}
              {user.role === "admin" && (
                <li><NavLink to="/admin-dashboard" className={navLinkClass}>Admin Panel</NavLink></li>
              )}
              <li className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-xl transition-all duration-300"
                >
                  <User className="w-6 h-6 text-purple-600" />
                  <span className="text-gray-900 font-medium">{user.name}</span>
                  <ChevronDown size={16} className={`transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
                </button>
                {isProfileOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl py-2 border border-gray-100">
                    <li>
                      <NavLink to="/profile" className="block px-4 py-2 text-gray-900 hover:bg-gray-100" onClick={() => setIsProfileOpen(false)}>
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Nav */}
      <ul className={`md:hidden px-6 pb-6 space-y-3 transition-all duration-500 ease-in-out ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <li><NavLink to="/" end className={navLinkClass} onClick={toggleMenu}>Home</NavLink></li>
        <li><NavLink to="/about" className={navLinkClass} onClick={toggleMenu}>About Us</NavLink></li>
        <li><NavLink to="/contact" className={navLinkClass} onClick={toggleMenu}>Contact</NavLink></li>

        {!user ? (
          <>
            <li><NavLink to="/login" className="block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-xl font-semibold shadow-lg" onClick={toggleMenu}>Login</NavLink></li>
            <li><NavLink to="/register" className="block bg-gradient-to-r from-green-600 to-teal-600 text-white px-5 py-2 rounded-xl font-semibold shadow-lg" onClick={toggleMenu}>Register</NavLink></li>
          </>
        ) : (
          <>
            {user.role === "jobseeker" && (
              <li><NavLink to="/dashboard" className={navLinkClass} onClick={toggleMenu}>Dashboard</NavLink></li>
            )}
            {user.role === "employer" && (
              <li><NavLink to="/post-job" className={navLinkClass} onClick={toggleMenu}>Post Job</NavLink></li>
            )}
            {user.role === "admin" && (
              <li><NavLink to="/admin-dashboard" className={navLinkClass} onClick={toggleMenu}>Admin Panel</NavLink></li>
            )}
            <li><NavLink to="/profile" className={navLinkClass} onClick={toggleMenu}>Profile</NavLink></li>
            <li>
              <button onClick={handleLogout} className="block bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-xl font-semibold shadow-lg">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
