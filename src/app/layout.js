import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "../components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TeraPeek - Inspect Terabox/Terashare Videos",
  description:
    "Inspect, preview, and download Terabox and Terashare videos. Extract metadata, view thumbnails, and get direct download links from share links.",
  keywords: [
    "terabox",
    "terashare",
    "video inspector",
    "metadata extractor",
    "download",
    "preview",
    "video analysis",
  ],
  authors: [{ name: "saahiyo" }],
  creator: "saahiyo",
  publisher: "saahiyo",
  robots: "index, follow",
  openGraph: {
    title: "TeraPeek - Inspect Terabox/Terashare Videos",
    description:
      "Inspect, preview, and download Terabox and Terashare videos with metadata extraction and direct download links.",
    type: "website",
    locale: "en_US",
    url: "https://tera-peek.vercel.app",
    siteName: "TeraPeek",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TeraPeek - Inspect Terabox/Terashare Videos",
    description:
      "Inspect, preview, and download Terabox and Terashare videos with metadata extraction.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
