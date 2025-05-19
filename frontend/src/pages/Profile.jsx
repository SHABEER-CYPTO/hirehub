import React, { useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobPreference: "",
    resume: null,
    profilePic: null,
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const [resumeName, setResumeName] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePic" && files.length) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, profilePic: file }));
      setProfilePreview(URL.createObjectURL(file));
    } else if (name === "resume" && files.length) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, resume: file }));
      setResumeName(file.name);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to API here
    console.log("Submitted Data:", formData);
    alert("Profile Updated!");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Pic */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
            <img
              src={
                profilePreview ||
                "https://www.w3schools.com/w3images/avatar2.png"
              }
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            name="profilePic"
            onChange={handleChange}
            className="text-sm"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-600 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-600 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-600 font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Job Preference */}
        <div>
          <label className="block text-gray-600 font-medium">Job Preference</label>
          <select
            name="jobPreference"
            value={formData.jobPreference}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option>Remote</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Hybrid</option>
          </select>
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Upload Resume
          </label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="text-sm"
          />
          {resumeName && (
            <p className="mt-1 text-green-600 text-sm">Selected: {resumeName}</p>
          )}
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
