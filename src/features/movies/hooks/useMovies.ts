import { useInfiniteQuery } from '@tanstack/react-query';
import { moviesApi } from '../../../core/api/moviesApi';
import { useState, useMemo } from 'react';
import type { MoviesFiltersState } from '../types';

const useMovies = () => {
  return useInfiniteQuery({
    queryKey: ['movies', 'infinite'],
    queryFn: ({ pageParam = 1 }) => moviesApi.searchMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    enabled: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFilteredMovies = () => {
  const [filters, setFilters] = useState<MoviesFiltersState>({
    title: '',
    yearFrom: null,
    yearTo: null,
    genre: [],
  });
  
  const query = useMovies();

  const genreOptions = useMemo(() => {
    const allMovies = query.data?.pages.flatMap(page => page.data) || [];
    return Array.from(new Set(allMovies.flatMap(movie => movie.Genre.split(', '))));
  }, [query.data]);

  const movies = useMemo(() => {
    const allMovies = query.data?.pages.flatMap(page => page.data) || [];
    
    return allMovies.filter(movie => {
      const matchesTitle = !filters.title || movie.Title.toLowerCase().includes(filters.title.toLowerCase());
      const matchesYear = filters.yearFrom && filters.yearTo ? (movie.Year >= filters.yearFrom && movie.Year <= filters.yearTo) : true;
      const matchesGenre = filters.genre.length === 0 || filters.genre.some((g: string) => 
        movie.Genre.toLowerCase().includes(g.toLowerCase())
      );
      return matchesTitle && matchesYear && matchesGenre;
    });
  }, [query.data, filters]);

  return {
    ...query,
    movies,
    filters,
    setFilters,
    genreOptions
  };
};

