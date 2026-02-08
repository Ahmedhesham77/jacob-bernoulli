"use client";

import Image from "next/image";
import { Product } from "@/data/mockProducts";
import { Collection } from "@/data/collections";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Button } from "@/components/ui/button"; // Shadcn UI Button

type Props = {
  collection: Collection;
  products: Product[];
};


export default function MainCollectionSection({ collection, products }: Props) {
  console.log(products)
    return (
    <section className="relative min-h-screen bg-luxury-black text-luxury-ivory">
      <div className="px-10 py-32 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-[300] tracking-wide">
            {collection.title} Collection
          </h2>

          <p className="mt-6 text-luxury-ivory/70 leading-relaxed">
            Discover craftsmanship, precision, and timeless luxury.
          </p>
        </div>

        {/* Products Slider */}
        <div className="mt-20 relative">
          <Swiper
            slidesPerView={1.2}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg group">
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    />
                    {product.title}
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="font-[300] text-lg">{product.title}</h3>
                    <span className="text-sm opacity-70">{collection.title}</span>
                    <span className="text-base font-semibold">${product.price.toLocaleString()}</span>

                    <Button className="mt-2 w-full">Add to Cart</Button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
