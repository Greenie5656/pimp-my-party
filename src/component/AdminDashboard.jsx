'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import AddEnquiryModal from '@/component/AddEnquiryModal';
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Music,
  Clock,
  PoundSterling,
  ChevronDown,
  Check,
  LogOut,
  Inbox,
  Plus,
} from 'lucide-react';

// --- Options ---------------------------------------------------------------

// Brand colours carry the surfaces. Status keeps its own semantic colours so
// Joe can read the list at a glance on a phone.
const STATUSES = [
  {
    id: 'new',
    label: 'New',
    dot: 'bg-heliotrope',
    stripe: 'bg-gradient-to-b from-fuchsia to-heliotrope',
    chip: 'bg-heliotrope/20 text-heliotrope border-heliotrope',
  },
  {
    id: 'contacted',
    label: 'Contacted',
    dot: 'bg-amber-400',
    stripe: 'bg-amber-400',
    chip: 'bg-amber-500/20 text-amber-300 border-amber-500',
  },
  {
    id: 'booked',
    label: 'Booked',
    dot: 'bg-green-400',
    stripe: 'bg-green-400',
    chip: 'bg-green-500/20 text-green-300 border-green-500',
  },
  {
    id: 'dead',
    label: 'Dead',
    dot: 'bg-gray-600',
    stripe: 'bg-gray-700',
    chip: 'bg-gray-500/15 text-gray-400 border-gray-600',
  },
];

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'new', label: 'New' },
  { id: 'contacted', label: 'Contacted' },
  { id: 'booked', label: 'Booked' },
  { id: 'dead', label: 'Dead' },
];

// --- Shared animation variants ---------------------------------------------
// Same shape as the ones in Services.jsx and Footer.jsx.

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// --- Helpers ---------------------------------------------------------------

function statusStyle(id) {
  return STATUSES.find((s) => s.id === id) || STATUSES[0];
}

