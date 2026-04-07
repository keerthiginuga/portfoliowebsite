import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import localFont from "next/font/local";
import { AiCodedFab } from "@/components/layout/AiCodedFab";
import { BodyRouteClass } from "@/components/layout/BodyRouteClass";
import { DeviceGateScript } from "@/components/layout/DeviceGateScript";
import { NavGlassFilter } from "@/components/layout/NavGlassFilter";
import { PortfolioSiteHeader } from "@/components/layout/PortfolioSiteHeader";
import { getSiteUrl, site } from "@/content/site";
import "lenis/dist/lenis.css";
import "@/styles/utilities.css";
import "@/styles/portfolio-v2.css";
import "@/styles/device-gate.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const neueHaas = localFont({
  src: "../assets/fonts/NeueHaasGrotText-55Roman-Trial.otf",
  variable: "--font-neue-haas",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
  },
  title: {
    default: `${site.name} — Portfolio`,
    template: `%s | ${site.name}`,
  },
  description: `Portfolio of ${site.name} — ${site.role}.`,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — Portfolio`,
    description: `Portfolio of ${site.name} — ${site.role}.`,
    images: [
      {
        url: "/assets/images/autonomous-vehicle.jpg",
        width: 1200,
        height: 630,
        alt: "Project preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Portfolio`,
    description: `Portfolio of ${site.name} — ${site.role}.`,
    images: ["/assets/images/autonomous-vehicle.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${neueHaas.variable}`}>
      <body className="v2-home" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <DeviceGateScript />
        <BodyRouteClass />
        <NavGlassFilter />
        <PortfolioSiteHeader />
        {children}
        <AiCodedFab />
      </body>
    </html>
  );
}
