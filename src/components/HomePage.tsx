import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap,
  Search,
  CheckCircle,
  Award,
  Sun,
  Moon,
  MapPin,
  Building2,
  BookOpen,
  Target,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { animationVariants } from "../utils/animations";
import { allUniversities } from "../data/universities";

interface HomePageProps {
  currentLanguage: string;
  isDarkMode: boolean;
  educationalBackground: string;
  searchQuery: string;
  selectedType: string;
  selectedRegion: string;
  showAdvancedSearch: boolean;
  filterByFees: number | null;
  filterByGrade: number | null;
  isLoading: boolean;
  onLanguageChange: (lang: string) => void;
  onDarkModeToggle: (enabled: boolean) => void;
  onEducationalBackgroundSelect: (background: string) => void;
  onSearchQueryChange: (query: string) => void;
  onTypeChange: (type: string) => void;
  onRegionChange: (region: string) => void;
  onAdvancedSearchToggle: () => void;
  onFeesFilterChange: (fees: number | null) => void;
  onGradeFilterChange: (grade: number | null) => void;
  onSearch: () => void;
  onContactUs: () => void;
}

interface SearchSuggestion {
  id: string;
  type: 'university' | 'faculty' | 'department' | 'specialization';
  name: string;
  nameEn: string;
  universityName?: string;
  universityNameEn?: string;
  facultyName?: string;
  facultyNameEn?: string;
  icon: any;
}

