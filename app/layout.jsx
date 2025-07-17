import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FingerprintGen from "@/components/fingerprintgen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const URL = process.env.NEXT_PUBLIC_URL;

export const metadata = {
  title: "Peronda Group CRM",
  description: "Created by Peronda Group IT Team",
  icons: {
    icon: `${URL}/favicon.ico`, // Default favicon
    shortcut: `${URL}/android-chrome-512x512.png`,
    apple: `${URL}/apple-touch-icon.png`, // For Apple devices
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FingerprintGen />
        {children}
      </body>
    </html>
  );
}
