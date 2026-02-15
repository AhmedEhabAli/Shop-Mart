"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold"
        >
          Shop<span className="text-primary">Mart</span>
        </motion.h1>

        <div className="flex gap-2">
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="w-3 h-3 rounded-full bg-primary"
              initial={{ opacity: 0.3, y: 0 }}
              animate={{ opacity: 1, y: -10 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
