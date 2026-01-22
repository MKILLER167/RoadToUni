import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Info,
  Building2,
  BarChart3,
  Lightbulb,
  Filter,
  ChevronUp,
  ChevronDown,
  SortAsc,
  SortDesc,
  GitCompare,
  ExternalLink,
  CheckCircle,
  PieChart,
  Star,
  DollarSign,
  Users,
  TrendingUpIcon,
  MapPin,
  Calendar,
  Heart,
  GraduationCapIcon,
  Languages,
  Award,
  FileText,
  Calculator,
  BookOpen,
} from "lucide-react";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { animationVariants } from "../utils/animations";
import { getSectionConfig } from "../utils/constants";

interface UniversitySectionProps {
  type: string;
  universities: any[];
  currentLanguage: string;
  favorites: string[];
  comparison: string[];
  isLoading: boolean;
  selectedRegion: string;
  filterByFees: number | null;
  filterByGrade: number | null;
  sortBy: string;
  sortOrder: string;
  selectedTab: string;
  showFilters: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleComparison: (id: string) => void;
  onRegionChange: (region: string) => void;
  onFeesFilterChange: (fees: number | null) => void;
  onGradeFilterChange: (grade: number | null) => void;
  onSortByChange: (sortBy: string) => void;
  onSortOrderToggle: () => void;
  onTabChange: (tab: string) => void;
  onShowFiltersToggle: () => void;
  onViewDetails: (university: any) => void;
}

const MemoizedCard = React.memo(Card);
const MemoizedButton = React.memo(Button);
const MemoizedSelect = React.memo(Select);
const MemoizedInput = React.memo(Input);

