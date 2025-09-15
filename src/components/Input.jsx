import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Input = ({ handleUrlChange, handlePlaylistInfo, playListInfo, handlePlaylistMeta, disableAutoMargin = false }) => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isTop, setIsTop] = useState(false);
  const [playlistMeta, setPlaylistMeta] = useState(null);

  const playlistRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?youtube\.com\/(?:playlist\?list=|watch\?v=\w+&list=)([a-zA-Z0-9_-]+)/;

  const isValidYouTubePlaylistUrl = (url) => {
    const result = playlistRegex.exec(url);
    return result
      ? { valid: true, playlistId: result[1] }
      : { valid: false, playlistId: "" };
  };

  useEffect(() => {
    if (isValidYouTubePlaylistUrl(text).valid) {
      const id = playlistRegex.exec(text)[1];
      setText(`https://www.youtube.com/playlist?list=${id}`);
    }
  }, [text]);

  const extractPlaylistId = (url) => {
    // Try to extract playlist ID from various YouTube playlist URL formats
    const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : '';
  };

  const handleChange = (e) => {
    setText(e.target.value);
    handleUrlChange(e.target.value);
    setPlaylistMeta(null); // Reset meta on input change
  };

  const getPlaylistMeta = async (playlistId) => {
    try {
      const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;
      const response = await axios.get(url);
      const meta = response?.data?.items?.[0]?.snippet;
      if (meta) {
        const metaData = {
          title: meta.title,
          description: meta.description,
          image: meta.thumbnails?.high?.url || meta.thumbnails?.default?.url || '',
        };
        setPlaylistMeta(metaData);
        handlePlaylistMeta(metaData);
      } else {
        setPlaylistMeta(null);
        handlePlaylistMeta(null);
      }
    } catch (e) {
      setPlaylistMeta(null);
      handlePlaylistMeta(null);
    }
  };

  const getPlaylistData = async (nextPageToken, ct = 0) => {
    try {
      setIsLoading(true);
      const playlistId = extractPlaylistId(text);
      if (!playlistId) {
        setIsLoading(false);
        setError('Invalid playlist URL');
        setPlaylistMeta(null);
        handlePlaylistMeta(null);
        return;
      }
      if (ct === 0) {
        await getPlaylistMeta(playlistId);
      }
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}` +
        `&key=${import.meta.env.VITE_YOUTUBE_API_KEY}` +
        `&maxResults=50&part=snippet,id${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
      const response = await axios.get(url);
      const playlistData = response?.data.items;
      setIsLoading(false);
      if (playlistData.length > 0) {
        handlePlaylistInfo((prev) => [...prev, ...playlistData]);
        setError("");
        setIsTop(true);
      } else {
        handlePlaylistInfo([]);
        setError("Playlist Not Found");
      }
      if (response.data.nextPageToken && ct < 100) {
        getPlaylistData(response.data.nextPageToken, ct + 1);
      }
    } catch (error) {
      setIsLoading(false);
      setError("An error occurred while fetching the playlist");
      setPlaylistMeta(null);
      handlePlaylistMeta(null);
    }
  };

  return (
    <div
      className={`flex flex-col items-center px-4 transition-all duration-500 ease-in-out ${disableAutoMargin ? "mt-0" : (isTop ? "mt-12" : "mt-[30vh]")
        }`}
    >
      <div className="w-full max-w-2xl">
        <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-md ring-1 ring-gray-200/60 transition-shadow hover:shadow-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              getPlaylistData("");
              handlePlaylistInfo([]);
            }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="url"
                  value={text}
                  placeholder="Paste YouTube Playlist URL"
                  onChange={handleChange}
                  className={`w-full h-12 px-4 text-base text-gray-800 bg-white border rounded-md focus:outline-none focus:ring-2 transition-all duration-300 ${!playlistRegex.test(text)
                    ? "focus:ring-red-300 border-red-300"
                    : "focus:ring-indigo-300 border-gray-300 focus:border-indigo-400"
                    } shadow-sm`}
                />
                {error && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>
                    {error}
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={!playlistRegex.test(text) || isLoading}
                className="h-12 px-8 bg-indigo-600 text-white rounded-md text-base font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all inline-flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Getting...
                  </span>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
                    Get Playlist
                  </>
                )}
              </button>
            </div>

            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>
              URL must contain '&list=' or 'playlist?list=' parameter
            </p>
          </form>
        </div>
        <div
          className={`mt-4 text-center transition-all duration-300 ${error ? "text-red-500" : "text-gray-600"
            }`}
        >
        </div>

      </div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#4338CA",
            color: "#ffffff",
            padding: "16px",
            borderRadius: "9999px",
          },
        }}
      />
    </div >
  );
};

export default Input;