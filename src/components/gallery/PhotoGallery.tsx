"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

interface PhotoGalleryProps {
  photos: string[];
  visitTitle?: string;
}

export default function PhotoGallery({ photos, visitTitle }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (photos.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-8 text-center">
        <Camera className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">사진이 아직 등록되지 않았습니다</p>
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const next = () => setCurrentIndex((prev) => (prev + 1) % photos.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {photos.map((photo, i) => (
          <button
            key={photo}
            onClick={() => openLightbox(i)}
            className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden group cursor-pointer border border-border hover:border-accent transition-colors"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-6 h-6 text-muted-foreground/40 mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground/40 px-2 truncate max-w-full">
                  {photo.split("/").pop()}
                </p>
              </div>
            </div>
            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {photos.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 p-2 text-white/60 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 p-2 text-white/60 hover:text-white transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <div className="max-w-4xl w-full px-16 text-center">
            <div className="aspect-[16/10] bg-muted/20 rounded-xl flex items-center justify-center border border-white/10">
              <div className="text-center">
                <Camera className="w-12 h-12 text-white/20 mx-auto mb-2" />
                <p className="text-sm text-white/40">{photos[currentIndex]}</p>
                {visitTitle && (
                  <p className="text-xs text-white/20 mt-1">{visitTitle}</p>
                )}
              </div>
            </div>
            <p className="text-xs text-white/40 mt-3">
              {currentIndex + 1} / {photos.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
