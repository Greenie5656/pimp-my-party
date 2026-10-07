"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="bg-tekhelet text-white py-6">
      <div className="container mx-auto flex justify-center items-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1
          }}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -5, 5, -5, 0],
            transition: { duration: 0.5 }
          }}
          className="cursor-pointer"
        >
<Image
  src="/logo.png"
  alt="Pimp My Party Logo"
  width={400}
  height={400}
  className="w-40 h-auto sm:w-48 md:w-56 lg:w-64 xl:w-72"
  priority
/>
        </motion.div>
      </div>
    </header>
  );
}