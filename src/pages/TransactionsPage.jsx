import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/axios";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function TransactionsPage() {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    startDate: "",
    endDate: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/users/transactions", {
        params: {
          type: filters.type !== "all" ? filters.type : undefined,
          status: filters.status !== "all" ? filters.status : undefined,
          startDate: filters.startDate || undefined,
          endDate: filters.endDate || undefined,
        },
      });
      setTransactions(response);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMM d, yyyy HH:mm");
  };

  const getStatusColor = (status) => {
    const colors = {
      success: "bg-green-500/10 text-green-500",
      pending: "bg-yellow-500/10 text-yellow-500",
      failed: "bg-red-500/10 text-red-500",
      processing: "bg-blue-500/10 text-blue-500",
    };
    return colors[status.toLowerCase()] || "bg-gray-500/10 text-gray-500";
  };

  const getAmountColor = (type) => {
    return type === "Withdrawal" || type === "Loss"
      ? "text-red-500"
      : "text-neon-cyan";
  };

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={t("transactions.history")}
        description={t("transactions.description")}
      />

      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle>{t("common.filters")}</CardTitle>
          <CardDescription>{t("common.filterDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Select
              value={filters.type}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t("transactions.type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("common.all")}</SelectItem>
                <SelectItem value="Deposit">
                  {t("transactions.deposit")}
                </SelectItem>
                <SelectItem value="Withdrawal">
                  {t("transactions.withdrawal")}
                </SelectItem>
                <SelectItem value="Investment">
                  {t("transactions.investment")}
                </SelectItem>
                <SelectItem value="Earning">
                  {t("transactions.earning")}
                </SelectItem>
                <SelectItem value="Loss">{t("transactions.loss")}</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t("transactions.status")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("common.all")}</SelectItem>
                <SelectItem value="Success">
                  {t("transactions.statuses.success")}
                </SelectItem>
                <SelectItem value="Pending">
                  {t("transactions.statuses.pending")}
                </SelectItem>
                <SelectItem value="Processing">
                  {t("transactions.statuses.processing")}
                </SelectItem>
                <SelectItem value="Failed">
                  {t("transactions.statuses.failed")}
                </SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, startDate: e.target.value }))
              }
              placeholder={t("common.startDate")}
            />

            <Input
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, endDate: e.target.value }))
              }
              placeholder={t("common.endDate")}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="glassmorphism">
        <CardContent className="p-0">
          <div className="rounded-lg">
            <div className="grid grid-cols-4 gap-4 p-4 text-sm font-medium text-muted-foreground md:grid-cols-5">
              <div>{t("transactions.date")}</div>
              <div>{t("transactions.type")}</div>
              <div className="hidden md:block">{t("common.description")}</div>
              <div className="text-right">{t("transactions.amount")}</div>
              <div className="text-right">{t("transactions.status")}</div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="divide-y divide-border/40"
            >
              {isLoading ? (
                <div className="p-4 text-center text-muted-foreground">
                  {t("common.loading")}
                </div>
              ) : transactions.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  {t("common.noResults")}
                </div>
              ) : (
                transactions.map((transaction, index) => (
                  <motion.div
                    key={`${transaction.date}-${transaction.amount}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="grid grid-cols-4 gap-4 p-4 text-sm hover:bg-secondary/30 transition-colors md:grid-cols-5"
                  >
                    <div>{formatDate(transaction.date)}</div>
                    <div>
                      {t(`transactions.${transaction.type.toLowerCase()}`)}
                    </div>
                    <div className="hidden md:block line-clamp-1">
                      {transaction.description}
                    </div>
                    <div
                      className={`text-right font-medium ${getAmountColor(
                        transaction.type
                      )}`}
                    >
                      {transaction.type === "Withdrawal" ||
                      transaction.type === "Loss"
                        ? "-"
                        : "+"}
                      ${transaction.amount}
                    </div>
                    <div className="text-right">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {t(
                          `transactions.statuses.${transaction.status.toLowerCase()}`
                        )}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
