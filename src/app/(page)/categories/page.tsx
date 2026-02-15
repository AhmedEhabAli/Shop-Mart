import { BrandResponse } from "@/interfaces/BrandInterface";
import Image from "next/image";
import Link from "next/link";

export default async function Categories() {
  const res = await fetch(`${process.env.BASE_URL}/categories`);
  const { data: data }: BrandResponse = await res.json();

  return (
    <div className="px-4 pt-20">
      <h2 className="text-2xl font-bold mb-6">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((category) => (
          <div
            key={category._id}
            className="rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 text-center"
          >
            <Link href={`categories/${category._id}`}>
              <Image
                src={category.image}
                alt={category.name}
                width={300}
                height={300}
                className="w-full h-48 object-contain"
                priority
              />
            </Link>

            <h2 className="font-semibold text-xl m-2">{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
