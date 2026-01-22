package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"roadtouniversities/data"
	"roadtouniversities/models"
)

// GetAllFaculties returns all faculties
func GetAllFaculties(c *gin.Context) {
	faculties := data.GetAllFaculties()
	response := models.NewSuccessResponse(faculties, "")
	c.JSON(http.StatusOK, response)
}

// GetFacultyByID returns a single faculty by ID
func GetFacultyByID(c *gin.Context) {
	id := c.Param("id")
	
	faculty, found := data.GetFacultyByID(id)
	if !found {
		c.JSON(http.StatusNotFound, models.NewErrorResponse("Faculty not found", "NOT_FOUND"))
		return
	}
	
	response := models.NewSuccessResponse(faculty, "")
	c.JSON(http.StatusOK, response)
}
