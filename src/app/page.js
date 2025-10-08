'use client';

import { motion } from 'framer-motion';
import Hero from "@/component/Hero";
import Services from "@/component/Services";
import CTA from "@/component/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      
      {/* NEW: Local Areas SEO Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Serving Greater Manchester & Beyond
            </h2>
            <p className="text-xl text-gray-300">
              Professional Mobile DJ, Wedding DJ & Party Services across the North West
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {[
              { area: 'Manchester', services: 'Mobile DJ • Wedding DJ • Photobooth' },
              { area: 'Salford', services: 'Party DJ • Saxophone Player' },
              { area: 'Bury', services: 'Wedding DJ • Event Services' },
              { area: 'Heywood', services: 'Mobile DJ • Photobooth Hire' },
              { area: 'Middleton', services: 'DJ Hire • Party Entertainment' },
              { area: 'Prestwich', services: 'Wedding DJ • Saxophone Player' },
              { area: 'Oldham', services: 'Mobile DJ • Party Services' },
              { area: 'Worsley', services: 'Wedding DJ • Photobooth Hire' },
              { area: 'Greater Manchester', services: 'All Event Services' },
              { area: 'Cheshire', services: 'Wedding DJ • Mobile DJ' },
              { area: 'Lancashire', services: 'Party DJ • Event Entertainment' },
            ].map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-purple-400 mb-2">
                  {location.area}
                </h3>
                <p className="text-sm text-gray-400">
                  {location.services}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center text-gray-300 mt-12 text-lg max-w-4xl mx-auto leading-relaxed"
          >
            Looking for a <strong className="text-purple-400">professional Mobile DJ in Manchester</strong>? 
            {' '}Need a <strong className="text-pink-400">Wedding DJ in Salford or Bury</strong>? 
            {' '}Want to hire a <strong className="text-purple-400">Photobooth in Greater Manchester</strong>? 
            {' '}We've got you covered across all of Greater Manchester, Cheshire, and Lancashire with 20 years of experience delivering unforgettable events.
          </motion.p>
        </div>
      </section>

      <CTA />
    </main>
  );
}