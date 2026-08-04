'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, MessageCircle, Mail } from 'lucide-react';
import { trackPhoneClick, trackWhatsAppClick, trackEmailClick } from '@/lib/gtag';
import { CONTACT } from '@/lib/locations';
import CTA from '@/component/CTA';

// Renders a location landing page from a single entry in src/lib/locations.js.
// Styling and animation deliberately mirror the existing dark pages
// (gallery / contact) so these pages sit inside the current design.
export default function LocationContent({ location }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">

      {/* Intro */}
      <section className="py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 pb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            {location.h1}
          </h1>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <div className="space-y-5 text-left sm:text-center">
            {location.intro.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Primary contact actions - reuse the existing tracking helpers */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <motion.a
              href={CONTACT.phoneHref}
              onClick={() => trackPhoneClick(`${location.slug}_hero`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-full transition-opacity duration-300 hover:opacity-90"
            >
              <Phone size={18} />
              {CONTACT.phone}
            </motion.a>
            <motion.a
              href="https://wa.me/447359189070"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(`${location.slug}_hero`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-purple-500/30 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300 hover:border-purple-500/60"
            >
              <MessageCircle size={18} />
              WhatsApp
            </motion.a>
            <motion.a
              href={`mailto:${CONTACT.email}`}
              onClick={() => trackEmailClick(`${location.slug}_hero`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-purple-500/30 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300 hover:border-purple-500/60"
            >
              <Mail size={18} />
              Email us
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Services available in this location */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {location.servicesHeading}
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {location.servicesIntro}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {location.services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-purple-400 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {service.body}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-gray-300 mt-10 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            {'Full prices for every item are in our '}
            <Link
              href="/brochure"
              className="text-purple-400 hover:text-pink-400 underline underline-offset-4 transition-colors duration-300"
            >
              downloadable brochure
            </Link>
            {', and there is more detail on each service on our '}
            <Link
              href="/services"
              className="text-purple-400 hover:text-pink-400 underline underline-offset-4 transition-colors duration-300"
            >
              services page
            </Link>
            .
          </motion.p>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-purple-400 mb-3">
              {location.galleryHeading}
            </h2>
            <p className="text-lg text-gray-400">{location.galleryIntro}</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {location.gallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative aspect-square overflow-hidden rounded-xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Link
              href="/gallery"
              className="text-purple-400 hover:text-pink-400 underline underline-offset-4 transition-colors duration-300 text-lg"
            >
              See more photos in the gallery
            </Link>
          </motion.p>
        </div>
      </section>

      {/* Booking process */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {location.processHeading}
            </h2>
            <p className="text-lg text-gray-300">{location.processIntro}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {location.process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 h-full"
              >
                <div className="text-4xl font-bold text-transparent bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text mb-3">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs - answers are always visible, never collapsed */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-purple-400 mb-10 text-center"
          >
            {location.faqHeading}
          </motion.h2>

          <div className="space-y-6">
            {location.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
              >
                <h3 className="text-xl font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas covered */}
      <section className="py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <MapPin className="w-10 h-10 text-purple-400 mx-auto mb-4" />
          <p className="text-gray-300 text-lg leading-relaxed">
            {`As well as ${location.name}, we cover ${location.alsoServes.slice(0, -1).join(', ')} and ${location.alsoServes.slice(-1)}, and work across Greater Manchester, Cheshire and Lancashire. `}
            <Link
              href="/contact"
              className="text-purple-400 hover:text-pink-400 underline underline-offset-4 transition-colors duration-300"
            >
              Ask about your venue
            </Link>
            .
          </p>
        </motion.div>
      </section>

      {/* Existing site-wide call to action */}
      <CTA ctaLocation={`${location.slug}_page`} />
    </div>
  );
}
