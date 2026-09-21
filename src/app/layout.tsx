import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Undangan Digital - Buat Undangan Pernikahan Digital yang Elegan",
    template: "%s | Undangan Digital",
  },
  description:
    "Platform undangan pernikahan digital modern dengan berbagai template cantik, fitur RSVP, ucapan, countdown, dan amplop digital. Mulai dari Rp 99.000.",
  keywords: [
    "undangan digital",
    "undangan pernikahan",
    "undangan online",
    "wedding invitation",
    "undangan nikah",
    "e-invitation",
  ],
  authors: [{ name: "Undangan Digital" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Undangan Digital",
    title: "Undangan Digital - Buat Undangan Pernikahan Digital yang Elegan",
    description:
      "Platform undangan pernikahan digital modern dengan berbagai template cantik dan fitur lengkap.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <TooltipProvider>
            {children}
            <Toaster position="top-right" richColors />
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
