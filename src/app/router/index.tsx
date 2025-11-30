import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '../../core/layout/AppLayout';
import { MoviesPage } from '../../features/movies';
import { Directors } from '../../features/directors';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<MoviesPage />} />
          <Route path="/directors" element={<Directors />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
