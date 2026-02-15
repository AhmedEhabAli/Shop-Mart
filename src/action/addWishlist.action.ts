"use server";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export async function addtoWishlistAction(productId: string) {
  const session = await getServerSession(authOptions);
  if (session) {
    const res = await fetch(`${process.env.BASE_URL}/wishlist`, {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        token: session?.token as string,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } else {
    return null;
  }
}
