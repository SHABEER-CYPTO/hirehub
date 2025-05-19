import React from 'react';

const Summary = ({ summaryPoints }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Resume Summary</h2>
      {summaryPoints.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2">
          {summaryPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      ) : (
        <p>No summary points extracted.</p>
      )}
    </div>
  );
};

export default Summary;