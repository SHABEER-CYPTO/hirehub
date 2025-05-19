import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 animate-fadeIn">
            About HireHub
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90 animate-fadeIn delay-100">
            Connecting talent with opportunity. HireHub is your trusted platform for finding the perfect job or hiring top talent.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 animate-fadeIn">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed animate-fadeIn delay-100">
                At HireHub, we aim to revolutionize the job market by providing a seamless, AI-powered platform that matches candidates with their dream roles and employers with exceptional talent. We believe in empowering individuals and businesses to thrive.
              </p>
            </div>
            <div className="backdrop-blur-xl bg-white/20 p-6 rounded-xl shadow-lg animate-fadeIn delay-200">
              <img
                src="https://images.unsplash.com/photo-1516321310762-47db48b0f29c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Team working"
                className="rounded-lg w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 animate-fadeIn">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Jane Doe", role: "CEO", img: "https://i.pravatar.cc/150?img=1" },
              { name: "John Smith", role: "CTO", img: "https://i.pravatar.cc/150?img=2" },
              { name: "Emily Brown", role: "Lead Developer", img: "https://i.pravatar.cc/150?img=3" },
            ].map((member, index) => (
              <div
                key={member.name}
                className="backdrop-blur-xl bg-white/20 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;