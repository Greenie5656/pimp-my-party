// Single source of truth for the site's public hostname and everything
// derived from it.
//
// www is the production hostname: the apex redirects to it on Vercel, it is
// the URL that actually gets shared, and it is the verified URL-prefix
// property in Search Console. Every absolute URL the site emits — canonicals,
// Open Graph, Twitter cards, JSON-LD, the sitemap and robots.txt — has to
// agree on it, so they all come from here.
//
// Changing hostname is this one line. Do not hardcode the host anywhere else.
export const SITE_URL = 'https://www.pimpmyparty.co.uk';

// Absolute URL for a path on this site.
//   url('/about')    -> SITE_URL + '/about'
//   url('/') / url() -> SITE_URL, with no trailing slash
// The bare origin comes back without a trailing slash, which is what the
// homepage canonical and the breadcrumb root already used.
export function url(path = '/') {
  if (!path || path === '/') return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

// The LocalBusiness node is declared once, in app/layout.js. Anything that
// needs to point at that business — a Service's provider, for instance —
// must use this exact string rather than rebuilding it, because the two are
// matched as strings and a mismatch fails silently: no error, no build
// failure, the provider reference just stops resolving.
export const LOCAL_BUSINESS_ID = `${SITE_URL}/#localbusiness`;

// The shared social card, public/socials.png at 1200x630. Every page uses
// this same image; there are no per-page cards.
export const OG_IMAGE = {
  url: url('/socials.png'),
  width: 1200,
  height: 630,
  alt: 'Pimp My Party - DJ & Entertainment Services Manchester',
  type: 'image/png',
};
