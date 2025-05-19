import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "@fontsource/league-spartan";
import bgImage from "../../assets/images/bgImage.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Required for styles

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("jobseeker");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Name is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errors.email = "Please enter a valid email.";
    if (password.length < 6) errors.password = "Password must be at least 6 characters long.";
    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setServerError("");
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://localhost/hirehub-backend/register.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, role }),
        });

        const text = await response.text();
        let result;

        try {
          result = JSON.parse(text);
        } catch (err) {
          console.error("Invalid JSON:", text);
          throw new Error("Server returned invalid JSON.");
        }

        if (result.success) {
          toast.success("Registration successful! Redirecting to login...", {
            position: "top-right",
            autoClose: 2500,
          });

          setTimeout(() => {
            navigate("/login");
          }, 2500);
        } else {
          setServerError(result.message || "Registration failed.");
        }
      } catch (error) {
        console.error("Registration error:", error);
        setServerError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex h-screen w-full font-sans">
      {/* Left Side - Form */}
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
            <div>
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="jobseeker">Jobseeker</option>
                <option value="employer">Employer</option>
              </select>
            </div>
            {serverError && <div className="text-red-600 text-sm text-left mt-2">{serverError}</div>}
            <button
              type="submit"
              className="mt-4 w-full py-3 bg-gradient-to-r from-purple-700 to-indigo-600 text-white rounded font-bold transition-transform duration-300 hover:scale-105"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Branding */}
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
          Connecting talent with opportunity, faster than ever.
        </motion.p>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Register;
