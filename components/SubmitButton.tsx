
import React from 'react';

interface SubmitButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isDisabled: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, isLoading, isDisabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || isDisabled}
      className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-brand-purple to-brand-accent hover:from-brand-accent hover:to-brand-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-purple disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating...
        </>
      ) : (
        'Generate Image'
      )}
    </button>
  );
};

export default SubmitButton;
