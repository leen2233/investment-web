import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Clock, DollarSign, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function ActiveInvestments({ investments }) {
  const containerRef = useRef(null);
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50]);

  const formatRelativeTime = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const now = new Date();
    const dateWithoutTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const nowWithoutTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const diffTime = nowWithoutTime - dateWithoutTime;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return t("common.today");
    } else if (diffDays === 1) {
      return t("common.yesterday");
    } else if (diffDays < 7) {
      return t("common.daysAgo", { count: diffDays });
    } else if (diffDays < 14) {
      return t("common.weekAgo");
    } else if (diffDays < 30) {
      return t("common.weeksAgo", { count: Math.floor(diffDays / 7) });
    } else if (diffDays < 60) {
      return t("common.monthAgo");
    } else if (diffDays < 365) {
      return t("common.monthsAgo", { count: Math.floor(diffDays / 30) });
    } else if (diffDays < 730) {
      return t("common.yearAgo");
    } else {
      return t("common.yearsAgo", { count: Math.floor(diffDays / 365) });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
      },
    }),
  };

  return (
    <motion.div ref={containerRef} style={{ opacity, y }} className="space-y-4">
      <motion.h3
        className="text-xl font-bold"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        {t("investments.activePlans")}
      </motion.h3>
      {investments.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glassmorphism">
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground" />
                <p className="text-lg font-medium">
                  {t("investments.noActiveInvestments")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("investments.startInvesting")}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {investments.map((investment, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="glassmorphism overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <h4
                        className={`font-semibold text-neon-${investment.color}`}
                      >
                        {investment.plan_name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        ${investment.initial_amount}{" "}
                        {t("investments.startedOn")}{" "}
                        {formatRelativeTime(investment.start_date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {investment.days_remaining}{" "}
                          {t("investments.daysRemaining")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          ${investment.current_value}{" "}
                          {t("investments.currentValue")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>{t("investments.progress")}</span>
                      <span>
                        {(100 / investment.duration) * investment.days_passed}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r from-neon-${investment.color} to-neon-${investment.color}/60`}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            (100 / investment.duration) * investment.days_passed
                          }%`,
                        }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-neon-${investment.color}/50 hover:border-neon-${investment.color} hover:bg-neon-${investment.color}/10 transition-all duration-300`}
                    >
                      {t("investments.viewDetails")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
