import React from 'react';

export const DirectorsHeader: React.FC = () => {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold text-gray-900">Directores</h1>
      <p className="text-gray-600">
        Filtra y visualiza los directores por cantidad de películas.
      </p>
    </div>
  );
};
