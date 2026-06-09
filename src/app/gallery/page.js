import GalleryContent from "@/component/GalleryContent";

export const metadata = {
  title: "Gallery | Pimp My Party - Event Photos & Highlights Manchester",
  description: "Browse photos from weddings, parties and events across Manchester and Greater Manchester. See our DJ setups, saxophone performances, photobooths and venue lighting in action.",
  alternates: {
    canonical: 'https://pimpmyparty.co.uk/gallery',
  },
  openGraph: {
    title: "Gallery | Pimp My Party - Event Photos & Highlights Manchester",
    description: "Browse photos from weddings, parties and events across Manchester and Greater Manchester. See our DJ setups, saxophone performances, photobooths and venue lighting in action.",
    url: 'https://pimpmyparty.co.uk/gallery',
  },
  twitter: {
    title: "Gallery | Pimp My Party - Event Photos & Highlights Manchester",
    description: "Browse photos from weddings, parties and events across Manchester and Greater Manchester. See our DJ setups, saxophone performances, photobooths and venue lighting in action.",
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
