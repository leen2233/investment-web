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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RippleButton } from "@/components/ui/ripple-button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function DepositForm({
  onSubmit,
  isSubmitting = false,
  isSuccess = false,
}) {
  const [amount, setAmount] = useState(100);
  const [paymentMethod, setPaymentMethod] = useState("btc");

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
      },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="glassmorphism overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle>Deposit Funds</CardTitle>
          <CardDescription>
            Add funds to your account using your preferred payment method
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
                  Your deposit request has been submitted successfully! It will
                  be processed shortly.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deposit-amount">Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="deposit-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="pl-10"
                  min={10}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="grid grid-cols-1 gap-2 sm:grid-cols-3"
              >
                <Label
                  htmlFor="btc"
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-md border p-3 ${
                    paymentMethod === "btc"
                      ? "border-neon-blue bg-neon-blue/10"
                      : "border-border"
                  }`}
                >
                  <RadioGroupItem value="btc" id="btc" className="sr-only" />
                  <Bitcoin className="h-4 w-4" />
                  <span>Bitcoin</span>
                </Label>
                <Label
                  htmlFor="eth"
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-md border p-3 ${
                    paymentMethod === "eth"
                      ? "border-neon-blue bg-neon-blue/10"
                      : "border-border"
                  }`}
                >
                  <RadioGroupItem value="eth" id="eth" className="sr-only" />
                  <Ethereum className="h-4 w-4" />
                  <span>Ethereum</span>
                </Label>
                <Label
                  htmlFor="card"
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-md border p-3 ${
                    paymentMethod === "card"
                      ? "border-neon-blue bg-neon-blue/10"
                      : "border-border"
                  }`}
                >
                  <RadioGroupItem value="card" id="card" className="sr-only" />
                  <CreditCard className="h-4 w-4" />
                  <span>Card</span>
                </Label>
              </RadioGroup>
            </div>

            {paymentMethod === "btc" && (
              <div className="rounded-lg border border-border/40 p-4 bg-secondary/10">
                <h4 className="text-sm font-medium mb-2">
                  Bitcoin Deposit Address
                </h4>
                <div className="bg-background/50 p-3 rounded-md font-mono text-xs break-all">
                  bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Send only BTC to this address. Minimum deposit: 0.001 BTC.
                </p>
              </div>
            )}

            {paymentMethod === "eth" && (
              <div className="rounded-lg border border-border/40 p-4 bg-secondary/10">
                <h4 className="text-sm font-medium mb-2">
                  Ethereum Deposit Address
                </h4>
                <div className="bg-background/50 p-3 rounded-md font-mono text-xs break-all">
                  0x742d35Cc6634C0532925a3b844Bc454e4438f44e
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Send only ETH to this address. Minimum deposit: 0.01 ETH.
                </p>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </div>
            )}

            <RippleButton
              className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon-blue transition-all duration-300"
              onClick={() => {}}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                "Deposit Now"
              )}
            </RippleButton>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
