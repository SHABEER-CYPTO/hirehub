import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./components/auth/AuthContext";

// Layouts
import NavbarLayout from "./layouts/NavbarLayout";
import SidebarLayout from "./layouts/SidebarLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./components/About";
import Contact from "./components/Contact";
import Unauthorized from "./pages/Unauthorized";

// Dashboards
import AdminDashboard from "./pages/AdminDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";

// Functional Pages
import Jobs from "./pages/Jobs";
import ApplyJob from "./pages/ApplyJob";
import PostJob from "./pages/PostJob";
import MyJobs from "./pages/MyJobs";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import Messages from "./pages/Messages";
import SavedJobs from "./pages/SavedJobs";
import Candidates from "./pages/Candidates";
import EditJob from "./pages/EditJob";
import Notifications from "./pages/Notifications";


// Route Guard
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Public Layout with Navbar */}
      <Route element={<NavbarLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Authenticated Layout with Sidebar */}
        <Route element={<SidebarLayout />}>
          {/* Role-Specific Dashboards */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="jobseeker">
                <JobSeekerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employer-dashboard"
            element={
              <ProtectedRoute role="employer">
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />

          {/* General Protected Routes */}
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply"
            element={
              <ProtectedRoute role="jobseeker">
                <ApplyJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute role="jobseeker">
                <Notifications />
              </ProtectedRoute>
            }
          />          
          <Route
            path="/saved-jobs"
            element={
              <ProtectedRoute role="jobseeker">
                <SavedJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post-job"
            element={
              <ProtectedRoute role="employer">
                <PostJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-jobs"
            element={
              <ProtectedRoute role="employer">
                <MyJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Candidates"
            element={
              <ProtectedRoute role="employer">
                <Candidates />
              </ProtectedRoute>
            }
          />          
          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume-analyzer"
            element={
              <ProtectedRoute role="jobseeker">
                <ResumeAnalyzer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-job/:jobId"
            element={
                <ProtectedRoute role="employer">
                  <EditJob />
                </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute role="employer">
                <Messages />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
