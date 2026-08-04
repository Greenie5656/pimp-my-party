// Location page data.
//
// Each entry drives one location landing page rendered by
// <LocationContent />, plus that page's metadata, sitemap entry and
// structured data. Adding a verified location means adding one entry here
// and one `src/app/<slug>/page.js` that imports it.
//
// IMPORTANT: only add a location the business has confirmed it genuinely
// serves, and only write answers that are supported by existing business
// material (the site copy and the brochures in /public). Do not copy an
// existing entry and swap the place name — near-duplicate pages help
// nobody.

export const SITE_URL = 'https://pimpmyparty.co.uk';

export const CONTACT = {
  phone: '07359 189070',
  phoneHref: 'tel:+447359189070',
  email: 'hello@pimpmyparty.co.uk',
};

export const locations = {
  manchester: {
    slug: 'wedding-dj-manchester',
    // Date this page's copy was last genuinely edited. Used for the sitemap
    // so lastModified reflects content changes, not build time.
    contentUpdated: '2026-08-04',

    name: 'Manchester',
    breadcrumbName: 'Wedding DJ Manchester',

    title: 'Wedding DJ Manchester | Pimp My Party',
    description:
      'A professional wedding DJ for receptions in Manchester and across Greater Manchester, with live saxophone, photo booths, dancefloors and venue lighting available alongside. Call 07359 189070 for a free consultation.',

    h1: 'Wedding DJ in Manchester',

    intro: [
      'Pimp My Party provides wedding DJs for couples getting married in Manchester and across Greater Manchester. We look after the reception itself — the arrival, the speeches, the first dance and the hours on the dancefloor afterwards — for everything from small intimate weddings to large receptions.',
      'The same team also covers birthdays, anniversaries and corporate parties in the city, and we have twenty years of event management behind us, on events ranging from private celebrations up to festivals of 6,000 people.',
    ],

    servicesHeading: 'What we can provide for a Manchester wedding',
    servicesIntro:
      'Most couples book a DJ and then add the extras that suit their venue and their day. Everything below is something we supply ourselves.',
    services: [
      {
        title: 'Wedding DJ',
        body: 'A professional wedding DJ with the booth, sound system, lighting and microphones, priced from £600 for a five-hour set.',
      },
      {
        title: 'Live saxophone and percussion',
        body: 'A sax player or percussionist performing alongside the DJ, from £300 for an hour of saxophone.',
      },
      {
        title: 'Photo booths',
        body: 'Selfie booths, printing booths and a 360 video booth, from £250 for a five-hour selfie booth.',
      },
      {
        title: 'Dancefloors and venue lighting',
        body: 'Dancefloor hire and venue up-lighting to change the look of a room after the wedding breakfast.',
      },
      {
        title: 'First dance effects',
        body: 'Cold sparks and low-lying fog for the first dance, subject to your venue agreeing to them.',
      },
      {
        title: 'Finishing touches',
        body: 'LED love letters, LED Mr & Mrs, light-up numbers, a candy cart, a secure card postbox and an audio guestbook.',
      },
      {
        title: 'Sound and lighting without a DJ',
        body: 'If you only need the kit, we hire out the DJ booth, sound, lighting and microphones on their own, priced by guest numbers.',
      },
      {
        title: 'Full event management',
        body: 'Planning, supplier coordination and running the day itself, if you want more than entertainment covered.',
      },
    ],

    processHeading: 'How booking works',
    processIntro:
      'There is no obligation at any stage, and the first conversation costs nothing.',
    process: [
      {
        number: '01',
        title: 'Get in touch',
        body: 'Call, WhatsApp, email or send the enquiry form with your wedding date, your Manchester venue and roughly how many guests you expect.',
      },
      {
        number: '02',
        title: 'Free consultation',
        body: 'We talk through what your day needs, which extras are worth it for your venue, and what the timings look like.',
      },
      {
        number: '03',
        title: 'Quote and confirmation',
        body: 'You get a quote covering exactly what has been discussed. Nothing is held until you confirm it.',
      },
      {
        number: '04',
        title: 'On the day',
        body: 'We set up at your venue and run the reception to the timings agreed with you.',
      },
    ],

    // FAQ answers must stay factual. Every answer below is supported by the
    // site copy or the brochures in /public — nothing here is assumed.
    faqHeading: 'Manchester wedding DJ questions',
    faqs: [
      {
        q: 'What does a wedding DJ booking include?',
        a: 'Our brochure prices a professional wedding DJ from £600 for a five-hour set, and the DJ booth with full sound, lighting and microphones from £300 as a standalone hire. Exactly what is bundled into your booking depends on your venue and guest numbers, so confirm the detail when you enquire rather than assuming a fixed package.',
      },
      {
        q: 'How long should we book the DJ for?',
        a: 'Our DJ pricing is built around a five-hour set, which for most Manchester receptions covers the evening from the end of the wedding breakfast through to the end of the night. Longer bookings are quoted individually, so tell us your venue curfew when you get in touch.',
      },
      {
        q: 'What affects the price of a wedding DJ in Manchester?',
        a: 'Three things mainly. How many hours you need; how many guests, because the sound and lighting rig is priced in bands from around 150 guests up to 500; and which extras you add, such as a photo booth, a dancefloor, up-lighting or cold sparks. The full price list is in our brochure.',
      },
      {
        q: 'What should we ask before booking any wedding DJ?',
        a: 'Ask what is actually included for the price, how long they will be there, when they arrive and set up, whether they can work within your venue rules on sound limits and effects, and how they handle your must-play and do-not-play lists. Bring those questions to the free consultation and we will answer them for your date and venue.',
      },
      {
        q: 'Can you supply more than just a DJ?',
        a: 'Yes. Live saxophone and percussion, dancers, magicians, photo booths, a 360 video booth, dancefloor hire, venue up-lighting, cold sparks, LED letters, a candy cart and an audio guestbook are all things we provide, so one booking can cover the whole evening.',
      },
      {
        q: 'Do you cover venues outside Manchester city centre?',
        a: 'Yes. Alongside Manchester we cover Salford, Bury, Heywood, Middleton, Prestwich, Oldham and Worsley, and we work across Greater Manchester, Cheshire and Lancashire.',
      },
      {
        q: 'How do we check our date and get a quote?',
        a: `Call or WhatsApp ${CONTACT.phone}, email ${CONTACT.email}, or send the enquiry form. Tell us your date, venue and guest numbers and we will come back to you with a quote. The consultation is free and there is no obligation.`,
      },
    ],

    galleryHeading: 'Manchester weddings we have worked on',
    galleryIntro:
      'A few photographs from real weddings and events. There are more in the full gallery.',
    gallery: [
      {
        src: '/gallery/first_dance.jpeg',
        alt: 'Bride and groom during their first dance at a wedding reception',
      },
      {
        src: '/gallery/sax_player_and_bride.jpeg',
        alt: 'Live saxophone player performing alongside the bride at a wedding',
      },
      {
        src: '/gallery/cold_spark_machine.webp',
        alt: 'Cold spark machine effect on the dancefloor during a first dance',
      },
      {
        src: '/gallery/wedding_venue.jpg',
        alt: 'Wedding venue set up with lighting ahead of the evening reception',
      },
    ],

    // Used by the Service structured data and by the closing paragraph.
    alsoServes: [
      'Salford',
      'Bury',
      'Heywood',
      'Middleton',
      'Prestwich',
      'Oldham',
      'Worsley',
    ],
  },
};

// Every location page that is live. Drives the sitemap and the footer links,
// so a page added here is discoverable without touching either by hand.
export const publishedLocations = [locations.manchester];
