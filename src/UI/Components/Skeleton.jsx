import React from "react";

export const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse rounded bg-black/10 dark:bg-white/10 ${className}`}
      {...props}
    />
  );
};

export const CardSkeleton = () => {
  return (
    <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 glass-panel h-full flex flex-col">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 space-y-4 flex-grow">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
};
