import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gradient-to-r  from-purple-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50 font-inter">
      {/* Brand Name */}
      <div className="text-2xl font-bold tracking-wide">
        <Link to="/" className="hover:opacity-80 transition-opacity duration-300">
          HireHub
        </Link>
      </div>

      <ul className="flex gap-6 list-none m-0 p-0">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "px-5 py-2 rounded-[10px] font-bold bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] shadow-md transition-all"
                : "text-white/85 hover:text-white hover:bg-white/10 px-5 py-2 rounded-[10px] font-semibold transition-all"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "px-5 py-2 rounded-[10px] font-bold bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] shadow-md transition-all"
                : "text-white/85 hover:text-white hover:bg-white/10 px-5 py-2 rounded-[10px] font-semibold transition-all"
            }
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "px-5 py-2 rounded-[10px] font-bold bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] shadow-md transition-all"
                : "text-white/85 hover:text-white hover:bg-white/10 px-5 py-2 rounded-[10px] font-semibold transition-all"
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? "px-5 py-2 rounded-[10px] font-bold bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] shadow-md transition-all"
                : "text-white/85 hover:text-white hover:bg-white/10 px-5 py-2 rounded-[10px] font-semibold transition-all"
            }
          >
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
