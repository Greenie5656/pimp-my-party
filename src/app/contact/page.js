import ContactContent from "@/component/ContactContent";

export const metadata = {
  title: "Contact Us | Pimp My Party - Get a Free Quote Manchester",
  description: "Get in touch with Pimp My Party for a free consultation and quote. Professional DJ, Photobooth & event services across Manchester, Salford, Bury & Greater Manchester.",
  alternates: {
    canonical: 'https://pimpmyparty.co.uk/contact',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Pimp My Party',
    title: "Contact Us | Pimp My Party - Get a Free Quote Manchester",
    description: "Get in touch with Pimp My Party for a free consultation and quote. Professional DJ, Photobooth & event services across Manchester, Salford, Bury & Greater Manchester.",
    url: 'https://pimpmyparty.co.uk/contact',
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
    title: "Contact Us | Pimp My Party - Get a Free Quote Manchester",
    description: "Get in touch with Pimp My Party for a free consultation and quote. Professional DJ, Photobooth & event services across Manchester, Salford, Bury & Greater Manchester.",
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
      "name": "Contact",
      "item": "https://pimpmyparty.co.uk/contact"
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
