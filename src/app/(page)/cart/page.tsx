import { authOptions } from "@/auth";
import Cart from "@/components/Cart/Cart";
import { CartRes } from "@/interfaces/CartInterface";
import { getServerSession } from "next-auth";

export default async function CartPage() {
  const session = await getServerSession(authOptions);
  const res = await fetch(
    `${process.env.BASE_URL}/cart`,

    {
      headers: {
        token: session?.token as string,
      },
    },
  );
  const data: CartRes = await res.json();

  return (
    <>
      <Cart cartData={data.numOfCartItems == 0 ? null : data} />
    </>
  );
}
