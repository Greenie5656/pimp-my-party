'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Users, Calendar, Phone } from 'lucide-react';

export default function AboutPage() {
  // Your brand/venue images from Services.jsx
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

  // Stats animation
  const stats = [
    { icon: Calendar, number: '20+', label: 'Years Experience' },
    { icon: Users, number: '6,000+', label: 'Max Attendees' },
    { icon: Award, number: '100%', label: 'Dedication' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        {/* Animated background gradient */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 pb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              About Us
            </h1>
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700/50 relative overflow-hidden"
          >
            {/* Glimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'linear' }}
            />

            <div className="relative z-10">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                With <span className="text-purple-400 font-semibold">20 years of event expertise</span>, we are reliable professionals skilled in managing events of all sizes, from small intimate gatherings to festivals hosting up to <span className="text-pink-400 font-semibold">6,000 attendees</span>.
              </p>
              
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Our extensive experience as event managers includes <span className="text-purple-400 font-semibold">planning, organising, coordinating, and overseeing</span> a wide range of formal and informal events with precision and dedication.
              </p>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 text-center relative overflow-hidden group"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500" />
                  
                  <IconComponent className="w-12 h-12 mx-auto mb-3 text-purple-400" strokeWidth={1.5} />
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-8 text-purple-400"
          >
            What We Offer
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
          >
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "DJ's For All Occasions",
                "Sax & Percussion Players",
                "Event Management & Planning",
                "Event Design & Decor",
                "Sound, Lighting, Stages & Special Effects",
                "Photo Booths & Dancefloors"
              ].map((service, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-3 text-gray-300 text-lg"
                >
                  <span className="text-2xl">•</span>
                  <span>{service}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-pink-400">
              Trusted By The Best
            </h2>
            <p className="text-gray-400 text-lg">Venues & brands we've worked with</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
                className="relative aspect-square bg-white rounded-xl p-4 shadow-xl hover:shadow-purple-500/50 transition-all duration-300"
              >
                <Image
                  src={brand}
                  alt={`Brand ${index + 1}`}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Animated background effect */}
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                ]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <Phone className="w-16 h-16 mx-auto mb-6 text-white relative z-10" />
            <h3 className="text-4xl font-bold text-white mb-4 relative z-10">Call Us to Book</h3>
            <p className="text-2xl text-white/90 mb-2 relative z-10">CALL:</p>
            <motion.a
              href="tel:07359189070"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block text-4xl md:text-5xl font-bold text-yellow-300 hover:text-yellow-200 transition-colors relative z-10"
            >
              07359189070
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}