"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function RecentTransactions({ transactions }) {
  const { t } = useTranslation();

  const icons = {
    Deposit: {
      icon: <ArrowUpRight className="h-4 w-4 text-green-500" />,
      iconBg: "bg-green-500/20",
    },
    Investment: {
      icon: <Clock className="h-4 w-4 text-neon-blue" />,
      iconBg: "bg-neon-blue/20",
    },
    Withdrawal: {
      icon: <ArrowDownRight className="h-4 w-4 text-red-500" />,
      iconBg: "bg-red-500/20",
    },
    Earning: {
      icon: <ArrowUpRight className="h-4 w-4 text-green-500" />,
      iconBg: "bg-green-500/20",
    },
    Loss: {
      icon: <ArrowDownRight className="h-4 w-4 text-red-500" />,
      iconBg: "bg-red-500/20",
    },
  };

  const colors = {
    Deposit: "text-green-500",
    Investment: "text-foreground",
    Withdrawal: "text-red-500",
    Earning: "text-green-500",
    Loss: "text-red-500",
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="glassmorphism overflow-hidden h-full">
        <CardHeader className="pb-2">
          <CardTitle>{t("dashboard.recentTransactions")}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {transactions.map((transaction, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center justify-between rounded-lg border border-border/40 p-3 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`rounded-full p-2 ${
                      icons[transaction.type].iconBg
                    }`}
                  >
                    {icons[transaction.type].icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {t(`transactions.${transaction.type.toLowerCase()}`)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatRelativeTime(transaction.date)}
                    </p>
                  </div>
                </div>
                <div
                  className={`text-sm font-medium ${colors[transaction.type]}`}
                >
                  {transaction.type === "Withdrawal" ||
                  transaction.type === "Loss"
                    ? "-$"
                    : "+$"}
                  {transaction.amount}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              className="text-sm text-muted-foreground hover:text-neon-blue"
            >
              {t("transactions.viewAll")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
