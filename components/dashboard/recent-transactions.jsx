"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function RecentTransactions() {
  const transactions = [
    {
      type: "deposit",
      icon: <ArrowUpRight className="h-4 w-4 text-green-500" />,
      iconBg: "bg-green-500/20",
      title: "Deposit",
      date: "Today",
      amount: "+$1,000.00",
      color: "text-green-500",
    },
    {
      type: "investment",
      icon: <Clock className="h-4 w-4 text-neon-blue" />,
      iconBg: "bg-neon-blue/20",
      title: "Investment Started",
      date: "Yesterday",
      amount: "$500.00",
      color: "text-foreground",
    },
    {
      type: "withdrawal",
      icon: <ArrowDownRight className="h-4 w-4 text-red-500" />,
      iconBg: "bg-red-500/20",
      title: "Withdrawal",
      date: "3 days ago",
      amount: "-$750.00",
      color: "text-red-500",
    },
    {
      type: "deposit",
      icon: <ArrowUpRight className="h-4 w-4 text-green-500" />,
      iconBg: "bg-green-500/20",
      title: "Deposit",
      date: "1 week ago",
      amount: "+$2,000.00",
      color: "text-green-500",
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="glassmorphism overflow-hidden h-full">
        <CardHeader className="pb-2">
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div variants={listVariants} initial="hidden" animate="visible" className="space-y-4">
            {transactions.map((transaction, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center justify-between rounded-lg border border-border/40 p-3 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`rounded-full p-2 ${transaction.iconBg}`}>{transaction.icon}</div>
                  <div>
                    <p className="text-sm font-medium">{transaction.title}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className={`text-sm font-medium ${transaction.color}`}>{transaction.amount}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-4 text-center">
            <Button variant="link" className="text-sm text-muted-foreground hover:text-neon-blue">
              View All Transactions
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

