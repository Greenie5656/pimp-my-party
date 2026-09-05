'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Plus, Check } from 'lucide-react';
import {
  EVENT_TYPES,
  PACKAGES,
  EXTRAS,
  CONTACT_PREFS,
  SOURCES,
  buildEstimate,
} from '@/lib/booking-options';

const STATUS_OPTIONS = [
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'booked', label: 'Booked' },
];

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  source: 'Phone call',
  status: 'new',
  eventType: '',
  eventDate: '',
  venue: '',
  package: '',
  extras: [],
  timings: '',
  musicPolicy: '',
  details: '',
  contactPref: '',
  notes: '',
};

const inputClasses =
  'w-full bg-black/50 border border-heliotrope/20 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-heliotrope focus:ring-2 focus:ring-heliotrope/40 transition-all duration-300';

const labelClasses = 'block text-xs text-heliotrope mb-1.5 font-semibold';

const chipBase =
  'px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors duration-300';
const chipOn = 'bg-heliotrope/20 text-heliotrope border-heliotrope';
const chipOff = 'bg-black/40 text-gray-400 border-gray-600 hover:border-heliotrope/60';

export default function AddEnquiryModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const estimate = buildEstimate(form.package, form.extras);

  const change = (e) => {
    setError('');
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const set = (field, value) => {
    setError('');
    setForm({ ...form, [field]: value });
  };

  const toggleExtra = (id) => {
    setError('');
    setForm({
      ...form,
      extras: form.extras.includes(id)
        ? form.extras.filter((x) => x !== id)
        : [...form.extras, id],
    });
  };

  const close = () => {
    setForm(EMPTY);
    setError('');
    onClose();
  };

  const save = async () => {
    if (!form.name.trim()) {
      setError('Please enter a name.');
      return;
    }
    if (!form.email.trim() && !form.phone.trim()) {
      setError('Add an email address or a phone number.');
      return;
    }

    setSaving(true);
    setError('');

    const extraLabels = form.extras.map(
      (id) => EXTRAS.find((e) => e.id === id)?.label || id
    );
    const pkg = PACKAGES.find((p) => p.id === form.package);

    try {
      const response = await fetch('/api/admin/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          extras: extraLabels,
          package: pkg ? `${pkg.name} (${pkg.duration}) — £${pkg.price}` : '',
          priceEstimate: estimate ? estimate.label : '',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onCreated(data.enquiry);
        setForm(EMPTY);
        onClose();
      } else {
        setError(data.error || 'Could not save.');
      }
    } catch {
      setError('Could not reach the server.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl my-8 bg-gradient-to-br from-tekhelet/80 via-tekhelet/50 to-tekhelet/35 border-2 border-heliotrope/40 rounded-lg shadow-2xl shadow-black/80"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-heliotrope/25">
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-heliotrope via-fuchsia to-heliotrope bg-clip-text text-transparent">
                  Add Enquiry
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  For enquiries that came in by phone, WhatsApp or social
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="text-gray-400 hover:text-heliotrope transition-colors duration-300 p-1"
              >
                <X size={22} />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Who */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className={labelClasses}>Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={change}
                    autoFocus
                    className={inputClasses}
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className={labelClasses}>Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={change}
                    className={inputClasses}
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className={labelClasses}>Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={change}
                    className={inputClasses}
                    placeholder="07359 189 070"
                  />
                </div>
              </div>

              {/* Source */}
              <div>
                <label className={labelClasses}>Where did it come from?</label>
                <div className="flex flex-wrap gap-2">
                  {SOURCES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => set('source', s)}
                      className={`${chipBase} ${form.source === s ? chipOn : chipOff}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Event */}
              <div>
                <label className={labelClasses}>Event type</label>
                <div className="flex flex-wrap gap-2">
                  {EVENT_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => set('eventType', form.eventType === t ? '' : t)}
                      className={`${chipBase} ${form.eventType === t ? chipOn : chipOff}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClasses}>Event date</label>
                  <input
                    name="eventDate"
                    type="date"
                    value={form.eventDate}
                    onChange={change}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Venue</label>
                  <input
                    name="venue"
                    value={form.venue}
                    onChange={change}
                    className={inputClasses}
                    placeholder="Alberts Standish"
                  />
                </div>
              </div>

              {/* Package */}
              <div>
                <label className={labelClasses}>Package</label>
                <div className="flex flex-wrap gap-2">
                  {PACKAGES.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => set('package', form.package === p.id ? '' : p.id)}
                      className={`${chipBase} ${form.package === p.id ? chipOn : chipOff}`}
                    >
                      {p.name} · £{p.price}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extras */}
              <div>
                <label className={labelClasses}>Extras</label>
                <div className="flex flex-wrap gap-2">
                  {EXTRAS.map((x) => (
                    <button
                      key={x.id}
                      type="button"
                      onClick={() => toggleExtra(x.id)}
                      className={`${chipBase} flex items-center gap-1.5 ${
                        form.extras.includes(x.id) ? chipOn : chipOff
                      }`}
                    >
                      {form.extras.includes(x.id) && <Check size={12} strokeWidth={3} />}
                      {x.label}
                    </button>
                  ))}
                </div>
              </div>

              {estimate && (
                <div className="bg-black/50 border border-heliotrope/25 rounded-lg px-4 py-3 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Rough guide price</span>
                  <span className="text-lg font-bold bg-gradient-to-r from-heliotrope to-fuchsia bg-clip-text text-transparent">
                    {estimate.label}
                  </span>
                </div>
              )}

              {/* Detail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClasses}>Timings</label>
                  <input
                    name="timings"
                    value={form.timings}
                    onChange={change}
                    className={inputClasses}
                    placeholder="7pm - midnight"
                  />
                </div>
                <div>
                  <label className={labelClasses}>Prefers to be contacted by</label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {CONTACT_PREFS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => set('contactPref', form.contactPref === c ? '' : c)}
                        className={`${chipBase} ${form.contactPref === c ? chipOn : chipOff}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClasses}>Music notes</label>
                <textarea
                  name="musicPolicy"
                  value={form.musicPolicy}
                  onChange={change}
                  rows="2"
                  className={`${inputClasses} resize-none`}
                  placeholder="Must-plays, do-not-plays..."
                />
              </div>

              <div>
                <label className={labelClasses}>Anything else</label>
                <textarea
                  name="details"
                  value={form.details}
                  onChange={change}
                  rows="2"
                  className={`${inputClasses} resize-none`}
                  placeholder="Guest numbers, special requests..."
                />
              </div>

              <div>
                <label className={labelClasses}>Your notes</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={change}
                  rows="2"
                  className={`${inputClasses} resize-none`}
                  placeholder="Rang Tuesday, quoting Thursday..."
                />
              </div>

              {/* Status */}
              <div>
                <label className={labelClasses}>Status</label>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => set('status', s.id)}
                      className={`${chipBase} ${form.status === s.id ? chipOn : chipOff}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3"
                >
                  {error}
                </motion.p>
              )}
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-5 border-t border-heliotrope/25">
              <button
                type="button"
                onClick={close}
                className="px-5 py-2.5 rounded-full border border-gray-600 text-gray-300 text-sm font-semibold hover:border-gray-400 transition-colors duration-300"
              >
                Cancel
              </button>
              <motion.button
                type="button"
                onClick={save}
                disabled={saving}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-tekhelet via-heliotrope to-fuchsia text-white font-bold py-2.5 rounded-full flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <Plus size={18} />
                {saving ? 'Saving...' : 'Add Enquiry'}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}