// src/pages/EditJob.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary: "",
    experience: "",
    location: "",
    type: "full-time",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/jobs`);
        const jobs = await res.json();
        const job = jobs.find((j) => j.id === parseInt(jobId));
        if (job) {
          setFormData({ ...job });
        }
        setLoading(false);
      } catch (err) {
        console.error("Error loading job:", err);
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/jobs/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("✅ Job updated successfully!");
        setTimeout(() => navigate("/my-jobs"), 2000);
      } else {
        const err = await response.json();
        setMessage(`❌ Failed: ${err.detail}`);
      }
    } catch (err) {
      console.error("Update failed", err);
      setMessage("❌ Update failed.");
    }
  };

  if (loading) return <div className="p-6">Loading job...</div>;

  return (
    <div className="ml-[250px] p-6 font-sans max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">✏️ Edit Job</h1>

      {message && <div className="mb-4 text-blue-600 font-medium">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(formData).map(([key, val]) =>
          key !== "id" && key !== "employer_id" && key !== "__typename" ? (
            <div key={key}>
              <label className="block mb-1 capitalize font-medium">{key.replace("_", " ")}</label>
              {key === "description" ? (
                <textarea
                  name={key}
                  value={val}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border px-4 py-2 rounded"
                />
              ) : key === "type" ? (
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="internship">Internship</option>
                  <option value="contract">Contract</option>
                  <option value="remote">Remote</option>
                </select>
              ) : (
                <input
                  name={key}
                  value={val}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                />
              )}
            </div>
          ) : null
        )}

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
