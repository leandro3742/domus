import React from 'react';
import { useFilteredMovies } from './hooks/useMovies';
import { MoviesTable } from './components/MoviesTable';
import { MoviesError } from './components/MoviesError';
import { MoviesLoadingSkeleton } from './components/MoviesLoadingSkeleton';
import { MoviesHeader } from './components/MoviesHeader';
import { MoviesFilters } from './components/MoviesFilters';
import type { Movie } from '../../core/api/moviesApi';
import { MovieModal } from './components/MovieModal';

export const MoviesPage: React.FC = () => {
  const {
    movies,
    filters,
    setFilters,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    genreOptions,
    directorOptions,
  } = useFilteredMovies();

  const [openModal, setOpenModal] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);

  if (isError) {
    return <MoviesError error={error} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MoviesLoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MoviesHeader />
        <MovieModal
          movie={selectedMovie}
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
        <MoviesFilters
          directorOptions={directorOptions}
          onFilterChange={setFilters}
          initialFilters={filters}
          genreOptions={genreOptions}
        />

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <MoviesTable
              movies={movies}
              isLoading={isLoading}
              isLoadingMore={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
              setSelectedMovie={setSelectedMovie}
              setOpenModal={setOpenModal}
            />
          </div>

          {hasNextPage && (
            <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
              <div className="flex justify-center">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isFetchingNextPage ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Cargando...
                    </>
                  ) : (
                    'Cargar más películas'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
