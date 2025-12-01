import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Theta Tau @ SJSU",
  description: "Created by Theta Tau Actives!",
};

import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Next.js will automatically inject your <head> elements here */}
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <AuthProvider>
          <Navbar />
          <main style={{ paddingTop: 'var(--navbar-height)' }}>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
