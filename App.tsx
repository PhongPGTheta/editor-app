import React, { useState, useCallback } from 'react';
import { editImageWithGemini, translateToEnglish } from './services/geminiService';
import type { EditedResult } from './types';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import PromptInput from './components/PromptInput';
import SubmitButton from './components/SubmitButton';
import ResultDisplay from './components/ResultDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [editedResult, setEditedResult] = useState<EditedResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (file: File | null) => {
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setEditedResult(null);
      setError(null);
    }
  };

  const handleSubmit = useCallback(async () => {
    if (!imageFile || !prompt) {
      setError('Please upload an image and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedResult(null);

    try {
      const translatedPrompt = await translateToEnglish(prompt);
      const result = await editImageWithGemini(translatedPrompt, imageFile);
      setEditedResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to process request: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-6xl">
        <Header />

        <main className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-800/50 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-700">
          {/* Input Column */}
          <div className="flex flex-col space-y-6">
            <ImageUpload onImageChange={handleImageChange} previewUrl={previewUrl} />
            <PromptInput value={prompt} onChange={setPrompt} disabled={isLoading} />
            <SubmitButton onClick={handleSubmit} isLoading={isLoading} isDisabled={!imageFile || !prompt} />
          </div>

          {/* Output Column */}
          <div className="flex items-center justify-center bg-gray-900/50 rounded-lg p-4 min-h-[400px] border border-gray-700">
            {isLoading && <LoadingSpinner />}
            {error && !isLoading && <ErrorMessage message={error} />}
            {editedResult && !isLoading && !error && (
              <ResultDisplay
                editedImageUrl={editedResult.image}
                responseText={editedResult.text}
              />
            )}
            {!isLoading && !error && !editedResult && (
              <div className="text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-sm">Your edited image will appear here.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;