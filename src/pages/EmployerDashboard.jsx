// src/pages/EmployerDashboard.jsx
import React from "react";

const EmployerDashboard = () => {
  return (
    <div className="ml-[250px] p-6">
      <h1 className="text-2xl font-bold mb-4">🏢 Employer Dashboard</h1>
      <p className="text-gray-700 mb-6">Welcome Employer! Manage your job posts and applicants.</p>

      <div className="flex gap-6">
        <div className="bg-white shadow-md p-5 rounded-lg w-[200px] text-center">
          <h3 className="text-md font-medium mb-2">Jobs Posted</h3>
          <p className="text-lg font-bold">12</p>
        </div>
        <div className="bg-white shadow-md p-5 rounded-lg w-[200px] text-center">
          <h3 className="text-md font-medium mb-2">Applications</h3>
          <p className="text-lg font-bold">34</p>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
