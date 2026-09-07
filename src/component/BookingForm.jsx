'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { trackFormSubmission } from '@/lib/gtag';
import {
  Calendar,
  MapPin,
  PartyPopper,
  Disc3,
  Sparkles,
  Clock,
  Music,
  User,
  Mail,
  Phone,
  MessageSquare,
  ArrowLeft,
  ArrowRight,
  Send,
  Check,
  CreditCard,
} from 'lucide-react';

import {
  EVENT_TYPES,
  PACKAGES,
  EXTRAS,
  CONTACT_PREFS,
  buildEstimate,
  packageLabel,
} from '@/lib/booking-options';

// --- Configuration ---------------------------------------------------------

// PASTE JOE'S £100 STRIPE PAYMENT LINK HERE.
// While this is an empty string the deposit button simply doesn't render —
// everything else works exactly the same.
const STRIPE_DEPOSIT_LINK = 'https://buy.stripe.com/3cI7sNgQPdyPgoz5PS4ko01';
const DEPOSIT_AMOUNT = '£100';

// --- Static options --------------------------------------------------------

const TOTAL_STEPS = 5;

const EMPTY_FORM = {
  eventType: '',
  eventDate: '',
  venue: '',
  package: '',
  extras: [],
  timings: '',
  musicPolicy: '',
  details: '',
  name: '',
  email: '',
  phone: '',
  contactPref: '',
  booking_ref: '', // honeypot — must stay empty
};

// --- Shared styles ---------------------------------------------------------

const inputClasses =
  'w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300';

const labelClasses = 'text-gray-300 mb-2 font-semibold flex items-center gap-2';

// iOS Safari sizes date inputs from their intrinsic content and ignores
// width: 100%, so the field grows wider than the card and spills over the
// edge. Killing the native appearance and pinning the box width keeps it in.
const dateInputClasses = `${inputClasses} block appearance-none min-w-0 max-w-full [&::-webkit-date-and-time-value]:text-left [&::-webkit-date-and-time-value]:min-h-[1.5rem]`;



