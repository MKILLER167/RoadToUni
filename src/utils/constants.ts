// Enhanced constants with more comprehensive data
export const APP_CONFIG = {
  name: {
    ar: "طريق الجامعات",
    en: "Road to Universities"
  },
  tagline: {
    ar: "دليلك الشامل للتعليم العالي في مصر",
    en: "Your comprehensive guide to higher education in Egypt"
  },
  version: "2.0.0",
  supportEmail: "support@roadtouniversities.com",
  contactPhone: "+201234567890",
};

export const NAVIGATION_ITEMS = [
  {
    id: "home",
    icon: "Home",
    label: { ar: "الرئيسية", en: "Home" },
    badge: null
  },
  {
    id: "public", 
    icon: "Building2",
    label: { ar: "حكومية", en: "Public" },
    badge: null
  },
  {
    id: "private",
    icon: "Building",
    label: { ar: "خاصة", en: "Private" },
    badge: null
  },
  {
    id: "national",
    icon: "GraduationCap", 
    label: { ar: "أهلية", en: "National" },
    badge: null
  },
  {
    id: "azhar",
    icon: "BookOpen",
    label: { ar: "الأزهر", en: "Al-Azhar" },
    badge: null
  },
  {
    id: "about",
    icon: "Info",
    label: { ar: "نبذة عنا", en: "About" },
    badge: null
  }
];

export const UNIVERSITY_TYPES = {
  public: {
    label: { ar: "جامعات حكومية", en: "Public Universities" },
    description: { 
      ar: "الجامعات المملوكة والمدارة من قبل الحكومة المصرية",
      en: "Universities owned and managed by the Egyptian government"
    },
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
    lightGradient: "from-blue-50 to-blue-100",
    darkGradient: "from-blue-900 to-blue-800"
  },
  private: {
    label: { ar: "جامعات خاصة", en: "Private Universities" },
    description: { 
      ar: "الجامعات المملوكة من قبل القطاع الخاص",
      en: "Universities owned by private sector"
    },
    color: "purple",
    gradient: "from-purple-500 to-purple-600",
    lightGradient: "from-purple-50 to-purple-100",
    darkGradient: "from-purple-900 to-purple-800"
  },
  national: {
    label: { ar: "جامعات أهلية", en: "National Universities" },
    description: { 
      ar: "الجامعات غير الهادفة للربح",
      en: "Non-profit universities"
    },
    color: "green",
    gradient: "from-green-500 to-green-600",
    lightGradient: "from-green-50 to-green-100",
    darkGradient: "from-green-900 to-green-800"
  },
  azhar: {
    label: { ar: "جامعات الأزهر", en: "Al-Azhar Universities" },
    description: { 
      ar: "الجامعات التاب��ة لمؤسسة الأزهر الشريف",
      en: "Universities affiliated with Al-Azhar Al-Sharif"
    },
    color: "yellow",
    gradient: "from-yellow-500 to-yellow-600", 
    lightGradient: "from-yellow-50 to-yellow-100",
    darkGradient: "from-yellow-900 to-yellow-800"
  }
};

export const REGIONS = {
  all: { ar: "جميع المحافظات", en: "All Governorates" },
  cairo: { ar: "القاهرة الكبرى", en: "Greater Cairo" },
  alexandria: { ar: "الإسكندرية", en: "Alexandria" },
  delta: { ar: "الدلتا", en: "Delta" },
  "upper-egypt": { ar: "صعيد مصر", en: "Upper Egypt" },
  "suez-canal": { ar: "قناة السويس", en: "Suez Canal" }
};

export const SORT_OPTIONS = [
  {
    value: "rating",
    label: { ar: "التقييم", en: "Rating" },
    icon: "Star"
  },
  {
    value: "fees",
    label: { ar: "الرسوم", en: "Fees" },
    icon: "DollarSign"
  },
  {
    value: "name",
    label: { ar: "الاسم", en: "Name" },
    icon: "Type"
  },
  {
    value: "established",
    label: { ar: "سنة التأسيس", en: "Established" },
    icon: "Calendar"
  },
  {
    value: "studentsCount",
    label: { ar: "عدد الطلاب", en: "Student Count" },
    icon: "Users"
  },
  {
    value: "minGrade",
    label: { ar: "الحد الأدنى للدرجات", en: "Min Grade" },
    icon: "TrendingUp"
  }
];

