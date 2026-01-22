package data

import (
	"strings"

	"roadtouniversities/models"
)

// In-memory data store - replace with database in production
var universities = []models.University{
	{
		ID:            "1",
		Name:          "جامعة القاهرة",
		NameEn:        "Cairo University",
		Type:          "public",
		Location:      "الجيزة، مصر",
		LocationEn:    "Giza, Egypt",
		Region:        "cairo",
		Established:   1908,
		Rating:        4.5,
		Fees:          models.FeesRange{Min: 1000, Max: 5000},
		Faculties:     []string{"الطب", "الهندسة", "الآداب", "العلوم", "الحقوق", "التجارة"},
		FacultiesEn:   []string{"Medicine", "Engineering", "Arts", "Science", "Law", "Commerce"},
		Specialties:   []string{"الطب البشري", "الهندسة المعمارية", "طب الأسنان"},
		Description:   "أقدم الجامعات المصرية الحديثة وأعرقها، تأسست عام 1908",
		DescriptionEn: "The oldest and most prestigious modern Egyptian university, established in 1908",
		Image:         "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop",
		MinGrade:       85,
		Students:       155000,
		AcceptanceRate: 15,
		EmploymentRate: 88,
	},
	{
		ID:            "2",
		Name:          "جامعة عين شمس",
		NameEn:        "Ain Shams University",
		Type:          "public",
		Location:      "القاهرة، مصر",
		LocationEn:    "Cairo, Egypt",
		Region:        "cairo",
		Established:   1950,
		Rating:        4.3,
		Fees:          models.FeesRange{Min: 1200, Max: 6000},
		Faculties:     []string{"الطب", "الهندسة", "التجارة", "الحاسبات", "الألسن"},
		FacultiesEn:   []string{"Medicine", "Engineering", "Commerce", "Computer Science", "Languages"},
		Specialties:   []string{"طب الأطفال", "هندسة الاتصالات", "إدارة الأعمال"},
		Description:   "جامعة شرق القاهرة، ثاني أكبر الجامعات المصرية",
		DescriptionEn: "University of East Cairo, the second largest Egyptian university",
		Image:         "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=300&fit=crop",
		MinGrade:       83,
		Students:       180000,
		AcceptanceRate: 18,
		EmploymentRate: 85,
	},
	{
		ID:            "3",
		Name:          "جامعة الإسكندرية",
		NameEn:        "Alexandria University",
		Type:          "public",
		Location:      "الإسكندرية، مصر",
		LocationEn:    "Alexandria, Egypt",
		Region:        "alexandria",
		Established:   1938,
		Rating:        4.4,
		Fees:          models.FeesRange{Min: 1000, Max: 4500},
		Faculties:     []string{"الطب", "الهندسة", "العلوم", "الزراعة", "الطب البيطري"},
		FacultiesEn:   []string{"Medicine", "Engineering", "Science", "Agriculture", "Veterinary Medicine"},
		Specialties:   []string{"الطب البحري", "علوم البحار", "الهندسة البحرية"},
		Description:   "عروس البحر المتوسط، جامعة متميزة في العلوم والطب",
		DescriptionEn: "Pearl of the Mediterranean, distinguished university in science and medicine",
		Image:         "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
		MinGrade:       81,
		Students:       150000,
		AcceptanceRate: 20,
		EmploymentRate: 82,
	},
	{
		ID:            "4",
		Name:          "الجامعة الأمريكية بالقاهرة",
		NameEn:        "American University in Cairo",
		Type:          "private",
		Location:      "القاهرة الجديدة، مصر",
		LocationEn:    "New Cairo, Egypt",
		Region:        "cairo",
		Established:   1919,
		Rating:        4.8,
		Fees:          models.FeesRange{Min: 200000, Max: 350000},
		Faculties:     []string{"الأعمال", "الهندسة", "الفنون الليبرالية", "العلوم الاجتماعية"},
		FacultiesEn:   []string{"Business", "Engineering", "Liberal Arts", "Social Sciences"},
		Specialties:   []string{"إدارة الأعمال الدولية", "الهندسة المعلوماتية", "الصحافة"},
		Description:   "جامعة أمريكية رائدة في الشرق الأوسط، تعليم باللغة الإنجليزية",
		DescriptionEn: "Leading American university in the Middle East with English instruction",
		Image:         "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
		MinGrade:       90,
		Students:       7000,
		AcceptanceRate: 25,
		EmploymentRate: 95,
	},
	{
		ID:            "5",
		Name:          "الجامعة الألمانية بالقاهرة",
		NameEn:        "German University in Cairo",
		Type:          "private",
		Location:      "القاهرة الجديدة، مصر",
		LocationEn:    "New Cairo, Egypt",
		Region:        "cairo",
		Established:   2003,
		Rating:        4.6,
		Fees:          models.FeesRange{Min: 150000, Max: 280000},
		Faculties:     []string{"الهندسة", "إدارة الأعمال", "الصيدلة", "الفنون التطبيقية"},
		FacultiesEn:   []string{"Engineering", "Business", "Pharmacy", "Applied Arts"},
		Specialties:   []string{"هندسة السيارات", "التكنولوجيا الحيوية", "الهندسة الصناعية"},
		Description:   "تعليم بمعايير ألمانية، تخصصات تقنية متقدمة",
		DescriptionEn: "German-standard education with advanced technical specializations",
		Image:         "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
		MinGrade:       85,
		Students:       12000,
		AcceptanceRate: 30,
		EmploymentRate: 92,
	},
	{
		ID:            "6",
		Name:          "جامعة الأزهر",
		NameEn:        "Al-Azhar University",
		Type:          "azhar",
		Location:      "القاهرة، مصر",
		LocationEn:    "Cairo, Egypt",
		Region:        "cairo",
		Established:   970,
		Rating:        4.5,
		Fees:          models.FeesRange{Min: 500, Max: 3000},
		Faculties:     []string{"أصول الدين", "الشريعة والقانون", "اللغة العربية", "الطب", "الهندسة"},
		FacultiesEn:   []string{"Islamic Studies", "Sharia & Law", "Arabic Language", "Medicine", "Engineering"},
		Specialties:   []string{"الدراسات الإسلامية", "الفقه المقارن", "اللغة العربية"},
		Description:   "أقدم جامعة في العالم، مركز التعليم الإسلامي",
		DescriptionEn: "One of the oldest universities in the world, center of Islamic education",
		Image:         "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop",
		MinGrade:       70,
		Students:       500000,
		AcceptanceRate: 40,
		EmploymentRate: 80,
	},
	{
		ID:            "7",
		Name:          "جامعة الجلالة",
		NameEn:        "Galala University",
		Type:          "national",
		Location:      "السويس، مصر",
		LocationEn:    "Suez, Egypt",
		Region:        "suez-canal",
		Established:   2020,
		Rating:        4.4,
		Fees:          models.FeesRange{Min: 80000, Max: 180000},
		Faculties:     []string{"الطب", "الهندسة", "العلوم الإدارية", "الفنون والتصميم"},
		FacultiesEn:   []string{"Medicine", "Engineering", "Administrative Sciences", "Arts & Design"},
		Specialties:   []string{"الذكاء الاصطناعي", "الطاقة المتجددة", "التكنولوجيا الحيوية"},
		Description:   "جامعة أهلية حديثة بمعايير دولية",
		DescriptionEn: "Modern national university with international standards",
		Image:         "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
		MinGrade:       80,
		Students:       5000,
		AcceptanceRate: 35,
		EmploymentRate: 90,
	},
}

