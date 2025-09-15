const Navbar = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ background: "linear-gradient(135deg, #6366F1 0%, #A78BFA 100%)" }}>
            {/* Play Icon */}
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white fill-white"
            >
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </div>
          <div className="flex flex-col">
            <a href="/" className="text-xl font-bold text-gray-900">PlaylistBulletize</a>
            <p className="text-xs text-gray-500">YouTube Playlist Formatter</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-2">
          <IconButton href="https://github.com/TopVirusMinus/PlaylistBulletize" label="GitHub">
            <svg viewBox="0 0 16 16" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </IconButton>
          <IconButton href="https://www.linkedin.com/in/mustafa-marzouk-273b951a9/" label="LinkedIn">
            <svg viewBox="0 0 34 34" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path d="M34,2.5v29A2.5,2.5,0,0,1,31.5,34H2.5A2.5,2.5,0,0,1,0,31.5V2.5A2.5,2.5,0,0,1,2.5,0h29A2.5,2.5,0,0,1,34,2.5ZM10,13H5V29h5Zm.45-5.5A2.88,2.88,0,0,0,7.59,4.6H7.5a2.9,2.9,0,0,0,0,5.8h0a2.88,2.88,0,0,0,2.95-2.81ZM29,19.28c0-4.81-3.06-6.68-6.1-6.68a5.7,5.7,0,0,0-5.06,2.58H17.7V13H13V29h5V20.49a3.32,3.32,0,0,1,3-3.58h.19c1.59,0,2.77,1,2.77,3.52V29h5Z" />
            </svg>
          </IconButton>
          <IconButton href="https://youtu.be/E4y0oxfwijA?si=cQ47N0hDZiLjY7tG" label="YouTube">
            <svg viewBox="0 0 16 16" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
            </svg>
          </IconButton>
        </div>
      </div>
    </header>
  );
};

const IconButton = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:text-indigo-700 hover:bg-gray-100 transition transform hover:scale-[1.03]"
    aria-label={label}
  >
    {children}
    <span className="sr-only">{label}</span>
  </a>
);

export default Navbar;
