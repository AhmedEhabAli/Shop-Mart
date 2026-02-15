"use client";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WishlistIcon({
  serverWishlistNum,
}: {
  serverWishlistNum: number;
}) {
  const [wishlistNum, setWishlistNum] = useState(serverWishlistNum);
  useEffect(() => {
    function handel(e: CustomEvent) {
      setWishlistNum(e.detail);
    }
    addEventListener("wishlistUpdate", handel as EventListener);
  }, []);
  return (
    <Link href="/wishlist" className="relative inline-block">
      <Heart className="text-gray-600  hover:fill-gray-600  " />
      {wishlistNum > 0 && (
        <span className="absolute -top-1.5 -right-3 text-xs w-5 h-5 bg-accent-foreground text-accent flex items-center border-white border-2 justify-center rounded-full z-20">
          {wishlistNum}
        </span>
      )}
    </Link>
  );
}
