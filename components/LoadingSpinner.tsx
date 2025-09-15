
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-purple"></div>
      <p className="mt-4 text-lg font-semibold text-gray-300">AI is working its magic...</p>
      <p className="text-sm text-gray-500">This can take a moment.</p>
    </div>
  );
};

export default LoadingSpinner;
