import React from 'react';

export const MoviesIsLoadingMoreSkeleton: React.FC = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <tr key={`skeleton-${index}`} className="animate-pulse">
          {/* Título */}
          <td className="px-6 py-4 whitespace-nowrap border-b">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </td>
          {/* Género */}
          <td className="px-6 py-4 whitespace-nowrap border-b">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </td>
          {/* Director */}
          <td className="px-6 py-4 whitespace-nowrap border-b">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </td>
          {/* Acciones (botón) */}
          <td className="px-6 py-4 whitespace-nowrap border-b">
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </td>
        </tr>
      ))}
    </>
  );
};
