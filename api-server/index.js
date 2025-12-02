const express = require('express');
const cors = require('cors');
const mockMovies = require('./data/mockMovies');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/movies/search', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 10;
  const total = mockMovies.length;
  const totalPages = Math.ceil(total / perPage);

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const data = mockMovies.slice(startIndex, endIndex);

  // Simulate 2-second delay
  // setTimeout(() => {
    res.json({
      page,
      per_page: perPage,
      total,
      total_pages: totalPages,
      data,
    });
  // }, 2000);
});

app.get('/', (req, res) => {
  res.json({
    message: 'Domus Movies API Server',
    endpoints: {
      'GET /api/movies/search': 'Search movies with pagination',
      Example: 'GET /api/movies/search?page=1',
    },
  });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log(`Movies endpoint: http://localhost:${PORT}/api/movies/search`);
});
