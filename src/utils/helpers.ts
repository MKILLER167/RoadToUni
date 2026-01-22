import { toast } from "sonner";

export interface University {
  id: string;
  name: string;
  nameEn: string;
  type: "public" | "private" | "national" | "azhar";
  location: string;
  locationEn: string;
  region: string;
  established: number;
  rating: number;
  fees: number;
  faculties: string[];
  facultiesEn: string[];
  specialties: string[];
  website: string;
  description: string;
  descriptionEn: string;
  admissionRequirements: string;
  admissionRequirementsEn: string;
  minGrade: number;
  maxGrade: number;
  studentsCount: number;
  facultyCount: number;
  isAccredited: boolean;
  hasScholarships: boolean;
  hasExchange: boolean;
  campusSize: string;
  facilities: string[];
  facilitiesEn: string[];
  detailedFaculties?: {
    [facultyName: string]: {
      nameEn: string;
      description: string;
      descriptionEn: string;
      departments?: Array<{
        name: string;
        nameEn: string;
        description: string;
        descriptionEn: string;
        duration: number;
        degree: string;
        degreeEn: string;
      }>;
      specializations?: Array<{
        name: string;
        nameEn: string;
        description: string;
        descriptionEn: string;
        duration: number;
        requirements: string;
        requirementsEn: string;
      }>;
      minGrade: number;
      maxGrade: number;
      fees: number;
      duration: number;
      degree: string;
      degreeEn: string;
    };
  };
}

export interface SearchParams {
  searchQuery: string;
  selectedType: string;
  selectedRegion: string;
  educationalBackground: string;
}

// Enhanced search algorithm with fuzzy matching and ranking
export function filterUniversities(
  universities: University[],
  searchParams: SearchParams,
  filterByFees?: number | null,
  filterByGrade?: number | null
): University[] {
  const { searchQuery, selectedType, selectedRegion, educationalBackground } = searchParams;

  let filtered = universities.filter(university => {
    // Type filter
    if (selectedType !== "all" && university.type !== selectedType) {
      return false;
    }

    // Region filter with enhanced matching
    if (selectedRegion !== "all") {
      const regionMatches = {
        "cairo": ["القاهرة", "الجيزة", "cairo", "giza", "6th october", "october", "شيخ زايد", "sheikh zayed"],
        "alexandria": ["الإسكندرية", "alexandria", "اسكندرية"],
        "delta": ["المنوفية", "الغربية", "الدقهلية", "كفر الشيخ", "دمياط", "البحيرة", "menoufia", "gharbia", "dakahlia", "kafr el sheikh", "damietta", "beheira", "طنطا", "tanta", "المنصورة", "mansoura"],
        "upper-egypt": ["أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان", "assiut", "sohag", "qena", "luxor", "aswan", "المنيا", "minya", "بني سويف", "beni suef"],
        "suez-canal": ["الإسماعيلية", "بورسعيد", "السويس", "ismailia", "port said", "suez", "العريش", "arish"]
      };

      const regionKeywords = regionMatches[selectedRegion as keyof typeof regionMatches] || [];
      const locationMatch = regionKeywords.some(keyword =>
        university.location.toLowerCase().includes(keyword.toLowerCase()) ||
        university.locationEn.toLowerCase().includes(keyword.toLowerCase())
      );

      if (!locationMatch) return false;
    }

    // Fees filter
    if (filterByFees !== null && university.fees > filterByFees) {
      return false;
    }

    // Grade filter
    if (filterByGrade !== null && university.minGrade > filterByGrade) {
      return false;
    }

    // Educational background filter
    if (educationalBackground === "international" && !university.hasExchange) {
      // For international students, prefer universities with exchange programs
      // But don't exclude completely
    }

    // Search query with enhanced fuzzy matching
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const searchableFields = [
        university.name,
        university.nameEn,
        university.location,
        university.locationEn,
        university.description,
        university.descriptionEn,
        ...university.faculties,
        ...university.facultiesEn,
        ...university.specialties,
        ...university.facilities,
        ...university.facilitiesEn,
      ];

      // Add detailed faculties to search
      if (university.detailedFaculties) {
        Object.entries(university.detailedFaculties).forEach(([facultyName, facultyData]) => {
          searchableFields.push(
            facultyName,
            facultyData.nameEn,
            facultyData.description,
            facultyData.descriptionEn
          );

          if (facultyData.departments) {
            facultyData.departments.forEach(dept => {
              searchableFields.push(dept.name, dept.nameEn, dept.description, dept.descriptionEn);
            });
          }

          if (facultyData.specializations) {
            facultyData.specializations.forEach(spec => {
              searchableFields.push(spec.name, spec.nameEn, spec.description, spec.descriptionEn);
            });
          }
        });
      }

      // Check if query matches any searchable field
      const hasMatch = searchableFields.some(field => {
        if (!field) return false;
        const fieldLower = field.toLowerCase();

        // Exact match (highest priority)
        if (fieldLower.includes(query)) return true;

        // Fuzzy matching for Arabic and English
        const words = query.split(/\s+/);
        return words.some(word => {
          if (word.length < 2) return false;
          return fieldLower.includes(word) ||
            levenshteinDistance(word, fieldLower) <= Math.floor(word.length * 0.3);
        });
      });

      if (!hasMatch) return false;
    }

    return true;
  });

  // Apply ranking based on relevance and quality
  if (searchQuery.trim()) {
    filtered = filtered.map(university => ({
      ...university,
      relevanceScore: calculateRelevanceScore(university, searchQuery)
    })).sort((a, b) => (b as any).relevanceScore - (a as any).relevanceScore);
  }

  return filtered;
}

