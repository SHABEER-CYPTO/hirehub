import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import ScoreBreakdown from "../components/ScoreBreakdown";
import Suggestions from "../components/Suggestions";
import Summary from "../components/Summary";
import jobsData from "../data/jobsData";

const ResumeAnalyzer = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      const response = await axios.post("http://localhost:8000/api/analyze-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAnalysisResult(response.data);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(err.response?.data?.detail || "Something went wrong while analyzing the resume.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAnalysisResult(null);
    setError("");
  };

  const matchedJobs = analysisResult?.skills_found?.length
    ? jobsData
        .map((job) => {
          const matchedSkills = job.skills?.filter((skill) =>
            analysisResult.skills_found.includes(skill.toLowerCase())
          );
          return { ...job, matchedCount: matchedSkills?.length || 0 };
        })
        .filter((job) => job.matchedCount > 0)
        .sort((a, b) => b.matchedCount - a.matchedCount)
    : [];

  const handleApply = (job) => {
    navigate("/apply", { state: { job } });
  };

  return (
    <div className="bg-gradient-to-b from-white to-indigo-50 min-h-screen px-6 py-10 font-sans">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-indigo-700 flex justify-center gap-2 items-center mb-2">
            🧠 Resume Analyzer
          </h1>
          <p className="text-gray-600 text-lg">
            Upload your resume to get AI-driven insights and matching jobs.
          </p>
        </div>

        {/* Upload Section */}
        <FileUpload onFileUpload={handleFileUpload} loading={loading} />
        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}

        {/* Results */}
        {analysisResult && (
          <div className="mt-10 space-y-10">
            <div className="text-green-600 font-semibold text-lg text-center">
              ✅ Analysis completed successfully!
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-indigo-700 mb-3">📊 Score Breakdown</h2>
              <ScoreBreakdown scores={analysisResult} />
            </div>

            {analysisResult.suggestions?.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-indigo-700 mb-3">🛠️ Suggestions</h2>
                <Suggestions suggestions={analysisResult.suggestions} />
              </div>
            )}

            {analysisResult.summary_points?.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-indigo-700 mb-3">📝 Resume Summary</h2>
                <Summary summaryPoints={analysisResult.summary_points} />
              </div>
            )}

            {/* Matching Jobs */}
            {matchedJobs.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-indigo-700 mb-6 text-center">
                  🎯 Matching Job Opportunities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {matchedJobs.map((job, index) => (
                    <div
                      key={job.id}
                      className={`border-2 ${
                        index === 0 ? "border-green-500" : "border-gray-200"
                      } rounded-xl p-5 shadow-md hover:shadow-xl transition bg-gray-50 flex flex-col`}
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{job.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {job.company} • {job.location} • {job.type}
                      </p>
                      <p className="text-sm text-gray-500 mb-4 flex-grow">
                        <strong>Required Skills:</strong> {job.skills?.join(", ")}
                      </p>
                      <button
                        className="mt-auto bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition"
                        onClick={() => handleApply(job)}
                      >
                        Apply Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center mt-10">
              <button
                onClick={resetForm}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Reset & Analyze Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
