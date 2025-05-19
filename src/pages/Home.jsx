import React, { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import landingbg from "../assets/images/landingbg.jpg";
import jobsData from "../data/jobsData";

const HomePage = () => {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = () => {
    setError(null);
  };

  const handleResumeUpload = async () => {
    if (!fileInputRef.current?.files?.length) {
      setError("Please select a file to upload.");
      return;
    }

    const file = fileInputRef.current.files[0];
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB. Please upload a smaller file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8000"}/analyze-resume`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to analyze resume.");
      }

      const result = await response.json();
      setAnalysis(result);
      fileInputRef.current.value = null;
    } catch (err) {
      setError(err.message || "An error occurred while analyzing the resume.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = (job) => {
    navigate("/apply", { state: { job } });
  };

  // Filter recommended jobs based on detected skills
  const recommendedJobs = analysis
    ? jobsData.filter((job) => job.skills.some((skill) => analysis.skills_found.includes(skill)))
    : [];

  // Memoize static data
  const features = useMemo(
    () => [
      { icon: "fas fa-bell", title: "Smart Job Alerts", desc: "AI-driven notifications for jobs matching your skills." },
      { icon: "fas fa-file-alt", title: "Resume Wizard", desc: "Build, optimize, and share resumes with one click." },
      { icon: "fas fa-user-shield", title: "Verified Employers", desc: "Connect with trusted, vetted companies only." },
      { icon: "fas fa-robot", title: "AI Job Matching", desc: "Precision matching with our advanced algorithms." },
      { icon: "fas fa-lightbulb", title: "Career Insights", desc: "Access blogs, salary data, and skill courses." },
      { icon: "fas fa-headset", title: "24/7 Live Support", desc: "Chat with experts anytime, anywhere." },
      { icon: "fas fa-video", title: "Video Interviews", desc: "Schedule and join interviews directly on-platform." },
      { icon: "fas fa-globe", title: "Global Opportunities", desc: "Explore jobs worldwide with remote filters." },
    ],
    []
  );

  const stats = useMemo(
    () => [
      { stat: "15,000+", label: "Jobs Posted Monthly", icon: "fas fa-briefcase" },
      { stat: "7,500+", label: "Active Employers", icon: "fas fa-building" },
      { stat: "2M+", label: "Successful Hires", icon: "fas fa-users" },
    ],
    []
  );

  const categories = useMemo(
    () => [
      { href: "/jobs/tech", icon: "fas fa-code", title: "Tech & Development" },
      { href: "/jobs/creative", icon: "fas fa-paint-brush", title: "Creative Arts" },
      { href: "/jobs/business", icon: "fas fa-chart-line", title: "Business & Marketing" },
      { href: "/jobs/health", icon: "fas fa-heartbeat", title: "Healthcare" },
    ],
    []
  );

  const timeline = useMemo(
    () => [
      { icon: "fas fa-user-plus", step: "1. Sign Up", desc: "Create your profile in minutes." },
      { icon: "fas fa-tools", step: "2. Build Your Resume", desc: "Use our AI tools to stand out." },
      { icon: "fas fa-search", step: "3. Find Jobs", desc: "Search or let AI match you." },
      { icon: "fas fa-handshake", step: "4. Get Hired", desc: "Apply and connect with employers." },
    ],
    []
  );

  const companies = useMemo(
    () => ["company-logo1.png", "company-logo2.png", "company-logo3.png", "company-logo4.png", "company-logo5.png", "company-logo6.png"],
    []
  );

  const testimonials = useMemo(
    () => [
      { img: "user1.jpg", quote: "Landed my dream job in just 2 weeks!", name: "Sarah K.", role: "Software Engineer" },
      { img: "user2.jpg", quote: "The AI matching is a game-changer!", name: "John D.", role: "Marketing Lead" },
      { img: "user3.jpg", quote: "Best career move I ever made.", name: "Emily R.", role: "UX Designer" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-['Inter',sans-serif]"
         style={{
           backgroundImage:`url(${landingbg})`,
           backgroundSize: 'contain',
         }}>
      {/* Hero Section with Video Background */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-black py-16 px-4 sm:px-6 lg:px-16 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
        >
          <source src="career-video.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight drop-shadow-xl animate-fade-in-down">
            HIRE HUB
          </h1>
          <p className="mt-4 text-lg md:text-xl font-light opacity-90">
            Discover your dream career with elegance, ease, and cutting-edge technology
          </p>
          <form className="mt-8 flex flex-col sm:flex-row justify-center gap-4 w-full">
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              className="p-3 rounded-lg w-full bg-white/95 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm transition-all duration-300"
              aria-label="Job keywords"
            />
            <input
              type="text"
              placeholder="Location or Remote"
              className="p-3 rounded-lg w-full bg-white/95 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm transition-all duration-300"
              aria-label="Job location"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-md"
              aria-label="Search jobs"
            >
              Find Jobs
            </button>
          </form>
          <p className="mt-10 text-lg md:text-xl font-medium opacity-80 tracking-wide">
            Unlock Your Potential with AI Job Match - Upload Your Resume!
          </p>
          <div className="mt-6 flex flex-col items-center gap-4">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              id="resume-upload"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="text-sm text-black-200 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300"
              aria-label="Upload resume for AI job match"
            />
            <button
              type="button"
              className="px-8 mt-10 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 transform hover:scale-105 transition-all duration-300 shadow-md disabled:bg-gradient-to-r disabled:from-purple-400 disabled:to-indigo-400 disabled:cursor-not-allowed"
              onClick={handleResumeUpload}
              disabled={isLoading}
              aria-label="Analyze resume with AI"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                "Analyze Resume"
              )}
            </button>
          </div>
          {error && (
            <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg shadow max-w-2xl mx-auto" role="alert">
              <p className="font-medium">Error: {error}</p>
            </div>
          )}
          {analysis && (
            <div className="mt-8 p-6 bg-white/90 rounded-xl shadow-lg max-w-2xl mx-auto">
              <h3 className="font-bold text-purple-700 text-lg mb-3">AI Analysis Result:</h3>
              <p className="text-gray-800 leading-relaxed">
                <strong>Score:</strong> {analysis.score}/100
              </p>
              <p className="text-gray-800 leading-relaxed">
                <strong>Skills Detected:</strong> {analysis.skills_found.join(", ") || "None"}
              </p>
              {analysis.suggestions.length > 0 && (
                <div className="mt-4">
                  <strong>Suggestions:</strong>
                  <ul className="list-disc list-inside text-gray-800">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
              {recommendedJobs.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-bold text-purple-700 text-lg mb-3">Recommended Jobs:</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {recommendedJobs.map((job) => (
                      <div
                        key={job.id}
                        className="p-5 bg-white rounded-lg shadow-md transform hover:scale-105 transition-all duration-300"
                      >
                        <h4 className="text-lg font-semibold text-purple-600 mb-2">{job.title}</h4>
                        <p className="text-gray-800"><strong>Company:</strong> {job.company}</p>
                        <p className="text-gray-800"><strong>Location:</strong> {job.location}</p>
                        <p className="text-gray-800"><strong>Type:</strong> {job.type}</p>
                        <button
                          onClick={() => handleApply(job)}
                          className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 transform hover:scale-105 transition-all duration-300"
                          aria-label={`Apply for ${job.title} at ${job.company}`}
                        >
                          Apply Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-16 px-6 sm:px-12 lg:px-16 text-center bg-white shadow-inner">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Why Hire Hub Stands Out</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg transition duration-300 text-center"
            >
              <i className={`${feature.icon} text-4xl text-indigo-600 mb-4`}></i>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Statistics Section */}
      <section className="py-16 px-6 sm:px-12 lg:px-16 text-center bg-gradient-to-r from-purple-50 to-indigo-50 shadow-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Impact</h2>
        <div className="mt-8 max-w-5xl mx-auto flex flex-col md:flex-row justify-center gap-12">
          {stats.map((item, index) => (
            <div key={index} className="transform hover:scale-110 transition-all duration-300">
              <i className={`${item.icon} text-3xl text-purple-600 mb-2`}></i>
              <p className="text-4xl font-extrabold text-purple-600 animate-count-up">{item.stat}</p>
              <p className="mt-2 text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Job Categories with Filters */}
      <section className="py-16 px-6 sm:px-12 lg:px-16 text-center bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Explore Top Categories</h2>
        <div className="mt-4 flex justify-center gap-4 flex-wrap">
          <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200">Remote</button>
          <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200">Full-Time</button>
          <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200">Freelance</button>
        </div>
        <div className="mt-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <a
              key={index}
              href={category.href}
              className="p-6 bg-white rounded-xl shadow-lg text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              <i className={`${category.icon} text-4xl mb-3 text-purple-600`}></i>
              <h3 className="text-xl font-semibold text-gray-800">{category.title}</h3>
            </a>
          ))}
        </div>
      </section>

      {/* How It Works with Timeline */}
      <section className="bg-white py-16 px-6 sm:px-12 lg:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Your Journey with Us</h2>
        <div className="mt-12 relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-200 hidden md:block"></div>
          {timeline.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center mb-12 ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
            >
              <div
                className={`p-6 w-full md:w-1/2 bg-gray-50 rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 ${
                  index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                <i className={`${step.icon} text-4xl mb-3 text-purple-600`}></i>
                <h3 className="text-lg font-semibold text-gray-800">{step.step}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Companies with Carousel */}
      <section className="py-16 px-6 sm:px-12 lg:px-16 text-center bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Featured Employers</h2>
        <div className="mt-8 max-w-5xl mx-auto flex overflow-x-auto space-x-12 pb-4 snap-x snap-mandatory">
          {companies.map((src, index) => (
            <a
              key={index}
              href={`/company/${index + 1}`}
              className="flex-shrink-0 snap-center transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={src}
                alt={`Company ${index + 1}`}
                className="w-32 h-32 rounded-full shadow-md object-contain"
              />
              <p className="mt-3 text-gray-700 font-medium">Company {index + 1}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Enhanced Testimonials with Slider */}
      <section className="bg-white py-16 px-6 sm:px-12 lg:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Success Stories</h2>
        <div className="mt-8 max-w-5xl mx-auto flex overflow-x-auto space-x-6 pb-4 snap-x snap-mandatory">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 snap-center p-6 bg-gray-100 rounded-xl shadow-lg w-80 text-center transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={testimonial.img}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 shadow-sm"
              />
              <p className="italic text-gray-600">"{testimonial.quote}"</p>
              <h4 className="mt-4 font-semibold text-gray-800">{testimonial.name}</h4>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 px-6 sm:px-12 lg:px-16 text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Career?</h2>
          <p className="mt-4 text-lg opacity-90">
            Join millions of professionals finding their next opportunity with Hire Hub.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-md">
              Sign Up Now
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer with Newsletter */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 text-center">
        <div className="max-w-md mx-auto mb-8 px-4">
          <h3 className="text-xl font-semibold">Stay Updated</h3>
          <p className="mt-2 text-sm opacity-80">Subscribe for job alerts and career tips.</p>
          <form className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-lg w-full bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
            <button className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700">Subscribe</button>
          </form>
        </div>
        <div className="flex justify-center gap-6 mb-4 flex-wrap px-4">
          {["Facebook", "Twitter", "LinkedIn", "Instagram"].map((social, index) => (
            <a
              key={index}
              href="#"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              {social}
            </a>
          ))}
        </div>
        <p className="text-sm opacity-80">© 2025 Hire Hub. All rights reserved.</p>
        <div className="mt-3 text-sm flex justify-center gap-4 flex-wrap px-4">
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
            Terms of Service
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;