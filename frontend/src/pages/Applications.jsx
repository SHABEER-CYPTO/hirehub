import React, { useState, useEffect } from "react";
import { useAuth } from "../components/auth/AuthContext";

const Applications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "jobseeker") return;

    const fetchApplications = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/applications?jobseeker_id=${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch applications");
        const data = await res.json();

        if (Array.isArray(data)) {
          setApplications(data);
        } else {
          console.error("Unexpected response:", data);
          setApplications([]);
        }
      } catch (err) {
        console.error("Failed to fetch applications:", err);
        setError("Error loading applications. Please try again.");
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  return (
    <div className="ml-[250px] p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎯 My Applications</h1>

      {loading ? (
        <p className="text-gray-500">Loading applications...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-600">You haven’t applied to any jobs yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full text-left border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3">Job Title</th>
                <th className="px-4 py-3">Cover Letter</th>
                <th className="px-4 py-3">Resume</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-violet-700">
                    {app.job?.title || `Job #${app.job_id}`}
                  </td>
                  <td className="px-4 py-3">
                    {app.cover_letter
                      ? app.cover_letter.length > 80
                        ? app.cover_letter.slice(0, 80) + "..."
                        : app.cover_letter
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`http://localhost:8000/${app.resume_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Resume
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        app.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : app.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {app.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Applications;
