"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/work", label: "Work" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book a Call" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-medium text-foreground transition-opacity hover:opacity-90"
          data-cursor="link"
        >
          <span className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src="/brand/juanko.png"
              alt="Juan logo"
              fill
              sizes="48px"
              className="object-contain transition-transform duration-300 group-hover:scale-[1.06]"
              priority
            />
            {/* subtle glow */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                boxShadow:
                  "0 0 18px rgba(124,58,237,0.40), 0 0 34px rgba(124,58,237,0.20)",
              }}
            />
          </span>

          <span className="tracking-tight">Juan</span>
        </Link>

        {/* Nav */}
        <ul className="flex items-center gap-6 text-sm">
          {nav.map(({ href, label }) => {
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "text-muted-foreground transition-colors hover:text-foreground",
                    isActive ? "text-foreground" : ""
                  )}
                  data-cursor={href === "/book" ? "cta" : "link"}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}