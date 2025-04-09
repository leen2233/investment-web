import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Copy, Coins } from "lucide-react";
import { api } from "@/lib/axios";
import { QRCodeSVG } from "qrcode.react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function DepositForm({ onSubmit, isSubmitting = false }) {
  const [step, setStep] = useState("initial"); // initial, txid, complete
  const TRON_USDT_ADDRESS = "TYQysE7G4yb5x9LQZgQzSEuQGYKae47wX4";
  const [txid, setTxid] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [verifiedAmount, setVerifiedAmount] = useState(null);
  const [senderAddress, setSenderAddress] = useState(null);
  const [error, setError] = useState(null);

  const handleCopy = async (e) => {
    try {
      e.preventDefault();
      await navigator.clipboard.writeText(TRON_USDT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === "initial") {
      setStep("txid");
    } else if (step === "txid") {
      processPayment();
    } else if (step === "complete") {
      setStep("initial");
    }
  };

  const processPayment = async () => {
    if (!txid.trim()) return;

    setIsProcessing(true);

    try {
      const response = await api.post("users/deposit/verify", {
        txid: txid.trim(),
      });

      if (response.success) {
        setIsSuccess(true);
        setVerifiedAmount(response.amount);
        setSenderAddress(response.sender);

        if (onSubmit) {
          onSubmit(true, txid, response.amount, response.sender);
        }
      } else {
        throw new Error(response.message || "Verification failed");
      }
    } catch (error) {
      console.error("Deposit verification failed:", error);
      setIsSuccess(false);
      setVerifiedAmount(null);
      setSenderAddress(null);
      setError(
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
          "Failed to verify deposit",
      );

      if (onSubmit) {
        onSubmit(false, txid);
      }
    } finally {
      setIsProcessing(false);
      setStep("complete");
    }
  };

  const resetForm = () => {
    setStep("initial");
    setTxid("");
    setIsSuccess(false);
    setError(null);
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
          <CardTitle>Deposit USDT</CardTitle>
          <CardDescription>
            {step === "initial" && "Send USDT (TRC20) to the address below"}
            {step === "txid" &&
              "Enter your transaction ID to verify your payment"}
            {step === "complete" &&
              (isSuccess
                ? "Payment successful!"
                : "Payment verification failed")}
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
                <>
                  <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Deposit verified! Your funds will be credited shortly.
                    </AlertDescription>
                  </Alert>
                  <div className="flex flex-col items-center justify-center mt-4 py-6 rounded-lg bg-gradient-to-r from-neon-blue/5 to-neon-purple/5">
                    <Coins className="h-8 w-8 text-neon-blue mb-2" />
                    <div className="text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                      {verifiedAmount} USDT
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      from {senderAddress}
                    </div>
                  </div>
                </>
              ) : (
                <Alert className="bg-red-500/10 text-red-500 border-red-500/20">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    {error ||
                      "We couldn't verify your transaction. Please check the transaction ID and try again."}
                  </AlertDescription>
                </Alert>
              )}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === "initial" && (
              <div className="rounded-lg border border-border/40 p-4 bg-secondary/10">
                <h4 className="text-sm font-medium mb-2">
                  Tron USDT Deposit Address
                </h4>
                <div className="flex flex-col items-center space-y-4">
                  <QRCodeSVG
                    value={TRON_USDT_ADDRESS}
                    size={150}
                    level="H"
                    includeMargin={true}
                    className="bg-white p-2 rounded-lg"
                  />
                  <div className="w-full space-y-4">
                    <div className="flex items-center gap-2">
                      <Input
                        value={TRON_USDT_ADDRESS}
                        readOnly
                        className="font-mono text-sm bg-background/50"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleCopy}
                        className="shrink-0 hover:bg-neon-blue/10 hover:text-neon-blue transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy</span>
                      </Button>
                    </div>
                    <AnimatePresence>
                      {copied && (
                        <motion.p
                          className="text-sm text-neon-blue"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          Copied to clipboard!
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-muted-foreground">
                    • Send only USDT-TRC20 to this address
                  </p>
                  <p className="text-xs text-muted-foreground">
                    • Minimum deposit: 10 USDT
                  </p>
                  <p className="text-xs text-muted-foreground">
                    • Transaction usually confirms within 30-60 seconds
                  </p>
                  <p className="text-xs font-medium text-yellow-500">
                    • Always verify the address before sending!
                  </p>
                </div>
              </div>
            )}

            {step === "txid" && (
              <div className="space-y-4">
                <div className="rounded-lg border border-border/40 p-4 bg-secondary/10">
                  <h4 className="text-sm font-medium mb-2">
                    USDT-TRC20 Payment Verification
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please enter the Tron (TRC20) transaction ID of your USDT
                    payment.
                  </p>

                  <div className="space-y-2">
                    <Input
                      id="txid"
                      value={txid}
                      onChange={(e) => setTxid(e.target.value)}
                      placeholder="e.g. 0xd731...5a12"
                      className="font-mono"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground">
                      • Make sure to wait for at least 1 block confirmation
                    </p>
                    <p className="text-xs text-muted-foreground">
                      • You can check the transaction status on{" "}
                      <a
                        href={`https://tronscan.org/#/transaction/${txid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neon-blue hover:underline"
                      >
                        Tronscan
                      </a>
                    </p>
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
                      <span className="text-sm text-muted-foreground">
                        Payment Method:
                      </span>
                      <span className="font-medium">USDT-TRC20</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Transaction ID:
                      </span>
                      <span className="font-mono text-xs">
                        {txid.substring(0, 10)}...
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Status:
                      </span>
                      <span
                        className={`font-medium ${isSuccess ? "text-green-500" : "text-red-500"}`}
                      >
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
              disabled={
                isSubmitting ||
                isProcessing ||
                (step === "txid" && !txid.trim())
              }
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
