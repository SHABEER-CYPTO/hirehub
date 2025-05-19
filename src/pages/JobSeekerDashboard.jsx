// src/pages/JobSeekerDashboard.jsx
import React from "react";

const JobSeekerDashboard = () => {
  return (
    <div className="ml-[250px] p-6">
      <h1 className="text-2xl font-bold mb-4">🎯 Job Seeker Dashboard</h1>
      <p className="text-gray-700 mb-6">Welcome! Browse jobs and track your applications.</p>

      <div className="flex gap-6">
        <div className="bg-white shadow-md p-5 rounded-lg w-[200px] text-center">
          <h3 className="text-md font-medium mb-2">Saved Jobs</h3>
          <p className="text-lg font-bold">5</p>
        </div>
        <div className="bg-white shadow-md p-5 rounded-lg w-[200px] text-center">
          <h3 className="text-md font-medium mb-2">Applications</h3>
          <p className="text-lg font-bold">3</p>
        </div>
        <div className="bg-white shadow-md p-5 rounded-lg w-[200px] text-center">
          <h3 className="text-md font-medium mb-2">Interviews</h3>
          <p className="text-lg font-bold">1</p>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
