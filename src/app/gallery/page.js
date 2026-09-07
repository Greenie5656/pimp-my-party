import GalleryContent from "@/component/GalleryContent";
import { OG_IMAGE, url } from "@/lib/site";

export const metadata = {
  title: "Gallery | Pimp My Party - Event Photos & Highlights Manchester",
  description: "Browse photos from weddings, parties and events across Manchester and Greater Manchester. See our DJ setups, saxophone performances, photobooths and venue lighting in action.",
  alternates: {
    canonical: url('/gallery'),
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Pimp My Party',
    title: "Gallery | Pimp My Party - Event Photos & Highlights Manchester",
    description: "Browse photos from weddings, parties and events across Manchester and Greater Manchester. See our DJ setups, saxophone performances, photobooths and venue lighting in action.",
    url: url('/gallery'),
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@pimpmypartymcr',
    title: "Gallery | Pimp My Party - Event Photos & Highlights Manchester",
    description: "Browse photos from weddings, parties and events across Manchester and Greater Manchester. See our DJ setups, saxophone performances, photobooths and venue lighting in action.",
    images: [OG_IMAGE.url],
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
      "item": url()
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Gallery",
      "item": url('/gallery')
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
