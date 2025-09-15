import React from 'react';

interface ResultDisplayProps {
  editedImageUrl: string | null;
  responseText: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ editedImageUrl, responseText }) => {
  return (
    <div className="w-full max-w-md flex flex-col space-y-4 animate-fade-in">
      {editedImageUrl ? (
        <div className="relative w-full aspect-square bg-black rounded-lg overflow-hidden shadow-lg border border-gray-700 group">
          <img src={editedImageUrl} alt="Edited result" className="w-full h-full object-contain" />
          <a
            href={editedImageUrl}
            download="edited-image.png"
            className="absolute top-2 right-2 p-2 bg-gray-900/50 rounded-full text-white hover:bg-brand-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Download edited image"
            title="Download edited image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full aspect-square bg-gray-800 rounded-lg p-4 border border-gray-700">
          <p className="text-gray-500">No image was generated.</p>
        </div>
      )}
      {responseText && (
        <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700">
          <h4 className="font-semibold text-brand-purple mb-1">AI Response:</h4>
          <p className="text-sm text-gray-300">{responseText}</p>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;