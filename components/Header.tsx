
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-pink-500">
        AI Image Editor
      </h1>
      <p className="mt-2 text-lg text-gray-400">
        Powered by Gemini Nano Banana
      </p>
    </header>
  );
};

export default Header;
