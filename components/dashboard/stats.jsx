"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, LineChart, Wallet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CountUp } from "@/components/ui/count-up"

export function DashboardStats() {
  const stats = [
    {
      title: "Total Balance",
      value: 12546,
      change: "+2.5%",
      trend: "up",
      icon: <Wallet className="h-4 w-4 text-muted-foreground" />,
      color: "purple",
    },
    {
      title: "Active Investments",
      value: 8350,
      subtitle: "3 active plans",
      icon: <LineChart className="h-4 w-4 text-muted-foreground" />,
      color: "blue",
    },
    {
      title: "Total Deposits",
      value: 9250,
      change: "+12.5%",
      trend: "up",
      icon: <ArrowUpRight className="h-4 w-4 text-muted-foreground" />,
      color: "cyan",
    },
    {
      title: "Total Withdrawals",
      value: 2350,
      change: "+4.3%",
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
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
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $<CountUp end={stat.value} duration={2} />
              </div>
              {stat.change ? (
                <p className="text-xs text-muted-foreground">
                  <span className={stat.trend === "up" ? "text-neon-cyan" : "text-red-500"}>{stat.change}</span> from
                  last month
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

