
import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, disabled }) => {
  return (
    <div>
      <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
        Editing Prompt
      </label>
      <textarea
        id="prompt"
        rows={4}
        className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-brand-purple transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder="e.g., 'Add a cute wizard hat to the cat' or 'Change the background to a surreal, alien planet'..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default PromptInput;
