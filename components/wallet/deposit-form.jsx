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
import { useAuth } from "../../contexts/auth-context";
import { useTranslation } from "react-i18next";

export function DepositForm({ onSubmit, isSubmitting = false }) {
  const [step, setStep] = useState("initial"); // initial, txid, complete
  const TRON_USDT_ADDRESS = import.meta.env.VITE_TRON_USDT_ADDRESS;
  const [txid, setTxid] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [verifiedAmount, setVerifiedAmount] = useState(null);
  const [senderAddress, setSenderAddress] = useState(null);
  const [error, setError] = useState(null);
  const { checkAuth } = useAuth();
  const { t } = useTranslation();

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

        await checkAuth();

        if (onSubmit) {
          onSubmit(true, txid, response.amount, response.sender);
        }
      } else {
        throw new Error(response.message || t("deposit.verificationFailed"));
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
          t("deposit.verificationFailed")
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
          <CardTitle>{t("deposit.title")}</CardTitle>
          <CardDescription>
            {step === "initial" && t("deposit.instructions")}
            {step === "txid" && t("deposit.enterTxId")}
            {step === "complete" &&
              (isSuccess ? t("deposit.success") : t("deposit.failed"))}
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
                      {t("deposit.verificationSuccessful")}
                    </AlertDescription>
                  </Alert>
                  <div className="flex flex-col items-center justify-center mt-4 py-6 rounded-lg bg-gradient-to-r from-neon-blue/5 to-neon-purple/5">
                    <Coins className="h-8 w-8 text-neon-blue mb-2" />
                    <div className="text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                      {verifiedAmount} USDT
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      {t("deposit.fromAddress", { address: senderAddress })}
                    </div>
                  </div>
                </>
              ) : (
                <Alert className="bg-red-500/10 text-red-500 border-red-500/20">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    {error || t("deposit.verificationFailed")}
                  </AlertDescription>
                </Alert>
              )}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === "initial" && (
              <div className="rounded-lg border border-border/40 p-4 bg-secondary/10">
                <h4 className="text-sm font-medium mb-2">
                  {t("deposit.addressTitle")}
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
                        <span className="sr-only">{t("common.copy")}</span>
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
                          {t("common.copied")}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-muted-foreground">
                    {t("deposit.warning1")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("deposit.warning2")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("deposit.warning3")}
                  </p>
                  <p className="text-xs font-medium text-yellow-500">
                    {t("deposit.warning4")}
                  </p>
                </div>
              </div>
            )}

            {step === "txid" && (
              <div className="space-y-4">
                <div className="rounded-lg border border-border/40 p-4 bg-secondary/10">
                  <h4 className="text-sm font-medium mb-2">
                    {t("deposit.verificationTitle")}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("deposit.verificationInstructions")}
                  </p>

                  <div className="space-y-2">
                    <Input
                      id="txid"
                      value={txid}
                      onChange={(e) => setTxid(e.target.value)}
                      placeholder={t("deposit.txIdPlaceholder")}
                      className="font-mono"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground">
                      {t("deposit.tip1")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("deposit.tip2")}{" "}
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
                    {t("deposit.transactionDetails")}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        {t("deposit.paymentMethod")}:
                      </span>
                      <span className="font-medium">USDT-TRC20</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        {t("deposit.transactionId")}:
                      </span>
                      <span className="font-mono text-xs">
                        {txid.substring(0, 10)}...
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        {t("common.status")}:
                      </span>
                      <span
                        className={`font-medium ${
                          isSuccess ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {isSuccess ? t("common.success") : t("common.failed")}
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
                  <span>{t("common.verifying")}</span>
                </div>
              ) : step === "initial" ? (
                t("deposit.iPaid")
              ) : step === "txid" ? (
                t("deposit.verifyPayment")
              ) : (
                t("deposit.newDeposit")
              )}
            </RippleButton>

            {step === "txid" && (
              <button
                type="button"
                onClick={() => setStep("initial")}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
              >
                {t("common.goBack")}
              </button>
            )}

            {step === "complete" && !isSuccess && (
              <button
                type="button"
                onClick={() => setStep("txid")}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
              >
                {t("common.tryAgain")}
              </button>
            )}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
