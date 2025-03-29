"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Check, AlertCircle, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function NotificationDropdown({ onClose }) {
  const dropdownRef = useRef < HTMLDivElement > null;
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "success",
      title: "Deposit Successful",
      message: "Your deposit of $1,000 has been processed successfully.",
      time: "Just now",
      read: false,
    },
    {
      id: "2",
      type: "info",
      title: "New Referral",
      message: "Sarah Miller joined using your referral link.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "3",
      type: "warning",
      title: "Withdrawal Pending",
      message: "Your withdrawal request of $750 is pending approval.",
      time: "Yesterday",
      read: false,
    },
  ]);

  // Handle clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose?.();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const removeNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <Check className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "info":
        return type === "info" &&
          notifications[1].title.includes("Referral") ? (
          <Users className="h-4 w-4 text-neon-blue" />
        ) : (
          <DollarSign className="h-4 w-4 text-neon-purple" />
        );
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <Card className="glassmorphism w-80 p-0 shadow-lg z-50" ref={dropdownRef}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neon-purple text-xs text-white">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        )}
      </div>
      <Separator />
      <div className="max-h-[300px] overflow-y-auto">
        <AnimatePresence initial={false}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className={`relative p-4 ${
                  notification.read ? "" : "bg-secondary/30"
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex gap-3">
                  <div
                    className={`rounded-full p-2 ${
                      notification.read ? "bg-muted" : "bg-neon-blue/10"
                    }`}
                  >
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="text-sm font-medium">
                        {notification.title}
                      </h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 -mr-2 -mt-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Dismiss</span>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                </div>
                {!notification.read && (
                  <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-neon-purple"></div>
                )}
                {notification.id !==
                  notifications[notifications.length - 1].id && (
                  <Separator className="mt-4" />
                )}
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="rounded-full bg-muted p-3">
                <Bell className="h-6 w-6 text-muted-foreground" />
              </div>
              <h4 className="mt-4 text-sm font-medium">No notifications</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                You're all caught up!
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
      {notifications.length > 0 && (
        <>
          <Separator />
          <div className="p-4 text-center">
            <Button variant="outline" size="sm" className="w-full text-xs">
              View all notifications
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}
