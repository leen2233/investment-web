"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, LineChart, Wallet } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { CountUp } from "@/components/ui/count-up"

export function DashboardStats() {
  const stats = [
    {
      title: "Total Balance",
      value: 4250,
      change: "+12.5%",
      trend: "up",
      icon: <Wallet className="h-4 w-4 text-muted-foreground" />,
      color: "blue",
    },
    {
      title: "Active Investments",
      value: 3,
      subtitle: "$5,250 total value",
      icon: <LineChart className="h-4 w-4 text-muted-foreground" />,
      color: "cyan",
      isCount: true,
    },
    {
      title: "Total Deposits",
      value: 7500,
      change: "+5.3%",
      trend: "up",
      icon: <ArrowUpRight className="h-4 w-4 text-muted-foreground" />,
      color: "purple",
    },
    {
      title: "Total Withdrawals",
      value: 3250,
      change: "+2.1%",
      trend: "down",
      icon: <ArrowDownRight className="h-4 w-4 text-muted-foreground" />,
      color: "blue",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className="glassmorphism overflow-hidden">
            <div className={`absolute inset-0 bg-glow-${stat.color} opacity-20`} />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-muted-foreground">{stat.title}</div>
                {stat.icon}
              </div>
              <div className="mt-2 text-2xl font-bold">
                {!stat.isCount && "$"}
                <CountUp end={stat.value} duration={2} />
              </div>
              {stat.change ? (
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className={stat.trend === "up" ? "text-neon-cyan" : "text-red-500"}>{stat.change}</span> from
                  last month
                </p>
              ) : (
                <p className="mt-1 text-xs text-muted-foreground">{stat.subtitle}</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

