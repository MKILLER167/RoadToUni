import React, { useState, useEffect, useCallback, Suspense } from "react";
import { Toaster } from "./components/ui/sonner";
import { SplashScreen } from "./components/SplashScreen";
import { BackgroundElements } from "./components/BackgroundElements";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { SearchResults } from "./components/SearchResults";
import { TabBar } from "./components/TabBar";
import { FloatingActionButton } from "./components/FloatingActionButton";
import { allUniversities } from "./data/universities";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { pageTransitions } from "./utils/animations";
import { useTheme } from "./hooks/useTheme";
import { useLanguage } from "./hooks/useLanguage";
import { useSearch } from "./hooks/useSearch";
// LoadingSpinner was removed, using LoadingSkeleton instead
import { LoadingSkeleton } from "./components/LoadingSkeleton";

// Lazy load heavy components
const UniversitySection = React.lazy(() => import("./components/UniversitySection").then(module => ({ default: module.UniversitySection })));
const UniversityDetailsPage = React.lazy(() => import("./components/UniversityDetailsPage").then(module => ({ default: module.UniversityDetailsPage })));

export default function App() {
  // Custom hooks
  const { currentLanguage, handleLanguageChange } = useLanguage();
  const { isDarkMode, handleDarkModeToggle } = useTheme(currentLanguage);

  // Core state
  const [activeNav, setActiveNav] = useState("home");
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  // Search hook
  const searchValues = useSearch({ allUniversities, currentLanguage });
  const {
    searchQuery, setSearchQuery, selectedType, setSelectedType,
    selectedRegion, setSelectedRegion, showAdvancedSearch, setShowAdvancedSearch,
    educationalBackground, setEducationalBackground, isLoading,
    searchResults, showSearchResults, setShowSearchResults,
    filterByFees, setFilterByFees, filterByGrade, setFilterByGrade,
    sortBy, setSortBy, sortOrder, setSortOrder, handleSearch
  } = searchValues;

  // University section state
  const [selectedTab, setSelectedTab] = useState("overview");
  const [showFilters, setShowFilters] = useState(false);

  // University details state
  const [selectedUniversity, setSelectedUniversity] = useState<any | null>(null);
  const [showUniversityDetails, setShowUniversityDetails] = useState(false);

  // User preferences
  const [favorites, setFavorites] = useState<string[]>([]);
  const [comparison, setComparison] = useState<string[]>([]);

  // Performance optimization - prevent unnecessary re-renders
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Initialize app
  useEffect(() => {
    const initializeApp = async () => {
      // Removed artificial delay for faster load
      // await new Promise(resolve => setTimeout(resolve, 2000));

      const savedFavorites = localStorage.getItem('favorites');

      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }

      setShowSplashScreen(false);
      setIsPageLoaded(true);
    };

    initializeApp();
  }, []);

  // Handlers
  const handleNavClick = useCallback((navItem: string) => {
    setActiveNav(navItem);
    setShowSearchResults(false);
    setShowUniversityDetails(false);
    setSelectedTab("overview");
    setShowFilters(false);

    // Show navigation feedback
    const navLabels = {
      home: currentLanguage === 'ar' ? 'الرئيسية' : 'Home',
      public: currentLanguage === 'ar' ? 'الجامعات الحكومية' : 'Public Universities',
      private: currentLanguage === 'ar' ? 'الجامعات الخاصة' : 'Private Universities',
      national: currentLanguage === 'ar' ? 'الجامعات الأهلية' : 'National Universities',
      azhar: currentLanguage === 'ar' ? 'جامعات الأزهر' : 'Al-Azhar Universities',
      about: currentLanguage === 'ar' ? 'نبذة عنا' : 'About Us',
    };

    toast.info(
      currentLanguage === "ar"
        ? `📱 تم الانتقال إلى ${navLabels[navItem as keyof typeof navLabels]}`
        : `📱 Navigated to ${navLabels[navItem as keyof typeof navLabels]}`,
      { duration: 2000 }
    );
  }, [currentLanguage]);

  const handleContactUs = useCallback(() => {
    toast.success(
      currentLanguage === "ar"
        ? "🎓 مرحباً! سننقلك إلى صفحة الاستشارة التعليمية المجانية"
        : "🎓 Welcome! We'll take you to our free educational consultation page",
      {
        description: currentLanguage === "ar"
          ? "📚 احصل على استشارة مخصصة لاختيار الجامعة والتخصص المناسب • ⏰ جاري التوجيه..."
          : "📚 Get personalized consultation to choose the right university and major • ⏰ Redirecting...",
        duration: 4000,
        action: {
          label: currentLanguage === "ar" ? "إلغاء" : "Cancel",
          onClick: () => toast.dismiss(),
        },
      }
    );

    setTimeout(() => handleNavClick("about"), 2000);
  }, [currentLanguage, handleNavClick]);

  const handleGoHome = useCallback(() => {
    handleNavClick("home");
    toast.success(
      currentLanguage === "ar"
        ? "🏠 العودة للصفحة الرئيسية"
        : "🏠 Back to Home",
      {
        duration: 2000,
      }
    );
  }, [currentLanguage, handleNavClick]);

  const handleViewUniversityDetails = useCallback((university: any) => {
    setSelectedUniversity(university);
    setShowUniversityDetails(true);
    setShowSearchResults(false);

    toast.info(
      currentLanguage === "ar"
        ? `🏛️ عرض تفاصيل ${university.name}`
        : `🏛️ Viewing details for ${university.nameEn}`,
      { duration: 2000 }
    );
  }, [currentLanguage]);

  const handleBackFromDetails = useCallback(() => {
    setShowUniversityDetails(false);
    setSelectedUniversity(null);
    // Return to previous view (search results or section)
    if (searchResults.length > 0 && (searchQuery || selectedType !== "all" || selectedRegion !== "all")) {
      setShowSearchResults(true);
    }
  }, [searchResults.length, searchQuery, selectedType, selectedRegion]);

  const toggleFavorite = useCallback((universityId: string) => {
    const newFavorites = favorites.includes(universityId)
      ? favorites.filter(id => id !== universityId)
      : [...favorites, universityId];

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));

    const isAdding = !favorites.includes(universityId);
    toast.success(
      isAdding
        ? (currentLanguage === "ar" ? "❤️ تم إضافة الجامعة للمفضلة" : "❤️ Added to favorites")
        : (currentLanguage === "ar" ? "💔 تم إزالة الجامعة من المفضلة" : "💔 Removed from favorites"),
      { duration: 2000 }
    );
  }, [favorites, currentLanguage]);

  const toggleComparison = useCallback((universityId: string) => {
    if (comparison.includes(universityId)) {
      setComparison(comparison.filter(id => id !== universityId));
      toast.info(
        currentLanguage === "ar" ? "📊 تم إزالة الجامعة من المقارنة" : "📊 Removed from comparison",
        { duration: 2000 }
      );
    } else if (comparison.length < 3) {
      setComparison([...comparison, universityId]);
      toast.success(
        currentLanguage === "ar" ? "📊 تم إضافة الجامعة للمقارنة" : "📊 Added to comparison",
        { duration: 2000 }
      );
    } else {
      toast.error(
        currentLanguage === "ar" ? "⚠️ يمكن مقارنة 3 جامعات كحد أقصى" : "⚠️ Maximum 3 universities can be compared",
        { duration: 3000 }
      );
    }
  }, [comparison, currentLanguage]);

  // Get filtered universities for current section
  // useMemo removed as it's simple enough, but kept strict dep array in logic
  const currentUniversities = activeNav === "home" || activeNav === "about"
    ? []
    : allUniversities.filter(uni => uni.type === activeNav);

  // Render splash screen
  if (showSplashScreen) {
    return <SplashScreen isVisible={true} currentLanguage={currentLanguage} />;
  }

  // Render content based on active navigation
  const renderContent = () => {
    // University details page takes priority
    if (showUniversityDetails && selectedUniversity) {
      return (
        <motion.div
          key="university-details"
          {...pageTransitions}
          className="relative z-10"
        >
          <Suspense fallback={<div className="p-8"><LoadingSkeleton count={3} /></div>}>
            <UniversityDetailsPage
              university={selectedUniversity}
              currentLanguage={currentLanguage}
              favorites={favorites}
              comparison={comparison}
              onBack={handleBackFromDetails}
              onToggleFavorite={toggleFavorite}
              onToggleComparison={toggleComparison}
            />
          </Suspense>
        </motion.div>
      );
    }

    if (showSearchResults) {
      return (
        <motion.div
          key="search-results"
          {...pageTransitions}
          className="relative z-10"
        >
          <SearchResults
            currentLanguage={currentLanguage}
            searchResults={searchResults}
            isLoading={isLoading}
            onBackToHome={() => setShowSearchResults(false)}
            onViewDetails={handleViewUniversityDetails}
          />
        </motion.div>
      );
    }

    switch (activeNav) {
      case "home":
        return (
          <motion.div
            key="home"
            {...pageTransitions}
            className="relative z-10"
          >
            <HomePage
              currentLanguage={currentLanguage}
              isDarkMode={isDarkMode}
              educationalBackground={educationalBackground}
              searchQuery={searchQuery}
              selectedType={selectedType}
              selectedRegion={selectedRegion}
              showAdvancedSearch={showAdvancedSearch}
              filterByFees={filterByFees}
              filterByGrade={filterByGrade}
              isLoading={isLoading}
              onLanguageChange={handleLanguageChange}
              onDarkModeToggle={handleDarkModeToggle}
              onEducationalBackgroundSelect={setEducationalBackground}
              onSearchQueryChange={setSearchQuery}
              onTypeChange={setSelectedType}
              onRegionChange={setSelectedRegion}
              onAdvancedSearchToggle={() => setShowAdvancedSearch(!showAdvancedSearch)}
              onFeesFilterChange={setFilterByFees}
              onGradeFilterChange={setFilterByGrade}
              onSearch={handleSearch}
              onContactUs={handleContactUs}
            />
          </motion.div>
        );

      case "about":
        return (
          <motion.div
            key="about"
            {...pageTransitions}
            className="relative z-10"
          >
            <AboutPage currentLanguage={currentLanguage} />
          </motion.div>
        );

      case "public":
      case "private":
      case "national":
      case "azhar":
        return (
          <motion.div
            key={activeNav}
            {...pageTransitions}
            className="relative z-10"
          >
            <Suspense fallback={<div className="p-8"><LoadingSkeleton lines={3} /></div>}>
              <UniversitySection
                type={activeNav}
                universities={currentUniversities}
                currentLanguage={currentLanguage}
                favorites={favorites}
                comparison={comparison}
                isLoading={isLoading}
                selectedRegion={selectedRegion}
                filterByFees={filterByFees}
                filterByGrade={filterByGrade}
                sortBy={sortBy}
                sortOrder={sortOrder}
                selectedTab={selectedTab}
                showFilters={showFilters}
                onToggleFavorite={toggleFavorite}
                onToggleComparison={toggleComparison}
                onRegionChange={setSelectedRegion}
                onFeesFilterChange={setFilterByFees}
                onGradeFilterChange={setFilterByGrade}
                onSortByChange={setSortBy}
                onSortOrderToggle={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                onTabChange={setSelectedTab}
                onShowFiltersToggle={() => setShowFilters(!showFilters)}
                onViewDetails={handleViewUniversityDetails}
              />
            </Suspense>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <BackgroundElements />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {isPageLoaded && renderContent()}
      </AnimatePresence>

      {/* Enhanced Tab Bar (Top Navigation) */}
      <AnimatePresence>
        {!showUniversityDetails && isPageLoaded && (
          <TabBar
            currentLanguage={currentLanguage}
            activeNav={activeNav}
            onNavClick={handleNavClick}
          />
        )}
      </AnimatePresence>

      {/* Enhanced Floating Action Button */}
      <AnimatePresence>
        {activeNav !== "home" && !showUniversityDetails && isPageLoaded && (
          <FloatingActionButton
            onClick={handleGoHome}
            variant="home"
            position="bottom-right"
          />
        )}
      </AnimatePresence>

      {/* Additional floating buttons for enhanced UX */}
      <AnimatePresence>
        {activeNav === "home" && isPageLoaded && (
          <FloatingActionButton
            onClick={handleContactUs}
            variant="chat"
            position="bottom-left"
          />
        )}
      </AnimatePresence>

      {/* Enhanced Toast Notifications */}
      <Toaster
        theme={isDarkMode ? 'dark' : 'light'}
        position="top-center"
        toastOptions={{
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </div>
  );
}