import React from "react";
import { useLocation } from "react-router-dom";

function PageLoader({ isVisible }) {
  const location = useLocation();
  const path = location.pathname;

  const renderHomeSkeleton = () => (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-12 md:mt-24">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 space-y-8">
          <div className="w-64 h-8 bg-black/5 dark:bg-white/5 rounded-full"></div>
          <div className="w-3/4 h-16 md:h-20 bg-black/10 dark:bg-white/10 rounded-2xl"></div>
          <div className="w-1/2 h-8 bg-black/10 dark:bg-white/10 rounded-xl"></div>
          <div className="w-full h-24 bg-black/5 dark:bg-white/5 rounded-2xl"></div>
          <div className="flex gap-4 pt-2">
            <div className="w-40 h-12 bg-black/10 dark:bg-white/10 rounded-xl shadow-lg"></div>
            <div className="w-40 h-12 bg-black/5 dark:bg-white/5 rounded-xl"></div>
          </div>
          <div className="w-48 h-6 bg-black/5 dark:bg-white/5 rounded-md mt-6"></div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(i => <div key={i} className="w-20 h-8 bg-black/5 dark:bg-white/5 rounded-full"></div>)}
          </div>
        </div>
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-[280px] h-[340px] md:w-[350px] md:h-[420px] rounded-3xl bg-black/10 dark:bg-white/10 shadow-2xl border border-black/5 dark:border-white/5"></div>
        </div>
      </div>
    </div>
  );

  const renderAboutSkeleton = () => (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-12 md:mt-24">
      <div className="text-center max-w-2xl mx-auto mb-20 space-y-4 flex flex-col items-center">
        <div className="w-64 h-12 md:h-16 bg-black/10 dark:bg-white/10 rounded-2xl"></div>
        <div className="w-96 h-5 bg-black/5 dark:bg-white/5 rounded-xl"></div>
      </div>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6 flex justify-center lg:justify-start w-full">
          <div className="w-full max-w-xl h-80 rounded-2xl bg-black/10 dark:bg-white/10 shadow-2xl border border-black/5 dark:border-white/5"></div>
        </div>
        <div className="lg:col-span-6 space-y-6">
          <div className="w-3/4 h-10 bg-black/10 dark:bg-white/10 rounded-xl"></div>
          <div className="w-full h-24 bg-black/5 dark:bg-white/5 rounded-2xl"></div>
          <div className="w-full h-24 bg-black/5 dark:bg-white/5 rounded-2xl"></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-24 rounded-xl bg-black/10 dark:bg-white/10 shadow-sm border border-black/5 dark:border-white/5"></div>)}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProjectsSkeleton = () => (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-12 md:mt-24">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 flex flex-col items-center">
        <div className="w-64 h-12 md:h-16 bg-black/10 dark:bg-white/10 rounded-2xl"></div>
        <div className="w-96 h-5 bg-black/5 dark:bg-white/5 rounded-xl"></div>
      </div>
      <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="w-full md:max-w-sm h-12 bg-black/10 dark:bg-white/10 rounded-full shadow-sm"></div>
        <div className="flex flex-wrap gap-2 justify-center">
          {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-24 h-10 rounded-full bg-black/10 dark:bg-white/10 shadow-sm"></div>)}
        </div>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-96 rounded-2xl bg-black/10 dark:bg-white/10 shadow-lg border border-black/5 dark:border-white/5"></div>)}
      </div>
    </div>
  );

  const renderContactSkeleton = () => (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-12 md:mt-24">
      <div className="text-center max-w-2xl mx-auto mb-20 space-y-4 flex flex-col items-center">
        <div className="w-80 h-12 md:h-16 bg-black/10 dark:bg-white/10 rounded-2xl"></div>
        <div className="w-96 h-5 bg-black/5 dark:bg-white/5 rounded-xl"></div>
      </div>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 max-w-6xl mx-auto items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="w-full h-80 bg-black/5 dark:bg-white/5 rounded-3xl shadow-sm border border-black/5 dark:border-white/5"></div>
          <div className="w-full h-32 bg-black/5 dark:bg-white/5 rounded-3xl shadow-sm border border-black/5 dark:border-white/5"></div>
          <div className="w-full h-32 bg-black/5 dark:bg-white/5 rounded-3xl shadow-sm border border-black/5 dark:border-white/5"></div>
        </div>
        <div className="lg:col-span-7">
          <div className="w-full h-[550px] rounded-3xl bg-black/10 dark:bg-white/10 shadow-lg border border-black/5 dark:border-white/5"></div>
        </div>
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (path) {
      case "/":
        return renderHomeSkeleton();
      case "/about":
        return renderAboutSkeleton();
      case "/projects":
        return renderProjectsSkeleton();
      case "/contact":
        return renderContactSkeleton();
      default:
        return renderHomeSkeleton();
    }
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 flex flex-col justify-start overflow-y-auto pt-4 md:pt-8 pb-24
        bg-[var(--bg-main)]
        transition-opacity duration-500 ease-in-out
        ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
    >
      <div className="w-full animate-pulse">
        {renderSkeleton()}
      </div>
    </div>
  );
}

export default PageLoader;
