"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function RecentTransactions({ transactions }) {
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

    // Parse the timestamp
    const date = new Date(timestamp);
    const now = new Date();

    // Reset hours to compare just the dates
    const dateWithoutTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    const nowWithoutTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    // Calculate difference in days
    const diffTime = nowWithoutTime - dateWithoutTime;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Format based on the difference
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 14) {
      return "1 week ago";
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else if (diffDays < 60) {
      return "1 month ago";
    } else if (diffDays < 365) {
      return `${Math.floor(diffDays / 30)} months ago`;
    } else if (diffDays < 730) {
      return "1 year ago";
    } else {
      return `${Math.floor(diffDays / 365)} years ago`;
    }
  };

  // const transactions = [
  //   {,
  //     date: "Today",
  //   },
  //   {
  //     date: "Yesterday",
  //   },
  //   {
  //     date: "3 days ago",
  //   },
  //   {
  //     date: "1 week ago",
  //   },
  // ]

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
          <CardTitle>Recent Transactions</CardTitle>
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
                    <p className="text-sm font-medium">{transaction.type}</p>
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
              View All Transactions
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
