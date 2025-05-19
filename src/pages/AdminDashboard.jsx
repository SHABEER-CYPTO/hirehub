// src/pages/AdminDashboard.jsx
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="ml-[250px] p-6">
      <h1 className="text-2xl font-bold mb-4">👑 Admin Dashboard</h1>
      <p className="text-gray-700 mb-6">Welcome Admin! You can manage users and job posts.</p>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold text-purple-700">102</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Jobs Posted</h3>
          <p className="text-2xl font-bold text-purple-700">76</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Reported Profiles</h3>
          <p className="text-2xl font-bold text-red-600">5</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
