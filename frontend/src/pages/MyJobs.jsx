import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";

const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    type: "Full-time",
    location: "Remote",
    salary: "8,00,000",
    experience: "2 years",
  },
  {
    id: 2,
    title: "Backend Engineer",
    type: "Part-time",
    location: "Bangalore",
    salary: "6,50,000",
    experience: "1 year",
  },
];

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // TODO: Replace with real API call
    setJobs(mockJobs);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setJobs(jobs.filter((job) => job.id !== id));
    }
  };

  return (
    <div className="ml-[250px] p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">📄 My Job Listings</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-600">You haven’t posted any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-md rounded-lg p-5 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-sm text-gray-600">
                  {job.type} | {job.location} | {job.experience} | ₹{job.salary}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  title="View"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <Eye size={18} />
                </button>
                <button
                  title="Edit"
                  className="text-yellow-600 hover:text-yellow-700"
                >
                  <Pencil size={18} />
                </button>
                <button
                  title="Delete"
                  onClick={() => handleDelete(job.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
