import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlaceMint",
  description: "AI-powered placement companion for Indian engineering students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}