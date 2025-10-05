"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function NavBar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
      <nav className="bg-black text-white py-4 border-b border-heliotrope/30 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          {/* Wrapper allows horizontal scroll on mobile */}
          <div className="overflow-x-auto scrollbar-hide">
            <motion.ul
              className="flex justify-center items-center gap-6 sm:gap-8 md:gap-12 min-w-max sm:min-w-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.li key={index} variants={itemVariants}>
                    <Link href={link.href} className="relative group">
                      <motion.span
                        className={`text-base sm:text-lg font-semibold transition-colors duration-300 whitespace-nowrap ${
                          isActive ? "text-heliotrope" : "text-white"
                        } group-hover:text-fuchsia`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {link.name}
                      </motion.span>

                      {/* Active page indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-fuchsia to-heliotrope"
                          layoutId="activeIndicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}

                      {/* Hover underline */}
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-fuchsia to-heliotrope"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </div>
      </nav>
  );
}