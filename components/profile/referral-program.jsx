"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Share2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CountUp } from "@/components/ui/count-up";
import { useAuth } from "@/contexts/auth-context";
import { api } from "@/lib/axios";

export function ReferralProgram() {
  const [copied, setCopied] = useState(false);
  const [referral, setReferral] = useState({ referral_count: 0, earnings: 0 });

  React.useEffect(() => {
    const fetchReferrals = async () => {
      const response = await api.get("/users/referrals");
      setReferral(response);
    };

    fetchReferrals();
  }, []);

  React.useEffect(() => {
    console.log(referral);
  }, [referral]);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      "https://investx.com/register?ref=" + referral.referral_code
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const copyVariants = {
    initial: { scale: 1 },
    copied: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="glassmorphism overflow-hidden h-full">
        <div className="absolute inset-0 bg-glow-blue opacity-10" />
        <CardHeader className="pb-3">
          <CardTitle>Referral Program</CardTitle>
          <CardDescription>
            Invite friends and earn 5% of their deposits
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm">Total Referrals</span>
            <span className="font-medium">
              <CountUp end={referral.referral_count} duration={1.5} /> users
            </span>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm">Earnings</span>
            <span className="font-medium text-neon-blue">
              $<CountUp end={referral.earnings} duration={2} />
            </span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="referral-link">Your Referral Code</Label>
            <div className="flex items-center gap-2">
              <Input
                id="referral-link"
                value={referral?.referral_code}
                readOnly
                className="font-mono text-xs bg-background/50"
              />
              <motion.div
                variants={copyVariants}
                initial="initial"
                animate={copied ? "copied" : "initial"}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 hover:bg-neon-blue/10 hover:text-neon-blue transition-colors"
                  onClick={handleCopy}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy</span>
                </Button>
              </motion.div>
            </div>
            {copied && (
              <motion.p
                className="text-xs text-neon-blue"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Copied to clipboard!
              </motion.p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <motion.div
            className="w-full"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              variant="outline"
              className="w-full gap-2 border-neon-blue/50 hover:border-neon-blue hover:bg-neon-blue/10 transition-all duration-300"
            >
              <Share2 className="h-4 w-4" />
              Share Referral Link
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
