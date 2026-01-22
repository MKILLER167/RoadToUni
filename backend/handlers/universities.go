package handlers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"roadtouniversities/data"
	"roadtouniversities/models"
)

// GetAllUniversities returns all universities
func GetAllUniversities(c *gin.Context) {
	universities := data.GetAllUniversities()
	
	response := models.NewSuccessResponse(universities, "")
	c.JSON(http.StatusOK, response)
}

// GetUniversityByID returns a single university by ID
func GetUniversityByID(c *gin.Context) {
	id := c.Param("id")
	
	university, found := data.GetUniversityByID(id)
	if !found {
		c.JSON(http.StatusNotFound, models.NewErrorResponse("University not found", "NOT_FOUND"))
		return
	}
	
	response := models.NewSuccessResponse(university, "")
	c.JSON(http.StatusOK, response)
}

// GetUniversitiesByType returns universities filtered by type
func GetUniversitiesByType(c *gin.Context) {
	uniType := c.Param("type")
	
	// Validate type
	validTypes := []string{"public", "private", "national", "azhar"}
	isValid := false
	for _, t := range validTypes {
		if t == uniType {
			isValid = true
			break
		}
	}
	
	if !isValid {
		c.JSON(http.StatusBadRequest, models.NewErrorResponse("Invalid university type", "INVALID_TYPE"))
		return
	}
	
	universities := data.GetUniversitiesByType(uniType)
	response := models.NewSuccessResponse(universities, "")
	c.JSON(http.StatusOK, response)
}

// SearchUniversities handles university search
func SearchUniversities(c *gin.Context) {
	var params models.SearchParams
	
	if err := c.ShouldBindJSON(&params); err != nil {
		c.JSON(http.StatusBadRequest, models.NewErrorResponse("Invalid request body", "INVALID_REQUEST"))
		return
	}
	
	// Set defaults
	if params.PageSize <= 0 {
		params.PageSize = 20
	}
	if params.Page <= 0 {
		params.Page = 1
	}
	
	results := data.SearchUniversities(params)
	
	// Calculate pagination
	total := len(results)
	totalPages := (total + params.PageSize - 1) / params.PageSize
	
	// Apply pagination
	start := (params.Page - 1) * params.PageSize
	end := start + params.PageSize
	if end > total {
		end = total
	}
	if start > total {
		start = total
	}
	
	paginatedResults := results[start:end]
	
	searchResponse := models.SearchResponse{
		Universities: paginatedResults,
		Total:        total,
		Query:        params.SearchQuery,
		Page:         params.Page,
		PageSize:     params.PageSize,
		TotalPages:   totalPages,
	}
	
	response := models.NewSuccessResponse(searchResponse, "")
	c.JSON(http.StatusOK, response)
}

// Simple search implementation
func matchesSearch(uni models.University, query string) bool {
	query = strings.ToLower(query)
	
	return strings.Contains(strings.ToLower(uni.Name), query) ||
		strings.Contains(strings.ToLower(uni.NameEn), query) ||
		strings.Contains(strings.ToLower(uni.Location), query) ||
		strings.Contains(strings.ToLower(uni.LocationEn), query) ||
		strings.Contains(strings.ToLower(uni.Description), query) ||
		strings.Contains(strings.ToLower(uni.DescriptionEn), query)
}
