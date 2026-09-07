import { publishedLocations } from '@/lib/locations';

export default function sitemap() {
  const baseUrl = 'https://pimpmyparty.co.uk';

  // Location pages carry their own content date in src/lib/locations.js, so a
  // new location appears here automatically with an accurate lastModified.
  const locationPages = publishedLocations.map((location) => ({
    url: `${baseUrl}/${location.slug}`,
    lastModified: new Date(location.contentUpdated),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // TODO: Update these dates whenever content on the corresponding page is changed.
  return [
    {
      url: baseUrl,
      lastModified: new Date('2025-06-01'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2025-05-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date('2025-05-01'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date('2025-05-15'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2025-05-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/brochure`,
      lastModified: new Date('2025-05-01'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/book`,
      lastModified: new Date('2025-05-01'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...locationPages,
  ];
}
