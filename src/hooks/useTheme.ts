import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { storage } from "../utils/helpers";

export function useTheme(currentLanguage: string) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const theme = storage.get('theme');
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
                return true;
            }
        }
        return false;
    });

    const handleDarkModeToggle = useCallback((enabled: boolean) => {
        setIsDarkMode(enabled);
        if (enabled) {
            document.documentElement.classList.add('dark');
            storage.set('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            storage.set('theme', 'light');
        }


    }, [currentLanguage]);

    return { isDarkMode, handleDarkModeToggle };
}
