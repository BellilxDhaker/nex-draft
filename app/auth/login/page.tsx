import { AuthForm } from "@/components/auth/AuthForm";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
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
          <h1 className="text-4xl font-bold text-primary mb-2">Welcome Back</h1>
          <p className="text-primary/60">Sign in to your account to continue</p>
        </div>

        {/* Auth Form Container */}
        <div className="w-full max-w-md rounded-2xl border border-soft bg-white/80 p-8 backdrop-blur-md shadow-premium">
          <AuthForm />

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-primary/60">
            By signing in, you agree to our{" "}
            <Link
              href="/terms"
              className="text-primary hover:text-primary-dark font-semibold"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-primary hover:text-primary-dark font-semibold"
            >
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex items-center gap-2 text-xs text-primary/50">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          Your data is encrypted and secure
        </div>
      </div>
    </div>
  );
}
