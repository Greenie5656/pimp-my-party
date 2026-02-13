import AboutContent from "@/component/AboutContent";

export const metadata = {
  title: "About Us | Pimp My Party - 20 Years of Event Experience Manchester",
  description: "With over 20 years of event expertise, Pimp My Party delivers professional Mobile DJ, Wedding DJ, Saxophone & Photobooth services across Manchester and Greater Manchester.",
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <main>
      <AboutContent />
    </main>
  );
}
