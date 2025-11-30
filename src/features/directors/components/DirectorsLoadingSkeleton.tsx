import React from 'react';

export const DirectorsLoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4 sm:space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div className="h-6 bg-gray-200 rounded w-32 sm:w-40" />
        <div className="h-4 bg-gray-200 rounded w-40 sm:w-56" />
      </div>

      {/* Filters card skeleton */}
      <div className="bg-white shadow rounded-lg w-full">
        <div className="px-4 py-4 sm:p-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:space-x-4">
          <div className="flex-1 flex flex-col space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3 sm:w-1/4" />
            <div className="h-9 bg-gray-200 rounded w-full" />
          </div>
          <div className="w-full sm:w-auto">
            <div className="h-10 bg-gray-200 rounded w-full sm:w-32" />
          </div>
        </div>
      </div>

      {/* Table card skeleton */}
      <div className="bg-white shadow rounded-lg w-full">
        <div className="px-3 py-4 sm:px-4 sm:py-5 space-y-4">
          {/* Table header */}
          <div className="flex space-x-4">
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>

          {/* Table rows */}
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex space-x-4">
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-1/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
