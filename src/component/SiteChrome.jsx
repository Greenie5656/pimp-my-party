'use client';

import { usePathname } from 'next/navigation';
import { GoogleAnalytics } from '@next/third-parties/google';
import Header from '@/component/Header';
import NavBar from '@/component/NavBar';
import Footer from '@/component/Footer';

export default function SiteChrome({ children }) {
  const pathname = usePathname();

  // The admin area gets no public header, nav, footer or analytics.
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <NavBar />
      {children}
      <Footer />
      <GoogleAnalytics gaId="G-J22NSQHKQ2" />
    </>
  );
}