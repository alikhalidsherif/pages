import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import GridBackground from "@/components/GridBackground";

export const metadata: Metadata = {
  title: "AshReef Labs | Ali Sherif",
  description: "Engineering systems that think, move, and adapt. Full-stack developer, AI engineer, and robotics specialist.",
  keywords: "Ali Sherif, AshReef Labs, AI Engineer, Robotics, Full Stack Developer, Machine Learning",
  authors: [{ name: "Ali Sherif" }],
  openGraph: {
      title: "AshReef Labs | Ali Sherif",
    description: "Engineering systems that think, move, and adapt",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GridBackground />
        <div className="scanline" />
        <CustomCursor />
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
