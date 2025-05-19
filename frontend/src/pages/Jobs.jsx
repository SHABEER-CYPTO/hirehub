import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jobsData from "../data/jobsData";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setJobs(jobsData);
    }, 1000);
  }, []);

  const handleApply = (job) => {
    navigate("/apply", { state: { job } });
  };

  return (
    <div className="ml-[250px] p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Job Listings</h1>
      <button
        onClick={() => navigate("/post-job")}
        className="bg-violet-600 text-white px-4 py-2 rounded mb-6 hover:bg-violet-700"
        aria-label="Post a new job"
      >
        ➕ Post a Job
      </button>
      <p className="text-gray-600 mb-6">Find your next opportunity below:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {jobs.length === 0 ? (
          <p className="text-lg text-gray-500">Loading jobs...</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-violet-600 mb-2">{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <button
                onClick={() => handleApply(job)}
                className="bg-violet-600 text-white px-4 py-2 mt-4 rounded hover:bg-violet-700"
                aria-label={`Apply for ${job.title} at ${job.company}`}
              >
                Apply Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs;