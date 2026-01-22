import { useState, useCallback } from "react";
import { toast } from "sonner";
import { filterUniversities, sortUniversities, University } from "../utils/helpers";

interface UseSearchParams {
    allUniversities: University[];
    currentLanguage: string;
}

export function useSearch({ allUniversities, currentLanguage }: UseSearchParams) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [selectedRegion, setSelectedRegion] = useState("all");
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [educationalBackground, setEducationalBackground] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState(allUniversities);
    const [showSearchResults, setShowSearchResults] = useState(false);

    // Filter and sort state
    const [filterByFees, setFilterByFees] = useState<number | null>(null);
    const [filterByGrade, setFilterByGrade] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState("rating");
    const [sortOrder, setSortOrder] = useState("desc");

    const handleSearch = useCallback(async () => {
        setIsLoading(true);
        const searchParams = {
            searchQuery,
            selectedType,
            selectedRegion,
            educationalBackground,
        };

        // Removed artificial delay for better performance
        // await new Promise(resolve => setTimeout(resolve, 800));

        let filtered = filterUniversities(allUniversities, searchParams, filterByFees, filterByGrade);
        filtered = sortUniversities(filtered, sortBy, sortOrder);

        setSearchResults(filtered);
        setShowSearchResults(true);
        setIsLoading(false);

        // Show search results feedback
        toast.success(
            currentLanguage === "ar"
                ? `🔍 تم العثور على ${filtered.length} نتيجة`
                : `🔍 Found ${filtered.length} results`,
            { duration: 3000 }
        );
    }, [
        searchQuery,
        selectedType,
        selectedRegion,
        educationalBackground,
        filterByFees,
        filterByGrade,
        sortBy,
        sortOrder,
        currentLanguage,
        allUniversities
    ]);

    return {
        searchQuery,
        setSearchQuery,
        selectedType,
        setSelectedType,
        selectedRegion,
        setSelectedRegion,
        showAdvancedSearch,
        setShowAdvancedSearch,
        educationalBackground,
        setEducationalBackground,
        isLoading,
        searchResults,
        showSearchResults,
        setShowSearchResults,
        filterByFees,
        setFilterByFees,
        filterByGrade,
        setFilterByGrade,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        handleSearch
    };
}
