import ContactContent from "@/component/ContactContent";

export const metadata = {
  title: "Contact Us | Pimp My Party - Get a Free Quote Manchester",
  description: "Get in touch with Pimp My Party for a free consultation and quote. Professional DJ, Photobooth & event services across Manchester, Salford, Bury & Greater Manchester.",
  alternates: {
    canonical: 'https://pimpmyparty.co.uk/contact',
  },
  openGraph: {
    title: "Contact Us | Pimp My Party - Get a Free Quote Manchester",
    description: "Get in touch with Pimp My Party for a free consultation and quote. Professional DJ, Photobooth & event services across Manchester, Salford, Bury & Greater Manchester.",
    url: 'https://pimpmyparty.co.uk/contact',
  },
  twitter: {
    title: "Contact Us | Pimp My Party - Get a Free Quote Manchester",
    description: "Get in touch with Pimp My Party for a free consultation and quote. Professional DJ, Photobooth & event services across Manchester, Salford, Bury & Greater Manchester.",
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
