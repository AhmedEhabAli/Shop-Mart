"use server";

import { authOptions } from "@/auth";
import { ShippingAddress } from "@/interfaces/CartInterface";
import { getServerSession } from "next-auth";

export async function cashOrderAction(
  cardtId: string,
  shippingAddress: ShippingAddress,
) {
  const session = await getServerSession(authOptions);
  if (session) {
    const res = await fetch(`${process.env.BASE_URL}/orders/${cardtId}`, {
      method: "POST",
      body: JSON.stringify({ shippingAddress }),
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

export async function checkOutAction(
  cardtId: string,
  shippingAddress: ShippingAddress,
) {
  const session = await getServerSession(authOptions);
  if (session) {
    const res = await fetch(
      `${process.env.BASE_URL}/orders/checkout-session/${cardtId}?url=${process.env.NEXT_PUBLIC_HOST_URL}`,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token: session?.token as string,
          "Content-Type": "application/json",
        },
      },
    );
    const data = await res.json();
    return data;
  } else {
    return null;
  }
}

export async function addtoCartAction(productId: string) {
  const session = await getServerSession(authOptions);
  if (session) {
    const res = await fetch(`${process.env.BASE_URL}/cart`, {
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
