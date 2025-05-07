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
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function TransactionHistory() {
  const [activeTab, setActiveTab] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const { t } = useTranslation();

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
          <CardTitle>{t("transactions.history")}</CardTitle>
          <CardDescription>{t("transactions.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full h-auto flex flex-wrap gap-2 bg-background p-0">
              <TabsTrigger
                value="all"
                className="flex-1 data-[state=active]:bg-secondary px-3 py-2"
              >
                {t("common.all")}
              </TabsTrigger>
              <TabsTrigger
                value="deposit"
                className="flex-1 data-[state=active]:bg-secondary px-3 py-2"
              >
                {t("transactions.deposits")}
              </TabsTrigger>
              <TabsTrigger
                value="withdrawal"
                className="flex-1 data-[state=active]:bg-secondary px-3 py-2"
              >
                {t("transactions.withdrawals")}
              </TabsTrigger>
              <TabsTrigger
                value="earning"
                className="flex-1 data-[state=active]:bg-secondary px-3 py-2"
              >
                {t("transactions.earnings")}
              </TabsTrigger>
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
                  <div className="hidden md:flex items-center justify-between p-3 text-sm font-medium text-muted-foreground">
                    <div className="flex flex-1 items-center gap-2 sm:gap-4">
                      <div className="w-20 sm:w-32">
                        {t("transactions.date")}
                      </div>
                      <div className="w-20 sm:w-24">
                        {t("transactions.type")}
                      </div>
                      <div className="flex-1">
                        {t("transactions.description")}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div>{t("transactions.amount")}</div>
                      <div className="w-24 text-right">
                        {t("transactions.status")}
                      </div>
                    </div>
                  </div>
                  <Separator className="bg-border/40 hidden md:block" />
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
                          className="flex flex-col md:flex-row md:items-center justify-between p-3 text-sm hover:bg-secondary/30 transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:flex-1 gap-2 md:items-center md:gap-4">
                            <div className="flex items-center justify-between md:justify-start md:w-32">
                              <div className="text-muted-foreground md:hidden">
                                Date:
                              </div>
                              <div className="truncate">
                                {formatDate(transaction.date)}
                              </div>
                            </div>
                            <div className="flex items-center justify-between md:justify-start md:w-24">
                              <div className="text-muted-foreground md:hidden">
                                Type:
                              </div>
                              <div className="capitalize truncate">
                                {t(
                                  `transactions.${transaction.type.toLowerCase()}`
                                )}
                              </div>
                            </div>
                            <div className="hidden md:block flex-1 truncate">
                              {transaction.description &&
                                transaction.description.slice(0, 40)}
                              ...
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2 md:mt-0 md:gap-4">
                            <div className="flex items-center gap-1 md:hidden">
                              <div className="text-muted-foreground">
                                Amount:
                              </div>
                            </div>
                            <div
                              className={`font-medium ${
                                isPositive(transaction.type)
                                  ? "text-neon-cyan"
                                  : "text-red-500"
                              }`}
                            >
                              {isPositive(transaction.type) ? "+" : "-"}
                              {transaction.amount}
                            </div>
                            <div className="hidden md:block w-24 text-right">
                              <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                                {t(
                                  `transactions.statuses.${transaction.status.toLowerCase()}`
                                )}
                              </span>
                            </div>
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
            <Link to={"/wallet/transactions"}>
              <Button
                variant="outline"
                className="gap-2 border-neon-purple/50 hover:border-neon-purple hover:bg-neon-purple/10 transition-all duration-300"
              >
                <History className="h-4 w-4" />
                {t("transactions.viewAll")}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
