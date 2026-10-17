import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat, Fraunces } from "next/font/google";
import { MotionEnhancements } from "@/components/motion/motion-enhancements";
import { themeInitScript } from "@/lib/theme";
import "@/app/globals.css";

const sans = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});
const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});
const hand = Caveat({
  subsets: ["latin"],
  weight: "600",
  display: "swap",
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Abhay Upadhyay — Software Engineer",
  description:
    "Abhay Upadhyay — Software Engineer focused on Backend & AI Systems.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="system"
      className={`${sans.variable} ${display.variable} ${hand.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body id="top" className="flex min-h-svh flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-control focus:bg-background focus:p-3"
        >
          Skip to content
        </a>
        <div className="paper-grain" aria-hidden="true" />
        {children}
        <MotionEnhancements />
      </body>
    </html>
  );
}
