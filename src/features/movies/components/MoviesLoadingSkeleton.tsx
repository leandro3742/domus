import React from 'react';

export const MoviesLoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="space-y-4">
        {/* Header skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/6"></div>

        {/* Table skeleton */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-4 flex justify-between items-center">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            </div>

            {/* Table header skeleton */}
            <div className="mb-4 border-b border-gray-200 pb-3">
              <div className="flex items-center space-x-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                <div className="h-4 bg-gray-200 rounded w-1/5"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>

            {/* Table rows skeleton */}
            <div className="space-y-3">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="border-b border-gray-200 pb-3">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-16 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/5"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination skeleton */}
          <div className="border-t border-gray-200 px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="flex space-x-2">
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
