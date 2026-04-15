import React from "react";

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">

      <div className="text-center">

        {/* SPINNER */}
        <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

        {/* TEXT */}
        <h2 className="mt-4 text-blue-600 font-bold text-lg">
          Loading Courier MS...
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Please wait while we fetch your data
        </p>

      </div>

    </div>
  );
}

export default Loader;