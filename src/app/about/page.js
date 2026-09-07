import AboutContent from "@/component/AboutContent";
import { OG_IMAGE, url } from "@/lib/site";

const title = "About Pimp My Party | 20 Years of DJ & Event Experience in Manchester";
const description = "Twenty years of running events across Manchester and Greater Manchester, from intimate weddings to festivals of 6,000 people. Meet the team behind your DJ, saxophone player, photo booth and event planning.";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: url('/about'),
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Pimp My Party',
    title,
    description,
    url: url('/about'),
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
      "name": "About Us",
      "item": url('/about')
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
