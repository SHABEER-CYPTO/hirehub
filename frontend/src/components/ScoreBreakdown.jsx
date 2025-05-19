import React from 'react';

const ScoreBreakdown = ({ scores }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Score Breakdown</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Total Score: {scores.score}/100
          </label>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${scores.score}%` }}
            ></div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Length Score: {scores.length_score}/25
          </label>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-600 h-4 rounded-full"
              style={{ width: `${(scores.length_score / 25) * 100}%` }}
            ></div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Skills Score: {scores.skills_score}/50
          </label>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-yellow-600 h-4 rounded-full"
              style={{ width: `${(scores.skills_score / 50) * 100}%` }}
            ></div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Grammar Score: {scores.grammar_score}/25
          </label>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-red-600 h-4 rounded-full"
              style={{ width: `${(scores.grammar_score / 25) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBreakdown;