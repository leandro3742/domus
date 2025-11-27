import React from 'react';

export const MoviesHeader: React.FC = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Catálogo de Películas
      </h1>
      <p className="mt-2 text-gray-600">
        Explora nuestra colección de películas con información detallada
      </p>
    </div>
  );
};
