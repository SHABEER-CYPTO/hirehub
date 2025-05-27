import React, { useEffect, useState } from "react";
import { useAuth } from "../components/auth/AuthContext";

const ViewApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/applications?employer_id=${user.id}`);
      if (!response.ok) throw new Error("Failed to fetch applications");
      const data = await response.json();
      setApplications(data);
    } catch (err) {
      setError("Error fetching applications");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId, newStatus) => {
    try {
      const formData = new FormData();
      formData.append("new_status", newStatus);

      const res = await fetch(
        `http://localhost:8000/api/applications/${applicationId}/status`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to update status");
      await fetchApplications(); // refresh after update
    } catch (error) {
      alert("Failed to update application status");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="ml-[250px] p-6">
      <h1 className="text-2xl font-bold mb-4">📄 View Applications</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white p-5 shadow-md rounded-lg border"
            >
              <h2 className="text-xl font-semibold text-violet-700 mb-1">
                Job Title: {app.job?.title || `#${app.job_id}`}
              </h2>
              <p><strong>Applicant Name:</strong> {app.applicant?.name || "—"}</p>
              <p><strong>Email:</strong> {app.applicant?.email || "—"}</p>
              <p><strong>Status:</strong> {app.status}</p>
              <p><strong>Cover Letter:</strong> {app.cover_letter || "N/A"}</p>
              <p>
                <strong>Resume:</strong>{" "}
                <a
                  href={`http://localhost:8000/${app.resume_path}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 underline"
                >
                  Download Resume
                </a>
              </p>

              {app.status === "Pending" && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => updateStatus(app.id, "Accepted")}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    ✅ Accept
                  </button>
                  <button
                    onClick={() => updateStatus(app.id, "Rejected")}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewApplications;
