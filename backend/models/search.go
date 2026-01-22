package models

// SearchParams represents search request body
type SearchParams struct {
	SearchQuery           string `json:"searchQuery"`
	SelectedType          string `json:"selectedType"`
	SelectedRegion        string `json:"selectedRegion"`
	EducationalBackground string `json:"educationalBackground"`
	FilterByFees          *int   `json:"filterByFees,omitempty"`
	FilterByGrade         *int   `json:"filterByGrade,omitempty"`
	SortBy                string `json:"sortBy,omitempty"`
	SortOrder             string `json:"sortOrder,omitempty"`
	Page                  int    `json:"page,omitempty"`
	PageSize              int    `json:"pageSize,omitempty"`
}

// SearchResponse represents search response
type SearchResponse struct {
	Universities []University `json:"universities"`
	Total        int          `json:"total"`
	Query        string       `json:"query"`
	Page         int          `json:"page"`
	PageSize     int          `json:"pageSize"`
	TotalPages   int          `json:"totalPages"`
}
