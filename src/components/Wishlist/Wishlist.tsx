"use client";
import { WishlistRes } from "@/interfaces/WishlistInterface";
import { Heart, Loader2 } from "lucide-react";
import Image from "next/image";
import AddToCart from "../AddToCart/AddToCart";
import { formatCurrency } from "@/Helpers/formatCurrency";
import Link from "next/link";
import { useState } from "react";

export default function Wishlist({
  wishlistData,
}: {
  wishlistData: WishlistRes | null;
}) {
  const [wishlist, setWishlist] = useState<WishlistRes | null>(
    wishlistData || null,
  );
  return (
    <>
      {wishlist ? (
        <div className="container px-4 py-20">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold uppercase tracking-wide">
              Wishlist
            </h1>
            <p className="text-gray-500 mt-2">
              {wishlist.count} items in your wishlist
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {wishlist.data.map((item) => (
              <div
                key={item._id}
                className="flex flex-col border rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden"
              >
                <Link
                  href={`products/${item.id}`}
                  className="flex flex-col gap-3 p-5 flex-1"
                >
                  <div className="w-full aspect-square relative rounded-xl overflow-hidden">
                    <Image
                      src={item.imageCover}
                      alt={item.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <h2 className="text-lg font-bold line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-base font-medium">
                    {formatCurrency(item.price)}
                  </p>
                </Link>

                <div className="px-5 pb-5">
                  <AddToCart
                    setWishlist={setWishlist}
                    productId={item.id}
                    isInWishlistServer={wishlist.data.some(
                      (p) => p.id === item.id,
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col overflow-hidden justify-center items-center min-h-screen gap-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gray-100 scale-150 opacity-40 animate-ping" />

            <div className="relative bg-black border-2 border-dashed border-gray-200 rounded-full p-10 transition-transform duration-500 hover:scale-105">
              <Heart
                className="size-40 text-gray-300 animate-float"
                strokeWidth={1.2}
              />
            </div>
          </div>

          <div className="text-center space-y-2 my-5 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-gray-700">
              Your wishlist is empty
            </h2>
            <p className="text-gray-400 text-sm">
              Looks like you haven't added anything yet
            </p>
          </div>
        </div>
      )}
    </>
  );
}
