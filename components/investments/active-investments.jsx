import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Clock, DollarSign, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ActiveInvestments({ investments }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50]);

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

  // const investments = [
  //   {
  //     name: "Daily 5% ROI",
  //     amount: "$1,000",
  //     date: "Started 10 days ago",
  //     timeRemaining: "11 days",
  //     currentValue: "$1,500",
  //     progress: 48,
  //     color: "purple",
  //   },
  //   {
  //     name: "Daily 3% ROI",
  //     amount: "$500",
  //     date: "Started 15 days ago",
  //     timeRemaining: "15 days",
  //     currentValue: "$725",
  //     progress: 50,
  //     color: "blue",
  //   },
  //   {
  //     name: "Daily 7% ROI",
  //     amount: "$2,000",
  //     date: "Started 5 days ago",
  //     timeRemaining: "9 days",
  //     currentValue: "$2,700",
  //     progress: 35,
  //     color: "cyan",
  //   },
  // ];

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
        Your Active Investments
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
                  You don't have any active investments yet
                </p>
                <p className="text-sm text-muted-foreground">
                  Start investing to see your investments here
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
                        ${investment.initial_amount} Started{" "}
                        {formatRelativeTime(investment.start_date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {investment.days_remaining} days remaining
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {investment.current_value} current value
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Progress</span>
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
                      View Details
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
