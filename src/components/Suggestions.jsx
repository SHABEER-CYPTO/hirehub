import React from 'react';

const Suggestions = ({ suggestions }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Suggestions for Improvement</h2>
      {suggestions.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      ) : (
        <p>No suggestions available. Your resume looks great!</p>
      )}
    </div>
  );
};

export default Suggestions;