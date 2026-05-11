import type { Metadata, Viewport } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { LayoutWrapper } from "@/components/shared/LayoutWrapper"
import { ThemeProvider } from "@/components/shared/ThemeProvider"
import { LanguageProvider } from "@/components/shared/LanguageProvider"
import { ToastProvider } from "@/components/shared/Toast"
import { UserProvider } from "@/components/shared/UserContext"

const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit"
})

export const metadata: Metadata = {
  title: "UrjaLoop | Neural Waste Intelligence Platform",
  description: "AI-powered smart waste management platform for Viksit Bharat 2047. Real-time monitoring, rewards, and circular economy.",
  keywords: ["waste management", "AI", "smart city", "Viksit Bharat", "circular economy", "sustainability"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "UrjaLoop",
  },
  openGraph: {
    title: "UrjaLoop | Neural Waste Intelligence",
    description: "The future of urban waste management for Bharat.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans antialiased bg-mesh min-h-screen relative`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <UserProvider>
              <ToastProvider>
                <LayoutWrapper>
                  {children}
                </LayoutWrapper>
              </ToastProvider>
            </UserProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
