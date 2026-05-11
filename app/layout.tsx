"use client"
import "@/utils/i18n"
import "./globals.css"
import { IBM_Plex_Sans_Arabic } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const ibmPlexArabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic', "latin"], weight: ["400", "500", "700"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const client = new QueryClient()
  return (
    <html
      lang="ar"
      suppressHydrationWarning
    >
      <QueryClientProvider client={client}>
        <body className={cn(ibmPlexArabic.className)} dir="rtl">
          <ThemeProvider>{children}</ThemeProvider>
          <Toaster />
        </body>
      </QueryClientProvider>
    </html>
  )
}
