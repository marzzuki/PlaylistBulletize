import Input from "./Input";

const HeroSection = ({
    handleUrlChange,
    handlePlaylistInfo,
    playListInfo,
    handlePlaylistMeta,
}) => {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="w-full h-full bg-gradient-to-br from-indigo-100 via-white to-purple-100" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-indigo-100/40" />
            </div>

            <div className="relative z-10 container mx-auto px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <div className="mt-2 relative inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles w-4 h-4"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
                            <span>Transform YouTube Playlists Instantly</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
                            Convert Playlists to
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Beautiful Lists</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            Extract, format, and organize your YouTube playlists with filtering options and customizable outputs.
                        </p>
                    </div>

                    <Input
                        handleUrlChange={handleUrlChange}
                        handlePlaylistInfo={handlePlaylistInfo}
                        playListInfo={playListInfo}
                        handlePlaylistMeta={handlePlaylistMeta}
                        disableAutoMargin
                    />

                    <div className="grid md:grid-cols-3 gap-6 mt-10 max-w-3xl mx-auto">
                        {[{
                            title: "Smart Filtering",
                            desc: "Regex patterns for precise content extraction",
                        }, {
                            title: "Multiple Formats",
                            desc: "Bulleted, numbered, or custom outputs",
                        }, {
                            title: "Instant Results",
                            desc: "Fast processing with live preview",
                        }].map((feature, index) => (
                            <div key={index} className="text-center p-4 rounded-xl bg-white/60 backdrop-blur">
                                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                                <p className="text-sm text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
