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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8 lg:ml-[250px] transition-all duration-300">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          📋 My Job Listings
        </h1>
        <p className="mt-2 text-gray-600 text-sm md:text-base">
          View and manage your posted job listings
        </p>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-blue-200 border-t-transparent rounded-full animate-spin animate-[spin_1.5s_linear_infinite]"></div>
          </div>
          <p className="mt-4 text-gray-600 text-lg font-medium animate-pulse">
            Loading job listings...
          </p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center border border-gray-200">
          <p className="text-gray-600 text-lg font-medium">No job listings found.</p>
          <p className="text-gray-500 mt-2">Post a new job to get started.</p>
          <button
            onClick={() => navigate("/post-job")}
            className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-sm font-medium"
          >
            Post a Job
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 truncate">
                {job.title}
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium text-gray-900">Type:</span>{" "}
                  {job.type}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Location:</span>{" "}
                  {job.location}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Experience:</span>{" "}
                  {job.experience} yrs
                </p>
                <p>
                  <span className="font-medium text-gray-900">Salary:</span>{" "}
                  ₹{job.salary}
                </p>
              </div>
              <div className="mt-6 flex gap-3 justify-end">
                <button
                  title="View"
                  onClick={() => navigate(`/job/${job.id}`)}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-all duration-200"
                >
                  <Eye size={18} />
                </button>
                <button
                  title="Edit"
                  onClick={() => navigate(`/edit-job/${job.id}`)}
                  className="p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-full transition-all duration-200"
                >
                  <Pencil size={18} />
                </button>
                <button
                  title="Delete"
                  onClick={() => handleDelete(job.id)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200"
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