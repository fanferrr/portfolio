"use client";

import Image from "next/image";

type ImageGalleryProps = {
  images: string[];
  altPrefix: string;
};

export function ImageGallery({ images, altPrefix }: ImageGalleryProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((src, i) => (
        <div
          key={src + i}
          className="relative aspect-video overflow-hidden rounded-lg border border-border bg-muted"
        >
          <Image
            src={src}
            alt={`${altPrefix} ${i + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            placeholder="empty"
            priority={i < 2}
          />
        </div>
      ))}
    </div>
  );
}