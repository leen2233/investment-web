"use client"

import Link from "next/link"
import { Home, LineChart, Gamepad2, User, Settings } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotificationDropdown } from "@/components/notifications/notification-dropdown"

export function MobileNav() {
  const [showNotifications, setShowNotifications] = useState(false)

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Menu</h2>
        <div className="space-y-1">
          <Link href="/" className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium bg-accent">
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/investments"
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            <LineChart className="h-4 w-4" />
            <span>Investments</span>
          </Link>
          <Link
            href="/game"
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            <Gamepad2 className="h-4 w-4" />
            <span>P2E Game</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
          <Link
            href="/profile/settings"
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
          <div className="px-4 py-2">
            <div className="flex items-center justify-between">
              <h2 className="px-4 text-lg font-semibold tracking-tight">Notifications</h2>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleNotifications()
                }}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-neon-purple text-[10px]">
                  3
                </span>
              </Button>
            </div>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  className="mt-2 z-50"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <NotificationDropdown onClose={() => setShowNotifications(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

