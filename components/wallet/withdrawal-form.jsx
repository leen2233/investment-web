import { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  CreditCard,
  Bitcoin,
  EclipseIcon as Ethereum,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/auth-context";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function WithdrawalForm({
  onSubmit,
  isSubmitting = false,
  isSuccess = false,
}) {
  const { user } = useAuth();
  const [amount, setAmount] = useState(50);
  const [withdrawalMethod, setWithdrawalMethod] = useState("btc");
  const [address, setAddress] = useState("");

  const maxWithdrawal = Math.floor((user?.balance || 0) * 0.95);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1,
      },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="glassmorphism overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle>Withdraw Funds</CardTitle>
          <CardDescription>
            Withdraw your funds to your preferred payment method
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Your withdrawal request has been submitted successfully! It
                  will be processed within 24 hours.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="withdrawal-amount">Amount</Label>
                <span className="text-xs text-muted-foreground">
                  Available: ${maxWithdrawal}
                </span>
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="withdrawal-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="pl-10"
                  min={10}
                  max={maxWithdrawal}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Withdrawal Method</Label>
              <RadioGroup
                value={withdrawalMethod}
                onValueChange={setWithdrawalMethod}
                className="grid grid-cols-1 gap-2 sm:grid-cols-3"
              >
                <Label
                  htmlFor="btc-withdraw"
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-md border p-3 ${
                    withdrawalMethod === "btc"
                      ? "border-neon-cyan bg-neon-cyan/10"
                      : "border-border"
                  }`}
                >
                  <RadioGroupItem
                    value="btc"
                    id="btc-withdraw"
                    className="sr-only"
                  />
                  <Bitcoin className="h-4 w-4" />
                  <span>Bitcoin</span>
                </Label>
                <Label
                  htmlFor="eth-withdraw"
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-md border p-3 ${
                    withdrawalMethod === "eth"
                      ? "border-neon-cyan bg-neon-cyan/10"
                      : "border-border"
                  }`}
                >
                  <RadioGroupItem
                    value="eth"
                    id="eth-withdraw"
                    className="sr-only"
                  />
                  <Ethereum className="h-4 w-4" />
                  <span>Ethereum</span>
                </Label>
                <Label
                  htmlFor="card-withdraw"
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-md border p-3 ${
                    withdrawalMethod === "card"
                      ? "border-neon-cyan bg-neon-cyan/10"
                      : "border-border"
                  }`}
                >
                  <RadioGroupItem
                    value="card"
                    id="card-withdraw"
                    className="sr-only"
                  />
                  <CreditCard className="h-4 w-4" />
                  <span>Card</span>
                </Label>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="wallet-address">
                {withdrawalMethod === "card" ? "Card Number" : "Wallet Address"}
              </Label>
              <Input
                id="wallet-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={
                  withdrawalMethod === "card"
                    ? "XXXX XXXX XXXX XXXX"
                    : "Enter your wallet address"
                }
              />
            </div>

            {withdrawalMethod !== "card" && (
              <div className="rounded-lg border border-border/40 p-4 bg-secondary/10">
                <h4 className="text-sm font-medium mb-2">
                  Important Information
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                  <li>
                    Make sure the address is correct. Funds sent to the wrong
                    address cannot be recovered.
                  </li>
                  <li>
                    Minimum withdrawal: $
                    {withdrawalMethod === "btc" ? "20" : "30"}
                  </li>
                  <li>
                    Withdrawal fee:{" "}
                    {withdrawalMethod === "btc" ? "0.0005 BTC" : "0.005 ETH"}
                  </li>
                  <li>Processing time: 1-24 hours</li>
                </ul>
              </div>
            )}

            {withdrawalMethod === "card" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name-on-card">Name on Card</Label>
                  <Input id="name-on-card" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input id="expiry-date" placeholder="MM/YY" />
                </div>
              </div>
            )}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-neon-cyan to-neon-blue hover:shadow-neon-cyan transition-all duration-300"
                disabled={
                  isSubmitting ||
                  amount > maxWithdrawal ||
                  amount < 10 ||
                  !address
                }
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Request Withdrawal"
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
