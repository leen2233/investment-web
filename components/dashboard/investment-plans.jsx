"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function InvestmentPlans() {
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const plans = [
    {
      title: "Daily 3% ROI",
      description: "Low risk, stable returns",
      minInvestment: "$100",
      duration: "30 days",
      totalReturn: "90% ROI",
      color: "blue",
    },
    {
      title: "Daily 5% ROI",
      description: "Balanced risk and reward",
      minInvestment: "$500",
      duration: "21 days",
      totalReturn: "105% ROI",
      color: "purple",
      popular: true,
    },
    {
      title: "Daily 7% ROI",
      description: "Higher risk, maximum returns",
      minInvestment: "$1,000",
      duration: "14 days",
      totalReturn: "98% ROI",
      color: "cyan",
    },
  ];

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

  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
      },
    }),
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={headerVariants}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Popular Investment Plans</h2>
          <Button variant="link" className="gap-1 text-neon-blue">
            View All Plans
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            custom={index}
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

              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-bold text-neon-${plan.color}`}>
                    {plan.title}
                  </h3>
                  {plan.popular && (
                    <Badge className="bg-neon-purple hover:bg-neon-purple/90">
                      Popular
                    </Badge>
                  )}
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.description}
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Minimum</span>
                    <span className="font-medium">{plan.minInvestment}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{plan.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Return</span>
                    <span className="font-medium">{plan.totalReturn}</span>
                  </div>
                </div>

                <motion.div
                  className="mt-4"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    className={`w-full bg-neon-${plan.color} hover:bg-neon-${plan.color}/90 hover:shadow-neon-${plan.color} transition-all duration-300`}
                  >
                    Invest Now
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
