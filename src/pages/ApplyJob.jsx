import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ApplyJob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job; // ✅ Get job details

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
    coverLetter: "",
  });

  if (!job) {
    return <h2 style={{ textAlign: "center" }}>No Job Selected!</h2>; // ✅ Show message if job is missing
  }

  const handleChange = (e) => {
    if (e.target.name === "resume") {
      setFormData({ ...formData, resume: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Application submitted for ${job.title}`);
    navigate("/jobs"); // ✅ Redirect after submit
  };

  return (
    <div style={styles.container}>
      <h2>Apply for {job.title}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Name:</label>
        <input type="text" name="name" required onChange={handleChange} />

        <label>Email:</label>
        <input type="email" name="email" required onChange={handleChange} />

        <label>Resume (PDF only):</label>
        <input type="file" name="resume" accept=".pdf" required onChange={handleChange} />

        <label>Cover Letter:</label>
        <textarea name="coverLetter" rows="4" onChange={handleChange}></textarea>

        <button type="submit" style={styles.button}>Submit Application</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  button: {
    backgroundColor: "#7c3aed",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ApplyJob;
