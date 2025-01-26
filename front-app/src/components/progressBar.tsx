import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className={`bg-[#FF6947] h-4 rounded-full transition-all`}
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};

export default ProgressBar;