// GetAllUniversities returns all universities
func GetAllUniversities() []models.University {
	return universities
}

// GetUniversityByID returns a university by ID
func GetUniversityByID(id string) (models.University, bool) {
	for _, uni := range universities {
		if uni.ID == id {
			return uni, true
		}
	}
	return models.University{}, false
}

// GetUniversitiesByType returns universities filtered by type
func GetUniversitiesByType(uniType string) []models.University {
	var result []models.University
	for _, uni := range universities {
		if uni.Type == uniType {
			result = append(result, uni)
		}
	}
	return result
}

// SearchUniversities searches universities based on params
func SearchUniversities(params models.SearchParams) []models.University {
	var results []models.University
	
	for _, uni := range universities {
		// Filter by type
		if params.SelectedType != "" && params.SelectedType != "all" && uni.Type != params.SelectedType {
			continue
		}
		
		// Filter by region
		if params.SelectedRegion != "" && params.SelectedRegion != "all" && uni.Region != params.SelectedRegion {
			continue
		}
		
		// Filter by fees
		if params.FilterByFees != nil && uni.Fees.Max > *params.FilterByFees {
			continue
		}
		
		// Filter by grade
		if params.FilterByGrade != nil && uni.MinGrade > *params.FilterByGrade {
			continue
		}
		
		// Search query matching
		if params.SearchQuery != "" {
			query := strings.ToLower(params.SearchQuery)
			matched := strings.Contains(strings.ToLower(uni.Name), query) ||
				strings.Contains(strings.ToLower(uni.NameEn), query) ||
				strings.Contains(strings.ToLower(uni.Location), query) ||
				strings.Contains(strings.ToLower(uni.LocationEn), query) ||
				strings.Contains(strings.ToLower(uni.Description), query)
			
			if !matched {
				continue
			}
		}
		
		results = append(results, uni)
	}
	
	return results
}

