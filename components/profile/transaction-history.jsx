"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/axios";
import { format } from "date-fns";

export function TransactionHistory() {
  const [activeTab, setActiveTab] = useState("all");
  const [transactions, setTransactions] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy, HH:mm ");
  };

  useEffect(() => {
    // Fetch transactions from the API
    const fetchTransactions = async () => {
      const response = await api.get("/users/transactions/recent");
      console.log(response);
      setTransactions(response);
    };

    fetchTransactions();
  }, []);

  const isPositive = (type) => {
    if (type === "Withdrawal" || type === "Loss") {
      return false;
    }
    return true;
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (activeTab === "all") return true;
    return transaction.type === activeTab;
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: i * 0.05,
      },
    }),
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="glassmorphism overflow-hidden">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            View all your deposits, withdrawals, and earnings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="deposit">Deposits</TabsTrigger>
              <TabsTrigger value="withdrawal">Withdrawals</TabsTrigger>
              <TabsTrigger value="earning">Earnings</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tableVariants}
                initial="hidden"
                animate="visible"
                className="mt-4"
              >
                <div className="rounded-lg border border-border/40">
                  <div className="grid grid-cols-4 gap-4 p-4 text-sm font-medium text-muted-foreground md:grid-cols-5">
                    <div>Date</div>
                    <div>Type</div>
                    <div>Description</div>
                    <div className="text-right">Amount</div>
                    <div className="hidden md:block text-right">Status</div>
                  </div>
                  <Separator className="bg-border/40" />
                  <div className="divide-y divide-border/40">
                    <AnimatePresence>
                      {filteredTransactions.map((transaction, index) => (
                        <motion.div
                          key={`${transaction.date}-${transaction.amount}-${index}`}
                          custom={index}
                          variants={rowVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="grid grid-cols-4 gap-4 p-4 text-sm hover:bg-secondary/30 transition-colors md:grid-cols-5"
                        >
                          <div>{formatDate(transaction.date)}</div>
                          <div className="capitalize">{transaction.type}</div>
                          <div>{transaction.description}</div>
                          <div
                            className={`text-right font-medium ${
                              isPositive(transaction.type)
                                ? "text-neon-cyan"
                                : "text-red-500"
                            }`}
                          >
                            {isPositive(transaction.type) ? "+" : "-"}
                            {transaction.amount}
                          </div>
                          <div className="hidden md:block text-right">
                            <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                              {transaction.status}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <motion.div
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              variant="outline"
              className="gap-2 border-neon-purple/50 hover:border-neon-purple hover:bg-neon-purple/10 transition-all duration-300"
            >
              <History className="h-4 w-4" />
              View All Transactions
              <ExternalLink className="h-4 w-4" />
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
