import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

const Suggestions = ({ suggestions, warning }) => {
  if (!suggestions || (suggestions.length === 0 && !warning)) return null;

  return (
    <div className="w-full mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {warning && (
        <div className="flex items-start text-red-600 dark:text-red-400 mb-2">
          <AlertTriangle className="w-5 h-5 mr-2 shrink-0" />
          <span className="text-sm font-medium">{warning}</span>
        </div>
      )}
      {suggestions.length > 0 && (
        <div>
          <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
            <Info className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Tips to improve:</span>
          </div>
          <ul className="list-disc pl-8 text-sm text-gray-600 dark:text-gray-400 space-y-1">
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Suggestions;
