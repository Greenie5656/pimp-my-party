"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 text-center">
      <motion.h1 
        className="text-4xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Tailwind Color Test
      </motion.h1>

      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <p className="text-heliotrope">Heliotrope Text (#d372ff)</p>
        <p className="text-tekhelet">Tekhelet Text (#462278)</p>
        <p className="text-fuchsia">Fuchsia Text (#fb12fc)</p>
      </motion.div>

      <motion.div 
        className="flex gap-4 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <motion.button 
          className="px-4 py-2 rounded bg-heliotrope text-black hover:bg-fuchsia"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Heliotrope Button
        </motion.button>
        <motion.button 
          className="px-4 py-2 rounded bg-tekhelet text-white hover:bg-heliotrope"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Tekhelet Button
        </motion.button>
        <motion.button 
          className="px-4 py-2 rounded bg-fuchsia text-black hover:bg-tekhelet"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Fuchsia Button
        </motion.button>
      </motion.div>
    </main>
  );
}