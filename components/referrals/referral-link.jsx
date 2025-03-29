"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Share2, Facebook, Twitter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"

export function ReferralLink() {
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)

  const referralLink = `https://cryptox.com/register?ref=${user?.referralCode || "abc123"}`

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
  }

  const socialButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="glassmorphism overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle>Your Referral Link</CardTitle>
          <CardDescription>Share this link with friends to earn rewards when they join</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input value={referralLink} readOnly className="font-mono text-sm bg-background/50" />
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

            <div className="rounded-lg border border-border/40 bg-secondary/20 p-4">
              <h4 className="mb-2 text-sm font-medium">How it works</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>1. Share your unique referral link with friends</li>
                <li>2. When they register using your link, they become your referral</li>
                <li>3. Earn 5% of their deposits as commission</li>
                <li>4. Reach milestones to unlock special rewards</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Share via</h4>
              <div className="flex gap-2">
                <motion.div variants={socialButtonVariants} initial="initial" whileHover="hover" whileTap="tap">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-blue-600/10 text-blue-500 border-blue-500/30 hover:bg-blue-600/20 hover:text-blue-400"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                </motion.div>

                <motion.div variants={socialButtonVariants} initial="initial" whileHover="hover" whileTap="tap">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-sky-500/10 text-sky-500 border-sky-500/30 hover:bg-sky-500/20 hover:text-sky-400"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                </motion.div>

                <motion.div
                  variants={socialButtonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full gap-2 border-neon-purple/50 hover:border-neon-purple hover:bg-neon-purple/10 transition-all duration-300"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>More Options</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

