import React from "react";

const Loader = ({ size = "md", fullScreen = false }) => {
  const sizeMap = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "h-screen w-full" : "h-full w-full"
      }`}
    >
      <div
        className={`border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin ${
          sizeMap[size] || sizeMap.md
        }`}
      />
    </div>
  );
};

export default Loader;
