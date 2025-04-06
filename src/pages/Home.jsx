import React from "react";
// Assumes Font Awesome and Tailwind CSS are included

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 font-['Inter',sans-serif]">
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
          <p className="mt-10 text-1xl opacity-75">Try our AI Job Match - Upload your resume below!</p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="mt-6 text-sm text-gray-200 file:mr-4 file:py-4 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
          />
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-16 px-6 sm:px-12 lg:px-16 text-center bg-white shadow-inner">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Why Hire Hub Stands Out</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[
            { icon: "fas fa-bell", title: "Smart Job Alerts", desc: "AI-driven notifications for jobs matching your skills." },
            { icon: "fas fa-file-alt", title: "Resume Wizard", desc: "Build, optimize, and share resumes with one click." },
            { icon: "fas fa-user-shield", title: "Verified Employers", desc: "Connect with trusted, vetted companies only." },
            { icon: "fas fa-robot", title: "AI Job Matching", desc: "Precision matching with our advanced algorithms." },
            { icon: "fas fa-lightbulb", title: "Career Insights", desc: "Access blogs, salary data, and skill courses." },
            { icon: "fas fa-headset", title: "24/7 Live Support", desc: "Chat with experts anytime, anywhere." },
            { icon: "fas fa-video", title: "Video Interviews", desc: "Schedule and join interviews directly on-platform." },
            { icon: "fas fa-globe", title: "Global Opportunities", desc: "Explore jobs worldwide with remote filters." },
          ].map((feature, index) => (
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
          {[
            { stat: "15,000+", label: "Jobs Posted Monthly", icon: "fas fa-briefcase" },
            { stat: "7,500+", label: "Active Employers", icon: "fas fa-building" },
            { stat: "2M+", label: "Successful Hires", icon: "fas fa-users" },
          ].map((item, index) => (
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
          {[
            { href: "/jobs/tech", icon: "fas fa-code", title: "Tech & Development" },
            { href: "/jobs/creative", icon: "fas fa-paint-brush", title: "Creative Arts" },
            { href: "/jobs/business", icon: "fas fa-chart-line", title: "Business & Marketing" },
            { href: "/jobs/health", icon: "fas fa-heartbeat", title: "Healthcare" },
          ].map((category, index) => (
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
          {[
            { icon: "fas fa-user-plus", step: "1. Sign Up", desc: "Create your profile in minutes." },
            { icon: "fas fa-tools", step: "2. Build Your Resume", desc: "Use our AI tools to stand out." },
            { icon: "fas fa-search", step: "3. Find Jobs", desc: "Search or let AI match you." },
            { icon: "fas fa-handshake", step: "4. Get Hired", desc: "Apply and connect with employers." },
          ].map((step, index) => (
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
          {["company-logo1.png", "company-logo2.png", "company-logo3.png", "company-logo4.png","company-logo5.png","company-logo6.png"].map((src, index) => (
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
          {[
            { img: "user1.jpg", quote: "Landed my dream job in just 2 weeks!", name: "Sarah K.", role: "Software Engineer" },
            { img: "user2.jpg", quote: "The AI matching is a game-changer!", name: "John D.", role: "Marketing Lead" },
            { img: "user3.jpg", quote: "Best career move I ever made.", name: "Emily R.", role: "UX Designer" },
          ].map((testimonial, index) => (
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