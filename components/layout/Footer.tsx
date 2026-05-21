"use client";

import Image from "next/image";
import { Mail, Moon, Link as LinkIcon, Share2, Sun } from "lucide-react";

export default function Footer() {
  const productLinks = ["Features", "Pricing", "How It Works"];
  const companyLinks = ["About", "Blog", "Contact"];
  const legalLinks = ["Privacy", "Terms", "Security"];

  return (
    <footer className="bg-bg-light border-t border-soft">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="pt-8 pb-6 lg:pt-10 lg:pb-8">
          <div className="grid gap-8 lg:gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br  transparent flex items-center justify-center shadow-sm">
                  <Image
                    src="/NexDraftLogo.png"
                    alt="NexDraft logo"
                    width={28}
                    height={28}
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-900 tracking-tight">
                    NexDraft
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    AI Documentation
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-500 max-w-sm">
                Transform product ideas into engineering-ready documentation
                with calm, AI-guided drafting built for modern teams.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: LinkIcon, label: "Twitter" },
                  { icon: Share2, label: "LinkedIn" },
                  { icon: LinkIcon, label: "GitHub" },
                  { icon: Mail, label: "Email" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="h-9 w-9 rounded-full bg-white border border-slate-200/70 shadow-sm flex items-center justify-center text-slate-500 transition-all duration-200 hover:text-slate-700 hover:bg-slate-50 hover:opacity-90"
                    aria-label={social.label}
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Product
              </p>
              <ul className="space-y-1 text-sm text-slate-500">
                {productLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="transition-colors duration-200 hover:text-slate-700"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Company
              </p>
              <ul className="space-y-1 text-sm text-slate-500">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="transition-colors duration-200 hover:text-slate-700"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Legal
              </p>
              <ul className="space-y-1 text-sm text-slate-500">
                {legalLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="transition-colors duration-200 hover:text-slate-700"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200/70 pt-4 pb-6 grid gap-4 text-xs text-slate-600 md:grid-cols-2 md:items-center">
            <p>© 2026 NexDraft. All rights reserved.</p>

            <div className="flex items-center gap-4 md:justify-self-end">
              <a
                href="#"
                className="transition-colors duration-200 hover:text-slate-700"
              >
                Terms
              </a>
              <a
                href="#"
                className="transition-colors duration-200 hover:text-slate-700"
              >
                Privacy
              </a>
              <a
                href="#"
                className="transition-colors duration-200 hover:text-slate-700"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
