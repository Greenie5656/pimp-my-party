import BookingForm from "@/component/BookingForm";

export const metadata = {
  title: "Book Your Event | Pimp My Party - DJ & Entertainment Manchester",
  description: "Book a mobile DJ, wedding DJ, photobooth or full event package with Pimp My Party. Quick online enquiry form covering Manchester, Salford, Bury & Greater Manchester.",
  alternates: {
    canonical: 'https://pimpmyparty.co.uk/book',
  },
  openGraph: {
    title: "Book Your Event | Pimp My Party - DJ & Entertainment Manchester",
    description: "Book a mobile DJ, wedding DJ, photobooth or full event package with Pimp My Party. Covering Manchester, Salford, Bury & Greater Manchester.",
    url: 'https://pimpmyparty.co.uk/book',
  },
  twitter: {
    title: "Book Your Event | Pimp My Party - DJ & Entertainment Manchester",
    description: "Book a mobile DJ, wedding DJ, photobooth or full event package with Pimp My Party. Covering Manchester, Salford, Bury & Greater Manchester.",
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