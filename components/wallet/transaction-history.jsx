"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export function TransactionHistory() {
  const [activeTab, setActiveTab] = useState("all")

  const allTransactions = [
    {
      type: "deposit",
      icon: <ArrowUpRight className="h-4 w-4 text-green-500" />,
      iconBg: "bg-green-500/20",
      title: "Deposit",
      date: "Today",
      amount: "+$1,000.00",
      status: "Completed",
      color: "text-green-500",
    },
    {
      type: "withdrawal",
      icon: <ArrowDownRight className="h-4 w-4 text-red-500" />,
      iconBg: "bg-red-500/20",
      title: "Withdrawal",
      date: "Yesterday",
      amount: "-$750.00",
      status: "Completed",
      color: "text-red-500",
    },
    {
      type: "investment",
      icon: <Clock className="h-4 w-4 text-neon-blue" />,
      iconBg: "bg-neon-blue/20",
      title: "Investment Started",
      date: "3 days ago",
      amount: "$500.00",
      status: "Active",
      color: "text-foreground",
    },
    {
      type: "deposit",
      icon: <ArrowUpRight className="h-4 w-4 text-green-500" />,
      iconBg: "bg-green-500/20",
      title: "Deposit",
      date: "1 week ago",
      amount: "+$2,000.00",
      status: "Completed",
      color: "text-green-500",
    },
    {
      type: "withdrawal",
      icon: <ArrowDownRight className="h-4 w-4 text-red-500" />,
      iconBg: "bg-red-500/20",
      title: "Withdrawal",
      date: "2 weeks ago",
      amount: "-$1,200.00",
      status: "Completed",
      color: "text-red-500",
    },
  ]

  const filteredTransactions = allTransactions.filter((transaction) => {
    if (activeTab === "all") return true
    return transaction.type === activeTab
  })

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  }

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="glassmorphism overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="deposit">Deposits</TabsTrigger>
              <TabsTrigger value="withdrawal">Withdrawals</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <motion.div variants={listVariants} initial="hidden" animate="visible" className="space-y-4">
                  {filteredTransactions.map((transaction, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="flex items-center justify-between rounded-lg border border-border/40 p-4 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`rounded-full p-2 ${transaction.iconBg}`}>{transaction.icon}</div>
                        <div>
                          <p className="text-sm font-medium">{transaction.title}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className={`text-sm font-medium ${transaction.color}`}>{transaction.amount}</div>
                        <div className="text-xs text-muted-foreground">{transaction.status}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </Tabs>

          <div className="mt-4 text-center">
            <Button variant="outline" className="text-sm">
              View All Transactions
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

