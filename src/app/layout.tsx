import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Be a Better Brand — Command Center",
  description: "Brand architecture & PR visibility agency dashboard for Chrissy Bernal",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
