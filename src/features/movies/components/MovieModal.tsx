import React from 'react';
import type { Movie } from '../../../core/api/moviesApi';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose }) => {
  if (!isOpen || !movie) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/15 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{movie.Title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-light"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Año</h3>
              <p className="text-gray-900">{movie.Year}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Clasificación</h3>
              <p className="text-gray-900">{movie.Rated}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Estreno</h3>
              <p className="text-gray-900">{movie.Released}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Duración</h3>
              <p className="text-gray-900">{movie.Runtime}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Género</h3>
              <p className="text-gray-900">{movie.Genre}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Director</h3>
              <p className="text-gray-900">{movie.Director}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Escritor</h3>
            <p className="text-gray-900">{movie.Writer}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Actores</h3>
            <p className="text-gray-900 whitespace-pre-line">{movie.Actors}</p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};