 # Domus – Movies Dashboard

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


