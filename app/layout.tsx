import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./_styles/fonts.css";
import Navbar from './_components/navbar';
import Footer from './_components/footer';
import { RegionProvider } from '../context/RegionContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codeprojekt",
  description: "Marktplace for buying and selling gifts in the game",
  icons: {
    icon: '/favicon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RegionProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </RegionProvider>
      </body>
    </html>
  );
}