export const EDUCATIONAL_BACKGROUNDS = [
  {
    id: "thanawiya",
    label: { ar: "ثانوية عامة مصرية", en: "Egyptian Thanawiya" },
    description: { ar: "شهادة الثانوية العامة المصرية", en: "Egyptian General Secondary Certificate" },
    icon: "GraduationCap",
    requirements: {
      ar: "شهادة الثانوية العامة المصرية",
      en: "Egyptian General Secondary Certificate"
    }
  },
  {
    id: "international", 
    label: { ar: "شهادة معادلة", en: "Equivalent Certificate" },
    description: { ar: "الشهادات الدولية المعادلة", en: "Equivalent international certificates" },
    icon: "Award",
    requirements: {
      ar: "شهادة دولية معادلة للثانوية العامة المصرية",
      en: "International certificate equivalent to Egyptian Thanawiya"
    }
  }
];

export const FACILITIES_ICONS = {
  library: "BookOpen",
  laboratory: "Microscope", 
  sports: "Dumbbell",
  cafeteria: "Coffee",
  dormitory: "Building",
  parking: "Car",
  wifi: "Wifi",
  clinic: "Heart",
  theater: "Theater",
  conference: "Users",
  computer: "Monitor",
  transportation: "Bus"
};

export const DEGREE_TYPES = {
  bachelor: { ar: "بكالوريوس", en: "Bachelor" },
  master: { ar: "ماجستير", en: "Master" },
  phd: { ar: "دكتوراه", en: "PhD" },
  diploma: { ar: "دبلوم", en: "Diploma" },
  certificate: { ar: "شهادة", en: "Certificate" }
};

export const GRADE_RANGES = [
  { min: 90, max: 100, label: { ar: "ممتاز", en: "Excellent" }, color: "green" },
  { min: 80, max: 89, label: { ar: "جيد جداً", en: "Very Good" }, color: "blue" },
  { min: 70, max: 79, label: { ar: "جيد", en: "Good" }, color: "yellow" },
  { min: 60, max: 69, label: { ar: "مقبول", en: "Acceptable" }, color: "orange" },
  { min: 50, max: 59, label: { ar: "ضعيف", en: "Weak" }, color: "red" }
];

export const FEE_RANGES = [
  { min: 0, max: 10000, label: { ar: "أقل من 10,000 جنيه", en: "Less than 10,000 EGP" } },
  { min: 10000, max: 25000, label: { ar: "10,000 - 25,000 جنيه", en: "10,000 - 25,000 EGP" } },
  { min: 25000, max: 50000, label: { ar: "25,000 - 50,000 جنيه", en: "25,000 - 50,000 EGP" } },
  { min: 50000, max: 100000, label: { ar: "50,000 - 100,000 جنيه", en: "50,000 - 100,000 EGP" } },
  { min: 100000, max: Infinity, label: { ar: "أكثر من 100,000 جنيه", en: "More than 100,000 EGP" } }
];

export const POPULAR_SPECIALTIES = [
  { ar: "طب بشري", en: "Medicine" },
  { ar: "هندسة", en: "Engineering" },
  { ar: "صيدلة", en: "Pharmacy" },
  { ar: "طب أسنان", en: "Dentistry" },
  { ar: "علوم الحاسب", en: "Computer Science" },
  { ar: "إدارة أعمال", en: "Business Administration" },
  { ar: "حقوق", en: "Law" },
  { ar: "اقتصاد", en: "Economics" },
  { ar: "علوم", en: "Science" },
  { ar: "آداب", en: "Arts" },
  { ar: "تربية", en: "Education" },
  { ar: "زراعة", en: "Agriculture" },
  { ar: "طب بيطري", en: "Veterinary Medicine" },
  { ar: "إعلام", en: "Media" },
  { ar: "سياحة وفنادق", en: "Tourism & Hotels" }
];

export const SEARCH_SUGGESTIONS = {
  universities: [
    { ar: "جامعة القاهرة", en: "Cairo University" },
    { ar: "الجامعة الأمريكية", en: "American University" },
    { ar: "جامعة عين شمس", en: "Ain Shams University" },
    { ar: "جامعة الإسكندرية", en: "Alexandria University" },
    { ar: "جامعة أسيوط", en: "Assiut University" }
  ],
  faculties: [
    { ar: "كلية الطب", en: "Faculty of Medicine" },
    { ar: "كلية الهندسة", en: "Faculty of Engineering" },
    { ar: "كلية التجارة", en: "Faculty of Commerce" },
    { ar: "كلية الحقوق", en: "Faculty of Law" },
    { ar: "كلية العلوم", en: "Faculty of Science" }
  ],
  specialties: [
    { ar: "طب بشري", en: "Human Medicine" },
    { ar: "هندسة مدنية", en: "Civil Engineering" },
    { ar: "علوم الحاسب", en: "Computer Science" },
    { ar: "إدارة أعمال", en: "Business Administration" },
    { ar: "صيدلة", en: "Pharmacy" }
  ]
};

