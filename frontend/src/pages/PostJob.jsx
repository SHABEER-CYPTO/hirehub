import React, { useState } from "react";
import { useAuth } from "../components/auth/AuthContext";
import { CheckCircle, AlertCircle } from "lucide-react";

const PostJob = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary: "",
    experience: "",
    location: "",
    type: "full-time",
    skills: "",
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Job title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.salary) newErrors.salary = "Salary is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.skills) newErrors.skills = "Skills are required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || user.role !== "employer") {
      setErrorMsg("You must be logged in as an employer.");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }

    if (!validateForm()) {
      setErrorMsg("Please fill in all required fields.");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }

    setLoading(true);
    setErrorMsg("");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || "http://localhost:8000"}/api/jobs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            employer_id: user.id,
            skills: formData.skills.split(",").map((skill) => skill.trim()),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) throw new Error(result.detail || "Failed to post job.");

      setSuccessMsg("Job posted successfully!");
      setFormData({
        title: "",
        description: "",
        salary: "",
        experience: "",
        location: "",
        type: "full-time",
        skills: "",
      });
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setErrorMsg(err.message);
      setTimeout(() => setErrorMsg(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8 lg:ml-[250px] transition-all duration-300">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
          📢 Post a New Job
        </h1>
        <p className="mt-2 text-gray-600 text-sm md:text-base">
          Attract top talent with a compelling job listing
        </p>
      </header>

      {successMsg && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-6 flex items-center animate-slide-in">
          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
          <p className="text-green-700 font-medium">{successMsg}</p>
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6 flex items-center animate-slide-in">
          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
          <p className="text-red-700 font-medium">{errorMsg}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-xl mx-auto"
      >
        <div className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-900">Job Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={`w-full border ${errors.title ? "border-red-500" : "border-gray-200"} px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:shadow-md transition-all duration-200 text-gray-700`}
              placeholder="e.g., Senior Software Engineer"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            {errors.title && (
              <p id="title-error" className="mt-1 text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-900">Job Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className={`w-full border ${errors.description ? "border-red-500" : "border-gray-200"} px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:shadow-md transition-all duration-200 text-gray-700`}
              placeholder="Describe the job responsibilities and requirements"
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? "description-error" : undefined}
            />
            {errors.description && (
              <p id="description-error" className="mt-1 text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-900">Salary (₹)</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                className={`w-full border ${errors.salary ? "border-red-500" : "border-gray-200"} px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:shadow-md transition-all duration-200 text-gray-700`}
                placeholder="e.g., 1000000"
                aria-invalid={!!errors.salary}
                aria-describedby={errors.salary ? "salary-error" : undefined}
              />
              {errors.salary && (
                <p id="salary-error" className="mt-1 text-xs text-red-500">{errors.salary}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-900">Experience (Years)</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className={`w-full border ${errors.experience ? "border-red-500" : "border-gray-200"} px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:shadow-md transition-all duration-200 text-gray-700`}
                placeholder="e.g., 3"
                aria-invalid={!!errors.experience}
                aria-describedby={errors.experience ? "experience-error" : undefined}
              />
              {errors.experience && (
                <p id="experience-error" className="mt-1 text-xs text-red-500">{errors.experience}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-900">Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className={`w-full border ${errors.location ? "border-red-500" : "border-gray-200"} px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:shadow-md transition-all duration-200 text-gray-700`}
                placeholder="e.g., Bengaluru, India"
                aria-invalid={!!errors.location}
                aria-describedby={errors.location ? "location-error" : undefined}
              />
              {errors.location && (
                <p id="location-error" className="mt-1 text-xs text-red-500">{errors.location}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-900">Job Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-200 px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:shadow-md transition-all duration-200 text-gray-700 bg-white"
                aria-describedby="job-type-description"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
                <option value="remote">Remote</option>
              </select>
              <p id="job-type-description" className="mt-1 text-xs text-gray-500">Select the type of employment</p>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-900">Skills</label>
              <input
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
                className={`w-full border ${errors.skills ? "border-red-500" : "border-gray-200"} px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:shadow-md transition-all duration-200 text-gray-700`}
                placeholder="e.g., Autocad, Solidworks, Project Management"
                aria-invalid={!!errors.skills}
                aria-describedby={errors.skills ? "skills-error" : "skills-description"}
              />
              <p id="skills-description" className="mt-1 text-xs text-gray-500">Enter skills, separated by commas</p>
              {errors.skills && (
                <p id="skills-error" className="mt-1 text-xs text-red-500">{errors.skills}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-800 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            aria-label={loading ? "Posting job" : "Post job"}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Posting...
              </>
            ) : (
              "Post Job"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJob;