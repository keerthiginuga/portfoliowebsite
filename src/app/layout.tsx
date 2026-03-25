import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import localFont from "next/font/local";
import { AiCodedFab } from "@/components/layout/AiCodedFab";
import { BodyRouteClass } from "@/components/layout/BodyRouteClass";
import { DeviceGateScript } from "@/components/layout/DeviceGateScript";
import { NavGlassFilter } from "@/components/layout/NavGlassFilter";
import { PortfolioSiteHeader } from "@/components/layout/PortfolioSiteHeader";
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

export const metadata: Metadata = {
  title: "Keerthi Ginuga — Portfolio",
  description: "Portfolio of Keerthi Ginuga — UX design and research.",
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
