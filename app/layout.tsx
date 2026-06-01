import "./globals.css";
import React from 'react';

export const metadata = {
  title: "Rujel Buggs - Farmasi Premium Brand Page",
  description: "High-end luxury landing page showcasing Premium Farmasi Kits for Rujel Buggs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Space+Grotesk:wght@300..700&family=JetBrains+Mono:wght@100..850&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
