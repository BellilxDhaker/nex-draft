"use client";

import { supabase } from "@/lib/supabase/client";

export interface Project {
  id: string;
  user_id: string;
  title: string;
  context: string;
  domain: string;
  target_users: string;
  goals: string;
  constraints: string;
  created_at: string;
  updated_at: string;
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function getProject(id: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }
  return data;
}

export async function createProject(input: {
  title: string;
  context?: string;
  domain?: string;
  target_users?: string;
  goals?: string;
  constraints?: string;
}): Promise<Project> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("projects")
    .insert({
      user_id: user.id,
      title: input.title,
      context: input.context || "",
      domain: input.domain || "",
      target_users: input.target_users || "",
      goals: input.goals || "",
      constraints: input.constraints || "",
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateProject(
  id: string,
  input: Partial<{
    title: string;
    context: string;
    domain: string;
    target_users: string;
    goals: string;
    constraints: string;
  }>,
): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
