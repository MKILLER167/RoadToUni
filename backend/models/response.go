package models

// APIResponse is a generic API response wrapper
type APIResponse[T any] struct {
	Success bool   `json:"success"`
	Data    T      `json:"data"`
	Message string `json:"message,omitempty"`
}

// ErrorResponse represents an error response
type ErrorResponse struct {
	Success bool   `json:"success"`
	Error   string `json:"error"`
	Code    string `json:"code,omitempty"`
}

// NewSuccessResponse creates a success response
func NewSuccessResponse[T any](data T, message string) APIResponse[T] {
	return APIResponse[T]{
		Success: true,
		Data:    data,
		Message: message,
	}
}

// NewErrorResponse creates an error response
func NewErrorResponse(err string, code string) ErrorResponse {
	return ErrorResponse{
		Success: false,
		Error:   err,
		Code:    code,
	}
}
