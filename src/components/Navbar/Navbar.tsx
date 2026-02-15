// Navbar.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { CartRes } from "@/interfaces/CartInterface";
import { WishlistRes } from "@/interfaces/WishlistInterface";
import NavbarMoblie from "../NavbarMoblie/NavbarMoblie";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  let cartData: CartRes | null = null;
  let wishlistData: WishlistRes | null = null;

  if (session) {
    const cartRes = await fetch(`${process.env.BASE_URL}/cart`, {
      headers: { token: session.token as string },
    });
    cartData = await cartRes.json();

    const wishlistRes = await fetch(`${process.env.BASE_URL}/wishlist`, {
      headers: { token: session.token as string },
    });
    wishlistData = await wishlistRes.json();
  }

  return (
    <NavbarMoblie
      session={session}
      cartData={cartData}
      wishlistData={wishlistData}
    />
  );
}
