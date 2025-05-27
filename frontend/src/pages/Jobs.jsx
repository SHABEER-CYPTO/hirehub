import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../components/auth/AuthContext";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [search, setSearch] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();
  const userId = user?.id;

  // Fetch all jobs
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => {
        console.error("Failed to load jobs:", err);
        setJobs([]);
      });
  }, []);

  // Fetch saved jobs for jobseeker
  useEffect(() => {
    if (user?.role === "jobseeker") {
      axios
        .get(`http://localhost:8000/api/saved-jobs?user_id=${userId}`)
        .then((res) => {
          const ids = res.data.map((entry) => entry.job_id);
          setSavedJobs(ids);
        })
        .catch((err) => {
          console.error("Failed to fetch saved jobs", err);
        });
    }
  }, [userId, user?.role]);

  const handleApply = (job) => {
    navigate("/apply", { state: { job } });
  };

  const handleSaveJob = async (jobId) => {
    if (!userId) {
      alert("Please log in to save jobs.");
      return;
    }

    if (savedJobs.includes(jobId)) {
      return; // Already saved
    }

    try {
      await axios.post("http://localhost:8000/api/saved-jobs", null, {
        params: {
          user_id: userId,
          job_id: jobId,
        },
      });
      setSavedJobs((prev) => [...prev, jobId]);
    } catch (err) {
      console.error("Error saving job:", err);
      alert("Failed to save job. Try again later.");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchLocation = locationFilter
      ? job.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;
    const matchType = typeFilter
      ? job.type.toLowerCase() === typeFilter.toLowerCase()
      : true;
    const matchSearch =
      search.trim() === "" ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      (job.company && job.company.toLowerCase().includes(search.toLowerCase()));
    return matchLocation && matchType && matchSearch;
  });

  return (
    <div className="ml-[250px] p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Job Listings</h1>

      {user?.role === "employer" && (
        <button
          onClick={() => navigate("/post-job")}
          className="bg-indigo-600 text-white px-4 py-2 rounded mb-6 hover:bg-indigo-800"
        >
          ➕ Post a Job
        </button>
      )}

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by title or company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-md w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="📍 Filter by location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border p-2 rounded-md w-full max-w-xs"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">All Types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="internship">Internship</option>
          <option value="contract">Contract</option>
          <option value="remote">Remote</option>
        </select>
      </div>

      <p className="text-gray-600 mb-4">Find your next opportunity below:</p>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredJobs.length === 0 ? (
          <p className="text-lg text-gray-500">No jobs found.</p>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">{job.title}</h3>
              <p><strong>Company:</strong> {job.company || "N/A"}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <p><strong>Salary:</strong> ₹{job.salary}</p>

              {/* Skills Display */}
              <div className="mt-3">
                <p className="font-medium text-gray-700 mb-1">Skills Required:</p>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(job.skills) && job.skills.length > 0 ? (
                    job.skills.map((skill, index) => {
                      const colorMap = {
                        react: "bg-blue-100 text-blue-800",
                        html: "bg-orange-100 text-orange-800",
                        css: "bg-sky-100 text-sky-800",
                        javascript: "bg-yellow-100 text-yellow-800",
                        python: "bg-green-100 text-green-800",
                        default: "bg-gray-100 text-gray-800",
                      };
                      const iconMap = {
                        react: "⚛️",
                        html: "📄",
                        css: "🎨",
                        javascript: "🟨",
                        python: "🐍",
                      };
                      const normalized = skill.toLowerCase();
                      const colorClass = colorMap[normalized] || colorMap.default;
                      const icon = iconMap[normalized] || "🛠️";

                      return (
                        <span
                          key={index}
                          className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full ${colorClass}`}
                          title={`Skill: ${skill}`}
                        >
                          {icon} {skill}
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-gray-500 text-sm">Not specified</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              {user?.role === "jobseeker" && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleApply(job)}
                    className="bg-indigo-800 text-white px-4 py-2 rounded hover:bg-indigo-900"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => handleSaveJob(job.id)}
                    disabled={savedJobs.includes(job.id)}
                    title={savedJobs.includes(job.id) ? "Already saved" : "Save this job"}
                    className={`border px-4 py-2 rounded text-sm transition ${
                      savedJobs.includes(job.id)
                        ? "bg-green-100 text-green-700 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {savedJobs.includes(job.id) ? "✅ Saved" : "💾 Save Job"}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs;
