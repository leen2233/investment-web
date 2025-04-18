"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { WithdrawalForm } from "@/components/wallet/withdrawal-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function WithdrawPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset success state after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/wallet">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <DashboardHeader
          title={t("withdrawal.header")}
          description={t("withdrawal.header-description")}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <WithdrawalForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isSuccess={isSuccess}
        />
      </motion.div>
    </div>
  );
}
