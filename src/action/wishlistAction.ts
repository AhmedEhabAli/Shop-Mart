"use server";

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export async function removeProductAction(productId: string) {
  const session = await getServerSession(authOptions);
  const res = await fetch(`${process.env.BASE_URL}/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      token: session?.token as string,
    },
  });
  const data = await res.json();
  return data;
}
