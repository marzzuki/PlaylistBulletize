import React, { useState, useEffect } from "react";

const ApiKeyInput = ({ onApiKeyChange }) => {
  const [apiKey, setApiKey] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    // Load API key from localStorage on mount
    const savedApiKey = localStorage.getItem("userYouTubeApiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      onApiKeyChange(savedApiKey);
    }
  }, []);

  const handleApiKeyChange = (e) => {
    const newApiKey = e.target.value;
    setApiKey(newApiKey);
    
    // Save to localStorage
    if (newApiKey.trim()) {
      localStorage.setItem("userYouTubeApiKey", newApiKey.trim());
      onApiKeyChange(newApiKey.trim());
    } else {
      localStorage.removeItem("userYouTubeApiKey");
      onApiKeyChange("");
    }
  };

  const clearApiKey = () => {
    setApiKey("");
    localStorage.removeItem("userYouTubeApiKey");
    onApiKeyChange("");
  };

  return (
    <div className="mt-6 max-w-2xl mx-auto">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="16" y2="12"></line>
            <line x1="12" x2="12.01" y1="8" y2="8"></line>
          </svg>
          <div className="flex-1">
            <p className="text-sm text-blue-800 mb-2">
              <strong>Need to access private playlists?</strong> Add your own YouTube API key to access your private playlists.
            </p>
            <button
              onClick={() => setShowInput(!showInput)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium underline"
            >
              {showInput ? "Hide API Key Input" : "Add Custom API Key"}
            </button>
          </div>
        </div>
        
        {showInput && (
          <div className="mt-4 space-y-3">
            <div>
              <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-1">
                YouTube API Key
              </label>
              <div className="flex gap-2">
                <input
                  id="api-key"
                  type="text"
                  value={apiKey}
                  onChange={handleApiKeyChange}
                  placeholder="Enter your YouTube API key"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {apiKey && (
                  <button
                    onClick={clearApiKey}
                    className="px-3 py-2 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:bg-red-50 transition"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Get your API key from the{" "}
              <a
                href="https://console.developers.google.com/apis/credentials"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Google Cloud Console
              </a>
              . Your API key is stored locally in your browser and never sent to our servers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiKeyInput;
