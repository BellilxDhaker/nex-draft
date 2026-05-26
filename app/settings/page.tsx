"use client";

import { motion } from "framer-motion";
import {
  User,
  Bell,
  Palette,
  Lock,
  Globe,
  Zap,
  Eye,
  EyeOff,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { useUser } from "@/lib/hooks";

type ThemeType = "light" | "dark" | "auto";

const integrations: {
  name: string;
  status: string;
  connected: boolean;
}[] = [];

const notificationsData: {
  title: string;
  description: string;
  enabled: boolean;
}[] = [];

const sessions: {
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}[] = [];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, loading: userLoading } = useUser();
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [selectedTheme, setSelectedTheme] = useState<ThemeType>("light");

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    if (!user) {
      setProfileForm({ firstName: "", lastName: "", email: "" });
      return;
    }

    const fullName = user.name?.trim() || "";
    const parts = fullName.split(/\s+/).filter(Boolean);
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ");

    setProfileForm({
      firstName,
      lastName,
      email: user.email || "",
    });
  }, [user]);

  const initials = getInitials(profileForm.firstName, profileForm.lastName);

  const tabs = useMemo(
    () => [
      { id: "profile", label: "Profile", icon: User },
      { id: "notifications", label: "Notifications", icon: Bell },
      { id: "appearance", label: "Appearance", icon: Palette },
      { id: "integrations", label: "Integrations", icon: Zap },
      { id: "security", label: "Security", icon: Lock },
      { id: "general", label: "General", icon: Globe },
    ],
    [],
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const togglePassword = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="flex h-screen bg-bg-light">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.div
          className="bg-white border-b border-soft sticky top-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-primary">Settings</h1>

            <p className="text-gray-600 mt-1">
              Manage your account and preferences
            </p>
          </div>
        </motion.div>

        <div className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg border border-soft p-6 h-fit"
              >
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;

                    return (
                      <motion.button
                        key={tab.id}
                        whileHover={{ x: 5 }}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                          activeTab === tab.id
                            ? "bg-accent text-white shadow-md"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </motion.button>
                    );
                  })}
                </nav>
              </motion.div>

              {/* Content */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="md:col-span-3 space-y-6"
              >
                {/* PROFILE */}
                {activeTab === "profile" && (
                  <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-lg border border-soft p-6"
                  >
                    <h2 className="text-2xl font-bold text-primary mb-6">
                      Profile Information
                    </h2>

                    <div className="space-y-6">
                      <div className="flex items-center gap-6">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white text-2xl font-bold cursor-pointer border-2 border-accent/30"
                        >
                          {userLoading ? "" : initials}
                        </motion.div>

                        <div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-accent text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-light transition-colors"
                          >
                            Change Avatar
                          </motion.button>

                          <p className="text-sm text-gray-600 mt-2">
                            JPG, PNG or GIF (max 5MB)
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                          </label>

                          <input
                            type="text"
                            value={profileForm.firstName}
                            onChange={(event) =>
                              setProfileForm((prev) => ({
                                ...prev,
                                firstName: event.target.value,
                              }))
                            }
                            placeholder={
                              userLoading ? "Loading..." : "First name"
                            }
                            className="w-full px-4 py-2 border border-soft rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                          </label>

                          <input
                            type="text"
                            value={profileForm.lastName}
                            onChange={(event) =>
                              setProfileForm((prev) => ({
                                ...prev,
                                lastName: event.target.value,
                              }))
                            }
                            placeholder={
                              userLoading ? "Loading..." : "Last name"
                            }
                            className="w-full px-4 py-2 border border-soft rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>

                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(event) =>
                            setProfileForm((prev) => ({
                              ...prev,
                              email: event.target.value,
                            }))
                          }
                          placeholder={
                            userLoading ? "Loading..." : "Email address"
                          }
                          className="w-full px-4 py-2 border border-soft rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bio
                        </label>

                        <textarea
                          rows={4}
                          placeholder="Tell us about yourself..."
                          className="w-full px-4 py-2 border border-soft rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all resize-none"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-accent text-white px-6 py-2 rounded-lg font-medium hover:bg-accent-light transition-colors w-fit"
                      >
                        Save Changes
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* NOTIFICATIONS */}
                {activeTab === "notifications" && (
                  <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-lg border border-soft p-6"
                  >
                    <h2 className="text-2xl font-bold text-primary mb-6">
                      Notification Preferences
                    </h2>

                    <div className="space-y-4">
                      {notificationsData.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-soft bg-bg-light p-4 text-sm text-gray-600">
                          No notification preferences available yet.
                        </div>
                      ) : (
                        notificationsData.map((notif, index) => (
                          <motion.div
                            key={index}
                            whileHover={{
                              backgroundColor: "#f7f9fc",
                            }}
                            className="flex items-center justify-between p-4 border border-soft rounded-lg transition-colors"
                          >
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {notif.title}
                              </h3>

                              <p className="text-sm text-gray-600">
                                {notif.description}
                              </p>
                            </div>

                            <motion.div whileHover={{ scale: 1.1 }}>
                              <input
                                type="checkbox"
                                defaultChecked={notif.enabled}
                                className="w-5 h-5 rounded cursor-pointer"
                              />
                            </motion.div>
                          </motion.div>
                        ))
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-6 bg-accent text-white px-6 py-2 rounded-lg font-medium hover:bg-accent-light transition-colors"
                    >
                      Save Preferences
                    </motion.button>
                  </motion.div>
                )}

                {/* APPEARANCE */}
                {activeTab === "appearance" && (
                  <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-lg border border-soft p-6"
                  >
                    <h2 className="text-2xl font-bold text-primary mb-6">
                      Appearance
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-4">
                          Theme
                        </h3>

                        <div className="grid grid-cols-3 gap-4">
                          {[
                            {
                              name: "Light",
                              value: "light",
                            },
                            {
                              name: "Dark",
                              value: "dark",
                            },
                            {
                              name: "Auto",
                              value: "auto",
                            },
                          ].map((theme) => (
                            <motion.label
                              key={theme.value}
                              whileHover={{ scale: 1.05 }}
                              className="relative cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="theme"
                                checked={selectedTheme === theme.value}
                                onChange={() =>
                                  setSelectedTheme(theme.value as ThemeType)
                                }
                                className="sr-only"
                              />

                              <div
                                className={`p-4 rounded-lg border-2 transition-all ${
                                  selectedTheme === theme.value
                                    ? "border-accent bg-accent/10"
                                    : "border-soft"
                                }`}
                              >
                                <div className="text-sm font-medium text-center">
                                  {theme.name}
                                </div>
                              </div>
                            </motion.label>
                          ))}
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-accent text-white px-6 py-2 rounded-lg font-medium hover:bg-accent-light transition-colors w-fit"
                      >
                        Save Appearance
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* INTEGRATIONS */}
                {activeTab === "integrations" && (
                  <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-lg border border-soft p-6"
                  >
                    <h2 className="text-2xl font-bold text-primary mb-6">
                      Connected Apps
                    </h2>

                    <div className="space-y-4">
                      {integrations.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-soft bg-bg-light p-4 text-sm text-gray-600">
                          No integrations connected yet.
                        </div>
                      ) : (
                        integrations.map((app, index) => (
                          <motion.div
                            key={index}
                            whileHover={{
                              backgroundColor: "#f7f9fc",
                            }}
                            className="flex items-center justify-between p-4 border border-soft rounded-lg transition-colors"
                          >
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {app.name}
                              </h3>

                              <p
                                className={`text-sm ${
                                  app.connected
                                    ? "text-green-600"
                                    : "text-gray-600"
                                }`}
                              >
                                {app.status}
                              </p>
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                app.connected
                                  ? "bg-red-100 text-red-700 hover:bg-red-200"
                                  : "bg-accent text-white hover:bg-accent-light"
                              }`}
                            >
                              {app.connected ? "Disconnect" : "Connect"}
                            </motion.button>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}

                {/* SECURITY */}
                {activeTab === "security" && (
                  <motion.div variants={itemVariants} className="space-y-6">
                    <div className="bg-white rounded-lg border border-soft p-6">
                      <h2 className="text-2xl font-bold text-primary mb-6">
                        Change Password
                      </h2>

                      <div className="space-y-4">
                        {[
                          {
                            label: "Current Password",
                            field: "current",
                          },
                          {
                            label: "New Password",
                            field: "new",
                          },
                          {
                            label: "Confirm New Password",
                            field: "confirm",
                          },
                        ].map((item) => (
                          <div key={item.field}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {item.label}
                            </label>

                            <div className="relative">
                              <input
                                type={
                                  showPasswords[
                                    item.field as keyof typeof showPasswords
                                  ]
                                    ? "text"
                                    : "password"
                                }
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border border-soft rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
                              />

                              <motion.button
                                type="button"
                                aria-label={`Toggle ${item.label}`}
                                whileHover={{ scale: 1.1 }}
                                onClick={() =>
                                  togglePassword(
                                    item.field as "current" | "new" | "confirm",
                                  )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                              >
                                {showPasswords[
                                  item.field as keyof typeof showPasswords
                                ] ? (
                                  <EyeOff className="w-5 h-5" />
                                ) : (
                                  <Eye className="w-5 h-5" />
                                )}
                              </motion.button>
                            </div>
                          </div>
                        ))}

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-accent text-white px-6 py-2 rounded-lg font-medium hover:bg-accent-light transition-colors w-fit"
                        >
                          Update Password
                        </motion.button>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border border-soft p-6">
                      <h2 className="text-2xl font-bold text-primary mb-6">
                        Active Sessions
                      </h2>

                      <div className="space-y-3">
                        {sessions.length === 0 ? (
                          <div className="rounded-lg border border-dashed border-soft bg-bg-light p-4 text-sm text-gray-600">
                            No active sessions found.
                          </div>
                        ) : (
                          sessions.map((session, index) => (
                            <motion.div
                              key={index}
                              whileHover={{
                                backgroundColor: "#f7f9fc",
                              }}
                              className="flex items-center justify-between p-4 border border-soft rounded-lg transition-colors"
                            >
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {session.device}

                                  {session.current && (
                                    <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                      Current
                                    </span>
                                  )}
                                </h3>

                                <p className="text-sm text-gray-600">
                                  {session.location} • {session.lastActive}
                                </p>
                              </div>

                              {!session.current && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="text-red-600 hover:text-red-700 font-medium text-sm"
                                >
                                  Revoke
                                </motion.button>
                              )}
                            </motion.div>
                          ))
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* GENERAL */}
                {activeTab === "general" && (
                  <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-lg border border-soft p-6"
                  >
                    <h2 className="text-2xl font-bold text-primary mb-6">
                      General Settings
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>

                        <select className="w-full px-4 py-2 border border-soft rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all">
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timezone
                        </label>

                        <select className="w-full px-4 py-2 border border-soft rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all">
                          <option>Eastern Time (ET)</option>
                          <option>Central Time (CT)</option>
                          <option>Mountain Time (MT)</option>
                          <option>Pacific Time (PT)</option>
                        </select>
                      </div>

                      <div className="pt-4 border-t border-soft">
                        <h3 className="font-medium text-gray-900 mb-4">
                          Danger Zone
                        </h3>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-red-100 hover:bg-red-200 text-red-700 px-6 py-2 rounded-lg font-medium transition-colors w-fit"
                        >
                          Delete Account
                        </motion.button>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-accent text-white px-6 py-2 rounded-lg font-medium hover:bg-accent-light transition-colors w-fit"
                      >
                        Save Settings
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getInitials(firstName: string, lastName: string) {
  const first = firstName.trim().charAt(0);
  const last = lastName.trim().charAt(0);
  const initials = `${first}${last}`.trim();

  return initials ? initials.toUpperCase() : "?";
}
