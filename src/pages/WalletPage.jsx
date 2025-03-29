"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { WalletBalance } from "@/components/wallet/wallet-balance";
import { TransactionHistory } from "@/components/wallet/transaction-history";
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

export default function WalletPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Wallet"
        description="Manage your funds, make deposits, and request withdrawals."
      />

      <WalletBalance />

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

        <Card className="glassmorphism overflow-hidden">
          <CardHeader>
            <CardTitle>Transaction Summary</CardTitle>
            <CardDescription>
              Overview of your recent transactions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-border/40 p-4 text-center">
                  <div className="text-2xl font-bold text-neon-blue">
                    $7,500
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Deposits
                  </div>
                </div>
                <div className="rounded-lg border border-border/40 p-4 text-center">
                  <div className="text-2xl font-bold text-neon-cyan">
                    $3,250
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Withdrawals
                  </div>
                </div>
              </div>
              <Link to="#transaction-history">
                <Button variant="outline" className="w-full gap-2">
                  <History className="h-4 w-4" />
                  View Transaction History
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div id="transaction-history">
        <TransactionHistory />
      </div>
    </div>
  );
}
