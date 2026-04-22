import React from 'react';

const StrengthMeter = ({ score, crackTime }) => {
  const getMeterColor = () => {
    switch (score) {
      case 0:
      case 1:
        return 'bg-red-500'; // Weak
      case 2:
        return 'bg-yellow-500'; // Medium
      case 3:
        return 'bg-green-500'; // Strong
      case 4:
        return 'bg-green-700'; // Very Strong
      default:
        return 'bg-gray-300 dark:bg-gray-600';
    }
  };

  const getStrengthLabel = () => {
    switch (score) {
      case 0:
      case 1:
        return 'Weak';
      case 2:
        return 'Medium';
      case 3:
        return 'Strong';
      case 4:
        return 'Very Strong';
      default:
        return 'Too Short';
    }
  };

  const meterWidth = `${(score === 0 ? 1 : score) * 25}%`;

  return (
    <div className="w-full mt-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Strength: <span className="font-bold">{getStrengthLabel()}</span>
        </span>
        {crackTime && crackTime !== "Instant" && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Estimated crack time: {crackTime}
          </span>
        )}
      </div>
      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${getMeterColor()} transition-all duration-500 ease-out`}
          style={{ width: meterWidth }}
        ></div>
      </div>
    </div>
  );
};

export default StrengthMeter;
