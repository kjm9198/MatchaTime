import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-providers";
import { Toaster } from "sonner";
import {ModalProvider} from "@/components/providers/modal-providers";

const inter = Inter({
  subsets: ["latin"]
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Matcha Time",
  description: "A simple way to keep a connected workspace in sync with time.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.png",
        href: "/logo.png"
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.png",
        href: "/logo-dark.png"
      }
    ]
  }
};

export default function RootLayout({
                                     children
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
    <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} font-sans h-full`}>
    <ConvexClientProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
        disableTransitionOnChange
        storageKey="theme-preference"
      >
        <Toaster position="bottom-center"/>
        <ModalProvider/>
        {children}
      </ThemeProvider>
    </ConvexClientProvider>
    </body>
    </html>
  );
}
