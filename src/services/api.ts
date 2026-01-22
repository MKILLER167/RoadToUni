// API Service Layer for Go Backend Integration
// This file handles all HTTP requests to the Go backend

import { API_CONFIG, buildApiUrl } from '../config/api';
import type { University, SearchParams } from '../types';

// Response types matching Go backend structures
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface SearchResponse {
    universities: University[];
    total: number;
    query: string;
}

// Error class for API errors
export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public code?: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

// Base fetch wrapper with error handling
async function apiFetch<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...options.headers,
            },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new ApiError(
                errorData.message || `HTTP Error: ${response.status}`,
                response.status,
                errorData.code
            );
        }

        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);

        if (error instanceof ApiError) {
            throw error;
        }

        if (error instanceof Error && error.name === 'AbortError') {
            throw new ApiError('Request timeout', 408, 'TIMEOUT');
        }

        throw new ApiError(
            error instanceof Error ? error.message : 'Network error',
            0,
            'NETWORK_ERROR'
        );
    }
}

// ============================================
// University API - for Go backend developer
// ============================================

export const universityApi = {
    // GET /api/v1/universities
    async getAll(): Promise<University[]> {
        const url = buildApiUrl(API_CONFIG.ENDPOINTS.UNIVERSITIES);
        const response = await apiFetch<ApiResponse<University[]>>(url);
        return response.data;
    },

    // GET /api/v1/universities/:id
    async getById(id: string): Promise<University> {
        const url = buildApiUrl(API_CONFIG.ENDPOINTS.UNIVERSITY_BY_ID, { id });
        const response = await apiFetch<ApiResponse<University>>(url);
        return response.data;
    },

    // GET /api/v1/universities/type/:type
    async getByType(type: string): Promise<University[]> {
        const url = buildApiUrl(API_CONFIG.ENDPOINTS.UNIVERSITIES_BY_TYPE, { type });
        const response = await apiFetch<ApiResponse<University[]>>(url);
        return response.data;
    },

    // POST /api/v1/universities/search
    async search(params: SearchParams): Promise<SearchResponse> {
        const url = buildApiUrl(API_CONFIG.ENDPOINTS.UNIVERSITIES_SEARCH);
        const response = await apiFetch<ApiResponse<SearchResponse>>(url, {
            method: 'POST',
            body: JSON.stringify(params),
        });
        return response.data;
    },
};

// ============================================
// Stats API
// ============================================

export interface UniversityStats {
    totalUniversities: number;
    publicCount: number;
    privateCount: number;
    nationalCount: number;
    azharCount: number;
    totalStudents: number;
    averageRating: number;
}

export const statsApi = {
    // GET /api/v1/stats
    async getOverall(): Promise<UniversityStats> {
        const url = buildApiUrl(API_CONFIG.ENDPOINTS.STATS);
        const response = await apiFetch<ApiResponse<UniversityStats>>(url);
        return response.data;
    },

    // GET /api/v1/stats/region/:region
    async getByRegion(region: string): Promise<UniversityStats> {
        const url = buildApiUrl(API_CONFIG.ENDPOINTS.STATS_BY_REGION, { region });
        const response = await apiFetch<ApiResponse<UniversityStats>>(url);
        return response.data;
    },
};

// ============================================
// Health Check
// ============================================

export const healthApi = {
    // GET /api/v1/health
    async check(): Promise<{ status: string; timestamp: string }> {
        const url = buildApiUrl(API_CONFIG.ENDPOINTS.HEALTH);
        return await apiFetch(url);
    },
};

// Export all APIs
export const api = {
    universities: universityApi,
    stats: statsApi,
    health: healthApi,
};

export default api;
