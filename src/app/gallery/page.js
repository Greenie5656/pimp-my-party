import GalleryContent from "@/component/GalleryContent";

export const metadata = {
  title: "Gallery | Pimp My Party - Event Photos & Highlights Manchester",
  description: "Browse photos from weddings, parties and events across Manchester and Greater Manchester. See our DJ setups, saxophone performances, photobooths and venue lighting in action.",
  alternates: {
    canonical: '/gallery',
  },
};

export default function GalleryPage() {
  return (
    <main>
      <GalleryContent />
    </main>
  );
}
