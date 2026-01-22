package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"roadtouniversities/data"
	"roadtouniversities/models"
)

// GetOverallStats returns overall university statistics
func GetOverallStats(c *gin.Context) {
	stats := data.GetOverallStats()
	response := models.NewSuccessResponse(stats, "")
	c.JSON(http.StatusOK, response)
}

// GetStatsByRegion returns statistics for a specific region
func GetStatsByRegion(c *gin.Context) {
	region := c.Param("region")
	
	// Validate region
	validRegions := []string{"cairo", "alexandria", "delta", "upper-egypt", "suez-canal"}
	isValid := false
	for _, r := range validRegions {
		if r == region {
			isValid = true
			break
		}
	}
	
	if !isValid {
		c.JSON(http.StatusBadRequest, models.NewErrorResponse("Invalid region", "INVALID_REGION"))
		return
	}
	
	stats := data.GetStatsByRegion(region)
	response := models.NewSuccessResponse(stats, "")
	c.JSON(http.StatusOK, response)
}
