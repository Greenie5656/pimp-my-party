'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient blur effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto relative"
      >
        <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden">
          
          {/* Animated background orbs */}
          <motion.div
            className="absolute top-0 right-0 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                delay: 0.2 
              }}
              className="mb-6"
            >
              <div className="inline-block p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Ready to Make Your Event Unforgettable?
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            >
              Let's bring your vision to life. Get in touch today for a free consultation and quote.
            </motion.p>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                delay: 0.5 
              }}
            >
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <span>Get Your Free Quote</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </motion.a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-wrap justify-center gap-6 text-white/80 text-sm"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Quick Response</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>No Obligation</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}