// Levenshtein distance for fuzzy matching
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

// Calculate relevance score for search ranking
function calculateRelevanceScore(university: University, query: string): number {
  let score = 0;
  const queryLower = query.toLowerCase();

  // University name matches (highest score)
  if (university.name.toLowerCase().includes(queryLower)) score += 100;
  if (university.nameEn.toLowerCase().includes(queryLower)) score += 100;

  // Location matches
  if (university.location.toLowerCase().includes(queryLower)) score += 50;
  if (university.locationEn.toLowerCase().includes(queryLower)) score += 50;

  // Faculty matches
  university.faculties.forEach(faculty => {
    if (faculty.toLowerCase().includes(queryLower)) score += 30;
  });
  university.facultiesEn.forEach(faculty => {
    if (faculty.toLowerCase().includes(queryLower)) score += 30;
  });

  // Specialty matches
  university.specialties.forEach(specialty => {
    if (specialty.toLowerCase().includes(queryLower)) score += 20;
  });

  // Quality indicators bonus
  score += university.rating * 5;
  if (university.isAccredited) score += 10;
  if (university.hasScholarships) score += 5;
  if (university.hasExchange) score += 5;

  return score;
}

// Enhanced sorting with multiple criteria
export function sortUniversities(
  universities: University[],
  sortBy: string,
  sortOrder: string
): University[] {
  const sorted = [...universities].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "rating":
        comparison = b.rating - a.rating;
        break;
      case "fees":
        comparison = a.fees - b.fees;
        break;
      case "name":
        comparison = a.name.localeCompare(b.name, 'ar');
        break;
      case "established":
        comparison = b.established - a.established;
        break;
      case "studentsCount":
        comparison = b.studentsCount - a.studentsCount;
        break;
      case "minGrade":
        comparison = a.minGrade - b.minGrade;
        break;
      case "location":
        comparison = a.location.localeCompare(b.location, 'ar');
        break;
      default:
        // Multi-criteria sorting for "best" option
        comparison = calculateOverallScore(b) - calculateOverallScore(a);
    }

    return sortOrder === "desc" ? comparison : -comparison;
  });

  return sorted;
}

// Calculate overall university score for ranking
function calculateOverallScore(university: University): number {
  let score = 0;

  // Rating (weighted heavily)
  score += university.rating * 20;

  // Accreditation bonus
  if (university.isAccredited) score += 15;

  // Facilities count
  score += university.facilities.length * 2;

  // Student/faculty ratio (smaller is better)
  const ratio = university.studentsCount / university.facultyCount;
  score += Math.max(0, 50 - ratio);

  // Age bonus (established universities)
  const age = new Date().getFullYear() - university.established;
  score += Math.min(age * 0.1, 10);

  // Scholarship and exchange programs
  if (university.hasScholarships) score += 10;
  if (university.hasExchange) score += 10;

  // Fee accessibility (lower fees = higher score)
  score += Math.max(0, 50 - (university.fees / 1000));

  return score;
}

