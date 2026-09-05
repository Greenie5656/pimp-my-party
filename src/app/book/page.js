import BookingForm from "@/component/BookingForm";

export const metadata = {
  title: "Book Your Event | Pimp My Party - DJ & Entertainment Manchester",
  description: "Book a mobile DJ, wedding DJ, photobooth or full event package with Pimp My Party. Quick online enquiry form covering Manchester, Salford, Bury & Greater Manchester.",
  alternates: {
    canonical: 'https://pimpmyparty.co.uk/book',
  },
  // A page that declares its own openGraph block does NOT inherit the layout's
  // images, so without these WhatsApp/Facebook fall back to scaling up the
  // favicon. Same branded card the rest of the site shares.
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Pimp My Party',
    title: "Book Your Event | Pimp My Party - DJ & Entertainment Manchester",
    description: "Book a mobile DJ, wedding DJ, photobooth or full event package with Pimp My Party. Covering Manchester, Salford, Bury & Greater Manchester.",
    url: 'https://pimpmyparty.co.uk/book',
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
    title: "Book Your Event | Pimp My Party - DJ & Entertainment Manchester",
    description: "Book a mobile DJ, wedding DJ, photobooth or full event package with Pimp My Party. Covering Manchester, Salford, Bury & Greater Manchester.",
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
      "name": "Book Your Event",
      "item": "https://pimpmyparty.co.uk/book"
    }
  ]
};

export default function BookPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BookingForm />
    </main>
  );
}