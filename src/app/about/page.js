import AboutContent from "@/component/AboutContent";

const title = "About Pimp My Party | 20 Years of DJ & Event Experience in Manchester";
const description = "Twenty years of running events across Manchester and Greater Manchester, from intimate weddings to festivals of 6,000 people. Meet the team behind your DJ, saxophone player, photo booth and event planning.";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: 'https://pimpmyparty.co.uk/about',
  },
  openGraph: {
    title,
    description,
    url: 'https://pimpmyparty.co.uk/about',
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
