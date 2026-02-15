"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen text-center gap-6">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-6xl font-extrabold"
      >
        Welcome to <span className="text-primary">Shop Mart</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="max-w-xl text-2xl text-muted-foreground"
      >
        Discover the best products with unbeatable prices.
      </motion.p>

      <div className="flex gap-4">
        <Link href={"/products"}>
          <Button size="lg">Shop Now</Button>
        </Link>
        <Link href={"/categories"}>
          <Button size="lg" variant="outline">
            Browse Categories
          </Button>
        </Link>
      </div>
    </section>
  );
}
