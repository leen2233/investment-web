import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Shield, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SecuritySettings() {
  const { t } = useTranslation();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    // In a real app, you would validate and update the password on the server
    console.log("Password change submitted:", passwordForm);

    // Show success message
    alert("Password changed successfully!");

    // Reset form
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="grid gap-6">
      <Card className="glassmorphism overflow-hidden">
        <CardHeader>
          <CardTitle>{t("settings.security.passwordTitle")}</CardTitle>
          <CardDescription>
            {t("settings.security.passwordDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">
                {t("settings.security.currentPassword")}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder={t("settings.security.currentPassword")}
                  className="pl-10 pr-10"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-muted-foreground"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">
                {t("settings.security.newPassword")}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder={t("settings.security.newPassword")}
                  className="pl-10 pr-10"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-muted-foreground"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {t("settings.security.confirmPassword")}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("settings.security.confirmPassword")}
                  className="pl-10 pr-10"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-muted-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                {t("settings.security.passwordRequirements")}
              </p>
            </div>

            <Button
              type="submit"
              className="bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon transition-all duration-300"
            >
              {t("settings.security.updatePassword")}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="glassmorphism overflow-hidden">
        <CardHeader>
          <CardTitle>{t("settings.security.sessions")}</CardTitle>
          <CardDescription>
            {t("settings.security.sessionsDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">
                    {t("settings.security.currentSession")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.security.browserInfo", {
                      browser: "Chrome",
                      os: "Windows",
                    })}{" "}
                    • {t("settings.security.ipAddress", { ip: "192.168.1.1" })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("settings.security.startedAt", {
                      time: "Today at 10:30 AM",
                    })}
                  </p>
                </div>
                <div className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                  {t("settings.security.activeNow")}
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                // In a real app, this would log out all other sessions
                alert("All other sessions have been logged out.");
              }}
            >
              {t("settings.security.logoutOthers")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
