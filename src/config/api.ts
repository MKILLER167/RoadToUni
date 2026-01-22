// API Configuration for Go Backend
// Update these values when your Go backend is ready

export const API_CONFIG = {
    // Base URL for the Go backend API
    // Development: http://localhost:8080
    // Production: https://api.roadtouniversities.com
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080',

    // API version prefix
    API_VERSION: '/api/v1',

    // Request timeout in milliseconds
    TIMEOUT: 30000,

    // Endpoints - these should match your Go backend routes
    ENDPOINTS: {
        // Universities
        UNIVERSITIES: '/universities',
        UNIVERSITY_BY_ID: '/universities/:id',
        UNIVERSITIES_BY_TYPE: '/universities/type/:type',
        UNIVERSITIES_SEARCH: '/universities/search',

        // Faculties
        FACULTIES: '/faculties',
        FACULTY_BY_ID: '/faculties/:id',

        // Statistics
        STATS: '/stats',
        STATS_BY_REGION: '/stats/region/:region',

        // Health check
        HEALTH: '/health',
    },
};

// Helper to build full API URL
export function buildApiUrl(endpoint: string, params?: Record<string, string>): string {
    let url = `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}${endpoint}`;

    // Replace path parameters like :id with actual values
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url = url.replace(`:${key}`, encodeURIComponent(value));
        });
    }

    return url;
}

// Environment check
export const isProduction = import.meta.env.PROD;
export const isDevelopment = import.meta.env.DEV;
