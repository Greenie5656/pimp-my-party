"use client";

import { motion } from "framer-motion";
import { Music, Instagram, Facebook } from "lucide-react";
import Image from "next/image";
import { trackSocialClick } from "@/lib/gtag";

export default function Footer() {
  const socialLinks = [
    {
      name: "SoundCloud",
      icon: Music,
      url: "https://www.soundcloud.com/pimpmypartymcr", 
      color: "#ff8800",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/pimpmypartymcr", 
      color: "#E4405F",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/pimpmypartymcr", 
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="bg-gradient-to-b from-black to-tekhelet text-white py-12 border-t border-heliotrope/30">
      <div className="container mx-auto px-4">
        {/* Connect With Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-3xl font-bold mb-2 text-heliotrope">
            Connect With Us
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-fuchsia to-heliotrope mx-auto mt-4" />
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick(social.name)}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  scale: 1.1,
                  transition: { duration: 0.3 },
                }}
                className="group relative"
              >
                <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-tekhelet to-black rounded-full flex items-center justify-center border-2 border-heliotrope/50 group-hover:border-fuchsia transition-all duration-300">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-fuchsia/0 to-heliotrope/0 group-hover:from-fuchsia/20 group-hover:to-heliotrope/20 transition-all duration-500" />
                  
                  <IconComponent
                    size={32}
                    className="relative z-10 text-heliotrope group-hover:text-fuchsia transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
                
                <p className="text-center mt-3 text-sm text-gray-400 group-hover:text-heliotrope transition-colors duration-300">
                  {social.name}
                </p>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center border-t border-heliotrope/20 pt-6"
        >
          <p className="text-sm text-gray-400 mb-4">
            &copy; {new Date().getFullYear()} Pimp My Party. All rights reserved.
          </p>

          {/* Built By Credit - More Prominent */}
          <motion.a
            href="https://lancashirewebfixers.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.08, y: -2 }}
            className="inline-flex items-center gap-3 text-sm text-gray-400 hover:text-heliotrope transition-all duration-300 bg-black/30 px-6 py-3 rounded-lg border border-heliotrope/20 hover:border-heliotrope/50"
          >
            <span className="font-medium">Built by</span>
            <Image
              src="/FullLogo_resized.png"
              alt="Lancashire Web Fixers"
              width={140}
              height={35}
              className="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
}