import React, { useState, useEffect } from "react";

const FloatingWhatsApp = () => {
  const [visible, setVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const whatsappNumber = "8801839524426";
  const message = "Hello! I'm interested in your services.";

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 300);
    const t2 = setTimeout(() => setTooltipVisible(true), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end gap-3 pointer-events-none">
      {/* Tooltip */}
      <div
        className={`
          hidden md:block bg-white px-4 py-2 rounded-lg shadow-xl border border-emerald-100
          transition-all duration-500
          ${tooltipVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}
        `}
      >
        <p className="text-emerald-800 text-sm font-medium">
          Need help? Chat with us!
        </p>
      </div>

      {/* Button */}
      <button
        onClick={handleClick}
        aria-label="Chat on WhatsApp"
        className={`
          pointer-events-auto relative group
          transition-all duration-500
          ${visible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 -rotate-45"}
        `}
      >
        {/* Ping ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 animate-ping group-hover:animate-none" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-40 animate-pulse group-hover:animate-none" />

        {/* Body */}
        <div className="relative h-12 w-12 sm:h-16 sm:w-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 group-hover:bg-[#20bd5c] group-hover:scale-110 group-hover:rotate-6 group-active:scale-90">
          <svg
            className="w-6 h-6 sm:w-9 sm:h-9 text-white"
            viewBox="0 0 32 32"
            fill="currentColor"
          >
            <path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.61 4.56 1.77 6.54L3 29l6.63-1.74A13 13 0 0016 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.8a10.76 10.76 0 01-5.52-1.52l-.4-.24-4.1 1.08 1.1-3.98-.26-.41A10.77 10.77 0 0116 5.2c5.95 0 10.8 4.85 10.8 10.8S21.95 26.8 16 26.8zm5.9-8.08c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.52-.16-.73.16-.22.32-.84 1.04-1.03 1.26-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.9-1.8-2.22-.18-.32-.02-.5.14-.66.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.85.4-.3.32-1.12 1.1-1.12 2.67s1.15 3.1 1.31 3.32c.16.21 2.26 3.46 5.48 4.85.77.33 1.37.53 1.83.68.77.24 1.47.21 2.03.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.3-.21-.62-.37z" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
