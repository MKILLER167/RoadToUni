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

interface BottomNavigationProps {
  currentLanguage: string;
  activeNav: string;
  onNavClick: (navItem: string) => void;
}

export function BottomNavigation({
  currentLanguage,
  activeNav,
  onNavClick,
}: BottomNavigationProps) {
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
      label: currentLanguage === "ar" ? "نبذة عنا" : "About",
      icon: Info,
    },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border shadow-2xl"
    >
      <div className="container mx-auto px-2 py-1">
        <div className="grid grid-cols-6 gap-1">
          {navItems.map((item, index) => {
            const isActive = activeNav === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                role="tab"
                aria-selected={isActive}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all duration-300 ${isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 400
                }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <item.icon className="h-5 w-5 mb-1" />
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.div>
                <span className={`text-xs font-medium truncate max-w-full ${isActive ? "text-primary" : ""
                  }`}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}