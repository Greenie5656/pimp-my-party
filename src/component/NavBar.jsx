"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef("up");

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Brochure", href: "/brochure" },
  { name: "Contact", href: "/contact" },
];

  useEffect(() => {
    const threshold = 10; // Minimum scroll distance to trigger change
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      
      // Always show at the very top
      if (currentScrollY < 10) {
        setIsVisible(true);
        scrollDirection.current = "up";
        lastScrollY.current = currentScrollY;
        return;
      }

      // Calculate scroll difference
      const scrollDifference = currentScrollY - lastScrollY.current;

      // Only update if scrolled more than threshold
      if (Math.abs(scrollDifference) < threshold) {
        return;
      }

      // Determine direction
      if (scrollDifference > 0) {
        // Scrolling DOWN
        if (scrollDirection.current !== "down") {
          scrollDirection.current = "down";
          setIsVisible(false);
        }
      } else {
        // Scrolling UP
        if (scrollDirection.current !== "up") {
          scrollDirection.current = "up";
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollDirection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <nav
      className={`bg-black text-white py-4 border-b border-heliotrope/30 sticky top-0 z-50 backdrop-blur-sm transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-2 sm:px-4">
        <motion.ul
          className="flex justify-center items-center gap-3 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-12"
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
                    className={`text-sm sm:text-base md:text-lg font-semibold transition-colors duration-300 ${
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
    </nav>
  );
}