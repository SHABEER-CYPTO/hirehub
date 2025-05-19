import React from "react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-center p-6">
      <div>
        <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-700">
          You don’t have permission to view this page. Please check your role or login credentials.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
