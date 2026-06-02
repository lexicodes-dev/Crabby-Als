import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPromoBanner, getPromoPopup } from "@/lib/wordpress";
import PromoPopup from "@/components/PromoPopup";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Crabby Al's Seafood Restaurant | Thomaston, CT",
  description: "Experience the freshest seafood in Thomaston, CT. Lobster rolls, clam chowder, live music, and a welcoming atmosphere at Crabby Al's.",
  openGraph: {
    images: ['/pics/lobster.png'],
  },
  twitter: {
    card: "summary_large_image",
    images: ['/pics/lobster.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bannerData = await getPromoBanner();
  const popupData = await getPromoPopup();

  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${playfair.variable}`}>
        <Navbar bannerData={bannerData} />
        <main style={{ minHeight: '100vh', paddingTop: 'var(--header-height)' }}>
          {children}
        </main>
        <Footer />
        <PromoPopup data={popupData} />
      </body>
    </html>
  );
}
