import { ProductsResponse } from "@/interfaces/ProductInterface";
import { Params } from "next/dist/server/request/params";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star, StarOff } from "lucide-react";
import Link from "next/link";
import AddToCart from "@/components/AddToCart/AddToCart";
import { formatCurrency } from "@/Helpers/formatCurrency";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export default async function getProductsByCategory({
  params,
}: {
  params: Params;
}) {
  const { categorieId } = await params;
  const res = await fetch(`${process.env.BASE_URL}/products`);
  const { data: data }: ProductsResponse = await res.json();
  const filteredProducts = data.filter(
    (product) => product.category?._id === categorieId,
  );
  const categoryName = filteredProducts[0]?.category?.name || "No Products";
  const session = await getServerSession(authOptions);
  const wishlistRes = await fetch(`${process.env.BASE_URL}/wishlist`, {
    headers: {
      token: session?.token as string,
    },
  });
  const wishlistData = await wishlistRes.json();
  const wishlistIds: string[] = wishlistData?.data?.map((p) => p.id) ?? [];
  return (
    <div className="pt-20">
      <h1 className="text-3xl font-bold mb-4">{categoryName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="p-2">
            <Card className="mx-auto w-full rounded-lg shadow-lg overflow-hidden cursor-pointer duration-300 hover:scale-105">
              <Link href={`/products/${product._id}`}>
                <Image
                  src={product.imageCover}
                  width={400}
                  height={350}
                  alt={product.title}
                  className="w-full h-80 object-contain"
                />
                <CardHeader className="mt-3">
                  <CardDescription className="text-sm text-gray-500">
                    {product.brand.name}
                  </CardDescription>
                  <CardTitle className="text-lg font-semibold line-clamp-1">
                    {product.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-400 mb-2">
                    {product.category.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 ">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }, (_, index) =>
                      index < Math.round(product.ratingsAverage) ? (
                        <Star
                          key={index}
                          className="text-amber-400 fill-amber-400"
                        />
                      ) : (
                        <StarOff key={index} className="text-gray-300" />
                      ),
                    )}
                    <span className="text-gray-400 text-sm leading-relaxed">
                      ({product.ratingsAverage.toFixed()})
                    </span>
                  </div>
                  <p className="text-lg font-bold ">
                    {formatCurrency(product.price)}{" "}
                  </p>
                </CardContent>
              </Link>
              <AddToCart
                productId={product.id}
                isInWishlistServer={wishlistIds.includes(product.id)}
              />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
