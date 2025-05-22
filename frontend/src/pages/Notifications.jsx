import React, { useEffect, useState } from "react";
import { useAuth } from "../components/auth/AuthContext";

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/applications?jobseeker_id=${user.id}`);
        const data = await res.json();

        // 🛡 Ensure it's always an array
        if (Array.isArray(data)) {
          setNotifications(data.filter(app => app.status !== "Pending")); // Only show reviewed apps
        } else {
          setNotifications([]); // fallback if backend gives unexpected response
          console.warn("Unexpected notifications format:", data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "jobseeker") {
      fetchApplications();
    }
  }, [user]);

  return (
    <div className="ml-[250px] p-6 font-sans max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">🔔 Notifications</h1>

      {loading ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <p className="text-gray-600">No status updates yet.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li key={notif.id} className="p-4 bg-white shadow rounded">
              <p>
                Your application for <strong>Job #{notif.job_id}</strong> was{" "}
                <span className="font-semibold text-purple-600">{notif.status}</span>.
              </p>
              <a
                href={`http://localhost:8000/${notif.resume_path}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline text-sm"
              >
                View Submitted Resume
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
