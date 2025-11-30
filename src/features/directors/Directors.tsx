import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useDirectors } from './hooks/useDirectors';
import { DirectorsLoadingSkeleton } from './components/DirectorsLoadingSkeleton';

export const Directors: React.FC = () => {
  const [threshold, setThreshold] = useState(0);
  const { directorsFiltered, isLoading, isError } = useDirectors(threshold);

  const handleThresholdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    // Evitar valores negativos de forma simple
    setThreshold(value < 0 ? 0 : value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-600 text-sm">
            Ocurrió un error al cargar los directores.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DirectorsLoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Directores
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Filtra y visualiza los directores por cantidad de películas.
          </p>
        </header>

        <section className="bg-white shadow rounded-lg w-full">
          <form
            onSubmit={handleSubmit}
            className="px-4 py-4 sm:p-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:space-x-4"
          >
            <div className="flex-1 flex flex-col">
              <label
                htmlFor="threshold"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Umbral de cantidad de películas
              </label>
              <input
                id="threshold"
                type="number"
                min={0}
                value={threshold}
                onChange={handleThresholdChange}
                placeholder="Ej: 10"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md shadow-sm p-2 border"
              />
            </div>

            <div className="w-full sm:w-auto">
              <button
                type="submit"
                disabled={threshold === 0}
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Aplicar umbral
              </button>
            </div>
          </form>
        </section>

        {/* Sección de tabla de directores */}
        <section className="bg-white shadow rounded-lg">
          <div className="px-3 py-4 sm:px-4 sm:py-5">
            {directorsFiltered.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No hay directores que cumplan con el umbral actual.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Director
                      </th>
                      <th
                        scope="col"
                        className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Cantidad de películas
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {directorsFiltered.map(([name, count]) => (
                      <tr key={name} className="hover:bg-gray-50">
                        <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {name}
                        </td>
                        <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                          {count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
