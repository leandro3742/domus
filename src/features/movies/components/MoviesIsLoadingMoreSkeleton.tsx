import React from 'react';

export const MoviesIsLoadingMoreSkeleton: React.FC = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <tr key={`skeleton-${index}`} className="animate-pulse">
          <td className="px-6 py-4 whitespace-nowrap border-b">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap border-b">
            <div className="h-4 bg-gray-200 rounded w-12"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap border-b">
            <div className="h-4 bg-gray-200 rounded w-8"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap border-b">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap border-b">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap border-b">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap border-b">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap border-b">
            <div className="h-4 bg-gray-200 rounded w-40"></div>
          </td>
        </tr>
      ))}
    </>
  );
};
