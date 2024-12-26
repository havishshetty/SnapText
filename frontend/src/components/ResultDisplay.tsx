import React from "react";

interface ResultDisplayProps {
  result: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  return (
    <div className="result">
      <h2 className="result__header">Response:</h2>
      <div className="result__content">
        <p className="result__text">{result || "No result yet."}</p>
      </div>
    </div>
  );
};

export default ResultDisplay;