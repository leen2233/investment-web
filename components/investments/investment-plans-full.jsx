"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RippleButton } from "@/components/ui/ripple-button";
import { useTranslation } from "react-i18next";

export function InvestmentPlansFull({ plans }) {
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const { t } = useTranslation();

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
      },
    },
  };

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex items-center justify-between"
        variants={headerVariants}
      >
        <h2 className="text-xl font-bold">{t("investments.availablePlans")}</h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onHoverStart={() => setHoveredPlan(index)}
            onHoverEnd={() => setHoveredPlan(null)}
          >
            <Card className="glassmorphism overflow-hidden h-full">
              <div
                className={`absolute inset-0 bg-glow-${plan.color} opacity-${
                  hoveredPlan === index ? "30" : "10"
                } transition-opacity duration-300`}
              />

              {plan.popular && (
                <div className="absolute right-4 top-4 z-10">
                  <Badge className="bg-neon-purple hover:bg-neon-purple/90">
                    {t("investments.popular")}
                  </Badge>
                </div>
              )}

              <CardHeader
                className={`bg-gradient-to-r from-neon-${plan.color} to-neon-${plan.color}/60 text-white`}
              >
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription
                  className={`text-neon-${
                    plan.color === "purple"
                      ? "purple"
                      : plan.color === "blue"
                      ? "blue"
                      : "cyan"
                  }-100`}
                >
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`h-5 w-5 text-neon-${plan.color}`} />
                    <span className="text-xl font-bold">
                      {plan.percentage}% {t("common.daily")}
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`bg-neon-${plan.color}/10`}
                  >
                    {capitalize(plan.risk)}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t("investments.minDeposit")}
                      </span>
                      <span className="font-medium">
                        ${plan.minimum_amount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t("investments.duration")}
                      </span>
                      <span className="font-medium">
                        {plan.duration} {t("common.days")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t("investments.earlyWithdrawal")}
                      </span>
                      <span className="font-medium">
                        {plan.early_withdrawal_time} {t("common.days")} (
                        {plan.early_withdrawal_fee}% {t("common.fee")})
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t("investments.totalReturn")}
                      </span>
                      <span className="font-medium">
                        {plan.percentage}% {t("investments.roi")}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span>{t("investments.popularity")}</span>
                      <span className="font-medium">{plan.popularity}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <motion.div
                        className={`h-full rounded-full bg-neon-${
                          plan.color === "cyan" ? "blue" : plan.color
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${plan.popularity}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-muted/30 px-6 py-4">
                <RippleButton
                  className={`w-full bg-neon-${plan.color} hover:bg-neon-${
                    plan.color
                  }/90 hover:shadow-neon-${
                    plan.color === "purple" ? "" : plan.color
                  } transition-all duration-300`}
                >
                  {t("investments.invest")}
                </RippleButton>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
