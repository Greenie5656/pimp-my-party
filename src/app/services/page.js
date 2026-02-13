import ServicesContent from "@/component/ServicesContent";

export const metadata = {
  title: "Our Services | Pimp My Party - DJ, Photobooth & Event Services Manchester",
  description: "Professional Mobile DJ, Wedding DJ, Saxophone Player, Photobooth Hire & full event planning across Manchester, Salford, Bury & Greater Manchester. Get a free quote today.",
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesContent />
    </main>
  );
}
