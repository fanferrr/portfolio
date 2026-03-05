"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { WorkItem } from "@/content/work";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticText } from "@/components/MagneticText";

function safePlay(video: HTMLVideoElement | null) {
  if (!video) return;
  try {
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    const p = video.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  } catch {}
}

function safePause(video: HTMLVideoElement | null) {
  if (!video) return;
  try {
    video.pause();
  } catch {}
}

/**
 * Safari: forzar primer frame SIN poster real.
 * metadata -> seek tiny -> wait seeked/canplay/loadeddata/rvfc -> ready
 */
function primeFirstFrame(video: HTMLVideoElement, onReady: () => void) {
  let done = false;
  const mark = () => {
    if (done) return;
    done = true;
    onReady();
  };

  const rvfc = (
    video as HTMLVideoElement & {
      requestVideoFrameCallback?: (cb: () => void) => number;
    }
  ).requestVideoFrameCallback;

  video.addEventListener("seeked", mark, { once: true });
  video.addEventListener("canplay", mark, { once: true });
  video.addEventListener("loadeddata", mark, { once: true });

  if (rvfc) rvfc(() => mark());

  try {
    video.currentTime = Math.min(
      0.05,
      Math.max(0.001, video.duration ? video.duration * 0.001 : 0.001)
    );
  } catch {}

  window.setTimeout(mark, 450);
}

/**
 * ✅ FIX Safari “black until hover”:
 * - NO overlay absoluto encima del video
 * - placeholder detrás (background layers)
 * - video aparece con opacity (Safari repinta)
 */
function LazyHoverVideoTile({
  src,
  onOpen,
}: {
  src: string;
  onOpen: (src: string) => void;
}) {
  const wrapRef = useRef<HTMLButtonElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const primedRef = useRef(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin: "900px 0px", threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const v = videoRef.current;
    if (!v) return;
    if (primedRef.current) return;

    primedRef.current = true;

    v.muted = true;
    v.playsInline = true;
    v.preload = "auto";
    v.setAttribute("playsinline", "true");
    v.setAttribute("webkit-playsinline", "true");

    const onMeta = () => primeFirstFrame(v, () => setReady(true));
    v.addEventListener("loadedmetadata", onMeta, { once: true });

    try {
      v.load();
    } catch {}

    if (v.readyState >= 1) onMeta();

    return () => v.removeEventListener("loadedmetadata", onMeta);
  }, [mounted]);

  return (
    <button
      ref={wrapRef}
      type="button"
      onClick={() => onOpen(src)}
      className="group relative block w-full overflow-hidden"
      data-cursor="view"
      aria-label="Open video"
      onMouseEnter={() => safePlay(videoRef.current)}
      onMouseLeave={() => safePause(videoRef.current)}
    >
      {/* ✅ Placeholder DETRÁS (no tapa al video) */}
      <div className="absolute inset-0 grain" />
      <div className="absolute inset-0 bg-gradient-to-b from-card via-card/90 to-background" />

      {mounted && (
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          poster=""                 // (vacío) evita rarezas sin usar poster real
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
          className="relative z-[1] block w-full h-auto object-contain transition-opacity duration-200"
          style={{ opacity: ready ? 1 : 0 }}
        />
      )}

      {/* Play icon hover */}
      <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/45 backdrop-blur-sm">
          <div className="ml-0.5 h-0 w-0 border-y-[7px] border-y-transparent border-l-[12px] border-l-white/90" />
        </div>
      </div>
    </button>
  );
}

export function AIVideoLabTemplate({ item }: { item: WorkItem }) {
  const videos = useMemo(
    () => (item.images ?? []).filter((s) => s.toLowerCase().endsWith(".mp4")),
    [item.images]
  );

  const hero = videos[0] ?? null;
  const rest = hero ? videos.slice(1) : videos;

  const [openSrc, setOpenSrc] = useState<string | null>(null);

  return (
    <div className="pt-14">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <ScrollReveal>
          <MagneticText
            as="h1"
            className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {item.title}
          </MagneticText>
          <p className="mt-2 max-w-3xl text-muted-foreground">{item.description}</p>
        </ScrollReveal>
      </div>

      {/* HERO video (full bleed) */}
      {hero && (
        <div className="mt-10">
          <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-0">
            <div className="group relative overflow-hidden">
              <div className="relative h-[56vh] min-h-[360px] max-h-[720px] w-full">
                <video
                  src={hero}
                  muted
                  playsInline
                  preload="auto"
                  autoPlay
                  loop
                  poster=""
                  disablePictureInPicture
                  controlsList="nodownload noplaybackrate"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/10" />

                <button
                  type="button"
                  onClick={() => setOpenSrc(hero)}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  data-cursor="cta"
                  aria-label="Play video"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/85 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.95)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-[1.06]">
                    <div className="ml-0.5 h-0 w-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-white/95" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Masonry FULL BLEED */}
      <div className="mt-0 pb-20">
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-0">
          <div
            className="
              columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6
              [column-gap:0px]
            "
          >
            {rest.map((src, idx) => (
              <div key={src + idx} className="break-inside-avoid">
                <LazyHoverVideoTile src={src} onOpen={setOpenSrc} />
              </div>
            ))}
          </div>
        </div>

        {videos.length === 0 && (
          <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
            <div className="rounded-xl border border-border bg-card/40 p-6 text-sm text-muted-foreground">
              No hay mp4 en <span className="text-foreground">images</span>. Añade rutas tipo{" "}
              <span className="text-foreground">/work/ai-video-lab/01.mp4</span>.
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {openSrc && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          onClick={() => setOpenSrc(null)}
        >
          <div
            className="absolute left-1/2 top-1/2 w-[92vw] max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border/60 bg-background/70"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
              <div className="text-sm text-muted-foreground">AI Video • Lab</div>
              <button
                type="button"
                onClick={() => setOpenSrc(null)}
                className="rounded-full border border-border/70 bg-card/30 px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
                data-cursor="link"
              >
                Close
              </button>
            </div>

            <div className="bg-black">
              <video
                src={openSrc}
                controls
                autoPlay
                playsInline
                preload="auto"
                className="h-[78vh] w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}