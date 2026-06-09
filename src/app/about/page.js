import AboutContent from "@/component/AboutContent";

export const metadata = {
  title: "About Us | Pimp My Party - 20 Years of Event Experience Manchester",
  description: "With over 20 years of event expertise, Pimp My Party delivers professional Mobile DJ, Wedding DJ, Saxophone & Photobooth services across Manchester and Greater Manchester.",
  alternates: {
    canonical: 'https://pimpmyparty.co.uk/about',
  },
  openGraph: {
    title: "About Us | Pimp My Party - 20 Years of Event Experience Manchester",
    description: "With over 20 years of event expertise, Pimp My Party delivers professional Mobile DJ, Wedding DJ, Saxophone & Photobooth services across Manchester and Greater Manchester.",
    url: 'https://pimpmyparty.co.uk/about',
  },
  twitter: {
    title: "About Us | Pimp My Party - 20 Years of Event Experience Manchester",
    description: "With over 20 years of event expertise, Pimp My Party delivers professional Mobile DJ, Wedding DJ, Saxophone & Photobooth services across Manchester and Greater Manchester.",
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
      "name": "About Us",
      "item": "https://pimpmyparty.co.uk/about"
    }
  ]
};

export default function AboutPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutContent />
    </main>
  );
}
