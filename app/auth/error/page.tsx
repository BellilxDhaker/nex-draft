"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import Image from "next/image";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      // Map error codes to user-friendly messages
      const errorMessages: Record<string, string> = {
        Callback: "There was an error processing your authentication.",
        OAuthSignin: "There was an error connecting to the provider.",
        OAuthCallback: "There was an error with the OAuth callback.",
        OAuthCreateAccount: "Could not create user account.",
        EmailCreateAccount: "Could not create user account.",
        EmailSignInError: "Could not send magic link.",
        CredentialsSignin: "Invalid credentials.",
        SessionCallback: "Session error occurred.",
        Verification: "Link could not be verified.",
      };
      setError(
        errorMessages[errorParam] || "An authentication error occurred.",
      );
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-light via-bg-white to-white relative overflow-hidden">
      {/* Background Blurs */}
      <div className="blur-gradient blur-gradient-blue absolute top-20 left-10 w-80 h-80 opacity-40" />
      <div className="blur-gradient blur-gradient-cyan absolute bottom-20 right-10 w-96 h-96 opacity-40" />

      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        {/* Error Icon */}
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
            Authentication Error
          </h1>
          <p className="text-primary/60">{error || "Something went wrong"}</p>
        </div>

        {/* Error Container */}
        <div className="w-full max-w-md rounded-2xl border border-soft bg-white/80 p-8 backdrop-blur-md shadow-premium">
          <div className="space-y-4 text-center">
            <p className="text-sm text-primary/60">
              Please try again or contact support if the problem persists.
            </p>

            <Link
              href="/auth/login"
              className="button-primary inline-flex items-center justify-center gap-2 w-full"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <AuthErrorContent />
    </Suspense>
  );
}
