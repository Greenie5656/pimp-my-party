// Single source of truth for packages, extras and pricing.
// Used by the public booking form AND the admin "add enquiry" modal, so
// there's only ever one place to edit when Joe's services change.

export const EVENT_TYPES = [
  'Wedding',
  'Birthday Party',
  'Anniversary',
  'Corporate Event',
  'Christening',
  'Other',
];

// `duration` is optional. Only All-Day Wedding DJ states one, because the
// hours on the other two are settled on the call rather than fixed here.
// Anything reading it must cope with it being absent - use packageLabel().
export const PACKAGES = [
  {
    id: 'party-dj',
    name: 'Party DJ',
    price: 400,
    blurb: 'Perfect for birthdays, anniversaries and celebrations.',
  },
  {
    id: 'evening-wedding-dj',
    name: 'Evening Wedding DJ',
    price: 600,
    blurb: 'From the first dance through to the last song.',
  },
  {
    id: 'all-day-wedding-dj',
    name: 'All-Day Wedding DJ',
    duration: 'Full day',
    price: 900,
    blurb: 'Ceremony, drinks reception, wedding breakfast and evening.',
  },
];

// min/max are used only to build the rough range shown to the customer.
export const EXTRAS = [
  { id: 'live-musicians', label: 'Live Musicians', hint: 'Sax, percussionist', min: 400, max: 800 },
  { id: 'photobooth', label: 'Photobooth', hint: 'With or without prints', min: 250, max: 450 },
  { id: 'led-dancefloor', label: 'LED Dancefloor', hint: 'Various sizes', min: 350, max: 600 },
  { id: 'uplighting', label: 'Uplighting', hint: 'Colour-matched to your theme', min: 100, max: 250 },
  { id: 'led-letters', label: 'LED Letters & Numbers', hint: 'Names, initials, ages', min: 80, max: 320 },
  { id: 'special-effects', label: 'Special Effects', hint: 'Low fog, cold sparks', min: 200, max: 300 },
  { id: 'guestbook', label: 'Audio Guestbook & Postbox', hint: 'Messages from your guests', min: 50, max: 75 },
  { id: 'styling', label: 'Balloons & Styling', hint: 'Displays, linen, chair covers', min: 120, max: 300 },
];

export const CONTACT_PREFS = ['Phone call', 'WhatsApp', 'Email'];

// Where an enquiry came from. 'book' is set automatically by the website form.
export const SOURCES = [
  'Phone call',
  'WhatsApp',
  'Email',
  'Facebook',
  'Instagram',
  'Referral',
  'Wedding fair',
  'Venue recommendation',
  'Other',
];

// The one place the package string saved to the database and shown in the
// notification email is built. Skips the duration when a package has none,
// so we get "Party DJ — £400" rather than "Party DJ () — £400".
export function packageLabel(pkg) {
  if (!pkg) return '';
  const duration = pkg.duration ? ` (${pkg.duration})` : '';
  return `${pkg.name}${duration} — £${pkg.price}`;
}

const roundTo50 = (value) => Math.round(value / 50) * 50;

export function buildEstimate(packageId, extraIds) {
  const pkg = PACKAGES.find((p) => p.id === packageId);
  if (!pkg) return null;

  let min = pkg.price;
  let max = pkg.price;

  (extraIds || []).forEach((id) => {
    const extra = EXTRAS.find((e) => e.id === id);
    if (extra) {
      min += extra.min;
      max += extra.max;
    }
  });

  min = roundTo50(min);
  max = roundTo50(max);

  return {
    min,
    max,
    label: min === max ? `£${min}` : `£${min} – £${max}`,
  };
}