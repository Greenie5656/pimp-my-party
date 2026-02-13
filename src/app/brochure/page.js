import Brochure from "@/component/Brochure";

export const metadata = {
  title: "Brochure | Pimp My Party",
  description: "Download our event and pricing brochures for DJ hire, photo booths, venue lighting and more across Manchester.",
};

export default function BrochurePage() {
  return (
    <main>
      <Brochure />
    </main>
  );
}