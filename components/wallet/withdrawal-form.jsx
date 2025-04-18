import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, CheckCircle, XCircle, Coins } from "lucide-react";
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
import { useAuth } from "@/contexts/auth-context";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslation } from "react-i18next";

export function WithdrawalForm() {
  const { user } = useAuth();
  const [amount, setAmount] = useState(50);
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [withdrawalStatus, setWithdrawalStatus] = useState(null); // null, 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();

  const maxWithdrawal = Math.floor((user?.balance || 0) * 0.95);
  const MIN_WITHDRAWAL = 10;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (amount > maxWithdrawal || amount < MIN_WITHDRAWAL || !address) {
      return;
    }

    setIsSubmitting(true);
    setWithdrawalStatus(null);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate random success/failure (80% success rate)
      if (Math.random() > 0.2) {
        setWithdrawalStatus("success");
      } else {
        throw new Error(t("withdrawal.requestFailed"));
      }
    } catch (error) {
      setWithdrawalStatus("error");
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
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
          <CardTitle>{t("withdrawal.title")}</CardTitle>
          <CardDescription>{t("withdrawal.description")}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {withdrawalStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              {withdrawalStatus === "success" ? (
                <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    {t("withdrawal.successMessage")}
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="bg-red-500/10 text-red-500 border-red-500/20">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    {errorMessage || t("withdrawal.errorMessage")}
                  </AlertDescription>
                </Alert>
              )}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="withdrawal-amount">
                  {t("withdrawal.amount")}
                </Label>
                <span className="text-xs text-muted-foreground">
                  {t("withdrawal.available")}: ${maxWithdrawal}
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
                  min={MIN_WITHDRAWAL}
                  max={maxWithdrawal}
                />
              </div>
              {amount > maxWithdrawal && (
                <p className="text-xs text-red-500">
                  {t("withdrawal.exceedsBalance")}
                </p>
              )}
              {amount < MIN_WITHDRAWAL && (
                <p className="text-xs text-red-500">
                  {t("withdrawal.minimumAmount", { amount: MIN_WITHDRAWAL })}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="wallet-address">
                {t("withdrawal.walletAddress")}
              </Label>
              <div className="relative">
                <Coins className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="wallet-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t("withdrawal.addressPlaceholder")}
                  className="pl-10 font-mono text-sm"
                />
              </div>
            </div>

            <div className="rounded-lg border border-border/40 p-4 bg-secondary/10">
              <h4 className="text-sm font-medium mb-2">
                {t("withdrawal.importantInfo")}
              </h4>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                <li>{t("withdrawal.addressWarning")}</li>
                <li>
                  {t("withdrawal.minimumNote", { amount: MIN_WITHDRAWAL })}
                </li>
                <li>{t("withdrawal.feeNote")}</li>
                <li>{t("withdrawal.processingTime")}</li>
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon-blue transition-all duration-300"
              disabled={
                isSubmitting ||
                amount > maxWithdrawal ||
                amount < MIN_WITHDRAWAL ||
                !address
              }
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  <span>{t("common.processing")}</span>
                </div>
              ) : (
                t("withdrawal.requestButton")
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