function formatDate(value) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function formatReceived(value) {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function phoneDigits(phone) {
  return String(phone || '').replace(/\D/g, '');
}

// --- Component -------------------------------------------------------------

export default function AdminDashboard({ enquiries }) {
  // The list arrives as a prop from the server, then lives in state so we can
  // update a row instantly without waiting for a page refresh.
  const [rows, setRows] = useState(enquiries);
  const [filter, setFilter] = useState('all');
  const [openId, setOpenId] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState('');
  const [addOpen, setAddOpen] = useState(false);

  const visible = filter === 'all' ? rows : rows.filter((r) => r.status === filter);

  const counts = FILTERS.reduce((acc, f) => {
    acc[f.id] = f.id === 'all' ? rows.length : rows.filter((r) => r.status === f.id).length;
    return acc;
  }, {});

  const update = async (id, changes) => {
    setSavingId(id);
    setError('');

    // Optimistic: show the change straight away.
    const previous = rows;
    setRows(rows.map((r) => (r.id === id ? { ...r, ...changes } : r)));

    try {
      const response = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          status: changes.status,
          depositPaid: changes.deposit_paid,
          notes: changes.notes,
        }),
      });

      if (!response.ok) {
        setRows(previous); // put it back
        const data = await response.json();
        setError(data.error || 'Could not save.');
      }
    } catch {
      setRows(previous);
      setError('Could not reach the server.');
    } finally {
      setSavingId(null);
    }
  };

  // A brand new enquiry goes straight to the top of the list.
  const handleCreated = (enquiry) => {
    setRows([enquiry, ...rows]);
    setFilter('all');
    setOpenId(enquiry.id);
  };

  const logout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Ambient orbs — same idea as the Hero, dialled right down so they
          don't distract from a working screen. */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-tekhelet/30 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 w-96 h-96 bg-heliotrope/20 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Top bar */}
      <div className="border-b border-heliotrope/20 bg-black/60 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-heliotrope via-fuchsia to-heliotrope bg-clip-text text-transparent">
              Bookings
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-fuchsia via-heliotrope to-fuchsia mt-1 mb-1" />
            <p className="text-xs text-gray-500">
              {counts.new} new &middot; {rows.length} total
            </p>
          </motion.div>

          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              onClick={() => setAddOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-tekhelet via-heliotrope to-fuchsia text-white rounded-full px-5 py-2"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add enquiry</span>
            </motion.button>

            <motion.button
              type="button"
              onClick={logout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-heliotrope border border-heliotrope/30 hover:border-heliotrope rounded-full px-5 py-2 transition-colors duration-300"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Log out</span>
            </motion.button>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-4xl mx-auto px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {FILTERS.map((f) => (
            <motion.button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-colors duration-300 ${
                filter === f.id
                  ? 'text-white border-transparent'
                  : 'text-gray-400 border-heliotrope/25 hover:border-heliotrope/60'
              }`}
            >
              {filter === f.id && (
                <motion.span
                  layoutId="filterPill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-tekhelet via-heliotrope to-fuchsia"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">
                {f.label} ({counts[f.id]})
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 relative z-10">
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3"
          >
            {error}
          </motion.p>
        )}

        {visible.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Inbox size={40} className="text-heliotrope/40 mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-gray-500 mb-4">
              {rows.length === 0 ? 'No enquiries yet.' : 'Nothing in this filter.'}
            </p>
            <button
              type="button"
              onClick={() => setAddOpen(true)}
              className="text-sm font-semibold text-heliotrope hover:text-fuchsia transition-colors duration-300"
            >
              Add one by hand
            </button>
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {visible.map((row) => {
            const open = openId === row.id;
            const style = statusStyle(row.status);
            const digits = phoneDigits(row.phone);

            return (
              <motion.div
                key={row.id}
                variants={itemVariants}
                layout
                whileHover={{ y: -2 }}
                className={`group relative bg-gradient-to-br from-tekhelet/70 via-tekhelet/45 to-tekhelet/30 border rounded-lg overflow-hidden shadow-lg shadow-black/70 transition-all duration-300 ${
                  savingId === row.id
                    ? 'border-fuchsia ring-2 ring-fuchsia/40'
                    : open
                      ? 'border-heliotrope ring-1 ring-heliotrope/40'
                      : 'border-heliotrope/30 hover:border-heliotrope'
                }`}
              >
                {/* Status stripe down the left edge — the fastest way to read
                    the list without any text. */}
                <span
                  className={`absolute left-0 top-0 bottom-0 w-1.5 ${style.stripe} pointer-events-none`}
                />

                {/* Hover glow — the Services card pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia/0 to-heliotrope/0 group-hover:from-fuchsia/10 group-hover:to-heliotrope/10 transition-all duration-500 pointer-events-none" />

                {/* Summary row */}
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : row.id)}
                  className="relative z-10 w-full text-left p-4 pl-5 flex items-start gap-3"
                >
                  <span className={`w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0 ${style.dot}`} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold group-hover:text-heliotrope transition-colors duration-300">
                        {row.name}
                      </p>
                      {row.deposit_paid && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/50">
                          Deposit paid
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-300 mt-0.5">
                      {row.event_type || 'Event'}
                      {formatDate(row.event_date) ? ` · ${formatDate(row.event_date)}` : ''}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {row.source && row.source !== 'book'
                        ? `${row.source} · `
                        : ''}
                      {formatReceived(row.created_at)}
                      {row.price_estimate ? ` · quoted ${row.price_estimate}` : ''}
                    </p>
                  </div>

                  <ChevronDown
                    size={20}
                    className={`text-heliotrope flex-shrink-0 transition-transform duration-300 ${
                      open ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Bottom sweep on hover — the Services underline pattern */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-fuchsia to-heliotrope"
                  initial={{ width: '0%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4 }}
                />

                {/* Detail */}
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden relative z-10"
                    >
                      <div className="px-4 pl-5 pb-4 space-y-4 border-t border-heliotrope/25 pt-4">
                        {/* Contact buttons */}
                        <div className="flex flex-wrap gap-2">
                          {digits && (
                            <motion.a
                              href={`tel:${digits}`}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 text-sm bg-black/50 border border-heliotrope/30 hover:border-heliotrope rounded-full px-4 py-2 transition-colors duration-300"
                            >
                              <Phone size={15} className="text-heliotrope" />
                              Call
                            </motion.a>
                          )}
                          {digits && (
                            <motion.a
                              href={`https://wa.me/44${digits.replace(/^0/, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 text-sm bg-black/50 border border-green-500/30 hover:border-green-500 rounded-full px-4 py-2 transition-colors duration-300"
                            >
                              <MessageCircle size={15} className="text-green-400" />
                              WhatsApp
                            </motion.a>
                          )}
                          <motion.a
                            href={`mailto:${row.email}`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 text-sm bg-black/50 border border-fuchsia/30 hover:border-fuchsia rounded-full px-4 py-2 transition-colors duration-300"
                          >
                            <Mail size={15} className="text-fuchsia" />
                            Email
                          </motion.a>
                        </div>

                        {/* Details */}
                        <dl className="text-sm space-y-2 bg-black/50 border border-heliotrope/20 rounded-lg p-4">
                          <Detail icon={Mail} label="Email" value={row.email} />
                          <Detail icon={Phone} label="Phone" value={row.phone} />
                          <Detail icon={MessageCircle} label="Prefers" value={row.contact_pref} />
                          <Detail icon={MapPin} label="Venue" value={row.venue} />
                          <Detail icon={Calendar} label="Package" value={row.package} />
                          <Detail
                            icon={Check}
                            label="Extras"
                            value={
                              Array.isArray(row.extras) && row.extras.length
                                ? row.extras.join(', ')
                                : null
                            }
                          />
                          <Detail icon={Clock} label="Timings" value={row.timings} />
                          <Detail icon={PoundSterling} label="Quoted" value={row.price_estimate} />
                          <Detail icon={Music} label="Music" value={row.music_policy} />
                          <Detail
                            icon={Inbox}
                            label="Source"
                            value={row.source === 'book' ? 'Website form' : row.source}
                          />
                        </dl>

                        {row.details && (
                          <div className="bg-black/50 border border-heliotrope/20 rounded-lg p-3">
                            <p className="text-xs text-heliotrope mb-1">Anything else</p>
                            <p className="text-sm whitespace-pre-wrap">{row.details}</p>
                          </div>
                        )}

                        {/* Status */}
                        <div>
                          <p className="text-xs text-heliotrope mb-2">Status</p>
                          <div className="flex flex-wrap gap-2">
                            {STATUSES.map((s) => (
                              <motion.button
                                key={s.id}
                                type="button"
                                onClick={() => update(row.id, { status: s.id })}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`text-sm font-semibold px-4 py-2 rounded-full border transition-colors duration-300 ${
                                  row.status === s.id
                                    ? s.chip
                                    : 'bg-black/40 text-gray-400 border-gray-600 hover:border-heliotrope/60'
                                }`}
                              >
                                {s.label}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {/* Deposit */}
                        <motion.button
                          type="button"
                          onClick={() => update(row.id, { deposit_paid: !row.deposit_paid })}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={`flex items-center gap-3 w-full bg-black/50 border rounded-lg p-3 transition-colors duration-300 ${
                            row.deposit_paid
                              ? 'border-green-500/60'
                              : 'border-heliotrope/20 hover:border-heliotrope'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded flex items-center justify-center border flex-shrink-0 transition-colors duration-300 ${
                              row.deposit_paid
                                ? 'bg-green-500 border-green-500'
                                : 'border-gray-600'
                            }`}
                          >
                            {row.deposit_paid && <Check size={14} strokeWidth={3} />}
                          </span>
                          <span className="text-sm font-semibold">£100 deposit received</span>
                        </motion.button>

                        {/* Notes */}
                        <NotesBox
                          value={row.notes || ''}
                          saving={savingId === row.id}
                          onSave={(notes) => update(row.id, { notes })}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <AddEnquiryModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onCreated={handleCreated}
      />
    </div>
  );
}

// --- Small pieces ----------------------------------------------------------

function Detail({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex gap-3">
      <Icon size={15} className="text-heliotrope/70 mt-0.5 flex-shrink-0" />
      <dt className="text-gray-400 w-20 flex-shrink-0">{label}</dt>
      <dd className="text-white whitespace-pre-wrap">{value}</dd>
    </div>
  );
}

function NotesBox({ value, saving, onSave }) {
  const [text, setText] = useState(value);
  const dirty = text !== value;

  return (
    <div>
      <p className="text-xs text-heliotrope mb-2">Your notes</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="3"
        placeholder="Called Tuesday, sending quote..."
        className="w-full bg-black/50 border border-heliotrope/20 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-heliotrope focus:ring-2 focus:ring-heliotrope/40 transition-all duration-300 resize-none"
      />
      <AnimatePresence>
        {dirty && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSave(text)}
            disabled={saving}
            className="mt-2 text-sm font-semibold bg-gradient-to-r from-tekhelet via-heliotrope to-fuchsia px-5 py-2 rounded-full disabled:opacity-70"
          >
            {saving ? 'Saving...' : 'Save note'}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}