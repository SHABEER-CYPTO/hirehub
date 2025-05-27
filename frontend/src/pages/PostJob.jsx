import React, { useState } from "react";
import { useAuth } from "../components/auth/AuthContext";

const PostJob = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary: "",
    experience: "",
    location: "",
    type: "full-time", // Default value
    skills: "", // New field to store comma-separated skills
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || user.role !== "employer") {
      alert("❌ You must be logged in as an employer.");
      return;
    }

    setLoading(true); // Show loading indicator
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:8000"}/api/jobs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            employer_id: user.id,
            skills: formData.skills.split(",").map(skill => skill.trim()) // Convert comma-separated skills to an array
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) throw new Error(result.detail || "Failed to post job.");

      setSuccessMsg("✅ Job posted successfully!");
      setFormData({
        title: "",
        description: "",
        salary: "",
        experience: "",
        location: "",
        type: "full-time",
        skills: "", // Clear skills field
      });

      setTimeout(() => setSuccessMsg(""), 3000); // Clear success message after 3 seconds
    } catch (err) {
      alert(`❌ ${err.message}`);
    } finally {
      setLoading(false); // Hide loading indicator after request is completed
    }
  };

  return (
    <div className="ml-[250px] p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">📢 Post a New Job</h1>

      {successMsg && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md mb-4">
          {successMsg}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4 w-full max-w-2xl"
      >
        <div>
          <label className="block mb-1 font-medium">Job Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Job Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Salary (₹)</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Experience (Years)</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Job Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
              <option value="remote">Remote</option>
            </select>
          </div>

          {/* Skills Field */}
          <div>
            <label className="block mb-1 font-medium">Skills</label>
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              placeholder="Enter skills, separated by commas"
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <small className="text-gray-500">E.g., Autocad, Solidworks, Project Management</small>
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Posting..." : "Post Job"} {/* Loading state text */}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
