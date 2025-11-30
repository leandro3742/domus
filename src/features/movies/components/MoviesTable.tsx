import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import type { Movie } from '../../../core/api/moviesApi';
import type { ColumnDef } from '@tanstack/react-table';
import { MoviesIsLoadingMoreSkeleton } from './MoviesIsLoadingMoreSkeleton';

interface MoviesTableProps {
  movies: Movie[];
  isLoading?: boolean;
  isLoadingMore?: boolean;
  fetchNextPage: () => void;
  setSelectedMovie: (movie: Movie | null) => void;
  setOpenModal: (open: boolean) => void;
}

export const MoviesTable: React.FC<MoviesTableProps> = ({
  movies,
  isLoading,
  isLoadingMore,
  fetchNextPage,
  setSelectedMovie,
  setOpenModal,
}) => {
  const columns: ColumnDef<Movie>[] = React.useMemo(
    () => [
      {
        accessorKey: 'Title',
        header: 'Título',
        cell: info => info.getValue(),
      },
      // {
      //   accessorKey: 'Year',
      //   header: 'Año',
      //   cell: info => info.getValue(),
      // },
      {
        accessorKey: 'Rated',
        header: 'Clasificación',
        cell: info => info.getValue(),
      },
      // {
      //   accessorKey: 'Released',
      //   header: 'Estreno',
      //   cell: info => info.getValue(),
      // },
      {
        accessorKey: 'Runtime',
        header: 'Duración',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'Genre',
        header: 'Género',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'Director',
        header: 'Director',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'action',
        header: 'Acciones',
        cell: ({ row }) => (
          <button
            type="button"
            className="px-3 py-1 text-xs font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
            onClick={e => {
              e.stopPropagation();
              setSelectedMovie(row.original);
              setOpenModal(true);
            }}
          >
            Ver más
          </button>
        ),
      },
      // {
      //   accessorKey: 'Actors',
      //   header: 'Actores',
      //   cell: info => {
      //     const actors = info.getValue() as string;
      //     return actors.length > 50 ? `${actors.substring(0, 50)}...` : actors;
      //   },
      // },
    ],
    [setSelectedMovie, setOpenModal]
  );

  const table = useReactTable({
    data: movies,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = tableContainerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      if (scrollPercentage >= 0.7 && !isLoadingMore) {
        fetchNextPage();
      }
    }
  };

  React.useEffect(() => {
    const container = tableContainerRef.current;
    if (container && !isLoading && !isLoadingMore) {
      const { scrollHeight, clientHeight } = container;
      if (scrollHeight <= clientHeight) {
        fetchNextPage();
      }
    }
  }, [movies, isLoading, isLoadingMore, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div
      ref={tableContainerRef}
      onScroll={handleScroll}
      className="overflow-x-auto overflow-y-auto max-h-[70vh]"
    >
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}

          {isLoadingMore && <MoviesIsLoadingMoreSkeleton />}
        </tbody>
      </table>
    </div>
  );
};
