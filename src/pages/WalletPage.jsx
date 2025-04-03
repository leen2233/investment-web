
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { WalletBalance } from "@/components/wallet/wallet-balance";
import { TransactionHistory } from "@/components/profile/transaction-history";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, History } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../lib/axios";

export default function WalletPage() {
  const [stats, setStats] = useState({});
  const [lastTransactions, setLastTransactions] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await api.get("users/me/stats");
      setStats(response);
    };

    const fetchTransactions = async () => {
      const response = await api.get("users/transactions/recent");
      setLastTransactions(response);
    };

    fetchStats();
    fetchTransactions();
  }, []);

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Wallet"
        description="Manage your funds, make deposits, and request withdrawals."
      />

      <WalletBalance stats={stats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glassmorphism overflow-hidden">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Deposit or withdraw funds from your wallet
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Link to="/wallet/deposit">
                <Button className="w-full gap-2 bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon transition-all duration-300">
                  <ArrowUpRight className="h-4 w-4" />
                  Deposit Funds
                </Button>
              </Link>
              <Link to="/wallet/withdraw">
                <Button
                  variant="outline"
                  className="w-full gap-2 border-neon-cyan hover:bg-neon-cyan/10 hover:text-neon-cyan transition-all duration-300"
                >
                  <ArrowDownRight className="h-4 w-4" />
                  Withdraw Funds
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div id="transaction-history">
        <TransactionHistory transactions={lastTransactions} />
      </div>
    </div>
  );
}
