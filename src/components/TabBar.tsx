import React from "react";
import { motion } from "motion/react";
import {
  Home,
  Building2,
  GraduationCap,
  Flag,
  BookOpen,
  Info,
} from "lucide-react";

interface TabBar {
  currentLanguage: string;
  activeNav: string;
  onNavClick: (navItem: string) => void;
}

export function TabBar({
  currentLanguage,
  activeNav,
  onNavClick,
}: TabBar) {
  const navItems = [
    {
      id: "home",
      label: currentLanguage === "ar" ? "الرئيسية" : "Home",
      icon: Home,
    },
    {
      id: "public",
      label: currentLanguage === "ar" ? "حكومية" : "Public",
      icon: Building2,
    },
    {
      id: "private",
      label: currentLanguage === "ar" ? "خاصة" : "Private",
      icon: GraduationCap,
    },
    {
      id: "national",
      label: currentLanguage === "ar" ? "أهلية" : "National",
      icon: Flag,
    },
    {
      id: "azhar",
      label: currentLanguage === "ar" ? "الأزهر" : "Al-Azhar",
      icon: BookOpen,
    },
    {
      id: "about",
      label: currentLanguage === "ar" ? "نبذة" : "About",
      icon: Info,
    },
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className="pointer-events-auto bg-background/80 backdrop-blur-xl border border-white/20 shadow-2xl shadow-primary/10 rounded-full px-2 py-2 flex items-center gap-1 mx-4 max-w-full overflow-x-auto no-scrollbar supports-[backdrop-filter]:bg-background/60 dark:border-white/10"
      >
        {navItems.map((item) => {
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 outline-none group shrink-0"
              role="tab"
              aria-selected={isActive}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <span className={`relative z-10 transition-colors duration-300 flex items-center gap-2 ${isActive ? "text-primary font-semibold" : "text-muted-foreground group-hover:text-foreground"
                }`}>
                <item.icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-all duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                />
                <span className={`text-sm whitespace-nowrap hidden sm:inline ${isActive ? "inline" : ""}`}>
                  {item.label}
                </span>
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute bottom-0 left-0 right-0 h-8 bg-primary/20 blur-xl rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}