import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/component/Header";
import NavBar from "@/component/NavBar";
import Footer from "@/component/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pimp My Party | Mobile DJ & Party Services Manchester | Wedding DJ Hire",
  description: "Professional Mobile DJ, Wedding DJ, Saxophone Player & Photobooth Hire in Manchester, Salford, Bury & Greater Manchester. 20 years experience. Book your event today!",
  keywords: "mobile dj manchester, wedding dj manchester, party dj salford, dj hire bury, photobooth hire manchester, saxophone player manchester, selfie photobooth heywood, wedding dj greater manchester, mobile dj cheshire, party entertainment lancashire",
  
  // Enhanced metadata for better SEO
  authors: [{ name: "Pimp My Party" }],
  creator: "Pimp My Party",
  publisher: "Pimp My Party",
  
  // Verification and ownership
  metadataBase: new URL('https://pimpmyparty.co.uk'),
  alternates: {
    canonical: '/',
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  
  // Open Graph (Social Media Sharing) - FIXED FOR FULL IMAGE
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://pimpmyparty.co.uk',
    siteName: 'Pimp My Party',
    title: "Pimp My Party | Professional DJ Services Manchester",
    description: "Expert Mobile DJ, Wedding DJ & Photobooth Hire across Manchester, Salford, Bury & Greater Manchester. 20 years experience.",
    images: [
      {
        url: 'https://pimpmyparty.co.uk/socials.png',  // Full URL
        width: 1200,
        height: 630,
        alt: 'Pimp My Party - Professional DJ & Entertainment Services Manchester',
        type: 'image/png',
      },
    ],
  },
  
  // Twitter Card - FIXED FOR FULL IMAGE
  twitter: {
    card: 'summary_large_image',
    site: '@pimpmypartymcr',  // Add your Twitter handle if you have one
    title: "Pimp My Party | Professional DJ Services Manchester",
    description: "Expert Mobile DJ, Wedding DJ & Photobooth Hire across Manchester, Salford, Bury & Greater Manchester. 20 years experience.",
    images: ['https://pimpmyparty.co.uk/socials.png'],  // Full URL
  },
  
  // Additional metadata
  category: 'Entertainment',
  classification: 'DJ Services, Event Entertainment, Wedding Services',
};

export default function RootLayout({ children }) {
  // Schema.org structured data for Local Business
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Pimp My Party",
    "image": "https://pimpmyparty.co.uk/socials.png",
    "description": "Professional Mobile DJ, Wedding DJ, Saxophone Player & Photobooth Hire in Manchester, Salford, Bury & Greater Manchester. 20 years of experience delivering unforgettable events.",
    
    // Contact Information
    "telephone": "+44-7359-189070",
    "email": "hello@pimpmyparty.co.uk",
    "url": "https://pimpmyparty.co.uk",
    
    // Address
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5 Durness Place",
      "addressLocality": "Manchester",
      "addressRegion": "Greater Manchester",
      "postalCode": "OL10 3ST",
      "addressCountry": "GB"
    },
    
    // Geographic Coordinates (Manchester area)
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "53.5526",
      "longitude": "-2.1761"
    },
    
    // Business Details
    "priceRange": "££",
    "openingHours": "Mo-Su 09:00-21:00",
    
    // Service Areas
    "areaServed": [
      {
        "@type": "City",
        "name": "Manchester"
      },
      {
        "@type": "City",
        "name": "Salford"
      },
      {
        "@type": "City",
        "name": "Bury"
      },
      {
        "@type": "City",
        "name": "Heywood"
      },
      {
        "@type": "City",
        "name": "Middleton"
      },
      {
        "@type": "City",
        "name": "Prestwich"
      },
      {
        "@type": "City",
        "name": "Oldham"
      },
      {
        "@type": "City",
        "name": "Worsley"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Greater Manchester"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Cheshire"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Lancashire"
      }
    ],
    
    // Services Offered
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mobile DJ Services",
          "description": "Professional mobile DJ for weddings, parties, and corporate events"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Wedding DJ",
          "description": "Specialist wedding DJ services across Greater Manchester"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Saxophone Player",
          "description": "Live saxophone performances for events"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Photobooth Hire",
          "description": "Professional photobooth and selfie booth hire"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Party DJ",
          "description": "DJ services for birthday parties and celebrations"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Event Entertainment",
          "description": "Complete event entertainment and planning services"
        }
      }
    ],
    
    // Social Media & Contact Points
    "sameAs": [
      "https://www.facebook.com/pimpmypartymcr",
      "https://www.instagram.com/pimpmypartymcr"
    ],
    
    // Additional Business Info
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "DJ and Entertainment Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile DJ Manchester"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wedding DJ Manchester"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Photobooth Hire Manchester"
          }
        }
      ]
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Schema.org JSON-LD for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        <meta name="google-site-verification" content="Wb-hKqYGgIBAO-4niVTid-14M4YzI9bRzv7HWYDzuos" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="GB-MAN" />
        <meta name="geo.placename" content="Manchester" />
        <meta name="geo.position" content="53.5526;-2.1761" />
        <meta name="ICBM" content="53.5526, -2.1761" />
        
        {/* Contact Information */}
        <meta name="contact" content="hello@pimpmyparty.co.uk" />
        <meta name="phone" content="+447359189070" />
        
        {/* Business Information */}
        <meta name="business:contact_data:street_address" content="5 Durness Place" />
        <meta name="business:contact_data:locality" content="Manchester" />
        <meta name="business:contact_data:region" content="Greater Manchester" />
        <meta name="business:contact_data:postal_code" content="OL10 3ST" />
        <meta name="business:contact_data:country_name" content="United Kingdom" />
        
        {/* Theme Color for Mobile Browsers */}
        <meta name="theme-color" content="#9333ea" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <NavBar />
        
        {children}
        
        <Footer />
        
        {/* Google Analytics - ADDED */}
        <GoogleAnalytics gaId="G-J22NSQHKQ2" />
      </body>
    </html>
  );
}