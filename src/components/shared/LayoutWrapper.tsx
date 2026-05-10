"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { BottomNav } from "./BottomNav"
import { Sidebar } from "./Sidebar"
import { ScanModal } from "./ScanModal"
import { Footer } from "./Footer"
import { ModeToggle } from "./ModeToggle"

const AUTH_ROUTES = ["/splash", "/onboarding", "/login", "/verify-otp", "/setup-profile", "/permissions"]

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isScanModalOpen, setIsScanModalOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  const isAuthRoute = AUTH_ROUTES.includes(pathname)

  useEffect(() => {
    setMounted(true)
    if (!isAuthRoute) {
      const hasOnboarded = localStorage.getItem("urjaloop_onboarded")
      if (!hasOnboarded) {
        router.push("/splash")
      }
    }
  }, [isAuthRoute, pathname, router])

  if (!mounted) return <div className="min-h-screen bg-background" />

  if (isAuthRoute) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {children}
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 w-full overflow-x-hidden flex flex-col">

        {/* Top Header with Mode Toggle */}
        <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 py-3 px-4 flex justify-center">
          <ModeToggle />
        </div>
        {/* Page content */}
        <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6 pb-24 md:pb-6">
          {children}
        </div>
        {/* Premium footer — visible on all main pages */}
        <Footer />
      </main>
      <BottomNav onScanClick={() => setIsScanModalOpen(true)} />
      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
      />
    </div>
  )
}
