"use client"

import type React from "react"

import { useState } from "react"
import { User, Mail, Calendar, Upload, Settings } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileInfoProps {
  onNavigateToSettings?: () => void
}

export function ProfileInfo({ onNavigateToSettings }: ProfileInfoProps) {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: "user@example.com", // Placeholder
    joinDate: "March 2025", // Placeholder
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the changes to the server
    // For now, we'll just simulate a successful update
    console.log("Saving profile changes:", formData)

    // Show a success message or update UI as needed
    // For demo purposes, we'll just toggle editing mode off
    setIsEditing(false)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="glassmorphism overflow-hidden md:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => {
              if (onNavigateToSettings) {
                onNavigateToSettings()
              } else {
                // If we're on the profile page with tabs, this will be handled by the parent
                const settingsTab = document.querySelector('[value="settings"]') as HTMLElement
                if (settingsTab) settingsTab.click()
              }
            }}
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="pl-10"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="joinDate">Member Since</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="joinDate" name="joinDate" value={formData.joinDate} className="pl-10" disabled />
                </div>
              </div>
            </div>

            {isEditing ? (
              <div className="mt-6 flex gap-2">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon transition-all duration-300"
                >
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    // Reset form data to original values
                    setFormData({
                      username: user?.username || "",
                      email: "user@example.com",
                      joinDate: "March 2025",
                    })
                    setIsEditing(false)
                  }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                className="mt-6 bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon transition-all duration-300"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      <Card className="glassmorphism overflow-hidden md:col-span-1">
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Upload a profile picture</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Avatar className="h-32 w-32 mb-6">
            <AvatarImage src="/placeholder.svg" alt={user?.username} />
            <AvatarFallback className="text-2xl bg-neon-blue/20 text-neon-blue">
              {user?.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="w-full">
            <Label htmlFor="picture" className="mb-2 block">
              Upload new picture
            </Label>
            <div className="flex gap-2">
              <Input id="picture" type="file" className="flex-1" />
              <Button variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Supported formats: JPEG, PNG, GIF. Max size: 5MB.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="glassmorphism overflow-hidden md:col-span-2">
        <CardHeader>
          <CardTitle>Referral Information</CardTitle>
          <CardDescription>Your referral details and statistics</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label className="mb-2 block">Your Referral Code</Label>
              <div className="flex items-center gap-2">
                <Input value={user?.referralCode || "abc123"} readOnly className="font-mono" />
                <Button variant="outline" size="sm">
                  Copy
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Share this code with friends to earn rewards when they join.
              </p>
            </div>

            <div>
              <Label className="mb-2 block">Referral Statistics</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-2xl font-bold text-neon-blue">12</p>
                  <p className="text-sm text-muted-foreground">Total Referrals</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-2xl font-bold text-neon-purple">$350</p>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

