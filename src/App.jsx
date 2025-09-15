import { useState, useEffect, useRef } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Input from "./components/Input";
import HeroSection from "./components/HeroSection";
import Results from "./components/Results";
import Footer from "./components/Footer";
import KofiWidget from "./components/KofiWidget";

function App() {
  const [url, setUrl] = useState("");
  const [getPlaylistInfo, setPlaylistInfo] = useState([]);
  const [playlistMeta, setPlaylistMeta] = useState(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (getPlaylistInfo && getPlaylistInfo.length > 0) {
      const ta = document.getElementById('results-scroll');
      if (ta) {
        ta.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [getPlaylistInfo]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Navbar />
      <main className="flex-grow">
        <HeroSection
          handleUrlChange={setUrl}
          handlePlaylistInfo={setPlaylistInfo}
          playListInfo={getPlaylistInfo}
          handlePlaylistMeta={setPlaylistMeta}
        />
        <div ref={resultsRef} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {getPlaylistInfo.length > 0 && (
            <div className="mt-12">
              <Results list={getPlaylistInfo} playlistMeta={playlistMeta} />
            </div>
          )}
        </div>
      </main>
      <Footer />
      <KofiWidget />
    </div>
  );
}

export default App;