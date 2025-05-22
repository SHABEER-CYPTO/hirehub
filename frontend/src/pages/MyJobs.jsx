import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useAuth } from "../components/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs on mount
  useEffect(() => {
    if (!user || user.role !== "employer") return;

    const fetchJobs = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/jobs?employer_id=${user.id}`);
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await fetch(`http://localhost:8000/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      } else {
        alert("Failed to delete job.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // UI
  return (
    <div className="ml-[250px] p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">📄 My Job Listings</h1>

      {loading ? (
        <p>Loading...</p>
      ) : jobs.length === 0 ? (
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
                  {job.type} | {job.location} | {job.experience} yrs | ₹{job.salary}
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
                  onClick={() => navigate(`/edit-job/${job.id}`)}
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
