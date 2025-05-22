import React, { useState, useEffect } from "react";
import { useAuth } from "../components/auth/AuthContext";

const Applications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "jobseeker") return;

    const fetchApplications = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/applications?jobseeker_id=${user.id}`);
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
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
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-600">You haven’t applied to any jobs yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Job Title</th>
                <th className="px-4 py-2">Cover Letter</th>
                <th className="px-4 py-2">Resume</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-t">
                  <td className="px-4 py-2">{app.job_title || `#${app.job_id}`}</td>
                  <td className="px-4 py-2">
                    {app.cover_letter ? app.cover_letter.slice(0, 80) + "..." : "—"}
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={`http://localhost:8000/${app.resume_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Resume
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    {app.status || "Pending"}
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
