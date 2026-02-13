"use client";

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { trackBrochureDownload } from "@/lib/gtag";

const brochures = [
  {
    title: "Party & Events Brochure",
    description:
      "Our full services brochure covering DJs, photo booths, live entertainment, LED letters, venue lighting and much more. Perfect for weddings, birthdays and corporate events.",
    file: "/brochure-party.pdf",
    filename: "PimpMyParty-Party-Brochure.pdf",
    badge: "Most Popular",
  },
  {
    title: "Full Pricing Brochure",
    description:
      "A detailed breakdown of all our packages and pricing from Party DJs to dancefloor hire, cold sparks, candy carts and everything in between.",
    file: "/brochure-full.pdf",
    filename: "PimpMyParty-Full-Brochure.pdf",
    badge: "Full Pricing",
  },
];

const btnClass = [
  "mt-auto",
  "inline-flex",
  "items-center",
  "justify-center",
  "gap-2",
  "bg-gradient-to-r",
  "from-heliotrope",
  "to-fuchsia",
  "text-black",
  "font-semibold",
  "py-3",
  "px-6",
  "rounded-xl",
  "transition-opacity",
  "duration-300",
  "hover:opacity-90",
].join(" ");

export default function Brochure() {
  return (
    <section className="min-h-screen bg-black text-white px-4 py-20">

      {/* Page Heading */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Our{" "}
          <span className="bg-gradient-to-r from-heliotrope to-fuchsia bg-clip-text text-transparent">
            Brochures
          </span>
        </h1>
        <p className="text-white/60 max-w-xl mx-auto text-lg">
          Download our brochures to explore everything we offer — from
          professional DJs to stunning wedding extras.
        </p>
      </motion.div>

      {/* Brochure Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {brochures.map((brochure, index) => (
          <motion.div
            key={index}
            className="relative border border-heliotrope/30 rounded-2xl p-8 bg-white/5 backdrop-blur-sm flex flex-col gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.15, ease: "easeOut" }}
            whileHover={{ scale: 1.02, borderColor: "rgba(211,114,255,0.6)" }}
          >
            {/* Badge */}
            <span className="absolute top-4 right-4 text-xs font-semibold bg-gradient-to-r from-heliotrope to-fuchsia text-black px-3 py-1 rounded-full">
              {brochure.badge}
            </span>

            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-heliotrope/10 border border-heliotrope/30 flex items-center justify-center">
              <FileText className="text-heliotrope" size={28} />
            </div>

            {/* Text */}
            <div>
              <h2 className="text-xl font-bold mb-2">{brochure.title}</h2>
              <p className="text-white/60 text-sm leading-relaxed">
                {brochure.description}
              </p>
            </div>

            {/* Download Button */}
            <a
              href={brochure.file}
              download={brochure.filename}
              onClick={() => trackBrochureDownload(brochure.title)}
              className={btnClass}
            >
              <Download size={18} />
              Download PDF
            </a>
          </motion.div>
        ))}
      </div>

      {/* Bottom note */}
      <motion.p
        className="text-center text-white/40 text-sm mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        {"Can't find what you're looking for? "}
        <a
          href="/contact"
          className="text-heliotrope hover:text-fuchsia transition-colors duration-200"
        >
          Get in touch
        </a>
        {" and we'll help you out."}
      </motion.p>
    </section>
  );
}