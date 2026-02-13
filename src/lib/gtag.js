export const GA_MEASUREMENT_ID = 'G-J22NSQHKQ2';

// Send a custom GA4 event
export function trackEvent(eventName, parameters = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
}

// --- Pre-built event helpers ---

export function trackFormSubmission(formName) {
  trackEvent('generate_lead', {
    event_category: 'form',
    event_label: formName,
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
