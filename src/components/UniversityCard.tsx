import React from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Calendar,
  Users,
  Star,
  ExternalLink,
  Heart,
  GitCompare,
  DollarSign,
  TrendingUp,
  GraduationCap,
  Building2,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./ui/ImageWithFallback";

const MemoizedCard = React.memo(Card);
const MemoizedButton = React.memo(Button);

interface UniversityCardProps {
  university: any;
  currentLanguage: string;
  onViewDetails: (university: any) => void;
  favorites?: string[];
  comparison?: string[];
  onToggleFavorite?: (id: string) => void;
  onToggleComparison?: (id: string) => void;
}

export function UniversityCard({
  university,
  currentLanguage,
  onViewDetails,
  favorites = [],
  comparison = [],
  onToggleFavorite,
  onToggleComparison,
}: UniversityCardProps) {
  const isFavorite = favorites.includes(university.id);
  const isInComparison = comparison.includes(university.id);

  // Get university type badge
  const getTypeBadge = () => {
    const typeConfig = {
      public: {
        label: currentLanguage === "ar" ? "حكومية" : "Public",
        variant: "default" as const,
        icon: Building2
      },
      private: {
        label: currentLanguage === "ar" ? "خاصة" : "Private",
        variant: "secondary" as const,
        icon: GraduationCap
      },
      national: {
        label: currentLanguage === "ar" ? "أهلية" : "National",
        variant: "outline" as const,
        icon: Building2
      },
      azhar: {
        label: currentLanguage === "ar" ? "الأزهر" : "Al-Azhar",
        variant: "secondary" as const,
        icon: GraduationCap
      }
    };

    return typeConfig[university.type as keyof typeof typeConfig] || typeConfig.public;
  };

  const typeBadge = getTypeBadge();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <MemoizedCard className="overflow-hidden border-border shadow-lg hover:shadow-xl transition-all duration-300 group">
        {/* University Image */}
        <div className="relative h-48 overflow-hidden">
          <ImageWithFallback
            src={university.image}
            alt={currentLanguage === "ar" ? university.name : university.nameEn}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay with badges and actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            {/* Type Badge */}
            <div className="absolute top-3 left-3">
              <Badge variant={typeBadge.variant} className="bg-white/90 text-foreground border-white/20">
                <typeBadge.icon className="h-3 w-3 mr-1" />
                {typeBadge.label}
              </Badge>
            </div>

            {/* Action Buttons */}
            {(onToggleFavorite || onToggleComparison) && (
              <div className="absolute top-3 right-3 flex gap-2">
                {onToggleFavorite && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(university.id);
                    }}
                    className={`p-2 rounded-full border border-white/20 backdrop-blur-sm transition-colors ${isFavorite
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                  </motion.button>
                )}

                {onToggleComparison && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleComparison(university.id);
                    }}
                    disabled={!isInComparison && comparison.length >= 3}
                    className={`p-2 rounded-full border border-white/20 backdrop-blur-sm transition-colors ${isInComparison
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white/20 text-white hover:bg-white/30 disabled:opacity-50"
                      }`}
                  >
                    <GitCompare className="h-4 w-4" />
                  </motion.button>
                )}
              </div>
            )}

            {/* Rating */}
            <div className="absolute bottom-3 right-3">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-white text-sm font-medium">{university.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-5 space-y-4">
          {/* University Name and Description */}
          <div>
            <h3 className="font-bold text-lg text-foreground line-clamp-1">
              {currentLanguage === "ar" ? university.name : university.nameEn}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {currentLanguage === "ar" ? university.description : university.descriptionEn}
            </p>
          </div>

          {/* Quick Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{currentLanguage === "ar" ? university.location : university.locationEn}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 shrink-0" />
                <span>{university.established}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 shrink-0" />
                <span>{(university.students / 1000).toFixed(0)}K</span>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-accent/50 rounded-lg">
              <div className="text-sm font-bold text-green-600">{university.employmentRate}%</div>
              <div className="text-xs text-muted-foreground">
                {currentLanguage === "ar" ? "توظيف" : "Employment"}
              </div>
            </div>
            <div className="text-center p-2 bg-accent/50 rounded-lg">
              <div className="text-sm font-bold text-blue-600">{university.acceptanceRate}%</div>
              <div className="text-xs text-muted-foreground">
                {currentLanguage === "ar" ? "قبول" : "Acceptance"}
              </div>
            </div>
            <div className="text-center p-2 bg-accent/50 rounded-lg">
              <div className="text-sm font-bold text-purple-600">{university.minGrade}%</div>
              <div className="text-xs text-muted-foreground">
                {currentLanguage === "ar" ? "حد أدنى" : "Min Grade"}
              </div>
            </div>
          </div>

          {/* Fees Range */}
          <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">
                {currentLanguage === "ar" ? "الرسوم السنوية" : "Annual Fees"}
              </span>
            </div>
            <div className="text-sm font-bold text-primary">
              {university.fees.min.toLocaleString()} - {university.fees.max.toLocaleString()}
              <span className="text-xs text-muted-foreground ml-1">
                {currentLanguage === "ar" ? "جنيه" : "EGP"}
              </span>
            </div>
          </div>

          {/* Faculties Preview */}
          <div>
            <div className="text-sm font-medium mb-2">
              {currentLanguage === "ar" ? "الكليات المتاحة:" : "Available Faculties:"}
            </div>
            <div className="flex flex-wrap gap-1">
              {(currentLanguage === "ar" ? university.faculties : university.facultiesEn).slice(0, 3).map((faculty: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {faculty}
                </Badge>
              ))}
              {university.faculties.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{university.faculties.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <MemoizedButton
              onClick={() => onViewDetails(university)}
              className="flex-1 flex items-center justify-center gap-2 h-9"
            >
              <ExternalLink className="h-4 w-4" />
              {currentLanguage === "ar" ? "عرض التفاصيل" : "View Details"}
            </MemoizedButton>

            <MemoizedButton
              variant="outline"
              className="flex items-center justify-center gap-2 h-9 px-3"
              title={currentLanguage === "ar" ? "زيارة الموقع" : "Visit Website"}
            >
              <TrendingUp className="h-4 w-4" />
            </MemoizedButton>
          </div>
        </CardContent>
      </MemoizedCard>
    </motion.div>
  );
}