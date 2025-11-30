import React, { useState, useEffect } from 'react';
import type { MoviesFiltersState, Range } from '../types';
import { MultiSelect } from './MultiSelect';
import { RangeSlider } from './YearRangeSlider';
import DirectorFilter from './DirectorFilter';

interface MoviesFiltersProps {
  onFilterChange: (filters: MoviesFiltersState) => void;
  initialFilters?: MoviesFiltersState;
  genreOptions: string[];
  directorOptions: string[];
}

export const MoviesFilters: React.FC<MoviesFiltersProps> = ({
  onFilterChange,
  initialFilters = { title: '', yearFrom: null, yearTo: null, genre: [], director: '' },
  genreOptions,
  directorOptions,
  // yearRange,
}) => {
  const [filters, setFilters] = useState<MoviesFiltersState>(initialFilters);
  const [yearRange, setYearRange] = useState<Range<number>>({ from: 1900, to: 2024 });
  // const [geatr]
  // Debounce the filter changes to avoid too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange(filters);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters, onFilterChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleYearRangeChange = (range: Range<number>) => {
    setYearRange(range);
    setFilters(prev => ({
      ...prev,
      yearFrom: range.from,
      yearTo: range.to,
    }));
  };
  const handleGenreChange = (selectedGenres: string[]) => {
    setFilters(prev => ({
      ...prev,
      genre: selectedGenres,
    }));
  };

  const handleDirectorChange = (director: string) => {
    setFilters(prev => ({
      ...prev,
      director,
    }));
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Filtros</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={filters.title}
            onChange={handleChange}
            placeholder="Buscar por título..."
            className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md shadow-sm p-2 border"
          />
        </div>
        
        <div>
          <RangeSlider
            label="Año (desde / hasta)"
            // min={yearRange.from}
            // max={yearRange.to}
            min={1900}
            max={2024}
            value={yearRange}
            onChange={handleYearRangeChange}
          />
        </div>

        <div>
          <MultiSelect
            label="Género"
            options={genreOptions}
            selected={filters.genre}
            onChange={handleGenreChange}
            placeholder="Seleccionar géneros..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Director
          </label>
          <DirectorFilter 
            directors={directorOptions}
            selectedDirector={filters.director}
            onDirectorChange={handleDirectorChange}
          />
        </div>
      </div>
    </div>
  );
};
