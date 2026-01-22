package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"roadtouniversities/handlers"
)

func main() {
	// Get port from environment or default to 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Initialize Gin router
	r := gin.Default()

	// Configure CORS for frontend
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))

	// API v1 routes
	v1 := r.Group("/api/v1")
	{
		// Health check
		v1.GET("/health", handlers.HealthCheck)

		// Universities routes
		universities := v1.Group("/universities")
		{
			universities.GET("", handlers.GetAllUniversities)
			universities.GET("/:id", handlers.GetUniversityByID)
			universities.GET("/type/:type", handlers.GetUniversitiesByType)
			universities.POST("/search", handlers.SearchUniversities)
		}

		// Statistics routes
		stats := v1.Group("/stats")
		{
			stats.GET("", handlers.GetOverallStats)
			stats.GET("/region/:region", handlers.GetStatsByRegion)
		}

		// Faculties routes
		faculties := v1.Group("/faculties")
		{
			faculties.GET("", handlers.GetAllFaculties)
			faculties.GET("/:id", handlers.GetFacultyByID)
		}
	}

	// Start server
	log.Printf("🚀 Server starting on port %s", port)
	log.Printf("📚 API available at http://localhost:%s/api/v1", port)
	
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
