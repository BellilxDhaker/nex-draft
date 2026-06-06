"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { DEFAULT_PLAN } from "@/lib/plans";

interface OnboardingFormProps {
  defaultName?: string;
}

export function OnboardingForm({ defaultName = "" }: OnboardingFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: defaultName,
    username: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authData.user) {
        throw new Error(authError?.message || "Unable to load user.");
      }

      const authUser = authData.user;
      const providerAvatar =
        (authUser.user_metadata?.avatar_url as string | undefined) ||
        (authUser.user_metadata?.picture as string | undefined) ||
        (authUser.user_metadata?.image as string | undefined) ||
        null;

      const trimmedName = formData.name.trim();
      const nameParts = trimmedName.split(/\s+/).filter(Boolean);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ");

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: authUser.id,
        email: authUser.email || null,
        first_name: firstName || null,
        last_name: lastName || null,
        username: formData.username.trim() || null,
        avatar_url: providerAvatar,
        plan: DEFAULT_PLAN,
        is_onboarded: true,
      });

      if (profileError) {
        throw new Error(profileError.message);
      }

      const { error: metadataError } = await supabase.auth.updateUser({
        data: { isOnboarded: true },
      });

      if (metadataError) {
        throw new Error(metadataError.message);
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-3">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          disabled={isLoading}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 transition"
          required
        />
      </div>

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="johndoe"
          disabled={isLoading}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 transition"
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          3-30 characters, letters, numbers, underscores, and hyphens only
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {isLoading ? (
          <>
            <Loader className="h-4 w-4 animate-spin" />
            Setting up...
          </>
        ) : (
          "Get Started"
        )}
      </button>
    </form>
  );
}
