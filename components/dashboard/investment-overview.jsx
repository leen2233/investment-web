"use client"

import { motion } from "framer-motion"
import { Clock, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function InvestmentOverview() {
  const investments = [
    {
      name: "Balanced Growth Plan",
      amount: "$2,000",
      date: "Feb 15, 2025",
      timeRemaining: "5 months",
      currentValue: "$2,250",
      progress: 58,
    },
    {
      name: "Conservative Plan",
      amount: "$3,500",
      date: "Jan 10, 2025",
      timeRemaining: "3 months",
      currentValue: "$3,600",
      progress: 75,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  const progressVariants = {
    hidden: { width: 0 },
    visible: (progress: number) => ({
      width: `${progress}%`,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.5,
      },
    }),
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="glassmorphism h-full">
        <CardHeader>
          <CardTitle>Active Investments</CardTitle>
          <CardDescription>Your current investment plans and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div className="space-y-4" variants={listVariants} initial="hidden" animate="visible">
            {investments.map((investment, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="rounded-lg border border-border/40 p-4 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <h4 className="font-semibold">{investment.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {investment.amount} invested on {investment.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{investment.timeRemaining} remaining</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{investment.currentValue} current value</span>
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
                      className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-blue"
                      custom={investment.progress}
                      variants={progressVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

