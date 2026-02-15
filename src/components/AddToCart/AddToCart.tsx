"use client";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Heart, Loader2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { addtoCartAction } from "@/action/addtoCart.action";
import { useRouter } from "next/navigation";
import { addtoWishlistAction } from "@/action/addWishlist.action";
import { removeProductAction } from "@/action/wishlistAction";
import { WishlistRes } from "@/interfaces/WishlistInterface";
import Error from "next/error";

export default function AddToCart({
  productId,
  isInWishlistServer,
  setWishlist,
}: {
  productId: string;
  isInWishlistServer: boolean;
  setWishlist?: React.Dispatch<React.SetStateAction<WishlistRes | null>>;
}) {
  const [isWishlisted, setIsWishlisted] = useState(isInWishlistServer);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function addToCart(productId: string) {
    try {
      setLoading(true);
      const data = await addtoCartAction(productId);
      dispatchEvent(
        new CustomEvent("cartUpdate", { detail: data.numOfCartItems }),
      );
      if (data == null) {
        router.push("/login");
      }
      toast.success(`${data.message}`);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function toggleWishlist(productId: string) {
    try {
      if (isWishlisted) {
        const res = await removeProductAction(productId);

        if (res.status === "success") {
          toast.success("Removed from wishlist");

          setWishlist?.((prev) => {
            if (!prev) return null;
            const updatedData = prev.data.filter((p) => p.id !== productId);
            return {
              ...prev,
              data: updatedData,
              count: updatedData.length,
            };
          });
          setIsWishlisted(false);
          dispatchEvent(
            new CustomEvent("wishlistUpdate", { detail: res.data?.length }),
          );
        } else {
          toast.error(res.message || "Failed to remove from wishlist");
        }
      } else {
        const data = await addtoWishlistAction(productId);

        if (data.status === "success") {
          toast.success("Added to wishlist");
          setIsWishlisted(true);
          dispatchEvent(
            new CustomEvent("wishlistUpdate", { detail: data.data?.length }),
          );
        } else {
          toast.error(data.message || "Failed to add to wishlist");
        }
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  }

  return (
    <div>
      <CardFooter className="flex gap-2 ">
        <Button
          disabled={loading}
          onClick={() => addToCart(productId)}
          className="grow text-white"
        >
          {loading ? <Loader2 className="animate-spin" /> : <ShoppingCart />}{" "}
          Add To Cart
        </Button>
        <Button
          variant="outline"
          onClick={() => toggleWishlist(productId)}
          className="p-2 hover:shadow-lg hover:scale-120"
        >
          <Heart
            className={
              isWishlisted ? "text-red-500 fill-current" : "text-gray-600"
            }
          />
        </Button>
      </CardFooter>
    </div>
  );
}
