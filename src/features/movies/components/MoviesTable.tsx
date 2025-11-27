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
}

export const MoviesTable: React.FC<MoviesTableProps> = ({
  movies,
  isLoading,
  isLoadingMore,
}) => {
  const columns: ColumnDef<Movie>[] = React.useMemo(
    () => [
      {
        accessorKey: 'Title',
        header: 'Título',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'Year',
        header: 'Año',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'Rated',
        header: 'Clasificación',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'Released',
        header: 'Estreno',
        cell: info => info.getValue(),
      },
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
        accessorKey: 'Actors',
        header: 'Actores',
        cell: info => {
          const actors = info.getValue() as string;
          return actors.length > 50 ? `${actors.substring(0, 50)}...` : actors;
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: movies,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
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
