import ServicesContent from "@/component/ServicesContent";

export const metadata = {
  title: "Mobile DJ & Photobooth Hire Manchester | DJ, Saxophone & Event Services | Pimp My Party",
  description: "Mobile DJ hire, Wedding DJ, Saxophone Player & Photobooth hire across Manchester, Salford, Bury & Greater Manchester. Full event planning. 20 years experience. Free quote.",
  alternates: {
    canonical: 'https://pimpmyparty.co.uk/services',
  },
  openGraph: {
    title: "Mobile DJ & Photobooth Hire Manchester | Pimp My Party",
    description: "Mobile DJ hire, Wedding DJ, Saxophone Player & Photobooth hire across Manchester, Salford, Bury & Greater Manchester. Full event planning. 20 years experience.",
    url: 'https://pimpmyparty.co.uk/services',
  },
  twitter: {
    title: "Mobile DJ & Photobooth Hire Manchester | Pimp My Party",
    description: "Mobile DJ hire, Wedding DJ, Saxophone Player & Photobooth hire across Manchester, Salford, Bury & Greater Manchester. Full event planning. 20 years experience.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Event Entertainment Services - Pimp My Party",
  "description": "Professional DJ, photobooth and entertainment services across Manchester and Greater Manchester.",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "name": "Entertainment Services",
        "description": "Professional DJs, live saxophone performances, and interactive photo booths across Manchester, Salford, Bury, and Greater Manchester.",
        "provider": { "@type": "LocalBusiness", "name": "Pimp My Party", "url": "https://pimpmyparty.co.uk" },
        "areaServed": "Greater Manchester",
        "url": "https://pimpmyparty.co.uk/services"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service",
        "name": "Full Event Planning",
        "description": "Complete event coordination across Manchester and surrounding areas for weddings, parties, and corporate events.",
        "provider": { "@type": "LocalBusiness", "name": "Pimp My Party", "url": "https://pimpmyparty.co.uk" },
        "areaServed": "Greater Manchester",
        "url": "https://pimpmyparty.co.uk/services"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Service",
        "name": "Venue Decoration",
        "description": "Transform any venue in Manchester, Cheshire, or Lancashire with expert design and decoration services for weddings and parties.",
        "provider": { "@type": "LocalBusiness", "name": "Pimp My Party", "url": "https://pimpmyparty.co.uk" },
        "areaServed": ["Greater Manchester", "Cheshire", "Lancashire"],
        "url": "https://pimpmyparty.co.uk/services"
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Service",
        "name": "Guest Experience",
        "description": "Curated entertainment and activities for wedding or party guests throughout Greater Manchester.",
        "provider": { "@type": "LocalBusiness", "name": "Pimp My Party", "url": "https://pimpmyparty.co.uk" },
        "areaServed": "Greater Manchester",
        "url": "https://pimpmyparty.co.uk/services"
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "Service",
        "name": "Catering Coordination",
        "description": "Food and beverage coordination for events across Salford, Bury, Heywood, and Middleton.",
        "provider": { "@type": "LocalBusiness", "name": "Pimp My Party", "url": "https://pimpmyparty.co.uk" },
        "areaServed": "Greater Manchester",
        "url": "https://pimpmyparty.co.uk/services"
      }
    },
    {
      "@type": "ListItem",
      "position": 6,
      "item": {
        "@type": "Service",
        "name": "Photography & Video",
        "description": "Professional photography and videography services for weddings and parties across the North West.",
        "provider": { "@type": "LocalBusiness", "name": "Pimp My Party", "url": "https://pimpmyparty.co.uk" },
        "areaServed": "North West England",
        "url": "https://pimpmyparty.co.uk/services"
      }
    }
  ]
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
      "name": "Services",
      "item": "https://pimpmyparty.co.uk/services"
    }
  ]
};

export default function ServicesPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesContent />
    </main>
  );
}