// Get university statistics for dashboard
export function getUniversityStats(universities: University[]) {
  const stats = {
    total: universities.length,
    public: universities.filter(u => u.type === "public").length,
    private: universities.filter(u => u.type === "private").length,
    national: universities.filter(u => u.type === "national").length,
    azhar: universities.filter(u => u.type === "azhar").length,
    accredited: universities.filter(u => u.isAccredited).length,
    withScholarships: universities.filter(u => u.hasScholarships).length,
    withExchange: universities.filter(u => u.hasExchange).length,
    averageRating: universities.reduce((sum, u) => sum + u.rating, 0) / universities.length,
    averageFees: universities.reduce((sum, u) => sum + u.fees, 0) / universities.length,
    totalStudents: universities.reduce((sum, u) => sum + u.studentsCount, 0),
  };

  return stats;
}

// Get region statistics
export function getRegionStats(universities: University[]) {
  const regions = {
    cairo: 0,
    alexandria: 0,
    delta: 0,
    upperEgypt: 0,
    suezCanal: 0,
    other: 0
  };

  universities.forEach(university => {
    const location = university.location.toLowerCase();

    if (location.includes("القاهرة") || location.includes("الجيزة") || location.includes("cairo") || location.includes("giza")) {
      regions.cairo++;
    } else if (location.includes("الإسكندرية") || location.includes("alexandria")) {
      regions.alexandria++;
    } else if (location.includes("المنوفية") || location.includes("الغربية") || location.includes("الدقهلية") || location.includes("كفر الشيخ")) {
      regions.delta++;
    } else if (location.includes("أسيوط") || location.includes("سوهاج") || location.includes("قنا") || location.includes("assiut")) {
      regions.upperEgypt++;
    } else if (location.includes("الإسماعيلية") || location.includes("بورسعيد") || location.includes("السويس")) {
      regions.suezCanal++;
    } else {
      regions.other++;
    }
  });

  return regions;
}

// Debounce function for search optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Local storage utilities with error handling
export const storage = {
  get: (key: string, defaultValue: any = null) => {
    try {
      if (typeof window === 'undefined') return defaultValue;
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  set: (key: string, value: any) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error);
      toast.error('خطأ في حفظ البيانات محلياً');
    }
  },

  remove: (key: string) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }
};

// Format number with Arabic/English support
export function formatNumber(num: number, language: string = 'ar'): string {
  if (language === 'ar') {
    return num.toLocaleString('ar-EG');
  }
  return num.toLocaleString('en-US');
}

// Format currency
export function formatCurrency(amount: number, language: string = 'ar'): string {
  const formatted = formatNumber(amount, language);
  return language === 'ar' ? `${formatted} جنيه` : `${formatted} EGP`;
}

// Get university type label
export function getUniversityTypeLabel(type: string, language: string = 'ar'): string {
  const labels = {
    public: language === 'ar' ? 'حكومية' : 'Public',
    private: language === 'ar' ? 'خاصة' : 'Private',
    national: language === 'ar' ? 'أهلية' : 'National',
    azhar: language === 'ar' ? 'الأزهر' : 'Al-Azhar'
  };

  return labels[type as keyof typeof labels] || type;
}

// Generate university card gradient based on type
export function getUniversityGradient(type: string): string {
  const gradients = {
    public: 'from-blue-500/10 to-blue-600/5',
    private: 'from-purple-500/10 to-purple-600/5',
    national: 'from-green-500/10 to-green-600/5',
    azhar: 'from-yellow-500/10 to-yellow-600/5'
  };

  return gradients[type as keyof typeof gradients] || 'from-gray-500/10 to-gray-600/5';
}

// Performance monitoring
export function measurePerformance(name: string, fn: () => any) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();

  if (process.env.NODE_ENV === 'development') {
    console.log(`${name} took ${end - start} milliseconds`);
  }

  return result;
}

// Error handling wrapper
export function withErrorHandling<T extends (...args: any[]) => any>(
  fn: T,
  errorMessage: string = 'حدث خطأ غير متوقع'
): T {
  return ((...args: Parameters<T>) => {
    try {
      return fn(...args);
    } catch (error) {
      console.error(errorMessage, error);
      toast.error(errorMessage);
      return null;
    }
  }) as T;
}