"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Disc3, 
  Music2, 
  ClipboardList, 
  Sparkles, 
  Lightbulb, 
  Camera 
} from "lucide-react";

export default function Services() {
  // Services with professional icons
  const services = [
    { 
      Icon: Disc3, 
      text: "DJ's For All Weddings",
    },
    { 
      Icon: Music2, 
      text: "Sax & Percussion Players",
    },
    { 
      Icon: ClipboardList, 
      text: "Event Management & Planning",
    },
    { 
      Icon: Sparkles, 
      text: "Event Design & Decor",
    },
    { 
      Icon: Lightbulb, 
      text: "Sound, Lighting, Stages & Special Effects",
    },
    { 
      Icon: Camera, 
      text: "Photo Booths & Dancefloors",
    },
  ];

  // Your brand/venue images
  const brands = [
    "/brands/alberts_standish.jpeg",
    "/brands/alberts_worsley.jpg",
    "/brands/bbdd.png",
    "/brands/BRUNCHED.png",
    "/brands/dukes_90.jpg",
    "/brands/f.png",
    "/brands/heaton_park_golf.jpg",
    "/brands/hilton.jpg",
    "/brands/joseph_holt.jpeg",
    "/brands/S2S.png",
    "/brands/Sanction.png",
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        ease: "easeOut",
      },
    },
  };

  const brandVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  // Text animation - letter by letter
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <motion.span key={index} variants={letterVariants}>
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        {/* Services Section */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-heliotrope"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {splitText("Our Services")}
        </motion.h2>

        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-fuchsia via-heliotrope to-fuchsia mx-auto mb-12"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => {
            const IconComponent = service.Icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="bg-gradient-to-br from-tekhelet to-black p-8 rounded-lg cursor-pointer border-2 border-tekhelet hover:border-heliotrope group relative overflow-hidden"
              >
                {/* Pink glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia/0 to-heliotrope/0 group-hover:from-fuchsia/10 group-hover:to-heliotrope/10 transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="mb-4 text-heliotrope group-hover:text-fuchsia transition-colors duration-300">
                    <IconComponent 
                      size={48} 
                      strokeWidth={1.5}
                    />
                  </div>
                  <p className="text-lg font-semibold leading-tight group-hover:text-heliotrope transition-colors duration-300">
                    {service.text}
                  </p>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-fuchsia to-heliotrope"
                  initial={{ width: "0%" }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Brands & Venues Section */}
        <motion.div
          className="border-t border-heliotrope/30 pt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-center mb-2 text-heliotrope"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {splitText("Trusted By The Best")}
          </motion.h3>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-fuchsia via-heliotrope to-fuchsia mx-auto mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          
          <motion.p
            className="text-center text-gray-400 mb-12 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Brands & Venues We've Worked With
          </motion.p>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {brands.map((brand, index) => (
            <motion.div
                key={index}
                variants={brandVariants}
                whileHover={{
                scale: 1.1,
                transition: { duration: 0.3 },
                }}
                className="relative w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 p-4 bg-gradient-to-br from-tekhelet/60 to-black rounded-lg backdrop-blur-sm border border-heliotrope/20 hover:border-fuchsia/50 hover:from-tekhelet/80 hover:to-black/90 transition-all duration-300 group"
            >
                {/* Pink glow on hover */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-fuchsia/0 to-heliotrope/0 group-hover:from-fuchsia/20 group-hover:to-heliotrope/20 transition-all duration-500" />
                
                {/* White background for the logo itself */}
                <div className="absolute inset-4 bg-white/90 rounded-md" />
                
                <Image
                src={brand}
                alt={`Brand ${index + 1}`}
                fill
                className="object-contain p-6 relative z-10 group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 128px, (max-width: 1024px) 144px, 160px"
                />
            </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}