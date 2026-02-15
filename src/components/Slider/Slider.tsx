"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function Slider({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 1500,
        }),
      ]}
    >
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <Image
              src={img}
              alt={title}
              width={400}
              height={350}
              className="w-full"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
