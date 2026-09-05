export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin'],
      },
    ],
    sitemap: 'https://pimpmyparty.co.uk/sitemap.xml',
  };
}
