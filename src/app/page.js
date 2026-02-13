import Hero from "@/component/Hero";
import Services from "@/component/Services";
import CTA from "@/component/CTA";
import LocalAreas from "@/component/LocalAreas";

export const metadata = {
  title: "Pimp My Party | Mobile DJ & Party Services Manchester | Wedding DJ Hire",
  description: "Professional Mobile DJ, Wedding DJ, Saxophone Player & Photobooth Hire in Manchester, Salford, Bury & Greater Manchester. 20 years experience. Book your event today!",
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <LocalAreas />
      <CTA />
    </main>
  );
}
