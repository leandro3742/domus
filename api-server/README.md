# Domus Movies API Server

Reference API server that proxies movies search from the external API.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

The server will run on `http://localhost:3000`

## Endpoints

### GET /api/movies/search?page=<pageNumber>

Search movies with pagination.

**Response format:**

```json
{
  "page": 1,
  "per_page": 10,
  "total": 100,
  "total_pages": 10,
  "data": [
    {
      "Title": "Movie Title",
      "Year": "2023",
      "Rated": "PG-13",
      "Released": "2023-01-01",
      "Runtime": "120 min",
      "Genre": "Action, Adventure",
      "Director": "Director Name",
      "Writer": "Writer Name",
      "Actors": "Actor 1, Actor 2"
    }
  ]
}
```

**Example usage:**

```bash
curl http://localhost:3000/api/movies/search?page=1
```
