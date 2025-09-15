import { useState } from "react";

const KofiWidget = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 z-10">
            {/* Ko-fi link with image */}
            <a
                href="https://ko-fi.com/W7W41IRUAR"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block"
            >
                <img
                    height="48"
                    style={{ border: 0, height: "48px" }}
                    src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
                    alt="Buy Me a Coffee at ko-fi.com"
                />

                {/* Close button overlayed in top-right of the image */}
                <button
                    onClick={(e) => {
                        e.preventDefault(); // prevent clicking the link when closing
                        setIsVisible(false);
                    }}
                    className="absolute -top-2 -right-2 bg-white rounded-full text-gray-600 hover:text-red-500 shadow-md w-6 h-6 flex items-center justify-center text-sm"
                >
                    ✕
                </button>
            </a>
        </div>
    );
};

export default KofiWidget;
