import React, { useState, useEffect } from "react";
import { useAuth } from "../components/auth/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobPreference: "Full-time",
    resume: null,
    profilePic: null,
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // ✅ Fetch profile from backend on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setFormData((prev) => ({
            ...prev,
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            jobPreference: data.job_preference || "Full-time",
          }));
          setProfilePreview(data.profile_pic_url);
          setResumeName(data.resume_url?.split("/").pop() || "");
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    if (user?.token) fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePic" && files.length) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, profilePic: file }));
      setProfilePreview(URL.createObjectURL(file));
    } else if (name === "resume" && files.length) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, resume: file }));
      setResumeName(file.name);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("job_preference", formData.jobPreference);
    if (formData.resume) form.append("resume", formData.resume);
    if (formData.profilePic) form.append("profile_pic", formData.profilePic);

    try {
      const response = await fetch("http://localhost:8000/api/profile/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: form,
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage("✅ Profile updated successfully.");
      } else {
        setStatusMessage(`❌ Error: ${data.detail}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setStatusMessage("❌ Something went wrong.");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your profile?");
    if (!confirmed) return;

    try {
      const res = await fetch("http://localhost:8000/api/profile", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (res.ok) {
        alert("Profile deleted.");
        logout();
      }
    } catch (err) {
      alert("Failed to delete profile.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Pic */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
            <img
              src={profilePreview || "https://www.w3schools.com/w3images/avatar2.png"}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            name="profilePic"
            onChange={handleChange}
            className="text-sm"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-600 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-600 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-600 font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Job Preference */}
        <div>
          <label className="block text-gray-600 font-medium">Job Preference</label>
          <select
            name="jobPreference"
            value={formData.jobPreference}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Remote</option>
            <option>Hybrid</option>
          </select>
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Upload Resume
          </label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="text-sm"
          />
          {resumeName && (
            <p className="mt-1 text-green-600 text-sm">
              Selected: {resumeName}
              {!formData.resume && (
                <>
                  {" | "}
                  <a
                    href={`http://localhost:8000/uploads/profile/${resumeName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 underline ml-2"
                  >
                    View Resume
                  </a>
                </>
              )}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="text-right flex justify-between items-center">
          <button
            type="button"
            onClick={handleDelete}
            className="text-red-500 underline"
          >
            Delete Profile
          </button>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow"
          >
            Save Changes
          </button>
        </div>

        {statusMessage && (
          <p className="mt-4 text-center text-sm text-blue-600">{statusMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Profile;
