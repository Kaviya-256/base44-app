import React from "react";
import { Image } from "@/components/ui/image";

export default function ProfessionalGallery({ images }) {
  if (!images?.length) return null;
  return (
    <div className="grid grid-cols-3 gap-3">
      {images.map((src, i) => (
        <div key={i} className="aspect-square rounded-xl overflow-hidden border border-revora-border">
          <Image src={src} alt="Work sample" className="w-full h-full" />
        </div>
      ))}
    </div>
  );
}
