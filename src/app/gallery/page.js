import GalleryContent from "@/component/GalleryContent";

export const metadata = {
  title: "Gallery | Pimp My Party - Event Photos & Highlights Manchester",
  description: "Browse photos from weddings, parties and events across Manchester and Greater Manchester. See our DJ setups, saxophone performances, photobooths and venue lighting in action.",
  alternates: {
    canonical: 'https://pimpmyparty.co.uk/gallery',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Pimp My Party',
    title: "Gallery | Pimp My Party - Event Photos & Highlights Manchester",
    description: "Browse photos from weddings, parties and events across Manchester and Greater Manchester. See our DJ setups, saxophone performances, photobooths and venue lighting in action.",
    url: 'https://pimpmyparty.co.uk/gallery',
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
    title: "Gallery | Pimp My Party - Event Photos & Highlights Manchester",
    description: "Browse photos from weddings, parties and events across Manchester and Greater Manchester. See our DJ setups, saxophone performances, photobooths and venue lighting in action.",
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
      "name": "Gallery",
      "item": "https://pimpmyparty.co.uk/gallery"
    }
  ]
};

export default function GalleryPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GalleryContent />
    </main>
  );
}
