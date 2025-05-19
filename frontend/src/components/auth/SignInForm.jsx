import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "./AuthContext"; // Adjust path as needed
import bgImage from "../../assets/images/bgImage.jpg";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email.";
    }
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const result = await login({ email, password }); // Expects { success, user }
        setLoading(false);

        if (result.success) {
          const role = result.user?.role;
          setSuccessMessage("Login successful! Redirecting...");

          setTimeout(() => {
            if (role === "admin") {
              navigate("/admin-dashboard", { replace: true });
            } else if (role === "employer") {
              navigate("/employer-dashboard", { replace: true });
            } else if (role === "jobseeker") {
              navigate("/dashboard", { replace: true });
            } else {
              navigate("/", { replace: true }); // fallback route
            }
          }, 1500);
        } else {
          setServerError(result.message || "Login failed.");
        }
      } catch (error) {
        console.error("Login error:", error);
        setServerError("An unexpected error occurred. Please try again.");
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex h-screen w-full font-sans">
      {/* Left - Login Form */}
      <div className="w-1/2 flex flex-col justify-center items-center px-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={loading}
              />
              {errors.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={loading}
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-1">{errors.password}</div>
              )}
            </div>

            {serverError && (
              <div className="text-red-600 text-sm mt-2 bg-red-100 p-2 rounded">
                {serverError}
              </div>
            )}

            {successMessage && (
              <div className="text-green-600 text-sm mt-2 bg-green-100 p-2 rounded">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`mt-4 w-full py-3 bg-gradient-to-r from-purple-700 to-indigo-600 text-white rounded font-bold transition-transform duration-300 hover:scale-105 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Sign Up
            </Link>
          </p>
          <Link
            to="/"
            className="text-gray-500 no-underline text-xs mt-2 inline-block text-center"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Right - Image + Branding */}
      <div
        className="w-1/2 h-full flex flex-col justify-center items-center bg-cover bg-center px-4 text-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-[50px] font-extrabold md:text-[100px]"
          style={{
            fontFamily: "'League Spartan', sans-serif",
            letterSpacing: "-0.94px",
            lineHeight: "1.4",
            textShadow: "2px 2px 8px rgba(0, 51, 153, 0.6)",
          }}
        >
          HireHub
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-white text-base mt-2 max-w-md"
        >
          Welcome back! Sign in to continue your journey.
        </motion.p>
      </div>
    </div>
  );
};

export default SignInForm;
