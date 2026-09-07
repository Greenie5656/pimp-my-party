import Brochure from "@/component/Brochure";

const title = "DJ, Photo Booth & Party Prices | Download Our Brochure | Pimp My Party";
const description = "Download our brochures for full prices: wedding and party DJs, saxophone players, photo booths, dancefloor hire, venue lighting and LED letters across Manchester and Greater Manchester.";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: 'https://pimpmyparty.co.uk/brochure',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Pimp My Party',
    title,
    description,
    url: 'https://pimpmyparty.co.uk/brochure',
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
      "name": "Brochure",
      "item": "https://pimpmyparty.co.uk/brochure"
    }
  ]
};

export default function BrochurePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Brochure />
    </main>
  );
}