"use client";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartIcon({
  serverCartNum,
  userId,
}: {
  serverCartNum: number;
  userId: string;
}) {
  if (userId) {
    localStorage.setItem("userId", userId);
  }
  const [cartNum, setCartNum] = useState(serverCartNum);
  useEffect(() => {
    function handel(e: CustomEvent) {
      setCartNum(e.detail);
    }
    addEventListener("cartUpdate", handel as EventListener);
  }, []);

  return (
    <Link href="/cart" className="relative inline-block">
      <ShoppingCart className="fill-black" />
      {cartNum > 0 && (
        <span className="absolute -top-1.5 -right-3 text-xs w-5 h-5 bg-accent-foreground text-accent flex items-center border-white border-2 justify-center rounded-full z-20">
          {cartNum}
        </span>
      )}
    </Link>
  );
}
