import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../components/auth/AuthContext";

const ApplyJob = () => {
  const { user } = useAuth();
  const location = useLocation();
  const job = location.state?.job;

  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [status, setStatus] = useState(null);

  if (!user || user.role !== "jobseeker") {
    return <Navigate to="/login" />;
  }

  if (!job) {
    return <p>No job selected. Please go back and choose a job to apply for.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setStatus("⚠️ Please upload a resume file.");
      return;
    }

    const formData = new FormData();
    formData.append("job_id", job.id);
    formData.append("jobseeker_id", user.id);
    formData.append("cover_letter", coverLetter);
    formData.append("resume", resumeFile);

    try {
      const response = await fetch("http://localhost:8000/api/applications", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("✅ Application submitted successfully!");
      } else {
        const errorData = await response.json();
        setStatus(`❌ Error: ${errorData.detail || "Failed to submit"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("❌ An error occurred while submitting the application.");
    }
  };

  return (
    <div className="ml-[250px] p-6">
      <h1 className="text-2xl font-bold mb-4">Apply for {job.title}</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cover Letter
          </label>
          <textarea
            name="cover_letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            rows={5}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Resume (PDF/DOC)
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files[0])}
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
