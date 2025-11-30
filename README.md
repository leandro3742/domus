# Domus – Movies Dashboard

Aplicación React + Vite para explorar un catálogo de películas con paginación, filtros y una pantalla de agregación de directores.

## Stack principal

- React 19 + TypeScript
- Vite 7
- React Router 7
- TanStack React Query 5
- Tailwind CSS 4
- Vitest + Testing Library (React, jest-dom, user-event)
- API server Express (mock de películas) en `api-server/`

---

## Requisitos

- Node.js 20+ recomendado
- npm 10+

---

## Setup

Clona el repo y luego instala dependencias en **frontend** y **API server**.

```bash
npm install        # en la raíz (frontend)
cd api-server && npm install
```

---

## Scripts frontend

Desde la raíz del proyecto (`domus/`):

```bash
npm run dev      # Dev server (Vite)
npm run build    # Build de producción
npm run lint     # Linter
npm run format   # Prettier
npm test         # Tests con Vitest
```

### Ejecutar la app completa

1. **API server** (mock de películas):

   ```bash
   cd api-server
   npm start
   ```

   Servirá en `http://localhost:3000` con el endpoint:
   - `GET /api/movies/search?page=<n>`

2. **Frontend** (en otra terminal, en la raíz):

   ```bash
   npm run dev
   ```

   Abre el navegador en la URL que indique Vite (por defecto `http://localhost:5173`).

---

## Arquitectura

Estructura simplificada:

```text
src/
  app/
    router/        # Rutas principales (Movies, Directors)

  core/
    api/           # Cliente HTTP y moviesApi
    layout/        # AppLayout con navegación
    lib/           # Utilidades puras (p.ej. aggregateDirectors)

  features/
    movies/        # Pantalla y lógica de películas
    directors/     # Pantalla y lógica de directores

  test/
    setupTests.ts  # Configuración de Testing Library + jest-dom
```

### Rutas

- `/` → página de **Movies** (`MoviesPage`)
- `/directors` → página de **Directores** (`Directors`)

`AppLayout` contiene el header y la navegación superior.

---

## Data layer & React Query

### Movies

- Hook `useMovies` (`features/movies/hooks/useMovies.ts`):
  - Usa `useInfiniteQuery` con key `['movies', 'infinite']`.
  - Maneja paginación basada en la respuesta del backend (`page`, `total_pages`).

- Hook `useFilteredMovies`:
  - Mantiene estado de filtros (`title`, `yearFrom`, `yearTo`, `genre`, `director`).
  - Deriva `movies` filtradas con `useMemo`.
  - Expone `genreOptions` y `directorOptions` a partir de los datos cargados.

### Directores

- Hook `useDirectors` (`features/directors/hooks/useDirectors.ts`):
  - Hace fetch de **todas** las películas con `moviesApi.searchMoviesAll()` (paginando internamente).
  - Usa la función pura `aggregateDirectors` para construir un mapa `director -> cantidad de películas`.
  - Expone `directorsFiltered`, filtrando por un umbral configurable y ordenando alfabéticamente.

- API client `moviesApi` (`core/api/moviesApi.ts`):
  - `searchMovies(page)` → lista paginada.
  - `searchMoviesAll()` → itera todas las páginas y devuelve un `Movie[]` plano.

---

## Testing

El proyecto usa **Vitest** como runner y **Testing Library** para tests de componentes React.

Configuración relevante:

- `vitest.config.ts`
  - `environment: 'jsdom'`
  - `globals: true`
  - `setupFiles: './src/test/setupTests.ts'`

- `src/test/setupTests.ts`
  - Importa `@testing-library/jest-dom/vitest` para tener matchers como `toBeInTheDocument`.

### Tests actuales

- `src/core/lib/aggregateDirectors.test.ts`
  - Prueba la función pura `aggregateDirectors` con:
    - Entradas duplicadas.
    - Case-sensitive vs case-folding.
    - Trimming activado/desactivado.
    - Valores raros (`""`, espacios, `null`, `undefined`).

- `src/features/directors/Directors.test.tsx`
  - Prueba la pantalla de Directores con Testing Library:
    - Estados: `loading`, `error`, `empty`, `success`.
    - Validaciones del formulario de umbral (botón deshabilitado con 0, permite solo valores >= 0).
    - Accesibilidad básica: encabezado, label asociado al input, tabla con headers.

### Cómo añadir nuevos tests

1. Crea el archivo de test al lado del módulo:
   - `MyComponent.tsx` → `MyComponent.test.tsx`
   - `useSomething.ts` → `useSomething.test.ts`

2. Usa siempre Testing Library para componentes (`render`, `screen`, `userEvent`), evitando tests basados en implementación (clases CSS, etc.).

3. Asegúrate de cubrir estados principales: loading, empty, error, success y validaciones de formularios.

---

## Contribución

Recomendaciones al modificar el proyecto:

- Mantener la estructura de **feature folders** (`features/*`).
- Mantener hooks como única fuente de verdad de la lógica de datos/UI y extraer funciones puras reutilizables a `core/lib` cuando sea posible.
- Al añadir una nueva feature:
  - Crear carpeta en `features/<featureName>`.
  - Añadir al router en `src/app/router/`.
  - Añadir tests de unidad y de componente cuando aplique.

---

## Licencia

Uso educativo/demostrativo.