// GetOverallStats calculates overall statistics
func GetOverallStats() models.Stats {
	var publicCount, privateCount, nationalCount, azharCount, totalStudents int
	var totalRating float64
	
	for _, uni := range universities {
		switch uni.Type {
		case "public":
			publicCount++
		case "private":
			privateCount++
		case "national":
			nationalCount++
		case "azhar":
			azharCount++
		}
		totalStudents += uni.Students
		totalRating += uni.Rating
	}
	
	avgRating := 0.0
	if len(universities) > 0 {
		avgRating = totalRating / float64(len(universities))
	}
	
	return models.Stats{
		TotalUniversities: len(universities),
		PublicCount:       publicCount,
		PrivateCount:      privateCount,
		NationalCount:     nationalCount,
		AzharCount:        azharCount,
		TotalStudents:     totalStudents,
		AverageRating:     avgRating,
	}
}

// GetStatsByRegion calculates statistics for a region
func GetStatsByRegion(region string) models.RegionStats {
	var count, totalStudents, totalFees int
	var totalRating float64
	
	for _, uni := range universities {
		if uni.Region == region {
			count++
			totalStudents += uni.Students
			totalFees += (uni.Fees.Min + uni.Fees.Max) / 2
			totalRating += uni.Rating
		}
	}
	
	avgRating := 0.0
	avgFees := 0
	if count > 0 {
		avgRating = totalRating / float64(count)
		avgFees = totalFees / count
	}
	
	return models.RegionStats{
		Region:          region,
		UniversityCount: count,
		TotalStudents:   totalStudents,
		AverageRating:   avgRating,
		AverageFees:     avgFees,
	}
}

// GetAllFaculties returns all faculties from all universities
func GetAllFaculties() []string {
	facultySet := make(map[string]bool)
	var faculties []string
	
	for _, uni := range universities {
		for _, faculty := range uni.FacultiesEn {
			if !facultySet[faculty] {
				facultySet[faculty] = true
				faculties = append(faculties, faculty)
			}
		}
	}
	
	return faculties
}

// GetFacultyByID returns a faculty by ID (simplified)
func GetFacultyByID(id string) (string, bool) {
	faculties := GetAllFaculties()
	for _, f := range faculties {
		if strings.ToLower(strings.ReplaceAll(f, " ", "-")) == id {
			return f, true
		}
	}
	return "", false
}
