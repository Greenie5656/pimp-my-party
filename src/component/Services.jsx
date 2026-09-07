"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useId, useState } from "react";
import Image from "next/image";
import { 
  Disc3, 
  Music2, 
  ClipboardList, 
  Sparkles, 
  Lightbulb, 
  Camera,
  ChevronDown
} from "lucide-react";

export default function Services() {
  // Only one card is open at a time. null means all collapsed.
  const [openId, setOpenId] = useState(null);
  // Stable ids so each toggle can point aria-controls at its own panel.
  const baseId = useId();
  // Services with professional icons
  const services = [
    { 
      Icon: Disc3, 
      text: "DJs For Weddings & All Events",
      details: {
        groups: [
          {
            heading: "Weddings & Celebrations",
            items: [
              "Weddings",
              "Anniversaries & engagements",
              "Birthdays",
              "Baptisms & christenings",
            ],
          },
          {
            heading: "Milestones & Ceremonies",
            items: [
              "Bar & Bat Mitzvahs",
              "School proms & graduations",
              "Celebration of life",
            ],
          },
          {
            heading: "Corporate & Brand",
            items: [
              "Corporate events",
              "Retail stores & brand activations",
            ],
          },
        ],
        note: "Karaoke available as an add-on (+£100).",
      },
    },
    { 
      Icon: Music2, 
      text: "Sax & Percussion Players",
      details: {
        groups: [
          {
            heading: "Saxophonist",
            items: [
              "Ibiza, house & club classics",
              "Cocktail hour & welcome drinks",
              "Chilled & sunset sets",
              "R&B and soul",
              "Roaming party sax",
            ],
          },
          {
            heading: "Percussionist",
            items: [
              "Ibiza, house & club classics",
              "Roaming percussionist",
              "Wedding percussionist",
            ],
          },
        ],
      },
    },
    { 
      Icon: ClipboardList, 
      text: "Event Management & Planning",
      details: {
        groups: [
          {
            heading: "Full Event Management",
            items: [
              "Planning & coordination",
              "Event production",
              "Artist & venue sourcing",
              "Supplier procurement",
            ],
          },
          {
            heading: "Weddings",
            items: [
              "Wedding planning & coordination",
              "Entertainment planning",
              "Décor & venue styling",
              "Full entertainment packages",
            ],
          },
          {
            heading: "Corporate & Business",
            items: [
              "Awards nights & gala dinners",
              "Christmas parties",
              "Product launches & brand activations",
              "Away days & staff parties",
              "Conferences & networking",
            ],
          },
        ],
      },
    },
    { 
      Icon: Sparkles, 
      text: "Event Design & Decor",
      details: {
        groups: [
          {
            heading: "Styling & Design",
            items: [
              "Themed & luxury design",
              "Wedding, birthday & corporate styling",
              "Colour scheme & concept",
            ],
          },
          {
            heading: "Backdrops & Balloons",
            items: [
              "Balloon décor & garlands",
              "Flower walls",
              "Bespoke backdrops",
            ],
          },
          {
            heading: "Signage & Lighting",
            items: [
              "LED & neon signs",
              "Light-up letters & numbers",
              "Welcome signs & seating plans",
            ],
          },
          {
            heading: "Tables & Room",
            items: [
              "Centrepieces & candle décor",
              "Draping & room dressing",
              "Cake & sweet tables",
            ],
          },
          {
            heading: "Feature Pieces",
            items: [
              "Plinths & display stands",
              "Bespoke props & installations",
            ],
          },
        ],
      },
    },
    { 
      Icon: Lightbulb, 
      text: "Sound, Lighting, Stages & Special Effects",
      details: {
        groups: [
          {
            heading: "Stage & Production",
            items: [
              "Stage & set design",
              "Lighting, sound & AV",
              "Power & infrastructure",
            ],
          },
          {
            heading: "On The Night",
            items: [
              "Special effects",
              "Event crew",
            ],
          },
        ],
      },
    },
    { 
      Icon: Camera, 
      text: "Photo Booths & Dancefloors",
      details: {
        groups: [
          {
            heading: "Photo Booths",
            items: [
              "Photo booth hire",
              "Photo booth backdrops",
            ],
          },
          {
            heading: "Dancefloors & Furniture",
            items: [
              "Dancefloor hire",
              "Dancefloor styling",
              "Event furniture",
            ],
          },
        ],
      },
    },
  ];

  // Your brand/venue images
  const brands = [
    "/brands/alberts_standish.jpeg",
    "/brands/alberts_worsley.jpg",
    "/brands/bbdd.png",
    "/brands/BRUNCHED.png",
    "/brands/dukes_90.jpg",
    "/brands/f.png",
    "/brands/heaton_park_golf.jpg",
    "/brands/hilton.jpg",
    "/brands/joseph_holt.jpeg",
    "/brands/S2S.png",
    "/brands/Sanction.png",
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    // The lift used to be an inline whileHover object. It is a named variant
    // now so the underline below can ride the same card hover - a plain
    // object does not flow down the tree, and once the toggle button covers
    // the card the underline can no longer be hovered directly.
    hovered: {
      y: -8,
      transition: { duration: 0.3 },
    },
  };

  // Same 0% -> 100% sweep as before, driven by the card's hover instead of
  // the 4px strip's own.
  const underlineVariants = {
    hidden: { width: "0%" },
    visible: { width: "0%" },
    hovered: {
      width: "100%",
      transition: { duration: 0.4 },
    },
  };

  const brandVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  // Text animation - letter by letter
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <motion.span key={index} variants={letterVariants}>
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        {/* Services Section */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-heliotrope"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {splitText("Our Services")}
        </motion.h2>

        <motion.div
          className="w-24 h-1 bg-gradient-to-r from-fuchsia via-heliotrope to-fuchsia mx-auto mb-12"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => {
            const IconComponent = service.Icon;
            // A card without details stays exactly as it was: no button, no
            // chevron, nothing to expand.
            const expandable = Boolean(service.details);
            const isOpen = expandable && openId === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-toggle-${index}`;

            // The icon and label are identical whether or not the card is
            // expandable, so the collapsed state looks the same as before.
            const summary = (
              <>
                {/* The chevron shares the icon's row rather than sitting in a
                    column of its own, so the label keeps the full card width
                    and wraps exactly where it did before. */}
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="text-heliotrope group-hover:text-fuchsia transition-colors duration-300">
                    <IconComponent
                      size={48}
                      strokeWidth={1.5}
                    />
                  </div>

                  {expandable && (
                    <ChevronDown
                      size={22}
                      aria-hidden="true"
                      className={`text-heliotrope flex-shrink-0 mt-1 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>

                <p className="text-lg font-semibold leading-tight group-hover:text-heliotrope transition-colors duration-300">
                  {service.text}
                </p>
              </>
            );

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                layout
                whileHover="hovered"
                className={`bg-gradient-to-br from-tekhelet to-black rounded-lg cursor-pointer border-2 group relative overflow-hidden transition-colors duration-300 ${
                  isOpen ? "border-heliotrope" : "border-tekhelet hover:border-heliotrope"
                }`}
              >
                {/* Pink glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia/0 to-heliotrope/0 group-hover:from-fuchsia/10 group-hover:to-heliotrope/10 transition-all duration-500 pointer-events-none" />
                
                {expandable ? (
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : index)}
                    className="relative z-10 w-full text-left p-8 cursor-pointer"
                  >
                    {summary}
                  </button>
                ) : (
                  <div className="relative z-10 p-8">
                    {summary}
                  </div>
                )}

                {/* Detail panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden relative z-10"
                    >
                      <div className="px-8 pb-8 pt-5 space-y-5 border-t border-heliotrope/25">
                        {service.details.groups.map((group) => (
                          <div key={group.heading}>
                            <p className="text-sm font-semibold text-heliotrope mb-2">
                              {group.heading}
                            </p>
                            <ul className="space-y-1.5">
                              {group.items.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2.5 text-sm text-gray-300"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-heliotrope flex-shrink-0 mt-1.5" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        {service.details.note && (
                          <p className="text-sm text-gray-400 border-t border-heliotrope/15 pt-4">
                            {service.details.note}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom accent line */}
                <motion.div
                  variants={underlineVariants}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-fuchsia to-heliotrope"
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Brands & Venues Section */}
        <motion.div
          className="border-t border-heliotrope/30 pt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-center mb-2 text-heliotrope"
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {splitText("Trusted By The Best")}
          </motion.h3>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-fuchsia via-heliotrope to-fuchsia mx-auto mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          
          <motion.p
            className="text-center text-gray-400 mb-12 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Brands & Venues We've Worked With
          </motion.p>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {brands.map((brand, index) => (
            <motion.div
                key={index}
                variants={brandVariants}
                whileHover={{
                scale: 1.1,
                transition: { duration: 0.3 },
                }}
                className="relative w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 p-4 bg-gradient-to-br from-tekhelet/60 to-black rounded-lg backdrop-blur-sm border border-heliotrope/20 hover:border-fuchsia/50 hover:from-tekhelet/80 hover:to-black/90 transition-all duration-300 group"
            >
                {/* Pink glow on hover */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-fuchsia/0 to-heliotrope/0 group-hover:from-fuchsia/20 group-hover:to-heliotrope/20 transition-all duration-500" />
                
                {/* White background for the logo itself */}
                <div className="absolute inset-4 bg-white/90 rounded-md" />
                
                <Image
                src={brand}
                alt={`Brand ${index + 1}`}
                fill
                className="object-contain p-6 relative z-10 group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 128px, (max-width: 1024px) 144px, 160px"
                />
            </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}