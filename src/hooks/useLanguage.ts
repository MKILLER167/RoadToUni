import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { storage } from "../utils/helpers";

export function useLanguage() {
    const [currentLanguage, setCurrentLanguage] = useState(() => {
        if (typeof window !== 'undefined') {
            return storage.get('language') || 'ar';
        }
        return 'ar';
    });

    useEffect(() => {
        // Initial setup
        if (typeof window !== 'undefined') {
            const savedLanguage = storage.get('language') || 'ar';
            if (savedLanguage === 'ar') {
                document.documentElement.setAttribute('dir', 'rtl');
                document.documentElement.setAttribute('lang', 'ar');
            } else {
                document.documentElement.setAttribute('dir', 'ltr');
                document.documentElement.setAttribute('lang', 'en');
            }
            setCurrentLanguage(savedLanguage);
        }
    }, []);


    const handleLanguageChange = useCallback((lang: string) => {
        setCurrentLanguage(lang);
        storage.set('language', lang);
        if (lang === 'ar') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ar');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.documentElement.setAttribute('lang', 'en');
        }


    }, []);

    return { currentLanguage, handleLanguageChange };
}
