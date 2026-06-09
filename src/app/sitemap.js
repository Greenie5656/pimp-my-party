export default function sitemap() {
  const baseUrl = 'https://pimpmyparty.co.uk';

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
  ];
}