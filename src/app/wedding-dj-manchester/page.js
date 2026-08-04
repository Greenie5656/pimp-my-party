import LocationContent from "@/component/LocationContent";
import { locations, SITE_URL } from "@/lib/locations";

const location = locations.manchester;
const pageUrl = `${SITE_URL}/${location.slug}`;

export const metadata = {
  title: location.title,
  description: location.description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: location.title,
    description: location.description,
    url: pageUrl,
  },
  twitter: {
    title: location.title,
    description: location.description,
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
      "item": SITE_URL
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": location.breadcrumbName,
      "item": pageUrl
    }
  ]
};

// Points at the single LocalBusiness defined in the root layout rather than
// declaring a second business entity for the same organisation.
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": `Wedding DJ ${location.name}`,
  "serviceType": "Wedding DJ",
  "description": location.description,
  "url": pageUrl,
  "provider": {
    "@id": `${SITE_URL}/#localbusiness`
  },
  "areaServed": [
    { "@type": "City", "name": location.name },
    ...location.alsoServes.map((area) => ({ "@type": "City", "name": area }))
  ]
};

// Only the questions and answers that are rendered visibly on the page.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": location.faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
};

export default function WeddingDjManchesterPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LocationContent location={location} />
    </main>
  );
}
