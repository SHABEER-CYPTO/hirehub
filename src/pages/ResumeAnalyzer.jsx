import React, { useState } from "react";
import axios from "axios";
import FileUpload from "../components/FileUpload";
import ScoreBreakdown from "../components/ScoreBreakdown";
import EntitiesDisplay from "../components/EntitiesDisplay";
import Suggestions from "../components/Suggestions";
import Summary from "../components/Summary";
import jobsData from "../data/jobsData";

const ResumeAnalyzer = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = async (file) => {
    if (!file) {
      setError("⚠️ Please select a resume file to upload.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("⚠️ File size is too large. Please upload a file smaller than 5MB.");
      return;
    }

    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/analyze-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAnalysisResult(response.data);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.detail || "Something went wrong while analyzing the resume."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAnalysisResult(null);
    setError("");
  };

  const matchedJobs = analysisResult?.skills_found?.length
    ? jobsData.filter((job) =>
        job.skills?.some((skill) =>
          analysisResult.skills_found
            .map((s) => s.toLowerCase())
            .includes(skill.toLowerCase())
        )
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">🧠 AI Resume Analyzer</h1>

      <FileUpload onFileUpload={handleFileUpload} loading={loading} />

      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

      {analysisResult && (
        <div className="w-full max-w-4xl mt-8 space-y-8">
          <ScoreBreakdown scores={analysisResult} />

          <EntitiesDisplay
            entities={analysisResult.entities}
            skills={analysisResult.skills_found || []}
          />

          <Suggestions suggestions={analysisResult.suggestions || []} />

          <Summary summaryPoints={analysisResult.summary_points || []} />

          {matchedJobs.length > 0 && (
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-semibold mb-6 text-indigo-700 text-center">
                🎯 Matching Job Opportunities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {matchedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="border rounded-xl p-5 shadow-md hover:shadow-xl transition duration-300 bg-gray-50 flex flex-col"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{job.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {job.company} • {job.location} • {job.type}
                    </p>
                    <p className="text-sm text-gray-500 mb-4 flex-grow">
                      <strong>Required Skills:</strong>{" "}
                      {job.skills?.join(", ") || "Not specified"}
                    </p>
                    <button
                      className="mt-auto bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition"
                      onClick={() => alert(`Apply for ${job.title} at ${job.company}`)}
                    >
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={resetForm}
            className="mt-6 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
