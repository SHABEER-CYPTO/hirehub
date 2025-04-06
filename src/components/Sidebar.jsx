import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Briefcase, User, LogOut, LayoutDashboard } from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      style={{
        width: isCollapsed ? "80px" : "200px",
        background: "linear-gradient(180deg, #2a1d3f 0%, #3e2d5d 100%)",
        height: "100vh",
        color: "#ffffff",
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        padding: isCollapsed ? "24px 8px" : "24px 16px",
        position: "fixed",
        boxShadow: "2px 0 20px rgba(0, 0, 0, 0.2)",
        overflowX: "hidden",
      }}
    >
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        style={{
          background: "none",
          border: "none",
          color: "#e0d4ff",
          cursor: "pointer",
          fontSize: "24px",
          marginBottom: "32px",
          padding: "8px",
          borderRadius: "8px",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
      >
        <Menu />
      </button>

      {/* Sidebar Links */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <SidebarItem 
          to="/dashboard" 
          icon={<LayoutDashboard size={20} />} 
          text="Dashboard" 
          isCollapsed={isCollapsed} 
          active={location.pathname === "/dashboard"} 
        />
        <SidebarItem 
          to="/jobs" 
          icon={<Briefcase size={20} />} 
          text="Job Listings" 
          isCollapsed={isCollapsed} 
          active={location.pathname === "/jobs"} 
        />
        <SidebarItem 
          to="/applications" 
          icon={<User size={20} />} 
          text="Applications" 
          isCollapsed={isCollapsed} 
          active={location.pathname === "/applications"} 
        />
        <SidebarItem 
          to="/profile" 
          icon={<User size={20} />} 
          text="Profile" 
          isCollapsed={isCollapsed} 
          active={location.pathname === "/profile"} 
        />
        <SidebarItem 
          to="/logout" 
          icon={<LogOut size={20} />} 
          text="Logout" 
          isCollapsed={isCollapsed} 
        />
      </nav>
    </div>
  );
};

const SidebarItem = ({ to, icon, text, isCollapsed, active }) => (
  <Link
    to={to}
    title={isCollapsed ? text : undefined}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: isCollapsed ? "center" : "flex-start",
      textDecoration: "none",
      color: active ? "#fff" : "rgba(255, 255, 255, 0.85)",
      padding: isCollapsed ? "12px" : "12px 16px",
      borderRadius: "10px",
      marginBottom: "4px",
      transition: "all 0.3s ease",
      background: active 
        ? "linear-gradient(90deg, #7c3aed 0%, #5b21b6 100%)" 
        : "transparent",
      boxShadow: active ? "0 4px 14px rgba(124, 58, 237, 0.2)" : "none",
      whiteSpace: "nowrap",
    }}
    onMouseEnter={(e) => {
      if (!active) {
        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
        e.currentTarget.style.color = "#fff";
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)";
      }
    }}
  >
    <span 
      style={{ 
        marginRight: isCollapsed ? "0" : "12px", 
        transition: "margin 0.3s ease",
        display: "flex",
        alignItems: "center",
      }}
    >
      {icon}
    </span>
    {!isCollapsed && (
      <span 
        style={{ 
          fontSize: "15px",
          fontWeight: 500,
          letterSpacing: "0.2px",
        }}
      >
        {text}
      </span>
    )}
  </Link>
);

export default Sidebar;
