// Type definitions for the RoadToUni application
// Designed for frontend use and future Go backend compatibility

import type { ComponentType } from 'react';

export interface University {
    id: string;
    name: string;
    nameEn: string;
    type: 'public' | 'private' | 'national' | 'azhar';
    location: string;
    locationEn: string;
    region: string;
    established: number;
    rating: number;
    fees: number | { min: number; max: number };
    faculties: string[];
    facultiesEn: string[];
    specialties: string[];
    website?: string;
    image?: string;
    description: string;
    descriptionEn: string;
    admissionRequirements?: string;
    admissionRequirementsEn?: string;
    minGrade: number;
    maxGrade?: number;
    students?: number;
    studentsCount?: number;
    facultyCount?: number;
    isAccredited?: boolean;
    hasScholarships?: boolean;
    hasExchange?: boolean;
    campusSize?: string;
    facilities?: string[];
    facilitiesEn?: string[];
    acceptanceRate?: number;
    employmentRate?: number;
    detailedFaculties?: Record<string, Faculty>;
}

export interface Faculty {
    nameEn: string;
    description: string;
    descriptionEn: string;
    annualFees?: { min: number; max: number };
    annualFeesEn?: string;
    currency?: string;
    currencyEn?: string;
    departments?: Department[];
    specializations?: Specialization[];
    minGrade?: number;
    maxGrade?: number;
    fees?: number;
    duration?: number;
    degree?: string;
    degreeEn?: string;
}

export interface Department {
    name: string;
    nameEn: string;
    duration?: string;
    durationEn?: string;
    fees?: number;
    feesEn?: string;
    degrees?: string[];
    degreesEn?: string[];
    description?: string;
    descriptionEn?: string;
}

export interface Specialization {
    name: string;
    nameEn: string;
    fees?: number;
    feesEn?: string;
    description?: string;
    descriptionEn?: string;
    duration?: number;
    requirements?: string;
    requirementsEn?: string;
}

export interface SearchParams {
    searchQuery: string;
    selectedType: string;
    selectedRegion: string;
    educationalBackground: string;
}

export interface SearchSuggestion {
    id: string;
    type: 'university' | 'faculty' | 'department' | 'specialization';
    name: string;
    nameEn: string;
    universityName?: string;
    universityNameEn?: string;
    facultyName?: string;
    facultyNameEn?: string;
    icon?: ComponentType<{ className?: string }>;
}

// Navigation types
export type NavItem = 'home' | 'public' | 'private' | 'national' | 'azhar' | 'about';

export type SortBy = 'rating' | 'fees' | 'name' | 'established' | 'studentsCount' | 'minGrade' | 'location';

export type SortOrder = 'asc' | 'desc';

export type Language = 'ar' | 'en';

// App state types
export interface AppState {
    language: Language;
    isDarkMode: boolean;
    activeNav: NavItem;
    isLoading: boolean;
}

export interface SearchState {
    query: string;
    type: string;
    region: string;
    educationalBackground: string;
    filterByFees: number | null;
    filterByGrade: number | null;
    sortBy: SortBy;
    sortOrder: SortOrder;
    results: University[];
    showResults: boolean;
    showAdvancedSearch: boolean;
}

export interface UserPreferences {
    favorites: string[];
    comparison: string[];
}
