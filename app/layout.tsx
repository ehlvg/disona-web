import type { Metadata } from "next";
import { Funnel_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Disona Web",
  description: "Web version of the infamous bot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${funnelDisplay.variable} antialiased`}
      >
        <Theme appearance="dark" radius="full">
          {children}
        </Theme>
      </body>
    </html>
  );
}
