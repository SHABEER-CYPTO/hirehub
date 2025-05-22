import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Star, Users, Globe, Rocket } from "lucide-react";
import heroImage from "../assets/images/landingbg.jpg";

const stats = [
  { label: "Jobs Posted", value: "15,000+", icon: <Briefcase /> },
  { label: "Hires Made", value: "2M+", icon: <Users /> },
  { label: "Companies", value: "7,500+", icon: <Globe /> },
];

const tools = [
  { title: "Resume Builder", desc: "Craft a perfect resume in minutes.", icon: <Rocket /> },
  { title: "Interview Prep", desc: "AI-generated questions & practice.", icon: <Star /> },
  { title: "Skill Match", desc: "Get feedback on your current skills.", icon: <Users /> },
];

const categories = [
  { title: "Tech & Dev", icon: "💻" },
  { title: "Marketing", icon: "📈" },
  { title: "Design", icon: "🎨" },
  { title: "Finance", icon: "💼" },
];

const testimonials = [
  { name: "Sarah K.", role: "Software Engineer", quote: "HireHub helped me land my dream job in just 2 weeks!" },
  { name: "John D.", role: "Marketing Lead", quote: "The AI tools are a game changer. My career skyrocketed!" },
  { name: "Emily R.", role: "UX Designer", quote: "Best platform for creative professionals!" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  // Auto-scroll for testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full font-sans">
      {/* Hero Section */}
      <section
        className="relative text-white flex items-center justify-center min-h-[90vh] bg-cover bg-center px-6 transition-all duration-1000"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="bg-gradient-to-r from-[#00b0f3] via-[#75cfea] to-[#DEF0FC] bg-opacity-90 p-8 rounded-xl text-center max-w-3xl shadow-xl animate-fadeIn">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-white drop-shadow">
            Welcome to <span className="text-indigo-800">HireHub</span>
          </h1>
          <p className="text-lg mb-6 text-white">
            Explore thousands of opportunities, trusted employers, and AI-powered tools — all in one place.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="text"
              placeholder="Job title or keyword"
              className="p-3 rounded w-full md:w-1/2 text-black"
            />
            <input
              type="text"
              placeholder="Location or Remote"
              className="p-3 rounded w-full md:w-1/3 text-black"
            />
            <button
              onClick={() => navigate("/jobs")}
              className="bg-indigo-700 hover:bg-indigo-800 px-6 py-3 rounded text-white font-semibold shadow"
            >
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
              <div className="text-purple-600 mb-2">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Career Tools */}
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Smart Career Tools</h2>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1">
              <div className="text-purple-600 text-3xl mb-3">{tool.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{tool.title}</h3>
              <p className="text-gray-600 text-sm">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Top Categories</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div key={index} className="bg-gray-100 hover:bg-purple-100 transition p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-2">{cat.icon}</div>
              <h4 className="text-lg font-semibold text-gray-800">{cat.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Success Stories</h2>
        <div className="overflow-x-auto whitespace-nowrap px-6" ref={sliderRef}>
          <div className="inline-flex gap-8">
            {testimonials.map((t, index) => (
              <div key={index} className="min-w-[300px] bg-white p-6 rounded-lg shadow-md text-left inline-block">
                <p className="italic text-gray-700 mb-4">"{t.quote}"</p>
                <h4 className="font-semibold text-gray-900">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-[#00b0f3] via-[#41cef7] to-[#F3F8FA] text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Ready to land your dream job?</h2>
        <p className="mb-6 text-gray-800">Join thousands of professionals already using HireHub.</p>
        <button
          onClick={() => navigate("/register")}
          className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
        >
          Get Started Now
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} HireHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
