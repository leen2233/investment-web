"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Filter, ArrowUpDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function InvestmentPlans() {
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const plans = [
    {
      title: "Conservative Plan",
      description: "Low risk, stable returns",
      apy: "3-5% APY",
      risk: "Low Risk",
      minInvestment: "$500",
      duration: "6-12 months",
      withdrawal: "Anytime (1% fee)",
      allocation: "80% Bonds, 20% Stocks",
      progress: 65,
      color: "blue",
    },
    {
      title: "Balanced Growth",
      description: "Moderate risk, higher returns",
      apy: "5-8% APY",
      risk: "Medium Risk",
      minInvestment: "$1,000",
      duration: "12-24 months",
      withdrawal: "After 3 months",
      allocation: "50% Bonds, 50% Stocks",
      progress: 50,
      color: "purple",
      popular: true,
    },
    {
      title: "Growth Portfolio",
      description: "Higher risk, maximum returns",
      apy: "8-12% APY",
      risk: "Higher Risk",
      minInvestment: "$2,500",
      duration: "24-36 months",
      withdrawal: "After 6 months",
      allocation: "20% Bonds, 80% Stocks",
      progress: 20,
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

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

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
        <h2 className="text-3xl font-bold tracking-tight">Investment Plans</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>
        </div>
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
                    Popular
                  </Badge>
                </div>
              )}

              <CardHeader
                className={`bg-gradient-to-r from-neon-${plan.color} to-neon-${plan.color}/60 text-white`}
              >
                <CardTitle>{plan.title}</CardTitle>
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
                    <span className="text-2xl font-bold">{plan.apy}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`bg-neon-${plan.color}/10`}
                  >
                    {plan.risk}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Minimum Investment
                      </span>
                      <span className="font-medium">{plan.minInvestment}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{plan.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Withdrawal</span>
                      <span className="font-medium">{plan.withdrawal}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span>Portfolio Allocation</span>
                      <span className="font-medium">{plan.allocation}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <motion.div
                        className={`h-full rounded-full bg-neon-${plan.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${plan.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-muted/30 px-6 py-4">
                <motion.div
                  className="w-full"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button
                    className={`w-full bg-neon-${plan.color} hover:bg-neon-${
                      plan.color
                    }/90 hover:shadow-neon-${
                      plan.color === "purple" ? "" : plan.color
                    } transition-all duration-300`}
                  >
                    Invest Now
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
