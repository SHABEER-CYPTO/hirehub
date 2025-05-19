import React from "react";

const Dashboard = () => {
  return (
    <div className="ml-[250px] p-6">
      <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome to your Hire Hub dashboard!</p>

      <div className="flex gap-5">
        <div className="bg-gray-100 p-5 rounded-lg text-center w-[200px]">
          <h3 className="font-semibold text-lg mb-2">Total Jobs</h3>
          <p className="text-sm text-gray-700">20 Open Positions</p>
        </div>
        <div className="bg-gray-100 p-5 rounded-lg text-center w-[200px]">
          <h3 className="font-semibold text-lg mb-2">Applications Submitted</h3>
          <p className="text-sm text-gray-700">5 Applications</p>
        </div>
        <div className="bg-gray-100 p-5 rounded-lg text-center w-[200px]">
          <h3 className="font-semibold text-lg mb-2">Interviews Scheduled</h3>
          <p className="text-sm text-gray-700">2 Upcoming</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;