"use client";

import { supabase } from "@/lib/supabase/client";

export interface Subscription {
  id: string;
  user_id: string;
  plan: string;
  status: string;
  current_period_start: string;
  current_period_end: string | null;
  canceled_at: string | null;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export async function getSubscription(): Promise<Subscription | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}

export async function updatePlan(plan: "FREE" | "PRO" | "ENTERPRISE"): Promise<Subscription> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("subscriptions")
    .upsert(
      {
        user_id: user.id,
        plan,
        status: "active",
        current_period_start: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function cancelSubscription(): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("subscriptions")
    .update({
      status: "canceled",
      canceled_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
}
