'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';
import { BOOKING_PATH } from '@/lib/site';
import { trackBookingCTAClick } from '@/lib/gtag';

// next/link with the same hover/tap animation as the existing motion.a buttons.
const MotionLink = motion.create(Link);

// Each style copies an existing button on the site:
//   primary - the gradient pill on dark pages (LocationContent phone button)
//   light   - the white pill inside the coloured CTA boxes (CTA.jsx)
//   nav     - a compact gradient pill sized to sit in the NavBar
const VARIANTS = {
  primary:
    'inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-full transition-opacity duration-300 hover:opacity-90',
  light:
    'inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300',
  nav:
    'inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm whitespace-nowrap px-4 py-1 rounded-full transition-opacity duration-300 hover:opacity-90',
};

// `label` is the button text. `location` only labels the GA4
// booking_cta_click event so we can see which button people use - it is
// never shown on the page.
export default function BookingCTA({ label, location, variant = 'primary' }) {
  return (
    <MotionLink
      href={BOOKING_PATH}
      onClick={() => trackBookingCTAClick(location)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={VARIANTS[variant] || VARIANTS.primary}
    >
      <CalendarCheck size={variant === 'nav' ? 16 : 18} aria-hidden="true" />
      {label}
    </MotionLink>
  );
}
