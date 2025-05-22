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
        ? "bg-white text-indigo-700 font-semibold shadow-lg"
        : "text-white hover:bg-white/20 hover:text-black"
    }`;

  return (
    <nav
      className="bg-gradient-to-r from-[#00b0f3]  via-[#75cfea] to-[#DEF0FC] shadow-lg sticky top-0 z-50 font-inter transition-all duration-300"
      style={{ backdropFilter: "blur(12px)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight text-white hover:scale-105 transition-transform duration-300"
        >
          HireHub
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center w-full ml-10">
          {/* Left Links */}
          <div className="flex gap-8 items-center">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          </div>

          {/* Right Links */}
          <div className="flex gap-6 items-center">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="bg-white text-indigo-700 px-5 py-2 rounded-xl font-semibold shadow-lg hover:scale-105"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-white text-indigo-700 px-5 py-2 rounded-xl font-semibold shadow-lg hover:scale-105"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                {user.role === "jobseeker" && (
                  <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
                )}
                {user.role === "employer" && (
                  <NavLink to="/post-job" className={navLinkClass}>Post Job</NavLink>
                )}
                {user.role === "admin" && (
                  <NavLink to="/admin-dashboard" className={navLinkClass}>Admin Panel</NavLink>
                )}
                <div className="relative">
                  <button
                    onClick={toggleProfile}
                    className="flex items-center gap-2 hover:bg-white/20 px-3 py-2 rounded-xl transition-all duration-300 text-indigo-800"
                  >
                    <User className="w-6 h-6" />
                    <span className="font-medium">{user.name}</span>
                    <ChevronDown size={16} className={`transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isProfileOpen && (
                    <ul className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 border border-gray-100">
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
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white hover:bg-white/20 p-2 rounded-full transition"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <ul className={`md:hidden px-6 pb-6 space-y-3 transition-all duration-500 ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <li><NavLink to="/" end className={navLinkClass} onClick={toggleMenu}>Home</NavLink></li>
        <li><NavLink to="/about" className={navLinkClass} onClick={toggleMenu}>About Us</NavLink></li>
        <li><NavLink to="/contact" className={navLinkClass} onClick={toggleMenu}>Contact</NavLink></li>

        {!user ? (
          <>
            <li>
              <NavLink
                to="/login"
                className="block bg-white text-indigo-700 px-5 py-2 rounded-xl font-semibold shadow-lg"
                onClick={toggleMenu}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className="block bg-white text-indigo-700 px-5 py-2 rounded-xl font-semibold shadow-lg"
                onClick={toggleMenu}
              >
                Register
              </NavLink>
            </li>
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
              <button
                onClick={handleLogout}
                className="block w-full text-left bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-xl font-semibold shadow-lg"
              >
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
