// src/pages/ApplyJob.jsx
import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../components/auth/AuthContext";

const ApplyJob = () => {
  const { user } = useAuth();
  const location = useLocation();
  const job = location.state?.job;

  const [formData, setFormData] = useState({
    cover_letter: "",
    resume_url: "",
  });

  const [status, setStatus] = useState(null);

  if (!user || user.role !== "jobseeker") {
    return <Navigate to="/login" />;
  }

  if (!job) {
    return <p>No job selected. Please go back and choose a job to apply for.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          job_id: job.id,
          cover_letter: formData.cover_letter,
          resume_url: formData.resume_url,
        }),
      });

      if (response.ok) {
        setStatus("Application submitted successfully!");
      } else {
        const errorData = await response.json();
        setStatus(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      setStatus("An error occurred while submitting the application.");
    }
  };

  return (
    <div className="ml-[250px] p-6">
      <h1 className="text-2xl font-bold mb-4">Apply for {job.title}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cover Letter
          </label>
          <textarea
            name="cover_letter"
            value={formData.cover_letter}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            rows={5}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resume URL
          </label>
          <input
            type="url"
            name="resume_url"
            value={formData.resume_url}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
        >
          Submit Application
        </button>
      </form>
      {status && <p className="mt-4 text-sm text-gray-600">{status}</p>}
    </div>
  );
};

export default ApplyJob;
