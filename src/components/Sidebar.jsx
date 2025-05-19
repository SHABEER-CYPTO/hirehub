import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Briefcase,
  User,
  LogOut,
  LayoutDashboard,
  Cpu,
  Bell,
  BookmarkCheck,
} from "lucide-react";
import { useAuth } from "./auth/AuthContext";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div
      style={{
        width: isCollapsed ? "80px" : "200px",
        background: "linear-gradient(180deg, #2a1d3f 0%, #3e2d5d 100%)",
        height: "100vh",
        color: "#ffffff",
        transition: "width 0.3s ease",
        padding: isCollapsed ? "24px 8px" : "24px 16px",
        position: "fixed",
        boxShadow: "2px 0 20px rgba(0, 0, 0, 0.2)",
        overflowX: "hidden",
        zIndex: 50,
      }}
    >
      {/* Toggle Button */}
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
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "none")
        }
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

        {/* Job Seeker Specific */}
        {user.role === "jobseeker" && (
          <>
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
              to="/saved-jobs"
              icon={<BookmarkCheck size={20} />}
              text="Saved Jobs"
              isCollapsed={isCollapsed}
              active={location.pathname === "/saved-jobs"}
            />
            <SidebarItem
              to="/resume-analyzer"
              icon={<Cpu size={20} />}
              text="Resume Analyzer"
              isCollapsed={isCollapsed}
              active={location.pathname === "/resume-analyzer"}
            />
            <SidebarItem
              to="/notifications"
              icon={<Bell size={20} />}
              text="Notifications"
              isCollapsed={isCollapsed}
              active={location.pathname === "/notifications"}
            />
          </>
        )}

        {/* Employer Specific */}
        {user.role === "employer" && (
        <>
           <SidebarItem
            to="/post-job"
            icon={<Briefcase size={20} />}
            text="Post a Job"
            isCollapsed={isCollapsed}
            active={location.pathname === "/post-job"}
           />
           <SidebarItem
            to="/my-jobs"
            icon={<LayoutDashboard size={20} />}
            text="My Job Listings"
            isCollapsed={isCollapsed}
            active={location.pathname === "/my-jobs"}
           />
           <SidebarItem
            to="/applications"
            icon={<User size={20} />}
            text="Applicants"
            isCollapsed={isCollapsed}
            active={location.pathname === "/applications"}
           />
           <SidebarItem
            to="/messages"
            icon={<Bell size={20} />}
            text="Messages"
            isCollapsed={isCollapsed}
            active={location.pathname === "/messages"}
          />
        </>
)}

        {/* Admin Specific */}
        {user.role === "admin" && (
          <>
            <SidebarItem
              to="/admin-dashboard"
              icon={<LayoutDashboard size={20} />}
              text="Admin Dashboard"
              isCollapsed={isCollapsed}
              active={location.pathname === "/admin-dashboard"}
            />
            <SidebarItem
              to="/users"
              icon={<User size={20} />}
              text="Manage Users"
              isCollapsed={isCollapsed}
              active={location.pathname === "/users"}
            />
          </>
        )}

        {/* Profile for All */}
        <SidebarItem
          to="/profile"
          icon={<User size={20} />}
          text="Profile"
          isCollapsed={isCollapsed}
          active={location.pathname === "/profile"}
        />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          title={isCollapsed ? "Logout" : undefined}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: isCollapsed ? "center" : "flex-start",
            color: "#ffb3b3",
            background: "transparent",
            border: "none",
            padding: isCollapsed ? "12px" : "12px 16px",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            marginTop: "auto",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <span
            style={{
              marginRight: isCollapsed ? "0" : "12px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <LogOut size={20} />
          </span>
          {!isCollapsed && (
            <span style={{ fontSize: "15px", fontWeight: 500 }}>Logout</span>
          )}
        </button>
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
        display: "flex",
        alignItems: "center",
      }}
    >
      {icon}
    </span>
    {!isCollapsed && (
      <span style={{ fontSize: "15px", fontWeight: 500 }}>{text}</span>
    )}
  </Link>
);

export default Sidebar;
