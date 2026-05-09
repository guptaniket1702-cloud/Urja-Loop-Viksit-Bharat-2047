"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, MapPin, ShoppingBag, User, BrainCircuit,
  AlertCircle, Globe, Leaf, Settings, LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"
import { LanguageToggle } from "./LanguageToggle"
import { useLanguage } from "./LanguageProvider"
import { ThemeToggle } from "./ThemeToggle"

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Live Map", href: "/map", icon: MapPin },
    { name: "Marketplace", href: "/shop", icon: ShoppingBag },
    { name: "Complaints", href: "/complaints", icon: AlertCircle },
    { name: "Urja AI", href: "/bot", icon: BrainCircuit },
    { name: "Profile", href: "/profile", icon: User },
  ]

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-card border-r border-border z-40">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm">
            <Leaf className="text-primary-foreground" size={18} strokeWidth={2.5} />
          </div>
          <div>
            <span className="text-lg font-bold text-foreground tracking-tight">Urja<span className="text-primary">Loop</span></span>
            <p className="text-[10px] text-muted-foreground font-medium leading-none">Smart Waste Platform</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 pb-2 pt-1">Navigation</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.name}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground/70" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer Controls */}
      <div className="p-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-muted-foreground font-medium">Language</span>
          <LanguageToggle />
        </div>
        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-muted-foreground font-medium">Theme</span>
          <ThemeToggle />
        </div>
        <div className="pt-2 border-t border-border">
          <div className="flex items-center gap-3 px-2 py-2">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="w-8 h-8 rounded-xl border border-border" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">Alex Harrison</p>
              <p className="text-[10px] text-muted-foreground truncate">Sector 14 · New Delhi</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
