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
    title,
    description,
    url: 'https://pimpmyparty.co.uk/brochure',
  },
  twitter: {
    title,
    description,
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