import React from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { UniversityCard } from "./UniversityCard";
import { animationVariants } from "../utils/animations";

const MemoizedButton = React.memo(Button);

interface SearchResultsProps {
  currentLanguage: string;
  searchResults: any[];
  isLoading: boolean;
  onBackToHome: () => void;
  onViewDetails: (university: any) => void;
}

export function SearchResults({
  currentLanguage,
  searchResults,
  isLoading,
  onBackToHome,
  onViewDetails,
}: SearchResultsProps) {
  return (
    <div className="container mx-auto p-6 max-w-6xl pt-24">
      <motion.div {...animationVariants.fadeInUp}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {currentLanguage === "ar" ? "نتائج البحث" : "Search Results"}
            </h2>
            <p className="text-muted-foreground">
              {currentLanguage === "ar" 
                ? `تم العثور على ${searchResults.length} جامعة`
                : `Found ${searchResults.length} universities`
              }
            </p>
          </div>
          <MemoizedButton
            variant="outline"
            onClick={onBackToHome}
          >
            {currentLanguage === "ar" ? "العودة للرئيسية" : "Back to Home"}
          </MemoizedButton>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingSkeleton key={index} variant="card" />
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={animationVariants.staggerContainer}
            initial="initial"
            animate="animate"
          >
            {searchResults.map((university) => (
              <UniversityCard
                key={university.id}
                university={university}
                currentLanguage={currentLanguage}
                onViewDetails={onViewDetails}
              />
            ))}
          </motion.div>
        )}

        {searchResults.length === 0 && !isLoading && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="mb-4">
              <Search className="h-16 w-16 text-muted-foreground mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2">
              {currentLanguage === "ar" ? "لم يتم العثور على نتائج" : "No Results Found"}
            </h3>
            <p className="text-muted-foreground">
              {currentLanguage === "ar" 
                ? "جرب تغيير معايير البحث أو استخدم كلمات مختلفة"
                : "Try changing your search criteria or use different keywords"
              }
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}