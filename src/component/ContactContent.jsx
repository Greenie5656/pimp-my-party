'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, Send, User, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { trackFormSubmission, trackPhoneClick, trackWhatsAppClick, trackEmailClick } from '@/lib/gtag';

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send to Formspree
      const response = await fetch('https://formspree.io/f/mzzjggqj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Success!
        trackFormSubmission('contact_form');
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        // Error handling
        alert('Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Oops! Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      
      {/* Header */}
      <section className="py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 pb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-xl text-gray-400">Let's make your event unforgettable</p>
        </motion.div>
      </section>

      {/* Contact Form */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700/50 relative overflow-hidden"
          >
            {/* Glimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'linear' }}
            />

            <div className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label htmlFor="name" className="block text-gray-300 mb-2 font-semibold flex items-center gap-2">
                    <User size={20} className="text-purple-400" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label htmlFor="email" className="block text-gray-300 mb-2 font-semibold flex items-center gap-2">
                    <Mail size={20} className="text-pink-400" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <label htmlFor="phone" className="block text-gray-300 mb-2 font-semibold flex items-center gap-2">
                    <Phone size={20} className="text-purple-400" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                    placeholder="07359 189 070"
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <label htmlFor="message" className="block text-gray-300 mb-2 font-semibold flex items-center gap-2">
                    <MessageSquare size={20} className="text-pink-400" />
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all duration-300 resize-none"
                    placeholder="Tell us about your event..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || submitted}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                      submitted ? 'bg-green-600' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Send size={20} />
                      </motion.div>
                    ) : submitted ? (
                      <>✓ Message Sent!</>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Direct Contact Methods */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-8 text-purple-400"
          >
            Or Contact Us Directly
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/447359189070"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('contact_page')}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-center relative overflow-hidden group cursor-pointer"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-green-600/0 group-hover:from-green-400/20 group-hover:to-green-600/20 transition-all duration-500" />
              
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-white" strokeWidth={1.5} />
                <h3 className="text-2xl font-bold text-white mb-2">WhatsApp</h3>
                <p className="text-green-100 text-lg font-semibold">+44 7359 189 070</p>
                <p className="text-green-200 text-sm mt-2">Chat with us instantly</p>
              </motion.div>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:hello@pimpmyparty.co.uk"
              onClick={() => trackEmailClick('contact_page')}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-center relative overflow-hidden group cursor-pointer"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-pink-600/0 group-hover:from-purple-400/20 group-hover:to-pink-600/20 transition-all duration-500" />
              
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <Mail className="w-16 h-16 mx-auto mb-4 text-white" strokeWidth={1.5} />
                <h3 className="text-2xl font-bold text-white mb-2">Email</h3>
                <p className="text-purple-100 text-lg font-semibold">hello@pimpmyparty.co.uk</p>
                <p className="text-purple-200 text-sm mt-2">Send us an email</p>
              </motion.div>
            </motion.a>

            {/* Phone */}
            <motion.a
              href="tel:+447359189070"
              onClick={() => trackPhoneClick('contact_page')}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-center relative overflow-hidden group cursor-pointer md:col-span-2"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-indigo-600/0 group-hover:from-blue-400/20 group-hover:to-indigo-600/20 transition-all duration-500" />
              
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <Phone className="w-16 h-16 mx-auto mb-4 text-white" strokeWidth={1.5} />
                <h3 className="text-2xl font-bold text-white mb-2">Call Us</h3>
                <p className="text-blue-100 text-2xl font-bold">07359 189 070</p>
                <p className="text-blue-200 text-sm mt-2">Speak to us directly</p>
              </motion.div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-12"></div>
    </div>
  );
}