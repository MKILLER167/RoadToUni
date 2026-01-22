import React from "react";
import { motion } from "motion/react";
import {
  Info,
  HeadphonesIcon,
  Mail,
  Phone,
  MessageSquare,
  FileText,
  Users,
  Heart,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { animationVariants } from "../utils/animations";

const MemoizedCard = React.memo(Card);

interface AboutPageProps {
  currentLanguage: string;
}

export function AboutPage({ currentLanguage }: AboutPageProps) {
  return (
    <div className="container mx-auto p-6 max-w-6xl pt-24">
      <motion.div {...animationVariants.fadeInUp}>
        <MemoizedCard className="border-border shadow-xl bg-card/95 backdrop-blur-sm mb-8 hover:shadow-2xl transition-all duration-500">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Info className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-primary">
                  {currentLanguage === "ar" ? "حول المنصة" : "About Platform"}
                </h1>
                <p className="text-muted-foreground">
                  {currentLanguage === "ar" 
                    ? "تعرف على المنصة والخدمات المتاحة"
                    : "Learn about the platform and available services"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <MemoizedCard className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <HeadphonesIcon className="h-6 w-6 text-primary" />
                    <h3 className="text-xl text-primary">
                      {currentLanguage === "ar" ? "استشارة تعليمية" : "Educational Consultation"}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {currentLanguage === "ar" 
                      ? "احصل على استشارة مجانية لاختيار الجامعة والتخصص المناسب لك"
                      : "Get free consultation to choose the right university and major for you"}
                  </p>
                  <div className="space-y-3">
                    <Button className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {currentLanguage === "ar" ? "بدء محادثة استشارية" : "Start Consultation Chat"}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      {currentLanguage === "ar" ? "حجز مكالمة استشارية" : "Book Consultation Call"}
                    </Button>
                  </div>
                </CardContent>
              </MemoizedCard>

              <MemoizedCard className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                    <h3 className="text-xl text-primary">
                      {currentLanguage === "ar" ? "تواصل معنا" : "Contact Us"}
                    </h3>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>support@roadtouniversities.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>+20 100 123 4567</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      {currentLanguage === "ar" ? "إرسال رسالة" : "Send Message"}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      {currentLanguage === "ar" ? "الأسئلة الشائعة" : "FAQ"}
                    </Button>
                  </div>
                </CardContent>
              </MemoizedCard>
            </div>

            <MemoizedCard className="border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-xl text-primary mb-4">
                  {currentLanguage === "ar" ? "حول المنصة" : "About Platform"}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary mt-1" />
                    <p className="text-sm">
                      {currentLanguage === "ar" 
                        ? "منصة طريق الجامعات هي دليلك الشامل للتعليم العالي في مصر"
                        : "Road to Universities is your comprehensive guide to higher education in Egypt"}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-1" />
                    <p className="text-sm">
                      {currentLanguage === "ar" 
                        ? "نهدف إلى مساعدة الطلاب في اتخاذ قرارات تعليمية مدروسة"
                        : "We aim to help students make informed educational decisions"}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="h-5 w-5 text-primary mt-1" />
                    <p className="text-sm">
                      {currentLanguage === "ar" 
                        ? "تم تطوير المنصة بحب وعناية لخدمة الطلاب المصريين"
                        : "Platform developed with love and care to serve Egyptian students"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </MemoizedCard>
          </div>
        </MemoizedCard>
      </motion.div>
    </div>
  );
}