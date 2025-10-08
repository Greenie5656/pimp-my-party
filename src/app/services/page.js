'use client';

import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  Music, 
  Camera, 
  Utensils,
  Gift,
  Star,
  CheckCircle2,
  MapPin
} from 'lucide-react';

export default function ServicesPage() {
  // Animation variants - these control HOW things move
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2 // Each child appears 0.2s after the previous one
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: 'easeOut'
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  // Our services data with SEO-enhanced descriptions
  const services = [
    {
      icon: Music,
      title: 'Entertainment Services',
      description: 'Professional DJs, live saxophone performances, and interactive photo booths across Manchester, Salford, Bury, and Greater Manchester. Top-tier entertainment to keep your party alive.',
      features: ['Mobile DJ Services', 'Live Saxophone Player', 'Selfie Photo Booths', 'Interactive Games'],
      gradient: 'from-purple-600 via-indigo-500 to-blue-600',
      accentColor: 'indigo'
    },
    {
      icon: Calendar,
      title: 'Full Event Planning',
      description: 'Complete event coordination across Manchester and surrounding areas. From concept to cleanup, we handle every detail of your wedding, party, or corporate event.',
      features: ['Timeline Management', 'Vendor Coordination', 'Day-of Execution', 'Budget Planning'],
      gradient: 'from-purple-600 via-purple-500 to-indigo-600',
      accentColor: 'purple'
    },
    {
      icon: Sparkles,
      title: 'Venue Decoration',
      description: 'Transform any venue in Manchester, Cheshire, or Lancashire into a magical setting with our expert design and decoration services for weddings and parties.',
      features: ['Theme Design', 'Custom Backdrops', 'Lighting Setup', 'Table Arrangements'],
      gradient: 'from-pink-600 via-pink-500 to-rose-600',
      accentColor: 'pink'
    },
    {
      icon: Users,
      title: 'Guest Experience',
      description: 'Create unforgettable moments for your wedding or party guests with curated entertainment and activities throughout Greater Manchester.',
      features: ['Entertainment Booking', 'Activity Planning', 'Guest Coordination', 'Welcome Packages'],
      gradient: 'from-indigo-600 via-blue-500 to-cyan-600',
      accentColor: 'blue'
    },
    {
      icon: Utensils,
      title: 'Catering Coordination',
      description: 'Delicious food experiences for events across Salford, Bury, Heywood, and Middleton, tailored to your taste and dietary requirements.',
      features: ['Menu Planning', 'Vendor Selection', 'Dietary Accommodations', 'Bar Services'],
      gradient: 'from-rose-600 via-pink-500 to-purple-600',
      accentColor: 'rose'
    },
    {
      icon: Camera,
      title: 'Photography & Video',
      description: 'Capture every precious moment of your wedding or party with professional photography and videography services across the North West.',
      features: ['Professional Photos', 'Video Coverage', 'Drone Footage', 'Editing Services'],
      gradient: 'from-cyan-600 via-blue-500 to-indigo-600',
      accentColor: 'cyan'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Consultation',
      description: 'We start with understanding your vision, preferences, and budget.'
    },
    {
      number: '02',
      title: 'Planning',
      description: 'Our team creates a detailed plan and timeline for your event.'
    },
    {
      number: '03',
      title: 'Coordination',
      description: 'We handle all vendor bookings and manage every detail.'
    },
    {
      number: '04',
      title: 'Execution',
      description: 'On event day, we ensure everything runs smoothly and perfectly.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section 
        className="relative py-8 px-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comprehensive event planning solutions for weddings, parties, and corporate events across Manchester, Salford, Bury, and Greater Manchester.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className="py-8 px-4">
        <motion.div 
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group relative"
                >
                  <div className="relative h-full bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-800 overflow-hidden transition-all duration-300 group-hover:border-gray-700">
                    {/* Glimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      animate={{
                        x: ['-200%', '200%']
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 5,
                        ease: 'linear'
                      }}
                    />

                    {/* Gradient line at top - glows on hover */}
                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.gradient} opacity-70 group-hover:opacity-100 group-hover:h-1 transition-all duration-300`} />

                    {/* Icon - subtle scale on hover */}
                    <motion.div 
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient} mb-5 relative`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IconComponent className="w-7 h-7 text-white" strokeWidth={2} />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-gray-400 mb-5 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {service.description}
                    </p>

                    <ul className="space-y-2.5">
                      {service.features.map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start gap-2.5"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CheckCircle2 className={`w-4 h-4 text-${service.accentColor}-400 mt-0.5 flex-shrink-0`} />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* NEW: Service Areas Section - Subtle SEO boost */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Serving Greater Manchester & Beyond
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our professional mobile DJ, wedding DJ, saxophone player, and photobooth hire services are available throughout Manchester, Salford, Bury, Heywood, Middleton, Prestwich, Oldham, Worsley, and across Greater Manchester, Cheshire, and Lancashire.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              'Manchester', 'Salford', 'Bury', 'Heywood', 'Middleton', 
              'Prestwich', 'Oldham', 'Worsley', 'Greater Manchester', 
              'Cheshire', 'Lancashire'
            ].map((location, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 bg-white rounded-full text-gray-700 font-medium shadow-md hover:shadow-lg transition-shadow duration-300 border border-purple-100"
              >
                {location}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How We Work
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our proven process ensures your event is flawlessly executed from start to finish
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="text-6xl font-bold text-transparent bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>

                {/* Connecting line (hidden on last item) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32"></div>
            
            <div className="relative z-10">
              <Star className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Plan Your Perfect Event?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Let's bring your vision to life. Get in touch with us today for a free consultation.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Get Started Today
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}