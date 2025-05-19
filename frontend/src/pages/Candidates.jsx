import React, { useState } from "react";
import { Search } from "lucide-react";

const mockCandidates = [
  {
    id: 1,
    name: "Aisha Thomas",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    experience: "2 years",
    location: "Bangalore",
  },
  {
    id: 2,
    name: "Rahul Dev",
    skills: ["Python", "Machine Learning", "SQL"],
    experience: "1 year",
    location: "Remote",
  },
  {
    id: 3,
    name: "Sneha Rao",
    skills: ["UI/UX", "Figma", "Adobe XD"],
    experience: "3 years",
    location: "Chennai",
  },
];

const Candidates = () => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(mockCandidates);

  const handleSearch = () => {
    const lower = query.toLowerCase();
    const result = mockCandidates.filter(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        c.skills.some((s) => s.toLowerCase().includes(lower)) ||
        c.location.toLowerCase().includes(lower) ||
        c.experience.toLowerCase().includes(lower)
    );
    setFiltered(result);
  };

  return (
    <div className="ml-[250px] p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Search size={26} />
        Filter Candidates
      </h1>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by skill, location, or experience..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700"
        >
          Search
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-600">No candidates match your search.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white shadow rounded-lg p-5 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{candidate.name}</h2>
                <p className="text-sm text-gray-600">
                  {candidate.experience} | {candidate.location}
                </p>
                <p className="text-sm mt-1 text-gray-700">
                  Skills: {candidate.skills.join(", ")}
                </p>
              </div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Candidates;
