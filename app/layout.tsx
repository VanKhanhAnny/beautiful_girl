import type { ReactNode } from "react";
import { Inter, Fira_Code, Merriweather } from "next/font/google";
import localFont from "next/font/local";
import { DeepgramContextProvider } from "./context/DeepgramContextProvider";
import { MicrophoneContextProvider } from "./context/MicrophoneContextProvider";
import { VoiceBotProvider } from "./context/VoiceBotContextProvider";
import { AnimationProvider } from "./context/AnimationContext";
import AnimatedBackground from "./components/AnimatedBackground";

import "./globals.css";
import { sharedOpenGraphMetadata } from "./lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "fallback",
});

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "fallback",
});

const fira = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira",
  display: "fallback",
});

// Keeping favorit for any components that might need it
const favorit = localFont({
  src: "./fonts/ABCFavorit-Bold.woff2",
  weight: "700",
  variable: "--font-favorit",
  display: "fallback",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_PATH || "http://localhost:3000"),
  title: "SafeGuard",
  description: "Your personal AI health companion",
  icons: {
    icon: [
      { url: "/logo%20(1).png" },
      { url: "/favicon.ico" },
    ],
    shortcut: ["/logo%20(1).png"],
    apple: [{ url: "/logo%20(1).png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    ...sharedOpenGraphMetadata,
    title: "SafeGuard",
    description: "Your personal AI health companion",
    images: [{ url: "/logo%20(1).png", width: 800, height: 600 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SafeGuard",
    creator: "@SafeGuard",
    images: ["/logo%20(1).png"],
  },
};

const fonts = [inter, merriweather, fira, favorit].map((font) => font.variable).join(" ");

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fonts} font-merriweather`}>
      <head>
        <link rel="shortcut icon" href="/logo%20(1).png" />
        <link rel="icon" href="/logo%20(1).png" type="image/png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo%20(1).png" />
      </head>
      <body className="bg-[#c6def1]">
        <AnimationProvider>
          <AnimatedBackground>
            <VoiceBotProvider>
              <MicrophoneContextProvider>
                <DeepgramContextProvider>{children}</DeepgramContextProvider>
              </MicrophoneContextProvider>
            </VoiceBotProvider>
          </AnimatedBackground>
        </AnimationProvider>
      </body>
    </html>
  );
}
