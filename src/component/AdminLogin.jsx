'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Lock, LogIn } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!password) {
      setError('Please enter the password.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        // Full reload so the server re-reads the cookie and renders the
        // dashboard instead of this form.
        window.location.reload();
      } else {
        const data = await response.json();
        setError(data.error || 'Could not log in.');
        setIsSubmitting(false);
      }
    } catch {
      setError('Could not reach the server.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl p-8"
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-800 mx-auto mb-6">
          <Lock size={24} className="text-purple-400" />
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Bookings Dashboard</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your password to continue
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
          autoFocus
          className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
          placeholder="Password"
        />

        {error && (
          <p className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <motion.button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70"
        >
          <LogIn size={18} />
          {isSubmitting ? 'Checking...' : 'Log In'}
        </motion.button>
      </motion.div>
    </div>
  );
}