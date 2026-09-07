import ContactContent from "@/component/ContactContent";
import { OG_IMAGE, url } from "@/lib/site";

export const metadata = {
  title: "Contact Us | Pimp My Party - Get a Free Quote Manchester",
  description: "Get in touch with Pimp My Party for a free consultation and quote. Professional DJ, Photobooth & event services across Manchester, Salford, Bury & Greater Manchester.",
  alternates: {
    canonical: url('/contact'),
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Pimp My Party',
    title: "Contact Us | Pimp My Party - Get a Free Quote Manchester",
    description: "Get in touch with Pimp My Party for a free consultation and quote. Professional DJ, Photobooth & event services across Manchester, Salford, Bury & Greater Manchester.",
    url: url('/contact'),
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@pimpmypartymcr',
    title: "Contact Us | Pimp My Party - Get a Free Quote Manchester",
    description: "Get in touch with Pimp My Party for a free consultation and quote. Professional DJ, Photobooth & event services across Manchester, Salford, Bury & Greater Manchester.",
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
      "name": "Contact",
      "item": url('/contact')
    }
  ]
};

export default function ContactPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactContent />
    </main>
  );
}
