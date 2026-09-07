import AboutContent from "@/component/AboutContent";

const title = "About Pimp My Party | 20 Years of DJ & Event Experience in Manchester";
const description = "Twenty years of running events across Manchester and Greater Manchester, from intimate weddings to festivals of 6,000 people. Meet the team behind your DJ, saxophone player, photo booth and event planning.";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: 'https://pimpmyparty.co.uk/about',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Pimp My Party',
    title,
    description,
    url: 'https://pimpmyparty.co.uk/about',
    images: [
      {
        url: 'https://pimpmyparty.co.uk/socials.png',
        width: 1200,
        height: 630,
        alt: 'Pimp My Party - DJ & Entertainment Services Manchester',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@pimpmypartymcr',
    title,
    description,
    images: ['https://pimpmyparty.co.uk/socials.png'],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://pimpmyparty.co.uk"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About Us",
      "item": "https://pimpmyparty.co.uk/about"
    }
  ]
};

export default function AboutPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutContent />
    </main>
  );
}
