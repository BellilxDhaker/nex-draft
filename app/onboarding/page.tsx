"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingForm } from "@/components/auth/OnboardingForm";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";

export default function OnboardingPage() {
  const router = useRouter();
  const [defaultName, setDefaultName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      const user = data.user;

      if (!isMounted) return;

      if (error || !user) {
        router.replace("/auth/login");
        return;
      }

      const metadata = user.user_metadata || {};
      if (metadata.isOnboarded) {
        router.replace("/dashboard");
        return;
      }

      const name =
        (metadata.name as string) ||
        (metadata.full_name as string) ||
        user.email ||
        "";
      setDefaultName(name);
      setLoading(false);
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, [router]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-light via-bg-white to-white relative overflow-hidden">
      {/* Background Blurs */}
      <div className="blur-gradient blur-gradient-blue absolute top-20 left-10 w-80 h-80 opacity-40" />
      <div className="blur-gradient blur-gradient-cyan absolute bottom-20 right-10 w-96 h-96 opacity-40" />

      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        {/* Logo / Header */}
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src="/NexDraftTitle.png"
              alt="NexDraft"
              height={50}
              width={180}
              priority
              style={{ width: "auto", height: "50px" }}
            />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">
            Complete Your Profile
          </h1>
          <p className="text-primary/60">
            Just a couple of details to get started
          </p>
        </div>

        {/* Onboarding Form Container */}
        <div className="w-full max-w-md rounded-2xl border border-soft bg-white/80 p-8 backdrop-blur-md shadow-premium">
          <OnboardingForm defaultName={defaultName} />

          {/* Progress Indicator */}
          <div className="mt-8 space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-primary/60">
                <span>Account Setup</span>
                <span>Step 1 of 1</span>
              </div>
              <div className="h-1 w-full rounded-full bg-primary/10">
                <div className="h-full w-full rounded-full bg-gradient-to-r from-primary to-accent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
