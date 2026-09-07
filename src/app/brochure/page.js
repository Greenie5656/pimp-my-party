import Brochure from "@/component/Brochure";
import { OG_IMAGE, url } from "@/lib/site";

const title = "DJ, Photo Booth & Party Prices | Download Our Brochure | Pimp My Party";
const description = "Download our brochures for full prices: wedding and party DJs, saxophone players, photo booths, dancefloor hire, venue lighting and LED letters across Manchester and Greater Manchester.";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: url('/brochure'),
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Pimp My Party',
    title,
    description,
    url: url('/brochure'),
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@pimpmypartymcr',
    title,
    description,
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
      "name": "Brochure",
      "item": url('/brochure')
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