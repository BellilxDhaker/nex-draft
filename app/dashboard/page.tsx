"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Settings, CreditCard, Zap } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { DEFAULT_PLAN } from "@/lib/plans";

interface User {
  id: string;
  email: string;
  name: string | null;
  username: string | null;
  plan: string;
  isOnboarded: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [nextBillingDate] = useState(() => {
    const date = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString();
  });

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const { data, error: authError } = await supabase.auth.getUser();

        if (!isMounted) return;

        if (authError || !data.user) {
          router.replace("/auth/login");
          return;
        }

        const metadata = data.user.user_metadata || {};

        setUser({
          id: data.user.id,
          email: data.user.email || "",
          name:
            (metadata.name as string) || (metadata.full_name as string) || null,
          username: (metadata.username as string) || null,
          isOnboarded: Boolean(metadata.isOnboarded),
          plan: (metadata.plan as string) || DEFAULT_PLAN,
        });
      } catch (err) {
        setError("Failed to load user data");
        console.error(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/auth/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-light via-bg-white to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary mx-auto mb-4"></div>
          <p className="text-primary/60">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-light via-bg-white to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => router.push("/auth/login")}
            className="button-primary"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-light via-bg-white to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-primary/60 mb-4">User not found</p>
          <button
            onClick={() => router.push("/auth/login")}
            className="button-primary"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-light via-bg-white to-white relative overflow-hidden">
      {/* Background Blurs */}
      <div className="blur-gradient blur-gradient-blue absolute top-20 left-10 w-80 h-80 opacity-40" />
      <div className="blur-gradient blur-gradient-cyan absolute bottom-20 right-10 w-96 h-96 opacity-40" />

      <div className="flex flex-col h-screen relative z-10">
        {/* Header */}
        <header className="border-b border-soft bg-white/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
              <p className="text-sm text-primary/60">
                Welcome back, {user.name || user.email}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-lg border border-primary/20 bg-white/70 px-4 py-2 text-primary hover:bg-white transition"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Profile Card */}
              <div className="card-premium">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-primary">
                    Profile
                  </h2>
                  <Settings className="h-5 w-5 text-primary/40" />
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-primary/50 uppercase tracking-wide">
                      Name
                    </p>
                    <p className="text-primary font-medium">
                      {user.name || "Not set"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-primary/50 uppercase tracking-wide">
                      Username
                    </p>
                    <p className="text-primary font-medium">
                      @{user.username || "Not set"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-primary/50 uppercase tracking-wide">
                      Email
                    </p>
                    <p className="text-primary font-medium text-sm">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Plan Card */}
              <div className="card-premium">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-primary">
                    Current Plan
                  </h2>
                  <Zap className="h-5 w-5 text-accent" />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold text-primary capitalize">
                      {user.plan}
                    </p>
                    <p className="text-sm text-primary/60 mt-1">
                      {user.plan === "FREE"
                        ? "Limited features"
                        : user.plan === "PRO"
                          ? "All features included"
                          : "Enterprise support"}
                    </p>
                  </div>
                  {user.plan === "FREE" && (
                    <button className="button-primary w-full">
                      Upgrade to Pro
                    </button>
                  )}
                </div>
              </div>

              {/* Billing Card */}
              <div className="card-premium">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-primary">
                    Billing
                  </h2>
                  <CreditCard className="h-5 w-5 text-primary/40" />
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-primary/50 uppercase tracking-wide">
                      Billing Cycle
                    </p>
                    <p className="text-primary font-medium">Monthly</p>
                  </div>
                  <div>
                    <p className="text-xs text-primary/50 uppercase tracking-wide">
                      Next Billing Date
                    </p>
                    <p className="text-primary font-medium">
                      {nextBillingDate || "--"}
                    </p>
                  </div>
                  <button className="button-secondary w-full">
                    Manage Billing
                  </button>
                </div>
              </div>
            </div>

            {/* Usage Section */}
            <div className="card-premium">
              <h2 className="text-lg font-semibold text-primary mb-6">Usage</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-primary/60">API Requests</p>
                    <p className="text-sm font-medium text-primary">
                      {user.plan === "FREE"
                        ? "100"
                        : user.plan === "PRO"
                          ? "10,000"
                          : "Unlimited"}{" "}
                      per month
                    </p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-primary/10">
                    <div className="h-full w-1/4 rounded-full bg-gradient-to-r from-primary to-accent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
