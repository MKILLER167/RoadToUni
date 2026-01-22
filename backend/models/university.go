package models

// University represents a university entity
type University struct {
	ID                     string                     `json:"id"`
	Name                   string                     `json:"name"`
	NameEn                 string                     `json:"nameEn"`
	Type                   string                     `json:"type"` // public, private, national, azhar
	Location               string                     `json:"location"`
	LocationEn             string                     `json:"locationEn"`
	Region                 string                     `json:"region"`
	Established            int                        `json:"established"`
	Rating                 float64                    `json:"rating"`
	Fees                   FeesRange                  `json:"fees"`
	Faculties              []string                   `json:"faculties"`
	FacultiesEn            []string                   `json:"facultiesEn"`
	Specialties            []string                   `json:"specialties"`
	Description            string                     `json:"description"`
	DescriptionEn          string                     `json:"descriptionEn"`
	Image                  string                     `json:"image,omitempty"`
	MinGrade               int                        `json:"minGrade"`
	MaxGrade               int                        `json:"maxGrade,omitempty"`
	Students               int                        `json:"students"`
	AcceptanceRate         int                        `json:"acceptanceRate,omitempty"`
	EmploymentRate         int                        `json:"employmentRate,omitempty"`
	DetailedFaculties      map[string]Faculty         `json:"detailedFaculties,omitempty"`
}

// FeesRange represents min/max fee range
type FeesRange struct {
	Min int `json:"min"`
	Max int `json:"max"`
}

// Faculty represents a faculty within a university
type Faculty struct {
	NameEn          string           `json:"nameEn"`
	Description     string           `json:"description"`
	DescriptionEn   string           `json:"descriptionEn"`
	AnnualFees      FeesRange        `json:"annualFees,omitempty"`
	AnnualFeesEn    string           `json:"annualFeesEn,omitempty"`
	Currency        string           `json:"currency,omitempty"`
	CurrencyEn      string           `json:"currencyEn,omitempty"`
	Departments     []Department     `json:"departments,omitempty"`
	Specializations []Specialization `json:"specializations,omitempty"`
}

// Department represents a department within a faculty
type Department struct {
	Name       string   `json:"name"`
	NameEn     string   `json:"nameEn"`
	Duration   string   `json:"duration,omitempty"`
	DurationEn string   `json:"durationEn,omitempty"`
	Fees       int      `json:"fees,omitempty"`
	FeesEn     string   `json:"feesEn,omitempty"`
	Degrees    []string `json:"degrees,omitempty"`
	DegreesEn  []string `json:"degreesEn,omitempty"`
}

// Specialization represents a specialization within a faculty
type Specialization struct {
	Name   string `json:"name"`
	NameEn string `json:"nameEn"`
	Fees   int    `json:"fees,omitempty"`
	FeesEn string `json:"feesEn,omitempty"`
}
