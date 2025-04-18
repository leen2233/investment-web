import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Replace next/link and next/navigation
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu, X, LogOut, User, Settings, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationDropdown } from "@/components/notifications/notification-dropdown";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation(); // Replace usePathname
  const pathname = location.pathname; // Extract pathname from location
  const { t, i18n } = useTranslation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
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
              Berk<span className="text-neon-blue">Mind</span>
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <NavLink to="/" isActive={pathname === "/"}>
            {t("nav.dashboard")}
          </NavLink>
          <NavLink to="/investments" isActive={pathname === "/investments"}>
            {t("nav.investments")}
          </NavLink>
          <NavLink to="/game" isActive={pathname === "/game"}>
            {t("nav.game")}
          </NavLink>
          <NavLink to="/wallet" isActive={pathname === "/wallet"}>
            {t("nav.wallet")}
          </NavLink>
          <NavLink to="/referrals" isActive={pathname === "/referrals"}>
            {t("nav.referrals")}
          </NavLink>
          <NavLink to="/profile" isActive={pathname === "/profile"}>
            {t("nav.profile")}
          </NavLink>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => changeLanguage("en")}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("ru")}>
                Русский
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="h-8 w-8">
                  {console.log(user)}
                  <AvatarImage src={user?.avatar} alt={user?.username} />
                  <AvatarFallback className="bg-neon-blue/20 text-neon-blue">
                    {user?.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t("profile.myAccount")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>{t("nav.profile")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t("nav.settings")}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t("nav.logout")}</span>
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
                {t("nav.dashboard")}
              </MobileNavLink>
              <MobileNavLink
                to="/investments"
                isActive={pathname === "/investments"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.investments")}
              </MobileNavLink>
              <MobileNavLink
                to="/game"
                isActive={pathname === "/game"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.game")}
              </MobileNavLink>
              <MobileNavLink
                to="/wallet"
                isActive={pathname === "/wallet"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.wallet")}
              </MobileNavLink>
              <MobileNavLink
                to="/referrals"
                isActive={pathname === "/referrals"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.referrals")}
              </MobileNavLink>
              <MobileNavLink
                to="/profile"
                isActive={pathname === "/profile"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.profile")}
              </MobileNavLink>
              <div className="border-t border-border/40 pt-2 mt-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => changeLanguage("en")}
                >
                  English
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => changeLanguage("ru")}
                >
                  Русский
                </Button>
              </div>
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
