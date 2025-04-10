"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Wallet, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const menuItemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  }

  const logoVariants = {
    hover: {
      scale: 1.05,
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <motion.div className="flex items-center gap-2" whileHover="hover" variants={logoVariants}>
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue"></div>
            <span className="hidden text-xl font-bold sm:inline-block">
              Invest<span className="text-neon-blue">X</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink href="/">Dashboard</NavLink>
          <NavLink href="/investments">Investments</NavLink>
          <NavLink href="/game">P2E Game</NavLink>
          <NavLink href="/profile">Profile</NavLink>
        </div>

        {/* <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-neon-purple text-[10px] font-bold">
                3
              </span>
              <span className="sr-only">Notifications</span>
            </Button>
          </motion.div> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glassmorphism">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
            <Button className="gap-2 bg-gradient-to-r from-neon-purple to-neon-blue hover:shadow-neon transition-all duration-300">
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
          </motion.div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div className="md:hidden" initial="closed" animate="open" exit="closed" variants={menuVariants}>
            <div className="container py-4 space-y-4 border-t border-border/40">
              <motion.div variants={menuItemVariants}>
                <Link
                  href="/"
                  className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <Link
                  href="/investments"
                  className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  Investments
                </Link>
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <Link
                  href="/game"
                  className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  P2E Game
                </Link>
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <Link
                  href="/profile"
                  className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
              </motion.div>
              <motion.div variants={menuItemVariants}>
                <Button className="w-full gap-2 bg-gradient-to-r from-neon-purple to-neon-blue">
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group relative">
      <span className="text-sm font-medium transition-colors hover:text-primary">{children}</span>
      <motion.span
        className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-neon-purple to-neon-blue"
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  )
}

