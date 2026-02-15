import { authOptions } from "@/auth";
import AddToCart from "@/components/AddToCart/AddToCart";
import Slider from "@/components/Slider/Slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/Helpers/formatCurrency";

import { Product } from "@/interfaces/ProductInterface";
import { WishlistRes } from "@/interfaces/WishlistInterface";
import { Star, StarOff } from "lucide-react";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/server/request/params";

export default async function ProductDetails({ params }: { params: Params }) {
  const { productId } = await params;
  const res = await fetch(`${process.env.BASE_URL}/products/${productId}`);
  const { data: product }: { data: Product } = await res.json();
  const session = await getServerSession(authOptions);
  const wishlistRes = await fetch(`${process.env.BASE_URL}/wishlist`, {
    headers: {
      token: session?.token as string,
    },
  });
  const wishlistData: WishlistRes = await wishlistRes.json();
  const wishlistIds: string[] = wishlistData?.data?.map((p) => p.id) ?? [];
  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 ">
          Product Details
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          View full information about this product
        </p>
      </div>

      <Card className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6  shadow-lg rounded-lg items-center ">
        <div className="flex justify-center">
          <Slider images={product.images} title={product.title} />
        </div>

        <div className="col-span-2 flex flex-col justify-between">
          <CardHeader className="space-y-2">
            <CardDescription className="text-sm text-gray-500 uppercase tracking-wide">
              {product.brand.name}
            </CardDescription>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {product.title}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {product.description}
            </CardDescription>
            <CardDescription className="text-sm text-gray-400">
              Category: {product.category.name}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }, (_, index) =>
                index < Math.round(product.ratingsAverage) ? (
                  <Star key={index} className="text-amber-400 fill-amber-400" />
                ) : (
                  <StarOff key={index} className="text-gray-300" />
                ),
              )}
              <span className="text-gray-400 text-sm leading-relaxed">
                ({product.ratingsAverage.toFixed()})
              </span>
            </div>

            <p className="text-2xl font-extrabold text-gray-900">
              {formatCurrency(product.price)}
            </p>
          </CardContent>
          <AddToCart
            productId={product.id}
            isInWishlistServer={wishlistIds.includes(product.id)}
          />
        </div>
      </Card>
    </>
  );
}