export const CONTACT_INFO = {
  phone: "+201234567890",
  email: "info@roadtouniversities.com",
  address: {
    ar: "القاهرة، مصر",
    en: "Cairo, Egypt"
  },
  social: {
    facebook: "https://facebook.com/roadtouniversities",
    twitter: "https://twitter.com/roadtouniv",
    instagram: "https://instagram.com/roadtouniversities",
    linkedin: "https://linkedin.com/company/roadtouniversities"
  }
};

export const FAQ_DATA = [
  {
    question: { ar: "كيف يمكنني التقديم للجامعة؟", en: "How can I apply to university?" },
    answer: { 
      ar: "يمكنك التقديم من خلال موقع التنسيق الإلكتروني أو موقع الجامعة مباشرة حسب نوع الجامعة.",
      en: "You can apply through the electronic coordination website or directly through the university website depending on the university type."
    }
  },
  {
    question: { ar: "ما هي شروط ا��قبول؟", en: "What are the admission requirements?" },
    answer: { 
      ar: "تختلف شروط القبول حسب كل جامعة وكلية، ولكن عموماً تتطلب شهادة الثانوية العامة أو ما يعادلها.",
      en: "Admission requirements vary by university and faculty, but generally require a high school diploma or equivalent."
    }
  },
  {
    question: { ar: "كم تبلغ رسوم الدراسة؟", en: "How much are the tuition fees?" },
    answer: { 
      ar: "تتراوح الرسوم من مجانية في الجامعات الحكومية إلى مئات الآلاف في الجامعات الخاصة.",
      en: "Fees range from free in public universities to hundreds of thousands in private universities."
    }
  }
];

export const TESTIMONIALS = [
  {
    name: { ar: "أحمد محمد", en: "Ahmed Mohamed" },
    university: { ar: "جامعة القاهرة", en: "Cairo University" },
    text: { 
      ar: "منصة رائعة ساعدتني في اختيار الجامعة المناسبة",
      en: "Amazing platform that helped me choose the right university"
    },
    rating: 5
  },
  {
    name: { ar: "فاطمة أحمد", en: "Fatema Ahmed" },
    university: { ar: "الجامعة الأمريكية", en: "American University" },
    text: { 
      ar: "معلو��ات شاملة ودقيقة عن جميع الجامعات",
      en: "Comprehensive and accurate information about all universities"
    },
    rating: 5
  }
];

export const STATISTICS = {
  universities: 80,
  students: 2500000,
  faculties: 500,
  specializations: 1200,
  governorates: 27
};

export const ANIMATION_DURATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  splash: 3.0
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export const COLORS = {
  primary: {
    50: '#fef2f2',
    100: '#fee2e2', 
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    900: '#7f1d1d'
  },
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a'
  },
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706'
  },
  info: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb'
  }
};

export const API_ENDPOINTS = {
  universities: '/api/universities',
  search: '/api/search',
  faculties: '/api/faculties',
  statistics: '/api/statistics'
};

export const CACHE_DURATION = {
  short: 5 * 60 * 1000, // 5 minutes
  medium: 30 * 60 * 1000, // 30 minutes
  long: 24 * 60 * 60 * 1000 // 24 hours
};

// Import icons at the top level
import { 
  Building2, 
  Building, 
  GraduationCap, 
  BookOpen, 
  DollarSign, 
  Award, 
  Users, 
  Zap, 
  Globe, 
  Briefcase, 
  Target, 
  Heart,
  Library
} from "lucide-react";

