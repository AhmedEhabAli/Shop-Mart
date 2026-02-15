"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/Helpers/formatCurrency";
import { CartRes } from "@/interfaces/CartInterface";
import { useState } from "react";
import {
  clearCartAction,
  deleteProductAction,
  updateCartAction,
} from "@/action/cartAction";
import Link from "next/link";
import toast from "react-hot-toast";
import CheckOut from "../CheckOut/CheckOut";

export default function Cart({ cartData }: { cartData: CartRes | null }) {
  const [cart, setCart] = useState<CartRes | null>(cartData || null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function updateProductCount(productId: string, count: number) {
    setLoadingId(productId);
    const res: CartRes = await updateCartAction(productId, count);
    console.log(res);

    if (res.status == "success") {
      setCart(res);
      toast.success("product count update");
    }
    setLoadingId(null);
  }

  async function deleteCartProducts(productId: string) {
    setLoadingId(productId);
    const res: CartRes = await deleteProductAction(productId);
    if (res.status == "success") {
      setCart(res);
      dispatchEvent(
        new CustomEvent("cartUpdate", { detail: res.numOfCartItems }),
      );
    }
    setLoadingId(null);
  }

  async function clearCart() {
    setLoadingId("clear");
    const res: CartRes = await clearCartAction();
    if (res.message == "success") {
      setCart(null);
      dispatchEvent(new CustomEvent("cartUpdate", { detail: 0 }));
    }
    setLoadingId(null);
  }
  return (
    <>
      {cart ? (
        <div className="container mx-auto px-4 py-10 pt-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-gray-500">
              {cart.numOfCartItems} items in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-5">
              {cart.data.products.map((item) => (
                <div
                  key={item._id}
                  className="relative flex gap-4 rounded-xl border p-4 shadow-sm"
                >
                  {loadingId == item.product.id && (
                    <div className="flex justify-center items-center absolute inset-0 bg-white/80">
                      <Loader2 className="animate-spin" />
                    </div>
                  )}
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h2 className="font-semibold text-lg line-clamp-1">
                      {item.product.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {item.product.brand.name} • {item.product.category.name}
                    </p>

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        disabled={item.count == 1}
                        className="w-9 h-9 rounded-md border hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          updateProductCount(item.product._id, item.count - 1)
                        }
                      >
                        −
                      </button>
                      <span className="font-medium">{item.count}</span>
                      <button
                        disabled={item.count == item.product.quantity}
                        className="w-9 h-9 rounded-md border hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          updateProductCount(item.product._id, item.count + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right flex flex-col justify-between">
                    <p className="font-semibold text-lg">
                      {formatCurrency(item.price)}
                    </p>
                    <button
                      className="text-red-500 text-sm hover:underline cursor-pointer"
                      onClick={() => deleteCartProducts(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky top-24 h-fit flex flex-col gap-4">
              <div className="rounded-xl border p-6 shadow-sm space-y-4">
                <h2 className="text-xl font-semibold">Order Summary</h2>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal ({cart.numOfCartItems} items)</span>
                  <span>{formatCurrency(cart.data.totalCartPrice)}</span>
                </div>

                <hr />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(cart.data.totalCartPrice)}</span>
                </div>

                <CheckOut cartId={cartData?.cartId} />
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="border-red-400 text-red-400 hover:text-red-500 hover:scale-110"
                  onClick={() => clearCart()}
                >
                  {loadingId == "clear" && <Loader2 className="animate-spin" />}
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col overflow-hidden justify-center items-center min-h-screen gap-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gray-100 scale-150 opacity-40 animate-ping" />

            <div className="relative bg-black border-2 border-dashed border-gray-200 rounded-full p-10 transition-transform duration-500 hover:scale-105">
              <ShoppingCart
                className="size-40 text-gray-300 animate-float"
                strokeWidth={1.2}
              />
            </div>
          </div>

          <div className="text-center space-y-2 my-5 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-gray-700">
              Your cart is empty
            </h2>
            <p className="text-gray-400 text-sm">
              Looks like you haven't added anything yet
            </p>
          </div>

          <Link href={"/products"}>
            <Button
              variant="outline"
              className="mt-2 px-8 rounded-full border-gray-300 text-gray-600 
                 hover:bg-gray-50 hover:scale-105 
                 transition-all duration-300 ease-in-out"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
