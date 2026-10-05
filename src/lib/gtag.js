export const GA_MEASUREMENT_ID = 'G-J22NSQHKQ2';

// Send a custom GA4 event
export function trackEvent(eventName, parameters = {}) {
  // Tracking must never break the page - e.g. if an ad blocker interferes
  // with GA, the click or form submission still carries on as normal.
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  } catch {
    // Ignore - analytics is optional.
  }
}

// --- Pre-built event helpers ---

// `extra` lets a form add safe, non-personal detail (e.g. the package
// chosen). The contact form passes nothing, so its event is unchanged.
export function trackFormSubmission(formName, extra = {}) {
  trackEvent('generate_lead', {
    event_category: 'form',
    event_label: formName,
    ...extra,
  });
}

export function trackPhoneClick(location) {
  trackEvent('contact_click', {
    event_category: 'contact',
    contact_method: 'phone',
    event_label: location,
  });
}

export function trackWhatsAppClick(location) {
  trackEvent('contact_click', {
    event_category: 'contact',
    contact_method: 'whatsapp',
    event_label: location,
  });
}

export function trackEmailClick(location) {
  trackEvent('contact_click', {
    event_category: 'contact',
    contact_method: 'email',
    event_label: location,
  });
}

export function trackBrochureDownload(brochureName) {
  trackEvent('file_download', {
    event_category: 'brochure',
    event_label: brochureName,
  });
}

export function trackCTAClick(ctaName, location) {
  trackEvent('cta_click', {
    event_category: 'cta',
    event_label: ctaName,
    cta_location: location,
  });
}

export function trackSocialClick(platform) {
  trackEvent('social_click', {
    event_category: 'social',
    event_label: platform,
  });
}

// Clicks on any "Book" button. `location` says which button it was, e.g.
// 'navbar_desktop' or 'homepage_hero'.
export function trackBookingCTAClick(location) {
  trackEvent('booking_cta_click', {
    cta_location: location,
  });
}

// The visitor has finished step 1 of the booking form and moved on.
// Never send personal details here - only things like the event type.
export function trackBookingStart(params = {}) {
  trackEvent('booking_start', params);
}
