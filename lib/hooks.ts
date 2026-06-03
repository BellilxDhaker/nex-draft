"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { DEFAULT_PLAN, FEATURE_ACCESS } from "@/lib/plans";

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string | null;
  bio: string | null;
  avatarUrl: string | null;
  isOnboarded: boolean;
  plan: string;
}

export function useUser() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (!isMountedRef.current) return;

      if (authError || !authData.user) {
        setUser(null);
        setLoading(false);
        return;
      }

      const authUser = authData.user;
      const providerAvatar =
        (authUser.user_metadata?.avatar_url as string | undefined) ||
        (authUser.user_metadata?.picture as string | undefined) ||
        (authUser.user_metadata?.image as string | undefined) ||
        null;

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select(
          "id,email,first_name,last_name,username,bio,avatar_url,plan,is_onboarded",
        )
        .eq("id", authUser.id)
        .maybeSingle();

      let profile = profileData;

      if (!profileData && !profileError) {
        const { data: createdProfile, error: createError } = await supabase
          .from("profiles")
          .upsert({
            id: authUser.id,
            email: authUser.email || null,
            avatar_url: providerAvatar,
          })
          .select(
            "id,email,first_name,last_name,username,bio,avatar_url,plan,is_onboarded",
          )
          .single();

        if (createError) {
          throw new Error(createError.message);
        }

        profile = createdProfile;
      }

      if (profileError) {
        throw new Error(profileError.message);
      }

      if (authUser.email && profile?.email !== authUser.email) {
        await supabase
          .from("profiles")
          .update({ email: authUser.email })
          .eq("id", authUser.id);
      }

      setUser({
        id: authUser.id,
        email: authUser.email || profile?.email || "",
        firstName: profile?.first_name || "",
        lastName: profile?.last_name || "",
        username: profile?.username || null,
        bio: profile?.bio || null,
        avatarUrl: profile?.avatar_url || providerAvatar,
        isOnboarded: Boolean(profile?.is_onboarded),
        plan: profile?.plan || DEFAULT_PLAN,
      });
    } catch (err) {
      if (isMountedRef.current) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => {
      isMountedRef.current = false;
      authListener?.subscription?.unsubscribe();
    };
  }, [fetchUser]);

  return { user, loading, error, refreshUser: fetchUser };
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

    if (!data.user) {
      return false;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", data.user.id)
      .maybeSingle();

    const plan = profile?.plan || DEFAULT_PLAN;
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