// Section configuration function for UniversitySection component
export function getSectionConfig(currentLanguage: string) {
  return {
    public: {
      title: currentLanguage === "ar" ? "الجامعات الحكومية" : "Public Universities",
      titleEn: currentLanguage === "ar" ? "Public Universities" : "الجامعات الحكومية",
      description: currentLanguage === "ar" 
        ? "الجامعات المملوكة والمدارة من قبل الحكومة المصرية، تقدم تعليماً عالي الجودة برسوم منخفضة نسبياً"
        : "Universities owned and managed by the Egyptian government, offering high-quality education with relatively low fees",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      icon: Building2,
      benefits: [
        {
          icon: DollarSign,
          title: currentLanguage === "ar" ? "رسوم منخفضة" : "Low Fees",
          desc: currentLanguage === "ar" ? "رسوم دراسية مدعومة من الحكومة" : "Government-subsidized tuition fees"
        },
        {
          icon: Award,
          title: currentLanguage === "ar" ? "اعتماد دولي" : "International Accreditation",
          desc: currentLanguage === "ar" ? "معترف بها عالمياً" : "Globally recognized"
        },
        {
          icon: Users,
          title: currentLanguage === "ar" ? "أعضاء هيئة تدريس متميزون" : "Distinguished Faculty",
          desc: currentLanguage === "ar" ? "أساتذة ذوو خبرة عالية" : "Highly experienced professors"
        },
        {
          icon: BookOpen,
          title: currentLanguage === "ar" ? "مكتبات متطورة" : "Advanced Libraries",
          desc: currentLanguage === "ar" ? "موارد تعليمية شاملة" : "Comprehensive educational resources"
        }
      ]
    },
    private: {
      title: currentLanguage === "ar" ? "الجامعات الخاصة" : "Private Universities",
      titleEn: currentLanguage === "ar" ? "Private Universities" : "الجامعات الخاصة",
      description: currentLanguage === "ar"
        ? "جامعات مملوكة من القطاع الخاص تقدم برامج تعليمية متنوعة وخدمات متطورة"
        : "Privately-owned universities offering diverse educational programs and advanced services",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      icon: Building,
      benefits: [
        {
          icon: Zap,
          title: currentLanguage === "ar" ? "تعليم حديث" : "Modern Education",
          desc: currentLanguage === "ar" ? "مناهج متطورة ومواكبة للعصر" : "Advanced and contemporary curricula"
        },
        {
          icon: Users,
          title: currentLanguage === "ar" ? "فصول صغيرة" : "Small Classes",
          desc: currentLanguage === "ar" ? "اهتمام فردي أكبر بالطلاب" : "More individual attention to students"
        },
        {
          icon: Globe,
          title: currentLanguage === "ar" ? "شراكات دولية" : "International Partnerships",
          desc: currentLanguage === "ar" ? "تعاون مع جامعات عالمية" : "Collaboration with global universities"
        },
        {
          icon: Briefcase,
          title: currentLanguage === "ar" ? "ربط بسوق العمل" : "Industry Connection",
          desc: currentLanguage === "ar" ? "شراكات مع الشركات" : "Partnerships with companies"
        }
      ]
    },
    national: {
      title: currentLanguage === "ar" ? "الجامعات الأهلية" : "National Universities",
      titleEn: currentLanguage === "ar" ? "National Universities" : "الجامعات الأهلية",
      description: currentLanguage === "ar"
        ? "جامعات غير هادفة للربح تجمع بين مزايا الجامعات الحكومية والخاصة"
        : "Non-profit universities combining the advantages of public and private universities",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      icon: GraduationCap,
      benefits: [
        {
          icon: DollarSign,
          title: currentLanguage === "ar" ? "توازن في التكاليف" : "Balanced Costs",
          desc: currentLanguage === "ar" ? "رسوم معقولة مقابل جودة عالية" : "Reasonable fees for high quality"
        },
        {
          icon: Target,
          title: currentLanguage === "ar" ? "تخصصات مطلوبة" : "In-Demand Specializations",
          desc: currentLanguage === "ar" ? "برامج تلبي احتياجات السوق" : "Programs meeting market needs"
        },
        {
          icon: Award,
          title: currentLanguage === "ar" ? "معايير عالية" : "High Standards",
          desc: currentLanguage === "ar" ? "جودة تعليمية متميزة" : "Distinguished educational quality"
        },
        {
          icon: Heart,
          title: currentLanguage === "ar" ? "رسالة تعليمية" : "Educational Mission",
          desc: currentLanguage === "ar" ? "تركيز على الخدمة العامة" : "Focus on public service"
        }
      ]
    },
    azhar: {
      title: currentLanguage === "ar" ? "جامعات الأزهر" : "Al-Azhar Universities",
      titleEn: currentLanguage === "ar" ? "Al-Azhar Universities" : "جامعات الأزهر",
      description: currentLanguage === "ar"
        ? "مؤسسات تعليمية عريقة تابعة للأزهر الشريف تجمع بين العلوم الشرعية والحديثة"
        : "Prestigious educational institutions affiliated with Al-Azhar Al-Sharif combining religious and modern sciences",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30", 
      icon: BookOpen,
      benefits: [
        {
          icon: Library,
          title: currentLanguage === "ar" ? "تراث عريق" : "Rich Heritage",
          desc: currentLanguage === "ar" ? "أكثر من 1000 عام من التعليم" : "Over 1000 years of education"
        },
        {
          icon: Globe,
          title: currentLanguage === "ar" ? "انتشار عالمي" : "Global Reach",
          desc: currentLanguage === "ar" ? "خريجون في جميع أنحاء العالم" : "Graduates worldwide"
        },
        {
          icon: Users,
          title: currentLanguage === "ar" ? "علماء متميزون" : "Distinguished Scholars",
          desc: currentLanguage === "ar" ? "نخبة من العلماء والأساتذة" : "Elite scholars and professors"
        },
        {
          icon: Heart,
          title: currentLanguage === "ar" ? "قيم أصيلة" : "Authentic Values",
          desc: currentLanguage === "ar" ? "تعليم يجمع العلم والأخلاق" : "Education combining knowledge and ethics"
        }
      ]
    }
  };
}