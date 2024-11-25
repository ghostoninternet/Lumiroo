import React from "react";
import PlaygroundInfoCard from "../Card/PlaygroundInfoCard";

const ResultsGrid = ({ results }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {results.map((item, index) => (
        <PlaygroundInfoCard key={index} data={item} />
      ))}
    </div>
  );
};

export default ResultsGrid;
