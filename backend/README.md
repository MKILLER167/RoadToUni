# Road to Universities - Go Backend

A Go backend API for the Road to Universities platform.

## Prerequisites

- Go 1.21 or later
- Git

## Quick Start

```bash
# Navigate to backend directory
cd backend

# Download dependencies
go mod tidy

# Run the server
go run main.go
```

The server will start at `http://localhost:8080`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | Health check |
| GET | `/api/v1/universities` | Get all universities |
| GET | `/api/v1/universities/:id` | Get university by ID |
| GET | `/api/v1/universities/type/:type` | Get universities by type |
| POST | `/api/v1/universities/search` | Search universities |
| GET | `/api/v1/stats` | Get overall statistics |
| GET | `/api/v1/stats/region/:region` | Get stats by region |
| GET | `/api/v1/faculties` | Get all faculties |

## Project Structure

```
backend/
├── main.go              # Entry point
├── go.mod               # Go modules
├── handlers/            # HTTP handlers
│   ├── health.go
│   ├── universities.go
│   ├── stats.go
│   └── faculties.go
├── models/              # Data models
│   ├── university.go
│   ├── search.go
│   ├── stats.go
│   └── response.go
└── data/                # Data layer
    └── universities.go  # In-memory data (replace with DB)
```

## University Types

- `public` - Government universities
- `private` - Private universities  
- `national` - Non-profit universities
- `azhar` - Al-Azhar universities

## Regions

- `cairo` - Greater Cairo
- `alexandria` - Alexandria
- `delta` - Delta region
- `upper-egypt` - Upper Egypt
- `suez-canal` - Suez Canal region

## Search Request Example

```json
POST /api/v1/universities/search
{
  "searchQuery": "طب",
  "selectedType": "public",
  "selectedRegion": "cairo",
  "filterByFees": 50000,
  "filterByGrade": 85,
  "page": 1,
  "pageSize": 20
}
```

## TODO for Production

1. Replace in-memory data with PostgreSQL/MySQL database
2. Add authentication middleware
3. Add rate limiting
4. Add logging
5. Add environment configuration
6. Dockerize the application
