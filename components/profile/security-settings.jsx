import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Shield, Smartphone } from "lucide-react";
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
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter your current password"
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
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
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
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
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
                Password must be at least 8 characters long and include a mix of
                letters, numbers, and symbols.
              </p>
            </div>

            <Button
              type="submit"
              className="bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon transition-all duration-300"
            >
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* <Card className="glassmorphism overflow-hidden">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-neon-purple" />
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Require a verification code when logging in
                </p>
              </div>
              <Switch
                id="two-factor"
                checked={twoFactorEnabled}
                onCheckedChange={(checked) => {
                  setTwoFactorEnabled(checked);
                  console.log(
                    "Two-factor authentication:",
                    checked ? "enabled" : "disabled"
                  );
                }}
              />
            </div>

            {twoFactorEnabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-neon-purple/10 p-3">
                    <Smartphone className="h-6 w-6 text-neon-purple" />
                  </div>
                  <div>
                    <h4 className="font-medium">Authenticator App</h4>
                    <p className="text-sm text-muted-foreground">
                      Use an authenticator app like Google Authenticator or
                      Authy
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        // In a real app, this would open a 2FA setup flow
                        alert(
                          "This would start the 2FA setup process in a real application."
                        );
                      }}
                    >
                      Set Up
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card> */}

      <Card className="glassmorphism overflow-hidden">
        <CardHeader>
          <CardTitle>Login Sessions</CardTitle>
          <CardDescription>Manage your active sessions</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Current Session</h4>
                  <p className="text-sm text-muted-foreground">
                    Chrome on Windows • IP: 192.168.1.1
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Started: Today at 10:30 AM
                  </p>
                </div>
                <div className="rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                  Active
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
              Log Out of All Other Sessions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
