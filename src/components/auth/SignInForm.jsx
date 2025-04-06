import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "@fontsource/league-spartan";
import bgImage from "../../assets/images/bgImage.jpg"; // Or use a gradient if you prefer

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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

  const handleLogin = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Logging in with:", { email, password });
      setEmail("");
      setPassword("");
      alert("Login Successful!");
    }
  };

  return (
    <div className="flex h-screen w-full font-sans">
      {/* Left - Sign In Form */}
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
              />
              {errors.email && (
                <div className="text-red-500 text-sm mt-1 text-left">{errors.email}</div>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-1 text-left">{errors.password}</div>
              )}
            </div>
            <button
              type="submit"
              className="mt-4 w-full py-3 bg-gradient-to-r from-purple-700 to-indigo-600 text-white rounded font-bold transition-transform duration-300 hover:scale-105"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign Up
            </Link>
          </p>
          <Link
            to="/"
            className="text-gray-500 no-underline text-xs mt-2 inline-block text-center"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Right - Background + Title */}
      <div
        className="w-1/2 h-full flex flex-col justify-center items-center bg-cover bg-center px-4 text-center"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
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
