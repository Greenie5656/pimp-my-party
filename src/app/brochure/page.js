import Brochure from "@/component/Brochure";

export const metadata = {
  title: "Download Our Brochure | DJ Hire & Event Services Manchester | Pimp My Party",
  description: "Download our event and pricing brochures covering mobile DJ hire, photobooth hire, saxophone player and entertainment packages across Manchester and Greater Manchester.",
  alternates: {
    canonical: 'https://pimpmyparty.co.uk/brochure',
  },
  openGraph: {
    title: "Download Our Brochure | Pimp My Party",
    description: "Download our event and pricing brochures covering mobile DJ hire, photobooth hire, saxophone player and entertainment packages across Manchester and Greater Manchester.",
    url: 'https://pimpmyparty.co.uk/brochure',
  },
  twitter: {
    title: "Download Our Brochure | Pimp My Party",
    description: "Download our event and pricing brochures covering mobile DJ hire, photobooth hire, saxophone player and entertainment packages across Manchester and Greater Manchester.",
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