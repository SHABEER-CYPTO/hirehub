import React, { useState } from "react";
const dummyApplications = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    jobTitle: "Frontend Developer",
    date: "2025-04-03",
    status: "Pending",
    resumeUrl: "https://example.com/resume/john.pdf",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    jobTitle: "Backend Developer",
    date: "2025-04-02",
    status: "Reviewed",
    resumeUrl: "https://example.com/resume/jane.pdf",
  },
];

const Applications = () => {
  const [applications, setApplications] = useState(dummyApplications);

  const handleStatusChange = (id, newStatus) => {
    const updated = applications.map(app =>
      app.id === id ? { ...app, status: newStatus } : app
    );
    setApplications(updated);
  };

  return (
    <div className="ml-[250px] p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Applications Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="mt-4 w-full text-left border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Job Title</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Resume</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-t">
                <td className="px-4 py-2">{app.name}</td>
                <td className="px-4 py-2">{app.email}</td>
                <td className="px-4 py-2">{app.jobTitle}</td>
                <td className="px-4 py-2">{app.date}</td>
                <td className="px-4 py-2">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                </td>
                <td className="px-4 py-2 text-sm">
                  <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applications;
