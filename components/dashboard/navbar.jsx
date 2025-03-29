import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Replace next/link and next/navigation
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu, X, LogOut, User, Settings } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NotificationDropdown } from "@/components/notifications/notification-dropdown";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation(); // Replace usePathname
  const pathname = location.pathname; // Extract pathname from location

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple"></div>
            <span className="text-xl font-bold">
              Crypto<span className="text-neon-blue">X</span>
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <NavLink to="/" isActive={pathname === "/"}>
            Dashboard
          </NavLink>
          <NavLink to="/investments" isActive={pathname === "/investments"}>
            Investments
          </NavLink>
          <NavLink to="/game" isActive={pathname === "/game"}>
            P2E Game
          </NavLink>
          <NavLink to="/wallet" isActive={pathname === "/wallet"}>
            Wallet
          </NavLink>
          <NavLink to="/referrals" isActive={pathname === "/referrals"}>
            Referrals
          </NavLink>
          <NavLink to="/profile" isActive={pathname === "/profile"}>
            Profile
          </NavLink>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={(e) => {
                e.stopPropagation();
                toggleNotifications();
              }}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-neon-purple text-[10px]">
                3
              </span>
            </Button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  className="absolute right-0 mt-2 z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <NotificationDropdown
                    onClose={() => setShowNotifications(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-neon-blue/20 text-neon-blue">
                    {user?.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-border/40 md:hidden"
          >
            <div className="container mx-auto space-y-1 p-4">
              <MobileNavLink
                to="/"
                isActive={pathname === "/"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </MobileNavLink>
              <MobileNavLink
                to="/investments"
                isActive={pathname === "/investments"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Investments
              </MobileNavLink>
              <MobileNavLink
                to="/game"
                isActive={pathname === "/game"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                P2E Game
              </MobileNavLink>
              <MobileNavLink
                to="/wallet"
                isActive={pathname === "/wallet"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Wallet
              </MobileNavLink>
              <MobileNavLink
                to="/referrals"
                isActive={pathname === "/referrals"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Referrals
              </MobileNavLink>
              <MobileNavLink
                to="/profile"
                isActive={pathname === "/profile"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({ to, isActive, children }) {
  return (
    <Link to={to} className="relative">
      <span
        className={`text-sm font-medium transition-colors ${
          isActive
            ? "text-neon-blue"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {children}
      </span>
      {isActive && (
        <motion.span
          layoutId="navbar-indicator"
          className="absolute -bottom-[21px] left-0 h-[2px] w-full bg-neon-blue"
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
}

function MobileNavLink({ to, isActive, onClick, children }) {
  return (
    <Link
      to={to}
      className={`flex w-full items-center rounded-md p-2 text-sm font-medium ${
        isActive
          ? "bg-neon-blue/10 text-neon-blue"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
