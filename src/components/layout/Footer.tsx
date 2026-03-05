"use client";

import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background py-8 lg:py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:py-8">
        <p className="text-sm text-muted-foreground">© {year} Juan</p>
        <div className="flex gap-6 text-sm">
          <Link
            href="/book"
            className="text-muted-foreground transition-colors hover:text-primary"
            data-cursor="cta"
          >
            Book a Call
          </Link>
        </div>
      </div>
    </footer>
  );
}
