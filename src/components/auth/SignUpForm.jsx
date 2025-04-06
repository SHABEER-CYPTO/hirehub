import React, { useState } from "react";
import { Link } from "react-router-dom";
import "@fontsource/league-spartan";
import { motion } from "framer-motion";
import bgImage from "../../assets/images/bgImage.jpg"; // Adjust path as needed


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (name.trim() === "") errors.name = "Name is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errors.email = "Please enter a valid email.";
    if (password.length < 6) errors.password = "Password must be at least 6 characters long.";
    return errors;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Registering user:", { name, email, password });
      setName("");
      setEmail("");
      setPassword("");
      alert("Registration Successful!");
    }
  };

  return (
    <div className="flex h-screen w-full font-sans">
      {/* Left - Form */}
      <div className="w-1/2 flex flex-col justify-center items-center px-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className="mt-4 w-full py-3 bg-gradient-to-r from-purple-700 to-indigo-600 text-white rounded font-bold transition-transform duration-300 hover:scale-105"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-indigo-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Background + Title */}
      <div
        className="w-1/2 h-full flex flex-col justify-center items-center bg-cover bg-center px-4 text-center"
        style={{
          backgroundImage:`url(${bgImage})`,
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
          Connecting talent with opportunity, faster than ever.
        </motion.p>
      </div>
    </div>
  );
};

export default Register;
