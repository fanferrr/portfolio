"use client";

import { useRef } from "react";
import Link from "next/link";
import type { WorkItem } from "@/content/work";

type WorkTileProps = {
  item: WorkItem;
  compact?: boolean;
};

function useThumbnailSrc(item: WorkItem): string | null {
  if (!item.thumbnail) return null;
  return item.thumbnail;
}

export function WorkTile({ item, compact }: WorkTileProps) {
  const label =
    item.role ?? item.client ?? (item.type === "spec" ? "Lab" : "Proyecto");
  const thumbnail = useThumbnailSrc(item);
  const imgRef = useRef<HTMLImageElement>(null);
  const fallbackSvg = thumbnail ? thumbnail.replace(/\.[^.]+$/, ".svg") : null;

  if (compact) {
    return (
      <Link
        href={`/work/${item.slug}`}
        className="group flex flex-col justify-end rounded-xl border border-border bg-card p-4 transition-[transform,border-color] duration-200 hover:scale-[1.03] hover:border-primary sm:p-5"
        data-cursor="view"
      >
        <span className="text-xs text-muted-foreground">{label}</span>
        <h2 className="mt-0.5 text-base font-medium sm:text-lg">{item.title}</h2>
        <span className="mt-1 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
          View case →
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/work/${item.slug}`}
      className="group relative block overflow-hidden rounded-xl p-[1px] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_-4px_hsl(var(--primary)/0.4)]"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--primary) / 0.35), hsl(var(--primary) / 0.12), hsl(var(--border)))",
      }}
      data-cursor="view"
    >
      <div className="relative flex h-full min-h-[280px] flex-col rounded-[11px] bg-card md:min-h-[320px]">
        {/* Media area */}
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-t-[10px]">
          {thumbnail ? (
            <>
              <div className="absolute inset-0 grain">
                <div className="absolute inset-0 bg-gradient-to-b from-card via-card/95 to-background" />
              </div>
              <img
                ref={imgRef}
                src={thumbnail}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
                onError={(e) => {
                  const el = e.currentTarget;
                  if (el.dataset.fallback === "done" || !fallbackSvg) return;
                  el.dataset.fallback = "done";
                  el.src = fallbackSvg;
                }}
              />
            </>
          ) : (
            <div className="absolute inset-0 grain">
              <div className="absolute inset-0 bg-gradient-to-b from-card via-card/95 to-background" />
            </div>
          )}

          {/* Year only for REAL projects */}
          {item.type === "real" && item.year && (
            <span className="absolute left-4 top-4 rounded-full bg-black/30 px-2 py-0.5 text-xs text-muted-foreground backdrop-blur-sm">
              {item.year}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-end p-5 sm:p-6">
          <span className="text-sm text-muted-foreground">{label}</span>
          <h2 className="mt-1 text-xl font-medium">{item.title}</h2>
          <span className="mt-2 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
            View case →
          </span>
        </div>
      </div>
    </Link>
  );
}