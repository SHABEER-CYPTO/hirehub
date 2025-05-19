import React, { useState, useEffect } from "react";
import { BookmarkCheck, Trash2 } from "lucide-react";

const mockSavedJobs = [
  {
    id: 1,
    title: "UI/UX Designer",
    company: "PixelPerfect Studio",
    location: "Remote",
    salary: "₹6,00,000",
  },
  {
    id: 2,
    title: "Machine Learning Engineer",
    company: "DataLabs",
    location: "Bangalore",
    salary: "₹12,00,000",
  },
];

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    // Replace with real API call
    setSavedJobs(mockSavedJobs);
  }, []);

  const handleRemove = (id) => {
    if (window.confirm("Remove this job from saved list?")) {
      setSavedJobs(savedJobs.filter((job) => job.id !== id));
    }
  };

  return (
    <div className="ml-[250px] p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BookmarkCheck size={28} /> Saved Jobs
      </h1>

      {savedJobs.length === 0 ? (
        <p className="text-gray-600">You haven't saved any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {savedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-md rounded-lg p-5 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-sm text-gray-600">
                  {job.company} | {job.location} | {job.salary}
                </p>
              </div>
              <button
                onClick={() => handleRemove(job.id)}
                className="text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 size={18} />
                <span className="text-sm">Remove</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
