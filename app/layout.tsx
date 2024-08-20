import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "./providers/ConvexClerkProvider";
import AudioProvider from "./providers/AudioProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "AudioScribe AI",
  description: "Generated your audio using AI",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ConvexClerkProvider>
        <AudioProvider>
          <body className={roboto.className}>{children}</body>
        </AudioProvider>
      </ConvexClerkProvider>
    </html>
  );
}