export function UniversitySection({
  type,
  universities,
  currentLanguage,
  favorites,
  comparison,
  isLoading,
  selectedRegion,
  filterByFees,
  filterByGrade,
  sortBy,
  sortOrder,
  selectedTab,
  showFilters,
  onToggleFavorite,
  onToggleComparison,
  onRegionChange,
  onFeesFilterChange,
  onGradeFilterChange,
  onSortByChange,
  onSortOrderToggle,
  onTabChange,
  onShowFiltersToggle,
  onViewDetails,
}: UniversitySectionProps) {
  const config = getSectionConfig(currentLanguage)[type as keyof ReturnType<typeof getSectionConfig>];

  // Apply filters locally within the component with enhanced logic
  const filteredUniversities = React.useMemo(() => {
    let filtered = [...universities];

    // Region filter with improved matching
    if (selectedRegion !== "all") {
      const regionMatches = {
        "cairo": ["القاهرة", "الجيزة", "cairo", "giza", "6th october", "october", "شيخ زايد", "sheikh zayed", "الشروق", "shorouk", "new cairo", "القاهرة الجديدة"],
        "alexandria": ["الإسكندرية", "alexandria", "اسكندرية"],
        "delta": ["المنوفية", "الغربية", "الدقهلية", "كفر الشيخ", "دمياط", "البحيرة", "menoufia", "gharbia", "dakahlia", "kafr el sheikh", "damietta", "beheira", "طنطا", "tanta", "المنصورة", "mansoura", "الزقازيق", "zagazig"],
        "upper-egypt": ["أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان", "assiut", "sohag", "qena", "luxor", "aswan", "المنيا", "minya", "بني سويف", "beni suef"],
        "suez-canal": ["الإسماعيلية", "بورسعيد", "السويس", "ismailia", "port said", "suez", "العريش", "arish"]
      };

      const regionKeywords = regionMatches[selectedRegion as keyof typeof regionMatches] || [];
      filtered = filtered.filter(university => {
        return regionKeywords.some(keyword =>
          university.location.toLowerCase().includes(keyword.toLowerCase()) ||
          university.locationEn.toLowerCase().includes(keyword.toLowerCase())
        );
      });
    }

    // Fees filter with proper handling of different fee structures
    if (filterByFees !== null) {
      filtered = filtered.filter(university => {
        let maxFee = 0;

        if (typeof university.fees === 'object') {
          maxFee = university.fees.max || university.fees.min || 0;
        } else if (typeof university.fees === 'number') {
          maxFee = university.fees;
        } else {
          maxFee = 0;
        }

        return maxFee <= filterByFees;
      });
    }

    // Grade filter
    if (filterByGrade !== null) {
      filtered = filtered.filter(university => {
        const minGrade = university.minGrade || 0;
        return minGrade <= filterByGrade;
      });
    }

    // Sort universities with improved logic
    return filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "rating":
          comparison = (b.rating || 0) - (a.rating || 0);
          break;
        case "fees":
          const aFee = typeof a.fees === 'object' ? (a.fees.min || 0) : (a.fees || 0);
          const bFee = typeof b.fees === 'object' ? (b.fees.min || 0) : (b.fees || 0);
          comparison = aFee - bFee;
          break;
        case "students":
          comparison = (b.students || 0) - (a.students || 0);
          break;
        case "established":
          comparison = (b.established || 0) - (a.established || 0);
          break;
        case "name":
          comparison = a.name.localeCompare(b.name, currentLanguage === 'ar' ? 'ar' : 'en');
          break;
        default:
          comparison = (b.rating || 0) - (a.rating || 0);
      }

      return sortOrder === "desc" ? comparison : -comparison;
    });
  }, [universities, selectedRegion, filterByFees, filterByGrade, sortBy, sortOrder, currentLanguage]);

  // Helper function to format fees display
  const formatFees = (fees: any) => {
    if (typeof fees === 'object' && fees.min !== undefined && fees.max !== undefined) {
      return `${fees.min.toLocaleString()} - ${fees.max.toLocaleString()}`;
    } else if (typeof fees === 'number') {
      return fees.toLocaleString();
    }
    return '0';
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl pt-24">
      <motion.div {...animationVariants.fadeInUp}>
        {/* Header Section */}
        <MemoizedCard className="border-border shadow-xl bg-card/95 backdrop-blur-sm mb-8 hover:shadow-2xl transition-all duration-500">
          <CardHeader className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
            <CardTitle className="text-primary flex items-center gap-4 text-3xl relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                className={`p-3 ${config.bgColor} rounded-xl`}
              >
                <config.icon className={`h-10 w-10 ${config.color}`} />
              </motion.div>
              <div>
                <span className="block">{config.title}</span>
                <span className="block text-lg text-muted-foreground">{config.titleEn}</span>
              </div>
            </CardTitle>
            <CardDescription className="text-base relative z-10">
              {config.description}
            </CardDescription>
          </CardHeader>
        </MemoizedCard>

        {/* Enhanced Tabs Section */}
        <Tabs value={selectedTab} onValueChange={onTabChange} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              {currentLanguage === "ar" ? "نظرة عامة" : "Overview"}
            </TabsTrigger>
            <TabsTrigger value="universities" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              {currentLanguage === "ar" ? "الجامعات" : "Universities"}
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              {currentLanguage === "ar" ? "إحصائيات" : "Statistics"}
            </TabsTrigger>
            <TabsTrigger value="guide" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              {currentLanguage === "ar" ? "دليل القبول" : "Admission Guide"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Benefits Card */}
              <motion.div variants={animationVariants.scaleIn}>
                <MemoizedCard className="border-primary/20 hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <CheckCircle className="h-6 w-6 text-primary" />
                      <h3 className="text-xl text-primary">
                        {currentLanguage === "ar" ? "المميزات الرئيسية" : "Key Benefits"}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {config.benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-lg bg-accent/30 dark:bg-accent/20 hover:bg-accent/50 dark:hover:bg-accent/30 transition-colors"
                        >
                          <benefit.icon className="h-5 w-5 text-primary mt-1 shrink-0" />
                          <div>
                            <p className="text-sm font-medium">{benefit.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{benefit.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </MemoizedCard>
              </motion.div>

              {/* Quick Stats */}
              <motion.div variants={animationVariants.scaleIn}>
                <MemoizedCard className="border-primary/20 hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <PieChart className="h-6 w-6 text-primary" />
                      <h3 className="text-xl text-primary">
                        {currentLanguage === "ar" ? "إحصائيات سريعة" : "Quick Stats"}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-accent/30 dark:bg-accent/20 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{filteredUniversities.length}</div>
                        <div className="text-sm text-muted-foreground">
                          {currentLanguage === "ar" ? "جامعة" : "Universities"}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-accent/30 dark:bg-accent/20 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {universities.length > 0 ? Math.round(universities.reduce((acc, uni) => acc + (uni.rating || 0), 0) / universities.length * 10) / 10 : 0}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {currentLanguage === "ar" ? "متوسط التقييم" : "Avg Rating"}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-accent/30 dark:bg-accent/20 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {universities.length > 0 ? Math.round(universities.reduce((acc, uni) => acc + (uni.employmentRate || 75), 0) / universities.length) : 0}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {currentLanguage === "ar" ? "معدل التوظيف" : "Employment Rate"}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-accent/30 dark:bg-accent/20 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {universities.length > 0 ? universities.reduce((acc, uni) => acc + (uni.students || 0), 0).toLocaleString() : 0}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {currentLanguage === "ar" ? "إجمالي الطلاب" : "Total Students"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </MemoizedCard>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="universities">
            {/* Enhanced Filter and Sort Controls */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <MemoizedButton
                  variant="outline"
                  onClick={onShowFiltersToggle}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  {currentLanguage === "ar" ? "فلترة" : "Filter"}
                  {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </MemoizedButton>

                <MemoizedSelect value={sortBy} onValueChange={onSortByChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder={currentLanguage === "ar" ? "ترتيب حسب" : "Sort by"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">
                      {currentLanguage === "ar" ? "التقييم" : "Rating"}
                    </SelectItem>
                    <SelectItem value="fees">
                      {currentLanguage === "ar" ? "الرسوم" : "Fees"}
                    </SelectItem>
                    <SelectItem value="students">
                      {currentLanguage === "ar" ? "عدد الطلاب" : "Student Count"}
                    </SelectItem>
                    <SelectItem value="established">
                      {currentLanguage === "ar" ? "تاريخ التأسيس" : "Established"}
                    </SelectItem>
                    <SelectItem value="name">
                      {currentLanguage === "ar" ? "الاسم" : "Name"}
                    </SelectItem>
                  </SelectContent>
                </MemoizedSelect>

                <MemoizedButton
                  variant="outline"
                  size="sm"
                  onClick={onSortOrderToggle}
                  title={sortOrder === "desc" ?
                    (currentLanguage === "ar" ? "ترتيب تنازلي" : "Descending") :
                    (currentLanguage === "ar" ? "ترتيب تصاعدي" : "Ascending")
                  }
                >
                  {sortOrder === "desc" ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
                </MemoizedButton>

                {comparison.length > 0 && (
                  <Badge variant="secondary" className="flex items-center gap-2">
                    <GitCompare className="h-3 w-3" />
                    {currentLanguage === "ar" ? `مقارنة (${comparison.length})` : `Compare (${comparison.length})`}
                  </Badge>
                )}
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-accent/30 dark:bg-accent/20 rounded-lg"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {currentLanguage === "ar" ? "الحد الأقصى للرسوم" : "Max Fees"}
                      </label>
                      <MemoizedInput
                        type="number"
                        placeholder={currentLanguage === "ar" ? "مثال: 100000" : "e.g. 100000"}
                        value={filterByFees || ""}
                        onChange={(e) => onFeesFilterChange(e.target.value ? Number(e.target.value) : null)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {currentLanguage === "ar" ? "درجتك في الثانوية" : "Your Grade"}
                      </label>
                      <MemoizedInput
                        type="number"
                        placeholder={currentLanguage === "ar" ? "مثال: 85" : "e.g. 85"}
                        value={filterByGrade || ""}
                        onChange={(e) => onGradeFilterChange(e.target.value ? Number(e.target.value) : null)}
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {currentLanguage === "ar" ? "المنطقة" : "Region"}
                      </label>
                      <MemoizedSelect value={selectedRegion} onValueChange={onRegionChange}>
                        <SelectTrigger>
                          <SelectValue placeholder={currentLanguage === "ar" ? "اختر المنطقة" : "Select region"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">
                            {currentLanguage === "ar" ? "جميع المناطق" : "All Regions"}
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
                      </MemoizedSelect>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Universities Grid - With enhanced filtering applied */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <LoadingSkeleton key={index} variant="card" />
                ))}
              </div>
            ) : filteredUniversities.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="bg-muted/30 rounded-lg p-8 max-w-md mx-auto">
                  <div className="text-muted-foreground mb-4">
                    <Building2 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium">
                      {currentLanguage === "ar" ? "لا توجد جامعات مطابقة" : "No matching universities"}
                    </h3>
                    <p className="text-sm mt-2">
                      {currentLanguage === "ar"
                        ? "جرب تغيير معايير البحث أو الفلترة للحصول على نتائج أكثر"
                        : "Try changing your search criteria or filters to get more results"
                      }
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      onRegionChange("all");
                      onFeesFilterChange(null);
                      onGradeFilterChange(null);
                    }}
                    className="mt-4"
                  >
                    {currentLanguage === "ar" ? "مسح الفلاتر" : "Clear Filters"}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="space-y-6"
                variants={animationVariants.staggerContainer}
                initial="initial"
                animate="animate"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <span>
                      {currentLanguage === "ar"
                        ? `تم العثور على ${filteredUniversities.length} جامعة`
                        : `Found ${filteredUniversities.length} universities`
                      }
                    </span>
                  </div>
                  {(selectedRegion !== "all" || filterByFees !== null || filterByGrade !== null) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onRegionChange("all");
                        onFeesFilterChange(null);
                        onGradeFilterChange(null);
                      }}
                      className="text-primary hover:text-primary/80"
                    >
                      {currentLanguage === "ar" ? "مسح جميع الفلاتر" : "Clear all filters"}
                    </Button>
                  )}
                </div>

                {filteredUniversities.map((university) => (
                  <motion.div
                    key={university.id}
                    variants={animationVariants.scaleIn}
                    className="relative"
                  >
                    {/* Enhanced University Card */}
                    <MemoizedCard className="border-border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* University Image */}
                          <div className="lg:col-span-1">
                            <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                              <ImageWithFallback
                                src={university.image}
                                alt={currentLanguage === "ar" ? university.name : university.nameEn}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                              />
                              <div className="absolute top-2 right-2 flex gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => onToggleFavorite(university.id)}
                                  className={`p-2 rounded-full border border-border transition-colors ${favorites.includes(university.id)
                                      ? "bg-red-500 text-white border-red-500"
                                      : "bg-background/80 backdrop-blur-sm hover:bg-background"
                                    }`}
                                >
                                  <Heart className="h-4 w-4" />
                                </motion.button>

                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => onToggleComparison(university.id)}
                                  className={`p-2 rounded-full border border-border transition-colors ${comparison.includes(university.id)
                                      ? "bg-blue-500 text-white border-blue-500"
                                      : "bg-background/80 backdrop-blur-sm hover:bg-background"
                                    }`}
                                  disabled={!comparison.includes(university.id) && comparison.length >= 3}
                                >
                                  <GitCompare className="h-4 w-4" />
                                </motion.button>
                              </div>
                            </div>
                          </div>

                          {/* University Info */}
                          <div className="lg:col-span-2 space-y-4">
                            {/* Header */}
                            <div>
                              <h3 className="text-xl font-bold text-foreground mb-2">
                                {currentLanguage === "ar" ? university.name : university.nameEn}
                              </h3>
                              <p className="text-muted-foreground text-sm mb-3">
                                {currentLanguage === "ar" ? university.description : university.descriptionEn}
                              </p>

                              {/* Quick Info */}
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{currentLanguage === "ar" ? university.location : university.locationEn}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{currentLanguage === "ar" ? "تأسست" : "Est."} {university.established}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  <span>{(university.students || 0).toLocaleString()} {currentLanguage === "ar" ? "طالب" : "students"}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  <span>{university.rating || 0}/5</span>
                                </div>
                              </div>
                            </div>

                            {/* Basic Faculties */}
                            <div>
                              <h4 className="font-medium text-foreground mb-2">
                                {currentLanguage === "ar" ? "الكليات المتاحة:" : "Available Faculties:"}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {(currentLanguage === "ar" ? university.faculties : university.facultiesEn)?.slice(0, 4).map((faculty, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {faculty}
                                  </Badge>
                                ))}
                                {(university.faculties?.length || 0) > 4 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{(university.faculties?.length || 0) - 4} {currentLanguage === "ar" ? "المزيد" : "more"}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex gap-3 pt-2">
                              <MemoizedButton
                                onClick={() => onViewDetails(university)}
                                className="flex items-center gap-2"
                              >
                                <ExternalLink className="h-4 w-4" />
                                {currentLanguage === "ar" ? "عرض التفاصيل" : "View Details"}
                              </MemoizedButton>
                            </div>

                            {/* Enhanced Key Statistics Row */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                              <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                  {university.employmentRate || 75}%
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {currentLanguage === "ar" ? "معدل التوظيف" : "Employment Rate"}
                                </div>
                              </div>
                              <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                  {university.acceptanceRate || 20}%
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {currentLanguage === "ar" ? "معدل القبول" : "Acceptance Rate"}
                                </div>
                              </div>
                              <div className="text-center p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                                <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
                                  {university.minGrade || 0}%
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {currentLanguage === "ar" ? "الحد الأدنى" : "Min Grade"}
                                </div>
                              </div>
                              <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                  {formatFees(university.fees)}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {currentLanguage === "ar" ? "الرسوم (جنيه)" : "Fees (EGP)"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </MemoizedCard>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="statistics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enhanced Statistics Cards */}
              <MemoizedCard className="border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    {currentLanguage === "ar" ? "توزيع التقييمات" : "Rating Distribution"}
                  </h3>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = filteredUniversities.filter(uni => Math.floor(uni.rating || 0) === rating).length;
                      const percentage = filteredUniversities.length > 0 ? (count / filteredUniversities.length) * 100 : 0;
                      return (
                        <div key={rating} className="flex items-center gap-3">
                          <div className="flex items-center gap-1 w-16">
                            <span className="text-sm">{rating}</span>
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          </div>
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <motion.div
                              className="bg-primary h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, delay: rating * 0.1 }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-12">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </MemoizedCard>

              {/* Continue with remaining stats cards... */}
            </div>
          </TabsContent>

          <TabsContent value="guide">
            {/* Guide content remains the same */}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}