// --- Component -------------------------------------------------------------

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // The card is the thing worth looking at when a step changes, so we scroll
  // to it rather than the very top of the page. The sticky nav sits over the
  // first ~80px, so leave it some room.
  const cardRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Don't hijack the scroll position on the initial page load.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const card = cardRef.current;
    const top = card
      ? Math.max(card.getBoundingClientRect().top + window.scrollY - 96, 0)
      : 0;

    window.scrollTo({ top, behavior: 'smooth' });
  }, [step, submitted]);

  const estimate = buildEstimate(formData.package, formData.extras);

  // Same pattern as the contact form: one handler, keyed off the input's name.
  const handleChange = (e) => {
    setError('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // For the tappable cards, which aren't real inputs.
  const setField = (field, value) => {
    setError('');
    setFormData({ ...formData, [field]: value });
  };

  const toggleExtra = (id) => {
    setError('');
    setFormData({
      ...formData,
      extras: formData.extras.includes(id)
        ? formData.extras.filter((item) => item !== id)
        : [...formData.extras, id],
    });
  };

  // Each step decides for itself whether it's complete.
  const validateStep = () => {
    if (step === 1) {
      if (!formData.eventType) return 'Please choose your event type.';
      if (!formData.eventDate) return 'Please choose your event date.';
    }
    if (step === 2) {
      if (!formData.package) return 'Please choose a package.';
    }
    if (step === 5) {
      if (!formData.name.trim()) return 'Please tell us your name.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        return 'Please enter a valid email address.';
      }
    }
    return '';
  };

  const goNext = () => {
    const message = validateStep();
    if (message) {
      setError(message);
      return;
    }
    setStep(step + 1);
  };

  const goBack = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    const message = validateStep();
    if (message) {
      setError(message);
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Turn the extra ids back into readable labels before sending.
    const extraLabels = formData.extras.map(
      (id) => EXTRAS.find((extra) => extra.id === id)?.label || id
    );

    const selectedPackage = PACKAGES.find((p) => p.id === formData.package);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventDate: formData.eventDate,
          eventType: formData.eventType,
          venue: formData.venue,
          package: packageLabel(selectedPackage),
          extras: extraLabels,
          timings: formData.timings,
          musicPolicy: formData.musicPolicy,
          details: formData.details,
          contactPref: formData.contactPref,
          priceEstimate: estimate ? estimate.label : '',
          source: 'book',
          booking_ref: formData.booking_ref,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        trackFormSubmission('booking_form');
        setSubmitted(true);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Could not reach the server. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Confirmation screen -------------------------------------------------

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          ref={cardRef}
          className="max-w-lg w-full bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-gray-700/50 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 mb-6"
          >
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </motion.div>

          <h2 className="text-3xl font-bold mb-3">Enquiry Received</h2>
          <p className="text-gray-400 mb-6">
            Thanks {formData.name.split(' ')[0]} — we&apos;ve got your details and
            we&apos;ll be in touch shortly to talk through your event.
          </p>

          {/* Rough price */}
          {estimate && (
            <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6 mb-6 text-left">
              <p className="text-sm text-gray-400 mb-1">Rough guide price</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                {estimate.label}
              </p>
              <p className="text-xs text-gray-500">
                An estimate based on what you&apos;ve selected. Your final quote depends
                on timings, venue and exact options — we&apos;ll confirm everything
                before anything is booked.
              </p>
            </div>
          )}

          {/* Deposit */}
          {STRIPE_DEPOSIT_LINK && (
            <div className="mb-6">
              <motion.a
                href={STRIPE_DEPOSIT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-4 py-4 rounded-xl text-center text-[0.9375rem] sm:text-base leading-snug transition-all duration-300"
              >
                {/* The icon sits in the text flow rather than as a flex sibling:
                    on a narrow phone the label wraps, and a flex icon gets
                    stranded against the left edge while the text centres. */}
                <CreditCard
                  size={18}
                  className="inline-block align-[-0.2em] mr-2"
                  aria-hidden="true"
                />
                Secure your date — {DEPOSIT_AMOUNT} deposit
              </motion.a>
              <p className="text-xs text-gray-500 mt-3">
                Optional. Your enquiry is already with us either way. If we can&apos;t
                cover your date, your deposit is refunded in full.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/447359189070"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700/50 border border-gray-600 text-white font-semibold px-6 py-3 rounded-xl transition-transform duration-300 hover:scale-105"
            >
              Message us on WhatsApp
            </a>
            <a
              href="/"
              className="bg-gray-700/50 border border-gray-600 text-white font-semibold px-6 py-3 rounded-xl transition-transform duration-300 hover:scale-105"
            >
              Back to Home
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- Form ----------------------------------------------------------------

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <section className="py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 pb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Book Your Event
          </h1>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-xl text-gray-400">
            A few quick questions and we&apos;ll get straight back to you
          </p>
        </motion.div>
      </section>

      <section className="pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            ref={cardRef}
            className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 md:p-10 border border-gray-700/50"
          >
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span className="font-semibold">Step {step} of {TOTAL_STEPS}</span>
                <span>{Math.round((step / TOTAL_STEPS) * 100)}% complete</span>
              </div>
              <div className="h-2 bg-gray-900/70 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={false}
                  animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Honeypot — hidden from people, irresistible to bots.
                Deliberately NOT named "company" or anything else a browser
                might autofill. */}
            <input
              type="text"
              name="booking_ref"
              value={formData.booking_ref}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              data-lpignore="true"
              data-1p-ignore
              aria-hidden="true"
              className="absolute left-[-9999px] w-px h-px opacity-0"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                {/* ---------------- Step 1 ---------------- */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-2">About your event</h2>

                    <div>
                      <p className={labelClasses}>
                        <PartyPopper size={20} className="text-purple-400" />
                        What kind of event is it?
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {EVENT_TYPES.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setField('eventType', type)}
                            className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                              formData.eventType === type
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-transparent text-white'
                                : 'bg-gray-900/50 border-gray-700 text-gray-300 hover:border-purple-500'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="eventDate" className={labelClasses}>
                        <Calendar size={20} className="text-pink-400" />
                        Event date
                      </label>
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className={dateInputClasses}
                      />
                    </div>

                    <div>
                      <label htmlFor="venue" className={labelClasses}>
                        <MapPin size={20} className="text-purple-400" />
                        Venue{' '}
                        <span className="font-normal text-gray-500">(if you know it)</span>
                      </label>
                      <input
                        type="text"
                        id="venue"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="e.g. Alberts Standish, Manchester"
                      />
                    </div>
                  </div>
                )}

                {/* ---------------- Step 2 ---------------- */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-2">Choose your package</h2>

                    <div className="space-y-3">
                      {PACKAGES.map((pkg) => (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => setField('package', pkg.id)}
                          className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                            formData.package === pkg.id
                              ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-purple-500'
                              : 'bg-gray-900/50 border-gray-700 hover:border-purple-500'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Disc3
                              size={24}
                              className="text-purple-400 flex-shrink-0 mt-1"
                              strokeWidth={1.5}
                            />
                            <div>
                              <p className="font-bold text-lg">{pkg.name}</p>
                              {pkg.duration && (
                                <p className="text-sm text-gray-400">{pkg.duration}</p>
                              )}
                              <p className="text-sm text-gray-400 mt-1">{pkg.blurb}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <p className="text-sm text-gray-500">
                      Additional hours can be added — we&apos;ll cover that on the call.
                    </p>
                  </div>
                )}

                {/* ---------------- Step 3 ---------------- */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-1">Anything to add?</h2>
                    <p className="text-gray-400 text-sm">
                      Tap anything you&apos;re interested in. Nothing is committed — we&apos;ll
                      price it up together.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {EXTRAS.map((extra) => {
                        const selected = formData.extras.includes(extra.id);
                        return (
                          <button
                            key={extra.id}
                            type="button"
                            onClick={() => toggleExtra(extra.id)}
                            className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                              selected
                                ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-purple-500'
                                : 'bg-gray-900/50 border-gray-700 hover:border-purple-500'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border ${
                                  selected
                                    ? 'bg-purple-500 border-purple-500'
                                    : 'border-gray-600'
                                }`}
                              >
                                {selected && <Check size={14} strokeWidth={3} />}
                              </div>
                              <div>
                                <p className="font-semibold">{extra.label}</p>
                                <p className="text-xs text-gray-500">{extra.hint}</p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ---------------- Step 4 ---------------- */}
                {step === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-2">The finer details</h2>

                    <div>
                      <label htmlFor="timings" className={labelClasses}>
                        <Clock size={20} className="text-purple-400" />
                        Timings{' '}
                        <span className="font-normal text-gray-500">(optional)</span>
                      </label>
                      <input
                        type="text"
                        id="timings"
                        name="timings"
                        value={formData.timings}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="e.g. 7pm start, midnight finish"
                      />
                    </div>

                    <div>
                      <label htmlFor="musicPolicy" className={labelClasses}>
                        <Music size={20} className="text-pink-400" />
                        Music{' '}
                        <span className="font-normal text-gray-500">(optional)</span>
                      </label>
                      <textarea
                        id="musicPolicy"
                        name="musicPolicy"
                        value={formData.musicPolicy}
                        onChange={handleChange}
                        rows="3"
                        className={`${inputClasses} resize-none`}
                        placeholder="Must-plays, do-not-plays, genres you love or hate..."
                      />
                    </div>

                    <div>
                      <label htmlFor="details" className={labelClasses}>
                        <MessageSquare size={20} className="text-purple-400" />
                        Anything else{' '}
                        <span className="font-normal text-gray-500">(optional)</span>
                      </label>
                      <textarea
                        id="details"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        rows="4"
                        className={`${inputClasses} resize-none`}
                        placeholder="Guest numbers, special moments, anything we should know..."
                      />
                    </div>
                  </div>
                )}

                {/* ---------------- Step 5 ---------------- */}
                {step === 5 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold mb-2">How do we reach you?</h2>

                    <div>
                      <label htmlFor="name" className={labelClasses}>
                        <User size={20} className="text-purple-400" />
                        Your name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                        placeholder="Jane Smith"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClasses}>
                        <Mail size={20} className="text-pink-400" />
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                        placeholder="jane@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className={labelClasses}>
                        <Phone size={20} className="text-purple-400" />
                        Phone number{' '}
                        <span className="font-normal text-gray-500">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="07359 189 070"
                      />
                    </div>

                    <div>
                      <p className={labelClasses}>
                        <Sparkles size={20} className="text-pink-400" />
                        Preferred way to hear back
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {CONTACT_PREFS.map((pref) => (
                          <button
                            key={pref}
                            type="button"
                            onClick={() => setField('contactPref', pref)}
                            className={`px-3 py-3 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                              formData.contactPref === pref
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-transparent text-white'
                                : 'bg-gray-900/50 border-gray-700 text-gray-300 hover:border-purple-500'
                            }`}
                          >
                            {pref}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Running estimate — appears once a package is chosen */}
            {estimate && step >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-gray-900/60 border border-gray-700 rounded-xl px-5 py-4 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="text-xs text-gray-500">Rough guide price</p>
                  <p className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {estimate.label}
                  </p>
                </div>
                <p className="text-xs text-gray-500 max-w-[55%] text-right">
                  Estimate only. We&apos;ll confirm your exact quote.
                </p>
              </motion.div>
            )}

            {/* Error message */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3"
              >
                {error}
              </motion.p>
            )}

            {/* Navigation */}
            <div className="mt-8 flex gap-3">
              {step > 1 && (
                <motion.button
                  type="button"
                  onClick={goBack}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-gray-600 bg-gray-900/50 text-gray-300 font-semibold transition-all duration-300 hover:border-gray-500"
                >
                  <ArrowLeft size={20} />
                  Back
                </motion.button>
              )}

              {step < TOTAL_STEPS ? (
                <motion.button
                  type="button"
                  onClick={goNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                >
                  Continue
                  <ArrowRight size={20} />
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Send size={20} />
                    </motion.div>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Enquiry
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Reassurance */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Prefer to talk?{' '}
            <a href="tel:+447359189070" className="text-purple-400 hover:text-pink-400">
              07359 189 070
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}