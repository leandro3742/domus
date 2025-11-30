import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Directors } from './Directors';
import { useDirectors } from './hooks/useDirectors';

vi.mock('./hooks/useDirectors');

vi.mock('./components/DirectorsLoadingSkeleton', () => ({
  DirectorsLoadingSkeleton: () => <div data-testid="directors-skeleton" />,
}));

const mockUseDirectors = useDirectors as unknown as {
  mockReturnValue: (value: unknown) => void;
  mockReset: () => void;
};

describe('Directors screen', () => {
  beforeEach(() => {
    mockUseDirectors.mockReset();
  });

  it('muestra el estado de carga con el skeleton', () => {
    mockUseDirectors.mockReturnValue({
      directorsFiltered: [],
      isLoading: true,
      isError: false,
    });

    render(<Directors />);

    expect(screen.getByTestId('directors-skeleton')).toBeInTheDocument();
  });

  it('muestra el mensaje de error cuando isError es true', () => {
    mockUseDirectors.mockReturnValue({
      directorsFiltered: [],
      isLoading: false,
      isError: true,
    });

    render(<Directors />);

    expect(
      screen.getByText('Ocurrió un error al cargar los directores.')
    ).toBeInTheDocument();
  });

  it('muestra el estado vacío cuando no hay directores', () => {
    mockUseDirectors.mockReturnValue({
      directorsFiltered: [],
      isLoading: false,
      isError: false,
    });

    render(<Directors />);

    expect(
      screen.getByText('No hay directores que cumplan con el umbral actual.')
    ).toBeInTheDocument();
  });

  it('muestra la tabla de directores en estado de éxito', () => {
    mockUseDirectors.mockReturnValue({
      directorsFiltered: [
        ['Christopher Nolan', 3],
        ['Denis Villeneuve', 2],
      ],
      isLoading: false,
      isError: false,
    });

    render(<Directors />);

    const heading = screen.getByRole('heading', { name: 'Directores' });
    expect(heading).toBeInTheDocument();

    const input = screen.getByLabelText('Umbral de cantidad de películas');
    expect(input).toBeInTheDocument();

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    expect(
      screen.getByRole('columnheader', { name: 'Director' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Cantidad de películas' })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('cell', { name: 'Christopher Nolan' })
    ).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '3' })).toBeInTheDocument();
    expect(
      screen.getByRole('cell', { name: 'Denis Villeneuve' })
    ).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '2' })).toBeInTheDocument();
  });

  it('deshabilita el botón cuando el umbral es 0 y lo habilita cuando es mayor que 0', async () => {
    mockUseDirectors.mockReturnValue({
      directorsFiltered: [],
      isLoading: false,
      isError: false,
    });

    const user = userEvent.setup();

    render(<Directors />);

    const button = screen.getByRole('button', { name: 'Aplicar umbral' });
    expect(button).toBeDisabled();

    const input = screen.getByLabelText(
      'Umbral de cantidad de películas'
    ) as HTMLInputElement;

    await user.clear(input);
    await user.type(input, '5');

    expect(input.value).toBe('5');
    expect(button).not.toBeDisabled();
  });

  it('normaliza valores negativos de umbral a 0', async () => {
    mockUseDirectors.mockReturnValue({
      directorsFiltered: [],
      isLoading: false,
      isError: false,
    });

    const user = userEvent.setup();

    render(<Directors />);

    const input = screen.getByLabelText(
      'Umbral de cantidad de películas'
    ) as HTMLInputElement;

    await user.clear(input);
    await user.type(input, '-5');

    expect(Number(input.value)).toBeGreaterThanOrEqual(0);
  });
});
