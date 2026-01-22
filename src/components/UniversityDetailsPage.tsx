import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  Star,
  GraduationCap,
  BookOpen,
  DollarSign,
  TrendingUp,
  Award,
  Phone,
  Mail,
  Globe,
  ExternalLink,
  Heart,
  GitCompare,
  Share2,
  Download,
  Clock,
  Building2,
  Target,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  Calculator,
  FileText,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  CreditCard,
  Banknote,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { animationVariants } from "../utils/animations";

const MemoizedCard = React.memo(Card);
const MemoizedButton = React.memo(Button);

interface UniversityDetailsPageProps {
  university: any;
  currentLanguage: string;
  favorites: string[];
  comparison: string[];
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
  onToggleComparison: (id: string) => void;
}

export function UniversityDetailsPage({
  university,
  currentLanguage,
  favorites,
  comparison,
  onBack,
  onToggleFavorite,
  onToggleComparison,
}: UniversityDetailsPageProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSections, setExpandedSections] = useState<string[]>(["basic-info"]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isFavorite = favorites.includes(university.id);
  const isInComparison = comparison.includes(university.id);

  // Calculate scores and metrics
  const overallScore = Math.round((university.rating * 20 + university.employmentRate + university.acceptanceRate) / 3);
  const affordabilityScore = university.type === "public" ? 90 : university.type === "national" ? 70 : 40;
  const academicScore = Math.round(university.rating * 20);

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm"
      >
        <div className="container mx-auto px-4 py-3 max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MemoizedButton
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="flex items-center gap-2 hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4" />
                {currentLanguage === "ar" ? "العودة" : "Back"}
              </MemoizedButton>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="font-medium text-foreground">
                  {currentLanguage === "ar" ? university.name : university.nameEn}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {currentLanguage === "ar" ? university.location : university.locationEn}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MemoizedButton
                variant="outline"
                size="sm"
                onClick={() => onToggleFavorite(university.id)}
                className={`${isFavorite ? "bg-red-50 border-red-200 text-red-600 dark:bg-red-950/30 dark:border-red-800" : ""}`}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
              </MemoizedButton>

              <MemoizedButton
                variant="outline"
                size="sm"
                onClick={() => onToggleComparison(university.id)}
                disabled={!isInComparison && comparison.length >= 3}
                className={`${isInComparison ? "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/30 dark:border-blue-800" : ""}`}
              >
                <GitCompare className="h-4 w-4" />
              </MemoizedButton>

              <MemoizedButton variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </MemoizedButton>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto p-4 max-w-6xl pb-20">
        {/* Hero Section */}
        <motion.div
          {...animationVariants.fadeInUp}
          className="mb-8"
        >
          <MemoizedCard className="overflow-hidden border-border shadow-xl">
            <div className="relative h-64 md:h-80">
              <ImageWithFallback
                src={university.image}
                alt={currentLanguage === "ar" ? university.name : university.nameEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* University Badge */}
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-white/90 text-foreground">
                  {university.type === "public" && (currentLanguage === "ar" ? "حكومية" : "Public")}
                  {university.type === "private" && (currentLanguage === "ar" ? "خاصة" : "Private")}
                  {university.type === "national" && (currentLanguage === "ar" ? "أهلية" : "National")}
                  {university.type === "azhar" && (currentLanguage === "ar" ? "الأزهر" : "Al-Azhar")}
                </Badge>
              </div>

              {/* University Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-white">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {currentLanguage === "ar" ? university.name : university.nameEn}
                  </h1>
                  <p className="text-lg text-white/90 mb-4">
                    {currentLanguage === "ar" ? university.description : university.descriptionEn}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm">
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
                      <span>{university.students.toLocaleString()} {currentLanguage === "ar" ? "طالب" : "students"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>{university.rating}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MemoizedCard>
        </motion.div>

        {/* Quick Stats Cards */}
        <motion.div
          {...animationVariants.fadeInUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <MemoizedCard className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary mb-1">{university.rating}/5</div>
              <div className="text-sm text-muted-foreground">
                {currentLanguage === "ar" ? "التقييم" : "Rating"}
              </div>
            </CardContent>
          </MemoizedCard>

          <MemoizedCard className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600 mb-1">{university.employmentRate}%</div>
              <div className="text-sm text-muted-foreground">
                {currentLanguage === "ar" ? "التوظيف" : "Employment"}
              </div>
            </CardContent>
          </MemoizedCard>

          <MemoizedCard className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600 mb-1">{university.acceptanceRate}%</div>
              <div className="text-sm text-muted-foreground">
                {currentLanguage === "ar" ? "القبول" : "Acceptance"}
              </div>
            </CardContent>
          </MemoizedCard>

          <MemoizedCard className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600 mb-1">{university.minGrade}%</div>
              <div className="text-sm text-muted-foreground">
                {currentLanguage === "ar" ? "الحد الأدنى" : "Min Grade"}
              </div>
            </CardContent>
          </MemoizedCard>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div {...animationVariants.fadeInUp}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
              <TabsTrigger value="overview">
                {currentLanguage === "ar" ? "نظرة عامة" : "Overview"}
              </TabsTrigger>
              <TabsTrigger value="faculties">
                {currentLanguage === "ar" ? "الكليات" : "Faculties"}
              </TabsTrigger>
              <TabsTrigger value="admission">
                {currentLanguage === "ar" ? "القبول" : "Admission"}
              </TabsTrigger>
              <TabsTrigger value="fees">
                {currentLanguage === "ar" ? "الرسوم" : "Fees"}
              </TabsTrigger>
              <TabsTrigger value="contact">
                {currentLanguage === "ar" ? "التواصل" : "Contact"}
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* University Scores */}
              <MemoizedCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    {currentLanguage === "ar" ? "تقييم الجامعة" : "University Scores"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {currentLanguage === "ar" ? "التقييم الأكاديمي" : "Academic Score"}
                      </span>
                      <span className="text-sm font-bold">{academicScore}%</span>
                    </div>
                    <Progress value={academicScore} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {currentLanguage === "ar" ? "إمكانية التحمل المالي" : "Affordability"}
                      </span>
                      <span className="text-sm font-bold">{affordabilityScore}%</span>
                    </div>
                    <Progress value={affordabilityScore} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {currentLanguage === "ar" ? "معدل التوظيف" : "Employment Rate"}
                      </span>
                      <span className="text-sm font-bold">{university.employmentRate}%</span>
                    </div>
                    <Progress value={university.employmentRate} className="h-2" />
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center p-3 bg-accent rounded-lg">
                    <span className="font-medium">
                      {currentLanguage === "ar" ? "التقييم الإجمالي" : "Overall Score"}
                    </span>
                    <span className="text-xl font-bold text-primary">{overallScore}%</span>
                  </div>
                </CardContent>
              </MemoizedCard>

              {/* University Highlights */}
              <MemoizedCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    {currentLanguage === "ar" ? "المميزات الرئيسية" : "Key Highlights"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {university.specialties.map((specialty: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </MemoizedCard>

              {/* Basic Faculties Overview */}
              <MemoizedCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    {currentLanguage === "ar" ? "الكليات المتاحة" : "Available Faculties"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {(currentLanguage === "ar" ? university.faculties : university.facultiesEn).map((faculty: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {faculty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </MemoizedCard>
            </TabsContent>

            {/* Faculties Tab */}
            <TabsContent value="faculties" className="space-y-6">
              {university.detailedFaculties ? (
                <div className="space-y-6">
                  {Object.entries(university.detailedFaculties).map(([facultyName, facultyData], index) => (
                    <motion.div
                      key={facultyName}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <MemoizedCard className="overflow-hidden">
                        <CardHeader className="bg-accent/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <BookOpen className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">
                                  {currentLanguage === "ar" ? facultyName : facultyData.nameEn}
                                </CardTitle>
                                <CardDescription>
                                  {currentLanguage === "ar" ? facultyData.description : facultyData.descriptionEn}
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {facultyData.annualFees && (
                                <Badge variant="outline" className="text-xs">
                                  <DollarSign className="h-3 w-3 mr-1" />
                                  {currentLanguage === "ar"
                                    ? `${facultyData.annualFees.min.toLocaleString()} - ${facultyData.annualFees.max.toLocaleString()} جنيه`
                                    : facultyData.annualFeesEn
                                  }
                                </Badge>
                              )}
                              <MemoizedButton
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleSection(facultyName)}
                              >
                                {expandedSections.includes(facultyName) ?
                                  <ChevronUp className="h-4 w-4" /> :
                                  <ChevronDown className="h-4 w-4" />
                                }
                              </MemoizedButton>
                            </div>
                          </div>
                        </CardHeader>

                        <AnimatePresence>
                          {expandedSections.includes(facultyName) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <CardContent className="space-y-6">
                                {/* Departments */}
                                {facultyData.departments && (
                                  <div>
                                    <h4 className="font-medium mb-3 flex items-center gap-2">
                                      <Building2 className="h-4 w-4 text-primary" />
                                      {currentLanguage === "ar" ? "الأقسام المتاحة" : "Available Departments"}
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {facultyData.departments.map((dept: any, deptIndex: number) => (
                                        <div key={deptIndex} className="border border-border rounded-lg p-4">
                                          <div className="flex justify-between items-start mb-2">
                                            <h5 className="font-medium">
                                              {currentLanguage === "ar" ? dept.name : dept.nameEn}
                                            </h5>
                                            {dept.fees && (
                                              <Badge variant="secondary" className="text-xs">
                                                <Banknote className="h-3 w-3 mr-1" />
                                                {dept.fees.toLocaleString()} {currentLanguage === "ar" ? "جنيه" : "EGP"}
                                              </Badge>
                                            )}
                                          </div>
                                          <p className="text-sm text-muted-foreground mb-3">
                                            {currentLanguage === "ar" ? dept.duration : dept.durationEn}
                                          </p>
                                          <div className="space-y-2">
                                            {dept.degrees && (currentLanguage === "ar" ? dept.degrees : dept.degreesEn).map((degree: string, degIndex: number) => (
                                              <div key={degIndex} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                                {degree}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Specializations */}
                                {facultyData.specializations && (
                                  <div>
                                    <h4 className="font-medium mb-3 flex items-center gap-2">
                                      <Target className="h-4 w-4 text-primary" />
                                      {currentLanguage === "ar" ? "التخصصات المتاحة" : "Available Specializations"}
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      {facultyData.specializations.map((spec: any, specIndex: number) => (
                                        <div key={specIndex} className="flex items-center justify-between p-3 border border-border rounded-lg">
                                          <span className="text-sm">
                                            {typeof spec === "string" ? spec : (currentLanguage === "ar" ? spec.name : spec.nameEn)}
                                          </span>
                                          {spec.fees && (
                                            <Badge variant="outline" className="text-xs">
                                              <CreditCard className="h-3 w-3 mr-1" />
                                              {spec.fees.toLocaleString()} {currentLanguage === "ar" ? "جنيه" : "EGP"}
                                            </Badge>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </MemoizedCard>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <MemoizedCard>
                  <CardContent className="text-center py-12">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      {currentLanguage === "ar" ? "تفاصيل الكليات غير متوفرة" : "Faculty Details Not Available"}
                    </h3>
                    <p className="text-muted-foreground">
                      {currentLanguage === "ar"
                        ? "لمزيد من المعلومات، يرجى زيارة الموقع الرسمي للجامعة"
                        : "For more information, please visit the university's official website"
                      }
                    </p>
                  </CardContent>
                </MemoizedCard>
              )}
            </TabsContent>

            {/* Admission Tab */}
            <TabsContent value="admission" className="space-y-6">
              <MemoizedCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {currentLanguage === "ar" ? "متطلبات القبول" : "Admission Requirements"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">
                        {currentLanguage === "ar" ? "الحد الأدنى للدرجات" : "Minimum Grade Requirements"}
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-accent rounded-lg">
                          <span>{currentLanguage === "ar" ? "الحد الأدنى المطلوب" : "Minimum Required"}</span>
                          <Badge variant="secondary">{university.minGrade}%</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-accent rounded-lg">
                          <span>{currentLanguage === "ar" ? "معدل القبول" : "Acceptance Rate"}</span>
                          <Badge variant="secondary">{university.acceptanceRate}%</Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">
                        {currentLanguage === "ar" ? "المستندات المطلوبة" : "Required Documents"}
                      </h4>
                      <div className="space-y-2">
                        {[
                          currentLanguage === "ar" ? "شهادة الثانوية العامة" : "High School Diploma",
                          currentLanguage === "ar" ? "صحيفة الحالة الجنائية" : "Criminal Record Certificate",
                          currentLanguage === "ar" ? "شهادة الميلاد" : "Birth Certificate",
                          currentLanguage === "ar" ? "صور شخصية" : "Personal Photos",
                          currentLanguage === "ar" ? "استمارة التقديم" : "Application Form"
                        ].map((doc, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      {currentLanguage === "ar" ? "مواعيد مهمة" : "Important Dates"}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border border-border rounded-lg">
                        <div className="text-lg font-bold text-primary mb-1">يوليو</div>
                        <div className="text-sm text-muted-foreground">
                          {currentLanguage === "ar" ? "بداية التقديم" : "Application Opens"}
                        </div>
                      </div>
                      <div className="text-center p-4 border border-border rounded-lg">
                        <div className="text-lg font-bold text-primary mb-1">أغسطس</div>
                        <div className="text-sm text-muted-foreground">
                          {currentLanguage === "ar" ? "إغلاق التقديم" : "Application Closes"}
                        </div>
                      </div>
                      <div className="text-center p-4 border border-border rounded-lg">
                        <div className="text-lg font-bold text-primary mb-1">سبتمبر</div>
                        <div className="text-sm text-muted-foreground">
                          {currentLanguage === "ar" ? "بداية الدراسة" : "Academic Year Starts"}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </MemoizedCard>

              <MemoizedCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    {currentLanguage === "ar" ? "نصائح للقبول" : "Admission Tips"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      currentLanguage === "ar" ? "قدم طلبك مبكراً لضمان أفضل الفرص" : "Apply early for the best opportunities",
                      currentLanguage === "ar" ? "تأكد من اكتمال جميع المستندات المطلوبة" : "Ensure all required documents are complete",
                      currentLanguage === "ar" ? "اختر التخصص الذي يناسب اهتماماتك وقدراتك" : "Choose a major that matches your interests and abilities",
                      currentLanguage === "ar" ? "استعد جيداً لأي اختبارات قبول مطلوبة" : "Prepare well for any required entrance exams"
                    ].map((tip, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <span className="text-sm">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </MemoizedCard>
            </TabsContent>

            {/* Fees Tab */}
            <TabsContent value="fees" className="space-y-6">
              <MemoizedCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    {currentLanguage === "ar" ? "هيكل الرسوم الدراسية" : "Tuition Fee Structure"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* General Fee Range */}
                  <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">
                        {currentLanguage === "ar" ? "نطاق الرسوم العام" : "General Fee Range"}
                      </h4>
                      <Badge variant="secondary">
                        {currentLanguage === "ar" ? "سنوياً" : "Annually"}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {university.fees.min.toLocaleString()} - {university.fees.max.toLocaleString()}
                      <span className="text-lg font-normal text-muted-foreground ml-2">
                        {currentLanguage === "ar" ? "جنيه مصري" : "EGP"}
                      </span>
                    </div>
                  </div>

                  {/* Faculties Fee Breakdown */}
                  {university.detailedFaculties && (
                    <div>
                      <h4 className="font-medium mb-4 flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        {currentLanguage === "ar" ? "رسوم الكليات" : "Faculty Fees"}
                      </h4>
                      <div className="space-y-4">
                        {Object.entries(university.detailedFaculties).map(([facultyName, facultyData]) => (
                          facultyData.annualFees && (
                            <div key={facultyName} className="border border-border rounded-lg p-4">
                              <div className="flex justify-between items-center mb-3">
                                <h5 className="font-medium">
                                  {currentLanguage === "ar" ? facultyName : facultyData.nameEn}
                                </h5>
                                <Badge variant="outline">
                                  {facultyData.annualFees.min.toLocaleString()} - {facultyData.annualFees.max.toLocaleString()}
                                  {currentLanguage === "ar" ? " جنيه" : " EGP"}
                                </Badge>
                              </div>

                              {/* Department Fees */}
                              {facultyData.departments && (
                                <div className="space-y-2">
                                  <h6 className="text-sm font-medium text-muted-foreground">
                                    {currentLanguage === "ar" ? "الأقسام:" : "Departments:"}
                                  </h6>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {facultyData.departments.map((dept: any, index: number) => (
                                      dept.fees && (
                                        <div key={index} className="flex justify-between items-center p-2 bg-accent/30 rounded text-sm">
                                          <span>{currentLanguage === "ar" ? dept.name : dept.nameEn}</span>
                                          <span className="font-medium text-primary">
                                            {dept.fees.toLocaleString()} {currentLanguage === "ar" ? "جنيه" : "EGP"}
                                          </span>
                                        </div>
                                      )
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Specialization Fees */}
                              {facultyData.specializations && facultyData.specializations.some((spec: any) => spec.fees) && (
                                <div className="space-y-2 mt-4">
                                  <h6 className="text-sm font-medium text-muted-foreground">
                                    {currentLanguage === "ar" ? "التخصصات المتقدمة:" : "Advanced Specializations:"}
                                  </h6>
                                  <div className="grid grid-cols-1 gap-2">
                                    {facultyData.specializations.map((spec: any, index: number) => (
                                      spec.fees && (
                                        <div key={index} className="flex justify-between items-center p-2 bg-orange-50 dark:bg-orange-950/30 rounded text-sm">
                                          <span>{typeof spec === "string" ? spec : (currentLanguage === "ar" ? spec.name : spec.nameEn)}</span>
                                          <Badge variant="secondary">
                                            {spec.fees.toLocaleString()} {currentLanguage === "ar" ? "جنيه" : "EGP"}
                                          </Badge>
                                        </div>
                                      )
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Payment Information */}
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Info className="h-4 w-4 text-blue-600" />
                      {currentLanguage === "ar" ? "معلومات الدفع" : "Payment Information"}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>{currentLanguage === "ar" ? "• يتم دفع الرسوم على أقساط فصلية" : "• Fees are paid in semester installments"}</p>
                      <p>{currentLanguage === "ar" ? "• تشمل الرسوم المصروفات الدراسية والامتحانات" : "• Fees include tuition and examination costs"}</p>
                      <p>{currentLanguage === "ar" ? "• قد تختلف الرسوم حسب التخصص والمستوى الدراسي" : "• Fees may vary by specialization and academic level"}</p>
                      <p>{currentLanguage === "ar" ? "• يمكن الاستعلام عن الرسوم التفصيلية من إدارة الجامعة" : "• Detailed fee information can be obtained from university administration"}</p>
                    </div>
                  </div>
                </CardContent>
              </MemoizedCard>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6">
              <MemoizedCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    {currentLanguage === "ar" ? "معلومات التواصل" : "Contact Information"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-sm text-muted-foreground">
                            {currentLanguage === "ar" ? "الهاتف الرئيسي" : "Main Phone"}
                          </div>
                          <div className="font-medium">+20 2 1234 5678</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-sm text-muted-foreground">
                            {currentLanguage === "ar" ? "البريد الإلكتروني" : "Email"}
                          </div>
                          <div className="font-medium">info@university.edu.eg</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                        <Globe className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-sm text-muted-foreground">
                            {currentLanguage === "ar" ? "الموقع الإلكتروني" : "Website"}
                          </div>
                          <div className="font-medium">www.university.edu.eg</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <div className="text-sm text-muted-foreground">
                            {currentLanguage === "ar" ? "العنوان" : "Address"}
                          </div>
                          <div className="font-medium">
                            {currentLanguage === "ar" ? university.location : university.locationEn}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-sm text-muted-foreground">
                            {currentLanguage === "ar" ? "مواعيد العمل" : "Working Hours"}
                          </div>
                          <div className="font-medium">
                            {currentLanguage === "ar" ? "9:00 ص - 3:00 م" : "9:00 AM - 3:00 PM"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-4">
                    <MemoizedButton className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      {currentLanguage === "ar" ? "اتصل بنا" : "Call Us"}
                    </MemoizedButton>
                    <MemoizedButton variant="outline" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      {currentLanguage === "ar" ? "راسلنا" : "Email Us"}
                    </MemoizedButton>
                    <MemoizedButton variant="outline">
                      <ExternalLink className="h-4 w-4" />
                    </MemoizedButton>
                  </div>
                </CardContent>
              </MemoizedCard>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}