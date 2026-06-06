"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Plus,
  BarChart3,
  Clock,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/lib/hooks";
import { supabase } from "@/lib/supabase/client";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading: userLoading, refreshUser } = useUser();

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() ||
    user?.username?.trim() ||
    "Account";
  const email = user?.email?.trim() || "No email";
  const initials = getInitials(displayName, email);

  const navigationItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Projects",
      href: "/projects",
      icon: FolderKanban,
    },
    {
      label: "Create",
      href: "/create",
      icon: Plus,
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      label: "Activity",
      href: "/activity",
      icon: Clock,
    },
  ];

  const bottomItems = [
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  const isActive = (href: string) => pathname === href;

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 },
    },
  };

  const handleSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out failed:", error);
      // Consider adding a toast notification here
      setIsSigningOut(false);
      return;
    }

    router.push("/auth/login");
    router.refresh();
  };

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    try {
      setIsUploadingAvatar(true);

      // Validate file type
      const allowedTypes = ["image/png", "image/jpeg"];
      if (!allowedTypes.includes(file.type)) {
        alert("Please select a PNG or JPEG image");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      const fileExt = file.type === "image/png" ? "png" : "jpg";
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("profiles")
        .upload(filePath, file, { upsert: true, contentType: file.type });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // Get public URL
      const { data: publicData } = supabase.storage
        .from("profiles")
        .getPublicUrl(filePath);

      const publicUrl = publicData.publicUrl;

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

      if (updateError) {
        throw new Error(updateError.message);
      }

      // Refresh user data
      await refreshUser();
      router.refresh();
    } catch (error) {
      console.error("Avatar upload failed:", error);
      alert(error instanceof Error ? error.message : "Failed to upload avatar");
    } finally {
      setIsUploadingAvatar(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  return (
    <motion.aside
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`bg-white border-r border-soft transition-all duration-300 flex flex-col h-screen ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="px-6 py-6 border-b border-soft flex items-center justify-between">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <Image
              src="/NexDraftTitle.png"
              alt="NexDraft"
              height={32}
              width={140}
              priority
              style={{ width: "auto", height: "32px" }}
            />
          </motion.div>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.href);

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                variants={itemVariants}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                  active
                    ? "bg-accent text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium text-sm"
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Items */}
      <div className="px-3 py-4 space-y-2 border-t border-soft">
        {bottomItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.href);

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                  active
                    ? "bg-accent text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium text-sm"
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          );
        })}

        {/* Sign Out Button */}
        <motion.button
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-medium text-sm"
            >
              Sign Out
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* User Profile */}
      {!isCollapsed && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleAvatarChange}
            disabled={isUploadingAvatar}
            className="hidden"
          />
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploadingAvatar}
            className="w-full px-4 py-4 border-t border-soft cursor-pointer hover:bg-gray-50 rounded-lg transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white font-bold text-sm flex-shrink-0 overflow-hidden relative"
              >
                {user?.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={displayName}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  initials
                )}
                {isUploadingAvatar && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  </div>
                )}
              </motion.div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {userLoading ? "Loading..." : displayName}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {userLoading ? "Fetching profile" : email}
                </p>
              </div>
            </div>
          </motion.button>
        </>
      )}
    </motion.aside>
  );
}

function getInitials(name: string, fallbackEmail: string) {
  const trimmed = name.trim();
  if (trimmed) {
    const parts = trimmed.split(/\s+/).slice(0, 2);
    return parts
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  if (fallbackEmail) {
    return fallbackEmail[0].toUpperCase();
  }

  return "?";
}
