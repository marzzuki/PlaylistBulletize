import React, { useState } from "react";
import toast from "react-hot-toast";
import { useVideoDetails } from "../hooks/useVideoDurations";
import { useProcessedList } from "../hooks/useProcessedList";
import { formatList } from "../utils/formatters";

const Results = ({ list, playlistMeta }) => {
  const [listType, setListType] = useState("bulleted");
  const [customPrefix, setCustomPrefix] = useState("");
  const [ProgrammingBrackets, setProgrammingBrackets] = useState("[]");
  const [checkedReverse, setCheckedReverse] = useState(false);
  const [checkedRemovePriv, setCheckedRemovePriv] = useState(false);
  const [checkedRemoveDuplicates, setCheckedRemoveDuplicates] = useState(false);
  const [includeUrl, setIncludeUrl] = useState(false);
  const [regexFilter, setRegexFilter] = useState("");
  const [negateRegex, setNegateRegex] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [urlOnly, setUrlOnly] = useState(false);
  const [showChannelName, setShowChannelName] = useState(false);
  const [copied, setCopied] = useState(false);

  const videoDetails = useVideoDetails(list);
  const processedList = useProcessedList(list, {
    checkedRemovePriv,
    checkedRemoveDuplicates,
    checkedReverse,
    regexFilter,
    negateRegex,
    showDuration,
  });

  const getFormattedList = (includeHtml = true) => {
    return formatList(processedList, {
      includeHtml,
      includeUrl,
      showDuration,
      listType,
      customPrefix,
      ProgrammingBrackets,
      videoDetails,
      urlOnly,
      showChannelName,
    });
  };

  const plainTextResults = () => getFormattedList(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(plainTextResults());
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      toast.error("Copy failed. Please copy manually.");
    }
  };

  const downloadResults = () => {
    const element = document.createElement('a');
    const file = new Blob([plainTextResults()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'playlist-bulletized.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Formatting Card */}
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-md ring-1 ring-gray-200/60 transition-shadow hover:shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V22a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 8 20.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 3.4 16a1.65 1.65 0 0 0-1.51-1H1a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 2.6 8a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 6 3.6 1.65 1.65 0 0 0 7 2.09V2a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 20.4 8c0 .49.2.96.55 1.31.35.35.82.55 1.31.55H22a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" /></svg>
              <h3 className="font-semibold text-gray-900 text-lg">Formatting</h3>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                {["none", "bulleted", "numbered", "Programming"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="listType"
                      value={type}
                      checked={listType === type}
                      onChange={() => setListType(type)}
                      className="mr-2 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                    />
                    <span className="text-gray-700 capitalize">{type}</span>
                  </label>
                ))}
              </div>
              {listType !== "Programming" && (
                <div className="pt-2 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Custom Prefix</label>
                  <input
                    type="text"
                    value={customPrefix}
                    onChange={(e) => setCustomPrefix(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                    placeholder={
                      listType === "numbered"
                        ? "1. "
                        : listType === "bulleted"
                          ? "- "
                          : "Enter prefix"
                    }
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {listType === "numbered"
                      ? "Will be prepended to the number, e.g. 'Chapter 1. '"
                      : listType === "bulleted"
                        ? "Will replace the default bullet point"
                        : "Will be prepended to each item"}
                  </p>
                </div>
              )}
              {listType === "Programming" && (
                <div className="pt-2 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Programming Brackets</label>
                  <input
                    type="text"
                    value={ProgrammingBrackets}
                    onChange={(e) => setProgrammingBrackets(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                    placeholder="[]"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Enter the opening and closing brackets, e.g. '[]' for list,
                    '()' for tuple
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Options Card */}
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-md ring-1 ring-gray-200/60 transition-shadow hover:shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><polygon points="22 3 13 14 8 8 2 16 22 16" /></svg>
              <h3 className="font-semibold text-gray-900 text-lg">Options</h3>
            </div>
            <div className="space-y-4">
              {[
                {
                  label: "Reverse Order",
                  state: checkedReverse,
                  setState: setCheckedReverse,
                },
                {
                  label: "Remove Deleted/Private Videos",
                  state: checkedRemovePriv,
                  setState: setCheckedRemovePriv,
                },
                {
                  label: "Remove Duplicates",
                  state: checkedRemoveDuplicates,
                  setState: setCheckedRemoveDuplicates,
                },
                {
                  label: "Include Video URL",
                  state: includeUrl,
                  setState: setIncludeUrl,
                },
                {
                  label: "Show Duration",
                  state: showDuration,
                  setState: setShowDuration,
                },
                {
                  label: "Show Channel Name",
                  state: showChannelName,
                  setState: setShowChannelName,
                },
                {
                  label: "URLs only",
                  state: urlOnly,
                  setState: setUrlOnly,
                },
              ].map(({ label, state, setState }) => (
                <label key={label} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state}
                    onChange={() => setState(!state)}
                    className="mr-2 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  />
                  <span className="text-gray-700">{label}</span>
                </label>
              ))}

            </div>
          </div>
        </div>

        {/* Regex Filter Card */}
        <div className="mb-8">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-md ring-1 ring-gray-200/60 transition-shadow hover:shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-semibold text-gray-900 text-lg">Regex Filter</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pattern</label>
                <input
                  type="text"
                  value={regexFilter}
                  onChange={(e) => setRegexFilter(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                  placeholder="Enter regex pattern"
                />
                <p className="mt-1 text-sm text-gray-500">Filter video titles using a regular expression</p>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={negateRegex}
                  onChange={() => setNegateRegex(!negateRegex)}
                  className="mr-2 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  id="regex-checkbox"
                />
                <label htmlFor="regex-checkbox" className="text-gray-700 cursor-pointer select-none">Invert Regex</label>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section - Card UI */}
        {processedList.length > 0 && (
          <section className="mt-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-md ring-1 ring-gray-200/60">
              <div className="px-6 pt-6 pb-4 border-b border-gray-200/70">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Results</h3>
                  {playlistMeta && (
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{playlistMeta.title}</p>
                      {playlistMeta.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">{playlistMeta.description}</p>
                      )}
                    </div>
                  )}
                  <div className="text-left mt-2" id="results-scroll">
                    <p className="text-sm text-green-600 font-medium">
                      Found <span className="font-bold">{processedList.length}</span> {processedList.length === 1 ? 'Video' : 'Videos'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-6 space-y-4">
                <textarea
                  readOnly
                  value={plainTextResults()}
                  className="w-full min-h-[400px] bg-white rounded-md border border-gray-300 p-4 font-mono text-sm resize-none focus:outline-none"
                  placeholder="Results will appear here..."
                />

                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-indigo-600 hover:text-white transition"
                  >
                    {copied ? (
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" /></svg>
                    ) : (
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                    )}
                    {copied ? 'Copied!' : 'Copy To Clipboard'}
                  </button>
                  <button
                    onClick={downloadResults}
                    className="flex-1 inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 transition"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    Download
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Results;
