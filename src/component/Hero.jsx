"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Automatically hide overlay after 3 seconds (longer to ensure video is playing)
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 3000); // Increased to 3 seconds

    return () => clearTimeout(timer); // Cleanup
  }, []);
  return (
    <section className="relative bg-gradient-to-b from-tekhelet via-black to-black text-white py-20 overflow-hidden">
      {/* Animated Background Glow Effects */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-heliotrope/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-fuchsia/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Title with letter animation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-heliotrope via-fuchsia to-heliotrope bg-clip-text text-transparent">
            Professional DJ Services
          </h2>
          
          {/* Animated underline */}
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-fuchsia via-heliotrope to-fuchsia mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Subtitle with icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="text-fuchsia" size={28} />
          </motion.div>
          <p className="text-xl md:text-2xl text-heliotrope font-semibold">
            Making your party unforgettable!
          </p>
          <motion.div
            animate={{
              rotate: [0, -5, 5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <Sparkles className="text-fuchsia" size={28} />
          </motion.div>
        </motion.div>

        {/* Video Section - Optimized for YouTube Shorts (vertical) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-md mx-auto"
        >
          {/* Outer glow container */}
          <div className="relative">
            {/* Animated glow border */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-fuchsia via-heliotrope to-fuchsia rounded-3xl blur-lg"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Video container with glass effect */}
            <div className="relative bg-black/50 backdrop-blur-sm rounded-3xl overflow-hidden border-2 border-heliotrope/50 shadow-2xl">
              {/* Vertical aspect ratio for YouTube Shorts (9:16) */}
              <div className="relative" style={{ paddingTop: "177.78%" }}>
                {/* Loading overlay - covers YouTube branding flash */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-tekhelet to-black flex items-center justify-center"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: videoLoaded ? 0 : 1 }}
                  transition={{ duration: 0.8 }}
                  style={{ 
                    pointerEvents: videoLoaded ? 'none' : 'auto',
                    zIndex: 30 // Higher z-index to ensure it covers everything
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="text-heliotrope" size={48} />
                  </motion.div>
                </motion.div>

                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/tYm7FfIdXmc?autoplay=1&mute=1&loop=1&playlist=tYm7FfIdXmc&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&disablekb=1&playsinline=1"
                  title="Pimp My Party DJ Services"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: 'none' }}
                />
                
                {/* Invisible overlay to enable click-to-play */}
                <div 
                  className="absolute inset-0 cursor-pointer z-10"
                  style={{ pointerEvents: videoLoaded ? 'auto' : 'none' }}
                  onClick={(e) => {
                    const iframe = e.currentTarget.previousElementSibling;
                    const src = iframe.src;
                    // Toggle between controls=0 and controls=1
                    if (src.includes('controls=0')) {
                      iframe.src = src.replace('controls=0', 'controls=1');
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Video caption with animation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-6 text-center text-gray-300 text-sm flex items-center justify-center gap-2"
          >
            <span className="text-fuchsia">▶</span>
            Watch us bring the energy to your event!
            <span className="text-fuchsia">◀</span>
          </motion.p>
        </motion.div>

        {/* Floating particles effect */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-heliotrope rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </section>
  );
}