export function HomePage({
  currentLanguage,
  isDarkMode,
  educationalBackground,
  searchQuery,
  selectedType,
  selectedRegion,
  showAdvancedSearch,
  filterByFees,
  filterByGrade,
  isLoading,
  onLanguageChange,
  onDarkModeToggle,
  onEducationalBackgroundSelect,
  onSearchQueryChange,
  onTypeChange,
  onRegionChange,
  onAdvancedSearchToggle,
  onFeesFilterChange,
  onGradeFilterChange,
  onSearch,
  onContactUs,
}: HomePageProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  // Generate search suggestions
  const suggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];

    const query = searchQuery.toLowerCase().trim();
    const results: SearchSuggestion[] = [];

    // Search universities
    allUniversities.forEach(university => {
      const uniName = currentLanguage === "ar" ? university.name : university.nameEn;
      const uniLocation = currentLanguage === "ar" ? university.location : university.locationEn;

      if (uniName.toLowerCase().includes(query) || uniLocation.toLowerCase().includes(query)) {
        results.push({
          id: `uni-${university.id}`,
          type: 'university',
          name: university.name,
          nameEn: university.nameEn,
          icon: Building2
        });
      }

      // Search faculties
      if (university.detailedFaculties) {
        Object.entries(university.detailedFaculties).forEach(([facultyName, facultyData]) => {
          const facName = currentLanguage === "ar" ? facultyName : facultyData.nameEn;

          if (facName.toLowerCase().includes(query)) {
            results.push({
              id: `fac-${university.id}-${facultyName}`,
              type: 'faculty',
              name: facultyName,
              nameEn: facultyData.nameEn,
              universityName: university.name,
              universityNameEn: university.nameEn,
              icon: BookOpen
            });
          }

          // Search departments
          if (facultyData.departments) {
            facultyData.departments.forEach((dept: any, deptIndex: number) => {
              const deptName = currentLanguage === "ar" ? dept.name : dept.nameEn;

              if (deptName.toLowerCase().includes(query)) {
                results.push({
                  id: `dept-${university.id}-${facultyName}-${deptIndex}`,
                  type: 'department',
                  name: dept.name,
                  nameEn: dept.nameEn,
                  universityName: university.name,
                  universityNameEn: university.nameEn,
                  facultyName: facultyName,
                  facultyNameEn: facultyData.nameEn,
                  icon: GraduationCap
                });
              }
            });
          }

          // Search specializations
          if (facultyData.specializations) {
            facultyData.specializations.forEach((spec: any, specIndex: number) => {
              const specName = typeof spec === "string" ? spec : (currentLanguage === "ar" ? spec.name : spec.nameEn);

              if (specName.toLowerCase().includes(query)) {
                results.push({
                  id: `spec-${university.id}-${facultyName}-${specIndex}`,
                  type: 'specialization',
                  name: typeof spec === "string" ? spec : spec.name,
                  nameEn: typeof spec === "string" ? spec : spec.nameEn,
                  universityName: university.name,
                  universityNameEn: university.nameEn,
                  facultyName: facultyName,
                  facultyNameEn: facultyData.nameEn,
                  icon: Target
                });
              }
            });
          }
        });
      }

      // Search basic faculties and specialties
      const faculties = currentLanguage === "ar" ? university.faculties : university.facultiesEn;
      faculties.forEach((faculty: string, index: number) => {
        if (faculty.toLowerCase().includes(query)) {
          results.push({
            id: `basic-fac-${university.id}-${index}`,
            type: 'faculty',
            name: currentLanguage === "ar" ? university.faculties[index] : faculty,
            nameEn: currentLanguage === "ar" ? faculty : university.faculties[index],
            universityName: university.name,
            universityNameEn: university.nameEn,
            icon: BookOpen
          });
        }
      });

      university.specialties.forEach((specialty: string, index: number) => {
        if (specialty.toLowerCase().includes(query)) {
          results.push({
            id: `spec-${university.id}-specialty-${index}`,
            type: 'specialization',
            name: specialty,
            nameEn: specialty,
            universityName: university.name,
            universityNameEn: university.nameEn,
            icon: Target
          });
        }
      });
    });

    // Remove duplicates and limit results
    const uniqueResults = results.filter((item, index, self) =>
      index === self.findIndex(t => t.name === item.name && t.type === item.type)
    );

    return uniqueResults.slice(0, 8);
  }, [searchQuery, currentLanguage]);

  // Handle search input change
  const handleSearchInputChange = (value: string) => {
    onSearchQueryChange(value);
    setShowSuggestions(value.length >= 2);
    setActiveSuggestionIndex(-1);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    const displayName = currentLanguage === "ar" ? suggestion.name : suggestion.nameEn;
    onSearchQueryChange(displayName);
    setShowSuggestions(false);
    setActiveSuggestionIndex(-1);

    // Trigger search
    setTimeout(() => {
      onSearch();
    }, 100);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestionIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestionIndex(prev =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestionIndex >= 0) {
          handleSuggestionSelect(suggestions[activeSuggestionIndex]);
        } else {
          onSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
    };

    if (showSuggestions) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showSuggestions]);

  const getSuggestionTypeLabel = (type: string) => {
    switch (type) {
      case 'university':
        return currentLanguage === "ar" ? "جامعة" : "University";
      case 'faculty':
        return currentLanguage === "ar" ? "كلية" : "Faculty";
      case 'department':
        return currentLanguage === "ar" ? "قسم" : "Department";
      case 'specialization':
        return currentLanguage === "ar" ? "تخصص" : "Specialization";
      default:
        return "";
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=600&fit=crop"
          alt="Egyptian university campus"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/95 to-background/90"></div>
      </div>

      <div className="container mx-auto px-4 py-3 pt-20 max-w-4xl relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center py-3 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            {...animationVariants.slideIn}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="relative p-2 bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-md rounded-xl border border-primary/20">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">
                {currentLanguage === "ar" ? "طريق الجامعات" : "Road to Universities"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {currentLanguage === "ar"
                  ? "دليلك للتعليم العالي في مصر"
                  : "Your guide to higher education in Egypt"
                }
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-2"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLanguageChange(currentLanguage === "ar" ? "en" : "ar")}
              className="w-9 h-9 p-0 hover:bg-primary/10"
            >
              <span className="text-sm">
                {currentLanguage === "ar" ? "🇺🇸" : "🇪🇬"}
              </span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDarkModeToggle(!isDarkMode)}
              className="w-9 h-9 p-0 hover:bg-primary/10"
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-4 w-4 text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-6 w-6 text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>


          </motion.div>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center mb-8 flex-1 flex flex-col justify-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {currentLanguage === "ar" ? "ابحث عن جامعتك المثالية" : "Find Your Perfect University"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {currentLanguage === "ar"
              ? "اكتشف الجامعات المصرية واختر التخصص المناسب لمستقبلك"
              : "Discover Egyptian universities and choose the right major for your future"
            }
          </p>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-2xl mx-auto w-full"
          >
            <Card className="border-border shadow-lg bg-card/95 backdrop-blur-md">
              <CardContent className="p-6 space-y-4">
                {/* Compact Educational Background Selection */}
                <div className="space-y-2">
                  <label className="block text-xs text-muted-foreground">
                    {currentLanguage === "ar" ? "نوع الشهادة" : "Certificate Type"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className={`p-2 rounded-lg border transition-all duration-300 text-left ${educationalBackground === "thanawiya"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
                        }`}
                      onClick={() => onEducationalBackgroundSelect("thanawiya")}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded ${educationalBackground === "thanawiya" ? "bg-primary/10" : "bg-accent"}`}>
                          <GraduationCap className="h-3 w-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium">
                            {currentLanguage === "ar" ? "ثانوية عامة" : "Thanawiya"}
                          </div>
                          <div className="text-xs opacity-60">
                            {currentLanguage === "ar" ? "مصرية" : "Egyptian"}
                          </div>
                        </div>
                        {educationalBackground === "thanawiya" && (
                          <CheckCircle className="h-3 w-3 text-primary" />
                        )}
                      </div>
                    </button>

                    <button
                      className={`p-2 rounded-lg border transition-all duration-300 text-left ${educationalBackground === "international"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
                        }`}
                      onClick={() => onEducationalBackgroundSelect("international")}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded ${educationalBackground === "international" ? "bg-primary/10" : "bg-accent"}`}>
                          <Award className="h-3 w-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium">
                            {currentLanguage === "ar" ? "شهادة معادلة" : "Equivalent"}
                          </div>
                          <div className="text-xs opacity-60">
                            {currentLanguage === "ar" ? "دولية" : "International"}
                          </div>
                        </div>
                        {educationalBackground === "international" && (
                          <CheckCircle className="h-3 w-3 text-primary" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Search Bar with Autocomplete */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-foreground">
                    {currentLanguage === "ar" ? "ابحث عن جامعتك" : "Search for your university"}
                  </label>
                  <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={currentLanguage === "ar" ? "ابحث بالاسم، المنطقة، أو التخصص..." : "Search by name, region, or specialization..."}
                      value={searchQuery}
                      onChange={(e) => handleSearchInputChange(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onFocus={() => setShowSuggestions(searchQuery.length >= 2)}
                      className="pl-12 h-14 text-base bg-background border-2 border-border focus:border-primary"
                      autoComplete="off"
                    />

                    {/* Search Suggestions Dropdown */}
                    <AnimatePresence>
                      {showSuggestions && suggestions.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto"
                        >
                          {suggestions.map((suggestion, index) => {
                            const isActive = index === activeSuggestionIndex;
                            const Icon = suggestion.icon;

                            return (
                              <motion.div
                                key={suggestion.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className={`p-3 cursor-pointer transition-colors border-b border-border last:border-b-0 hover:bg-accent ${isActive ? 'bg-accent' : ''
                                  }`}
                                onClick={() => handleSuggestionSelect(suggestion)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-1.5 bg-primary/10 rounded-lg">
                                    <Icon className="h-4 w-4 text-primary" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-foreground">
                                        {currentLanguage === "ar" ? suggestion.name : suggestion.nameEn}
                                      </span>
                                      <Badge variant="secondary" className="text-xs">
                                        {getSuggestionTypeLabel(suggestion.type)}
                                      </Badge>
                                    </div>
                                    {suggestion.universityName && (
                                      <div className="text-xs text-muted-foreground mt-1">
                                        <span className="flex items-center gap-1">
                                          <Building2 className="h-3 w-3" />
                                          {currentLanguage === "ar" ? suggestion.universityName : suggestion.universityNameEn}
                                          {suggestion.facultyName && (
                                            <>
                                              <span className="mx-1">•</span>
                                              {currentLanguage === "ar" ? suggestion.facultyName : suggestion.facultyNameEn}
                                            </>
                                          )}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Quick Filters */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      {currentLanguage === "ar" ? "نوع الجامعة" : "University Type"}
                    </label>
                    <Select value={selectedType} onValueChange={onTypeChange}>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder={currentLanguage === "ar" ? "جميع الأنواع" : "All Types"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          {currentLanguage === "ar" ? "جميع الأنواع" : "All Types"}
                        </SelectItem>
                        <SelectItem value="public">
                          {currentLanguage === "ar" ? "حكومية" : "Public"}
                        </SelectItem>
                        <SelectItem value="national">
                          {currentLanguage === "ar" ? "أهلية" : "National"}
                        </SelectItem>
                        <SelectItem value="private">
                          {currentLanguage === "ar" ? "خاصة" : "Private"}
                        </SelectItem>
                        <SelectItem value="azhar">
                          {currentLanguage === "ar" ? "الأزهر" : "Al-Azhar"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      {currentLanguage === "ar" ? "المحافظة" : "Governorate"}
                    </label>
                    <Select value={selectedRegion} onValueChange={onRegionChange}>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder={currentLanguage === "ar" ? "جميع المحافظات" : "All Governorates"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          {currentLanguage === "ar" ? "جميع المحافظات" : "All Governorates"}
                        </SelectItem>
                        <SelectItem value="cairo">
                          {currentLanguage === "ar" ? "القاهرة الكبرى" : "Greater Cairo"}
                        </SelectItem>
                        <SelectItem value="alexandria">
                          {currentLanguage === "ar" ? "الإسكندرية" : "Alexandria"}
                        </SelectItem>
                        <SelectItem value="delta">
                          {currentLanguage === "ar" ? "الدلتا" : "Delta"}
                        </SelectItem>
                        <SelectItem value="upper-egypt">
                          {currentLanguage === "ar" ? "صعيد مصر" : "Upper Egypt"}
                        </SelectItem>
                        <SelectItem value="suez-canal">
                          {currentLanguage === "ar" ? "قناة السويس" : "Suez Canal"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Advanced Search Options */}
                <AnimatePresence>
                  {showAdvancedSearch && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 pt-4 border-t border-border overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            {currentLanguage === "ar" ? "الحد الأقصى للرسوم (جنيه/سنة)" : "Max Fees (EGP/year)"}
                          </label>
                          <Input
                            type="number"
                            placeholder={currentLanguage === "ar" ? "مثال: 50000" : "e.g. 50000"}
                            className="h-12 text-base"
                            value={filterByFees || ""}
                            onChange={(e) => onFeesFilterChange(e.target.value ? Number(e.target.value) : null)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            {currentLanguage === "ar" ? "أقل درجة مطلوبة (%)" : "Min Grade Required (%)"}
                          </label>
                          <Input
                            type="number"
                            placeholder={currentLanguage === "ar" ? "مثال: 80" : "e.g. 80"}
                            className="h-12 text-base"
                            min="0"
                            max="100"
                            value={filterByGrade || ""}
                            onChange={(e) => onGradeFilterChange(e.target.value ? Number(e.target.value) : null)}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Search Button */}
                <div className="space-y-3">
                  <Button
                    onClick={onSearch}
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground h-14 text-lg font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-5 w-5 mr-3 border-2 border-current border-t-transparent rounded-full"
                      />
                    ) : (
                      <Search className="h-5 w-5 mr-3" />
                    )}
                    {currentLanguage === "ar" ? "ابحث الآن" : "Search Now"}
                  </Button>

                  <div className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onAdvancedSearchToggle}
                      className="text-primary hover:bg-primary/10 text-sm"
                    >
                      {showAdvancedSearch
                        ? (currentLanguage === "ar" ? "إخفاء الخيارات المتقدمة" : "Hide Advanced Options")
                        : (currentLanguage === "ar" ? "خيارات متقدمة" : "Advanced Options")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}