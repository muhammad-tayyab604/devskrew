"use client";

import Image from "next/image";

type ServiceImageProps = {
  src: string;
  alt: string;
};

export default function ServiceImage({ src, alt }: ServiceImageProps) {
  return (
    <Image
    height={2000}
    width={2000}
      src={src}
      alt={alt}
      className="w-full h-96 object-cover rounded-2xl"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}
