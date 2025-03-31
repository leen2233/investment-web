"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function InvestmentPlans({ plans }) {
  const [hoveredPlan, setHoveredPlan] = useState(null);

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Investment Plans</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, index) => (
          // Use CSS for hover effects instead of motion
          <div
            key={index}
            className="transform transition-transform duration-300 hover:-translate-y-2"
            onMouseEnter={() => setHoveredPlan(index)}
            onMouseLeave={() => setHoveredPlan(null)}
          >
            <Card className="glassmorphism overflow-hidden h-full relative">
              {/* Add pointer-events-none to prevent this div from blocking clicks */}
              <div
                className={`absolute inset-0 bg-glow-${plan.color} opacity-${
                  hoveredPlan === index ? "30" : "10"
                } transition-opacity duration-300 pointer-events-none`}
              />

              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-bold text-neon-${plan.color}`}>
                    {plan.name}
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
                    <span className="font-medium">${plan.minimum_amount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{plan.duration} days</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Return</span>
                    <span className="font-medium">%{plan.percentage} ROI</span>
                  </div>
                </div>

                {/* Button with explicit z-index and pointer-events-auto */}
                <div className="mt-4 relative z-10">
                  <Button
                    className={`w-full bg-neon-${plan.color} hover:bg-neon-${plan.color}/90 hover:shadow-neon-${plan.color} transition-all duration-300`}
                    onClick={() => alert(`Investing in plan ${index}`)}
                  >
                    Invest Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
