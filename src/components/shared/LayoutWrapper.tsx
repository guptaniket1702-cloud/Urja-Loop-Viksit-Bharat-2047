"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { BottomNav } from "./BottomNav"
import { Sidebar } from "./Sidebar"
import { ScanModal } from "./ScanModal"

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
      <main className="flex-1 w-full overflow-x-hidden">
        {/* Page content with max-width constraint on large screens */}
        <div className="w-full max-w-4xl mx-auto">
          {children}
        </div>
      </main>
      <BottomNav onScanClick={() => setIsScanModalOpen(true)} />
      <ScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
      />
    </div>
  )
}
