"use client";

import { useState } from "react";
import { Bell, Moon, Sun, Globe, Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function ProfileSettings({ onNavigateToSecurity }) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    theme: "dark",
    language: "en",
  });

  const handleToggleChange = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    // In a real app, you would save the settings to the server
    console.log("Saving settings:", settings);

    // Show a success message
    alert("Settings saved successfully!");
  };

  return (
    <div className="grid gap-6">
      <Card className="glassmorphism overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Manage how you receive notifications
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => {
              if (onNavigateToSecurity) {
                onNavigateToSecurity();
              } else {
                // If we're on the profile page with tabs, this will be handled by the parent
                const securityTab =
                  document.querySelector('[value="security"]');
                if (securityTab) securityTab.click();
              }
            }}
          >
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about account activity via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={() => handleToggleChange("emailNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications on your device
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={settings.pushNotifications}
                onCheckedChange={() => handleToggleChange("pushNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about new features and promotions
                </p>
              </div>
              <Switch
                id="marketing-emails"
                checked={settings.marketingEmails}
                onCheckedChange={() => handleToggleChange("marketingEmails")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glassmorphism overflow-hidden">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how the application looks</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={settings.theme}
                onValueChange={(value) => handleSelectChange("theme", value)}
              >
                <SelectTrigger id="theme" className="w-full">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      <span>Light</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      <span>Dark</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <span>System</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={settings.language}
                onValueChange={(value) => handleSelectChange("language", value)}
              >
                <SelectTrigger id="language" className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>English</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="es">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>Spanish</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="fr">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>French</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={saveSettings}
          className="bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon transition-all duration-300"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
