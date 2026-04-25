"use client"
import "@/utils/i18n"
import { IBM_Plex_Sans_Arabic, Figtree } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"
const ibmPlexArabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic', "latin"], weight: ["400", "500", "700"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ar"
      suppressHydrationWarning
    >
      <body className={cn(ibmPlexArabic.className)} dir="rtl">
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
