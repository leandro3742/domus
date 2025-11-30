import { describe, it, expect } from 'vitest';
import { aggregateDirectors } from './aggregateDirectors';

describe('aggregateDirectors', () => {
  it('agrega correctamente directores duplicados', () => {
    const result = aggregateDirectors(['Nolan', 'Nolan', 'Villeneuve']);

    expect(result).toEqual({ Nolan: 2, Villeneuve: 1 });
  });

  it('es case-sensitive por defecto', () => {
    const result = aggregateDirectors(['Nolan', 'nolan']);

    expect(result).toEqual({ Nolan: 1, nolan: 1 });
  });

  it('puede aplicar case-folding cuando se habilita', () => {
    const result = aggregateDirectors(['Nolan', 'nolan', 'NOLAN'], {
      caseFolding: true,
    });

    expect(result).toEqual({ nolan: 3 });
  });

  it('recorta espacios en blanco y omite entradas vacías por defecto', () => {
    const result = aggregateDirectors([
      '  Nolan',
      'Nolan  ',
      '  Nolan  ',
      '   ',
    ]);

    expect(result).toEqual({ Nolan: 3 });
  });

  it('permite desactivar el trimming', () => {
    const result = aggregateDirectors(['  Nolan ', 'Nolan'], { trim: false });

    expect(result).toEqual({ '  Nolan ': 1, Nolan: 1 });
  });

  it('maneja valores nulos, indefinidos y raros', () => {
    const result = aggregateDirectors(['', '   ', null, undefined, 'Nolan'], {
      caseFolding: false,
      trim: true,
    });

    expect(result).toEqual({ Nolan: 1 });
  });
});
