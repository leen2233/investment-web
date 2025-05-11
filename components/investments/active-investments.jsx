import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Clock,
  DollarSign,
  AlertCircle,
  Calendar,
  Percent,
  TrendingUp,
  Shield,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
          {investments.map((investment, index) => {
            // Map the data structure correctly
            const planName = investment.plan?.name_en || "";
            const color = investment.plan?.color || "blue";
            const risk = investment.plan?.risk || "medium";
            const percentage = investment.plan?.percentage || 0;
            const popularity = investment.plan?.popularity || 0;
            const description = investment.plan?.description_en || "";

            return (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
              >
                <Card className="glassmorphism overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      {/* Header section */}
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                          <h4
                            className={`text-lg font-bold text-neon-${color}`}
                          >
                            {planName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-neon-green" />
                          <span className="text-lg font-medium">
                            {investment.current_value}
                          </span>
                        </div>
                      </div>

                      {/* Main data grid */}
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {t("investments.initialAmount")}
                            </p>
                            <p className="font-medium">
                              ${investment.initial_amount}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Percent className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {t("investments.roiFull")}
                            </p>
                            <p className="font-medium">{percentage}%</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {t("investments.riskLevel")}
                            </p>
                            <p className="font-medium capitalize">{risk}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {t("common.startDate")}
                            </p>
                            <p className="font-medium">
                              {formatDate(investment.start_date)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {t("investments.endDate")}
                            </p>
                            <p className="font-medium">
                              {formatDate(investment.end_date)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {t("calculator.duration")}
                            </p>
                            <p className="font-medium">
                              {investment.duration} {t("calculator.days")}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-2">
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span>
                            {investment.days_passed} / {investment.duration}{" "}
                            {t("calculator.days")}
                          </span>
                          <span>
                            {(
                              (investment.days_passed / investment.duration) *
                              100
                            ).toFixed(0)}
                            %
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-secondary">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r from-neon-${color} to-neon-${color}/60`}
                            initial={{ width: 0 }}
                            animate={{
                              width: `${
                                (investment.days_passed / investment.duration) *
                                100
                              }%`,
                            }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}
