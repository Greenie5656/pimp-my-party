import ContactContent from "@/component/ContactContent";

export const metadata = {
  title: "Contact Us | Pimp My Party - Get a Free Quote Manchester",
  description: "Get in touch with Pimp My Party for a free consultation and quote. Professional DJ, Photobooth & event services across Manchester, Salford, Bury & Greater Manchester.",
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <main>
      <ContactContent />
    </main>
  );
}
