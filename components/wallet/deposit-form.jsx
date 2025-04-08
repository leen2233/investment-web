import { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  CreditCard,
  Bitcoin,
  EclipseIcon as Ethereum,
  CheckCircle,
  XCircle,
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
}) {
  const [amount, setAmount] = useState(100);
  const [paymentMethod, setPaymentMethod] = useState("btc");
  const [step, setStep] = useState("initial"); // initial, txid, complete
  const [txid, setTxid] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === "initial") {
      setStep("txid");
    } else if (step === "txid") {
      processPayment();
    }
  };

  const processPayment = () => {
    if (!txid.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate API call with timeout and random success/failure
    setTimeout(() => {
      // Random success (70%) or failure (30%)
      const success = Math.random() > 0.3;
      setIsSuccess(success);
      setIsProcessing(false);
      setStep("complete");
      
      if (onSubmit) {
        onSubmit(success, txid);
      }
    }, 1500);
  };

  const resetForm = () => {
    setStep("initial");
    setTxid("");
    setIsSuccess(false);
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
            {step === "initial" && "Add funds to your account using your preferred payment method"}
            {step === "txid" && "Enter your transaction ID to verify your payment"}
            {step === "complete" && (isSuccess ? "Payment successful!" : "Payment verification failed")}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {step === "complete" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              {isSuccess ? (
                <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your deposit request has been verified successfully! Your account will be credited shortly.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="bg-red-500/10 text-red-500 border-red-500/20">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    We couldn't verify your transaction. Please check the transaction ID and try again.
                  </AlertDescription>
                </Alert>
              )}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === "initial" && (
              <>
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
              </>
            )}

            {step === "txid" && (
              <div className="space-y-4">
                <div className="rounded-lg border border-border/40 p-4 bg-secondary/10">
                  <h4 className="text-sm font-medium mb-2">
                    {paymentMethod === "btc" ? "Bitcoin" : paymentMethod === "eth" ? "Ethereum" : "Card"} Payment Verification
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {paymentMethod === "card" 
                      ? "Your card payment is being processed. Please enter the reference ID from your bank statement." 
                      : `Please enter the transaction ID (txid) of your ${paymentMethod === "btc" ? "Bitcoin" : "Ethereum"} payment.`}
                  </p>
                  
                  <div className="space-y-2">
                    <Label htmlFor="txid">Transaction ID</Label>
                    <Input 
                      id="txid" 
                      value={txid}
                      onChange={(e) => setTxid(e.target.value)}
                      placeholder={paymentMethod === "btc" 
                        ? "e.g. 3a1b2c..." 
                        : paymentMethod === "eth" 
                          ? "e.g. 0x71c..." 
                          : "e.g. REF123456789"
                      }
                      className="font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === "complete" && (
              <div className="space-y-4">
                <div className="rounded-lg border border-border/40 p-4 bg-secondary/10">
                  <h4 className="text-sm font-medium mb-2">
                    Transaction Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Amount:</span>
                      <span className="font-medium">${amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Payment Method:</span>
                      <span className="font-medium">
                        {paymentMethod === "btc" ? "Bitcoin" : paymentMethod === "eth" ? "Ethereum" : "Card"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Transaction ID:</span>
                      <span className="font-mono text-xs">{txid.substring(0, 10)}...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <span className={`font-medium ${isSuccess ? "text-green-500" : "text-red-500"}`}>
                        {isSuccess ? "Success" : "Failed"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <RippleButton
              className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon-blue transition-all duration-300"
              type="submit"
              disabled={isSubmitting || isProcessing || (step === "txid" && !txid.trim())}
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  <span>Verifying...</span>
                </div>
              ) : step === "initial" ? (
                "I Paid"
              ) : step === "txid" ? (
                "Verify Payment"
              ) : (
                "New Deposit"
              )}
            </RippleButton>

            {step === "txid" && (
              <button
                type="button"
                onClick={() => setStep("initial")}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
              >
                Go Back
              </button>
            )}

            {step === "complete" && !isSuccess && (
              <button
                type="button"
                onClick={() => setStep("txid")}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
              >
                Try Again
              </button>
            )}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}