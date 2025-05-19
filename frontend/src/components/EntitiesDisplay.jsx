import React from 'react';

const EntitiesDisplay = ({ entities, skills }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Extracted Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p><strong>Name:</strong> {entities.name || 'Not found'}</p>
          <p><strong>Email:</strong> {entities.email || 'Not found'}</p>
          <p><strong>Phone:</strong> {entities.phone || 'Not found'}</p>
          <p><strong>Location:</strong> {entities.location || 'Not found'}</p>
        </div>
        <div>
          <p><strong>Education:</strong></p>
          <ul className="list-disc pl-5">
            {entities.education.length > 0
              ? entities.education.map((edu, index) => <li key={index}>{edu}</li>)
              : <li>Not found</li>}
          </ul>
          <p><strong>Companies:</strong></p>
          <ul className="list-disc pl-5">
            {entities.companies.length > 0
              ? entities.companies.map((comp, index) => <li key={index}>{comp}</li>)
              : <li>Not found</li>}
          </ul>
        </div>
      </div>
      <p><strong>Skills:</strong></p>
      <div className="flex flex-wrap gap-2 mt-2">
        {skills.length > 0
          ? skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded"
              >
                {skill}
              </span>
            ))
          : <p>Not found</p>}
      </div>
    </div>
  );
};

export default EntitiesDisplay;