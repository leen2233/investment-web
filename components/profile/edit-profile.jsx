import { useState, useRef, useEffect } from "react";
import { User, Upload, CheckCircle, X, AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/auth-context";
import { api } from "@/lib/axios";

export function EditProfile({
  onSave,
  initialUsername = "User123",
  initialAvatar = null,
}) {
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState(initialUsername);
  const [avatar, setAvatar] = useState(initialAvatar);
  const [previewAvatar, setPreviewAvatar] = useState(initialAvatar);
  const [isDragging, setIsDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setAvatar(user.avatar);
      setPreviewAvatar(user.avatar);
    }
  }, [user]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
      setAvatar(file);
    }
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
      setAvatar(file);
    }
  };

  // Save profile changes
  const saveProfile = async () => {
    try {
      setSaving(true);
      setError(null);

      // Create a FormData object to handle the file upload
      const formData = new FormData();
      formData.append("username", username);

      if (avatar instanceof File) {
        formData.append("avatar", avatar);
      } else if (avatar === null && previewAvatar === null) {
        // Handle avatar removal if needed
        formData.append("avatar", "");
      }

      // Send PATCH request to /users/me endpoint using the API client
      // Configure axios to use FormData and the correct content type
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const data = await api.patch("/users/me/", formData, config);

      // Success - update UI
      setSuccess(true);

      setUser((prev) => ({ ...prev, username: data.username, avatar: data.avatar }));
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      // If onSave callback is provided, call it with the updated data
      if (onSave) {
        onSave(data);
      }
    } catch (err) {
      // Handle API errors
      if (err.response?.data) {
        const errorData = err.response.data;
        if (errorData.username) {
          // Django specific error format
          setError(errorData.username[0]);
        } else if (errorData.avatar) {
          setError(errorData.avatar[0]);
        } else if (errorData.detail) {
          setError(errorData.detail);
        } else if (typeof errorData === "string") {
          setError(errorData);
        } else {
          setError("An error occurred while updating your profile");
        }
      } else {
        setError(err.message || "Failed to connect to the server");
      }
    } finally {
      setSaving(false);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Remove avatar
  const removeAvatar = () => {
    setPreviewAvatar(null);
    setAvatar(null);
  };

  return (
    <Card className="glassmorphism overflow-hidden">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>
          Update your username and profile picture
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {success && (
          <Alert className="mb-6 bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>Profile updated successfully!</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-6 bg-red-500/10 text-red-500 border-red-500/20">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {/* Avatar Upload */}
          <div className="space-y-2">
            <Label>Profile Picture</Label>
            <div
              className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-all ${
                isDragging
                  ? "border-neon-blue bg-neon-blue/5"
                  : "border-border hover:border-neon-blue/50 hover:bg-secondary/10"
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {previewAvatar ? (
                <div className="relative">
                  <img
                    src={previewAvatar}
                    alt="Profile Preview"
                    className="h-24 w-24 rounded-full object-cover border border-border"
                  />
                  <button
                    type="button"
                    onClick={removeAvatar}
                    className="absolute -top-2 -right-2 rounded-full bg-background p-1 shadow-md hover:bg-secondary"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
                  <User className="h-12 w-12 text-muted-foreground" />
                </div>
              )}

              <div className="mt-4 flex flex-col items-center justify-center text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={triggerFileInput}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload Image</span>
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  PNG, JPG or GIF (max. 2MB)
                </p>
                <p className="text-xs text-muted-foreground">
                  You can also drag and drop an image here
                </p>
              </div>
            </div>
          </div>

          {/* Username Input */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
                placeholder="Enter your username"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Your username will be visible to other users
            </p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={saveProfile}
              disabled={saving || username.trim() === ""}
              className="bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon-blue transition-all duration-300"
            >
              {saving ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
