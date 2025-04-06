import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setJobs([
        { id: 1, title: "Frontend Developer", company: "Tech Corp", location: "Remote", type: "Full-time" },
        { id: 2, title: "Backend Developer", company: "Soft Solutions", location: "Bangalore", type: "Part-time" },
        { id: 3, title: "UI/UX Designer", company: "Creative Agency", location: "Kochin", type: "Contract" },
        { id: 4, title: "Accountant", company: "A1 Agency", location: "Banglore", type: "Full-time" },
        { id: 5, title: "Devops Engineer", company: "Service Solution", location: "Banglore", type: "Full-time" },
        { id: 6, title: "AI/ML Engineer", company: "IBM", location: "Banglore", type: "Full-time" },
      ]);
    }, 1000);
  }, []);

  const handleApply = (job) => {
    navigate("/apply", { state: { job } });
  };

  return (
    <div style={{ padding: "20px", width: "100%", boxSizing: "border-box" }}> {/* Added boxSizing */}
      <h1 style={styles.heading}>Job Listings</h1>
      <button 
        style={styles.postJobButton} 
        onClick={() => navigate("/post-job")}
      >
        ➕ Post a Job
      </button>
      <p style={styles.subText}>Find your next opportunity below:</p>
      <div style={styles.jobList}>
        {jobs.length === 0 ? (
          <p style={styles.loadingText}>Loading jobs...</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} style={styles.jobCard}>
              <h3 style={styles.jobTitle}>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <button 
                style={styles.applyButton} 
                onClick={() => handleApply(job)}
              >
                Apply Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  heading: { fontSize: "28px", fontWeight: "bold", color: "#333", marginBottom: "10px" },
  postJobButton: { backgroundColor: "#7c3aed", color: "#fff", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "20px" },
  subText: { fontSize: "16px", color: "#666", marginBottom: "20px" },
  jobList: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
    gap: "20px",
    maxWidth: "1200px", // Optional: Limit the max width for better readability
    margin: "0 auto", // Center the grid
  },
  jobCard: { 
    backgroundColor: "#fff", 
    padding: "20px", 
    borderRadius: "10px", 
    boxShadow: "0 4px 8px rgba(146, 60, 239, 0.23)",
    boxSizing: "border-box", // Ensure padding doesn't affect width
  },
  jobTitle: { fontSize: "20px", fontWeight: "bold", color: "#7c3aed", marginBottom: "10px" },
  applyButton: { 
    backgroundColor: "#7c3aed", 
    color: "#fff", 
    padding: "10px 15px", 
    border: "none", 
    borderRadius: "5px", 
    cursor: "pointer", 
    marginTop: "10px" 
  },
  loadingText: { fontSize: "18px", color: "#888" },
};

export default Jobs;