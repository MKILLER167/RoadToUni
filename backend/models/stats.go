package models

// Stats represents overall university statistics
type Stats struct {
	TotalUniversities int     `json:"totalUniversities"`
	PublicCount       int     `json:"publicCount"`
	PrivateCount      int     `json:"privateCount"`
	NationalCount     int     `json:"nationalCount"`
	AzharCount        int     `json:"azharCount"`
	TotalStudents     int     `json:"totalStudents"`
	AverageRating     float64 `json:"averageRating"`
}

// RegionStats represents statistics for a specific region
type RegionStats struct {
	Region            string  `json:"region"`
	UniversityCount   int     `json:"universityCount"`
	TotalStudents     int     `json:"totalStudents"`
	AverageRating     float64 `json:"averageRating"`
	AverageFees       int     `json:"averageFees"`
}
