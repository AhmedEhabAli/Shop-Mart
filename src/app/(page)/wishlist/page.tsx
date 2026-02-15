import { authOptions } from "@/auth";
import Wishlist from "@/components/Wishlist/Wishlist";
import { WishlistRes } from "@/interfaces/WishlistInterface";
import { getServerSession } from "next-auth";

export default async function WishlistPage() {
  const session = await getServerSession(authOptions);
  const res = await fetch(`${process.env.BASE_URL}/wishlist`, {
    headers: {
      token: session?.token as string,
    },
  });
  const data: WishlistRes = await res.json();

  return (
    <>
      <Wishlist wishlistData={data.count == 0 ? null : data} />
    </>
  );
}
