import React, { useRef } from 'react';

const FileUpload = ({ onFileUpload, loading }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && ['pdf', 'doc', 'docx'].includes(file.name.split('.').pop().toLowerCase())) {
      onFileUpload(file);
    } else {
      alert('Please upload a PDF, DOC, or DOCX file.');
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Resume
      </label>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={loading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {loading && (
        <div className="mt-4 flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-blue-500"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z" />
          </svg>
          <span>Analyzing...</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;