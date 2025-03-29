import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Clock, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ActiveInvestments() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50]);

  const investments = [
    {
      name: "Daily 5% ROI",
      amount: "$1,000",
      date: "Started 10 days ago",
      timeRemaining: "11 days",
      currentValue: "$1,500",
      progress: 48,
      color: "purple",
    },
    {
      name: "Daily 3% ROI",
      amount: "$500",
      date: "Started 15 days ago",
      timeRemaining: "15 days",
      currentValue: "$725",
      progress: 50,
      color: "blue",
    },
    {
      name: "Daily 7% ROI",
      amount: "$2,000",
      date: "Started 5 days ago",
      timeRemaining: "9 days",
      currentValue: "$2,700",
      progress: 35,
      color: "cyan",
    },
  ];

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
                      {investment.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {investment.amount} {investment.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {investment.timeRemaining} remaining
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {investment.currentValue} current value
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{investment.progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r from-neon-${investment.color} to-neon-${investment.color}/60`}
                      initial={{ width: 0 }}
                      animate={{ width: `${investment.progress}%` }}
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
    </motion.div>
  );
}
