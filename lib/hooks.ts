"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { DEFAULT_PLAN, FEATURE_ACCESS } from "@/lib/plans";

interface UserData {
  id: string;
  email: string;
  name: string | null;
  username: string | null;
  isOnboarded: boolean;
  plan: string;
}

export function useUser() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchUser() {
      try {
        const { data, error: authError } = await supabase.auth.getUser();

        if (!isMounted) return;

        if (authError || !data.user) {
          setUser(null);
          setLoading(false);
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
        if (isMounted) {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return { user, loading, error };
}

export function useSubscription() {
  const { user, loading } = useUser();
  const plan = user?.plan || DEFAULT_PLAN;

  return {
    subscription: user
      ? {
          plan,
          status: "active",
        }
      : null,
    loading,
    error: null,
  };
}

export async function checkFeatureAccess(feature: string): Promise<boolean> {
  try {
    const { data } = await supabase.auth.getUser();
    const plan =
      (data.user?.user_metadata?.plan as string | undefined) || DEFAULT_PLAN;
    return (
      FEATURE_ACCESS[feature as keyof typeof FEATURE_ACCESS]?.includes(plan) ??
      false
    );
  } catch (err) {
    console.error("Error checking feature access:", err);
    return false;
  }
}

export function useFeatureAccess(feature: string) {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function check() {
      const access = await checkFeatureAccess(feature);
      setHasAccess(access);
      setLoading(false);
    }

    check();
  }, [feature]);

  return { hasAccess, loading };
}
