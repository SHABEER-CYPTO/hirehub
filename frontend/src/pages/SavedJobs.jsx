import React, { useEffect, useState } from "react";
import { useAuth } from "../components/auth/AuthContext";

const SavedJobs = () => {
  const { user } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSavedJobs = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/saved-jobs?user_id=${user.id}`);
      if (!res.ok) throw new Error("Failed to fetch saved jobs");
      const data = await res.json();
      setSavedJobs(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load saved jobs.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (savedJobId) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/saved-jobs/${savedJobId}?user_id=${user.id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to remove saved job");
      setSavedJobs((prev) => prev.filter((item) => item.id !== savedJobId));
    } catch (err) {
      alert("Error removing job.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.id) fetchSavedJobs();
  }, [user]);

  return (
    <div className="ml-[250px] p-6">
      <h1 className="text-2xl font-bold mb-4">💾 Saved Jobs</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : savedJobs.length === 0 ? (
        <p className="text-gray-500">You have not saved any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedJobs.map(({ id, job }) => (
            <div key={id} className="bg-white p-5 rounded-xl shadow-md">
              {job ? (
                <>
                  <h3 className="text-xl font-semibold text-indigo-700">{job.title}</h3>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Type:</strong> {job.type}</p>
                  <p><strong>Salary:</strong> ₹{job.salary}</p>

                  <button
                    onClick={() => handleRemove(id)}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    ❌ Remove
                  </button>
                </>
              ) : (
                <p className="text-gray-500">This job is no longer available.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
