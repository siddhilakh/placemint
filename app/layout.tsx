import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Suspense } from "react";

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
      <body>
        <Suspense>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        </Suspense>
        <Navbar />
        {children}
      </body>
    </html>
  );
}