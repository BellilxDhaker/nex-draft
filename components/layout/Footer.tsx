"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Link as LinkIcon, Share2 } from "lucide-react";

export default function Footer() {
  const productLinks = [
    { label: "Features", href: "/product" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Integrations", href: "/product#integrations" },
    { label: "Changelog", href: "/resources#changelog" },
  ];
  const resourcesLinks = [
    { label: "Documentation", href: "/docs" },
    { label: "Guides", href: "/resources#guides" },
    { label: "Tutorials", href: "/resources#tutorials" },
    { label: "API Reference", href: "/docs#api" },
  ];
  const companyLinks = [
    { label: "About", href: "#" },
    { label: "Blog", href: "/resources#blog" },
    { label: "Case Studies", href: "/resources#case-studies" },
    { label: "Contact", href: "#" },
  ];
  const legalLinks = [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ];

  return (
    <footer className="bg-white border-t border-soft">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="pt-8 pb-6 lg:pt-10 lg:pb-8">
          <div className="grid gap-8 lg:gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
            <div className="space-y-4">
              <Image
                src="/NexDraftTitle.png"
                alt="NexDraft"
                height={36}
                width={126}
                priority
                style={{ width: "auto", height: "36px" }}
              />
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
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors duration-200 hover:text-slate-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Resources
              </p>
              <ul className="space-y-1 text-sm text-slate-500">
                {resourcesLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors duration-200 hover:text-slate-700"
                    >
                      {link.label}
                    </Link>
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
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors duration-200 hover:text-slate-700"
                    >
                      {link.label}
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
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors duration-200 hover:text-slate-700"
                    >
                      {link.label}
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
