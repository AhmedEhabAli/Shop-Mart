import { BrandResponse } from "@/interfaces/BrandInterface";
import Image from "next/image";
import Link from "next/link";

export default async function Brands() {
  const res = await fetch(`${process.env.BASE_URL}/brands`);
  const { data }: BrandResponse = await res.json();

  return (
    <div className="px-4 pt-20">
      <h2 className="text-2xl font-bold mb-4">Brands</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((brand) => (
          <div
            key={brand._id}
            className="rounded-lg shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <Link href={`/brands/${brand._id}`}>
              <Image
                src={brand.image}
                alt={brand.name}
                width={300}
                height={300}
                className="w-full h-48 object-contain"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
