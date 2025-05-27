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
      await fetchApplications();
    } catch (error) {
      alert("Failed to update application status");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8 lg:ml-[250px] transition-all duration-300">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          📋 Job Applications
        </h1>
        <p className="mt-2 text-gray-600 text-sm md:text-base">
          Manage and review all candidate applications
        </p>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-blue-200 border-t-transparent rounded-full animate-spin animate-[spin_1.5s_linear_infinite]"></div>
          </div>
          <p className="mt-4 text-gray-600 text-lg font-medium animate-pulse">
            Loading applications...
          </p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center border border-gray-200">
          <p className="text-gray-600 text-lg font-medium">No applications found.</p>
          <p className="text-gray-500 mt-2">Check back later for new submissions.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 truncate">
                {app.job?.title || `#${app.job_id}`}
              </h2>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  <span className="font-medium text-gray-900">Applicant:</span>{" "}
                  {app.applicant?.name || "—"}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Email:</span>{" "}
                  {app.applicant?.email || "—"}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Status:</span>{" "}
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      app.status === "Accepted"
                        ? "bg-green-100 text-green-800"
                        : app.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {app.status}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-900">Cover Letter:</span>{" "}
                  {app.cover_letter || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Resume:</span>{" "}
                  <a
                    href={`http://localhost:8000/${app.resume_path}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline transition-colors"
                  >
                    Download
                  </a>
                </p>
              </div>

              {app.status === "Pending" && (
                <div className="mt-6 flex gap-3 justify-end">
                  <button
                    onClick={() => updateStatus(app.id, "Accepted")}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 text-sm font-medium"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(app.id, "Rejected")}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 text-sm font-medium"
                  >
                    Reject
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