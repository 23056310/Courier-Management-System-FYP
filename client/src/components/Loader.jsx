import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-md z-[9999]">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-primary/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-4 bg-primary/5 rounded-full flex items-center justify-center font-black text-primary italic text-xl">
            CMS
          </div>
        </div>
        
        <h2 className="text-2xl font-black text-gray-900 mb-2 italic tracking-tighter uppercase">
          Initializing <span className="text-primary">Systems.</span>
        </h2>
        <div className="flex items-center justify-center gap-1">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;