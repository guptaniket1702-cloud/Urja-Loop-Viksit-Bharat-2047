"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MapPin, History, Trophy, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Map", href: "/map", icon: MapPin },
  { name: "Activity", href: "/activity", icon: History },
  { name: "Rewards", href: "/shop", icon: Trophy },
  { name: "Profile", href: "/profile", icon: User },
]

interface BottomNavProps {}

export function BottomNav({}: BottomNavProps) {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Blur background */}
      <div className="absolute inset-0 bg-card/80 backdrop-blur-2xl border-t border-border" />
      
      <div className="relative flex items-center justify-around px-2 h-[72px]">
        {navItems.map((item) => {
          const isActive = item.href && pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href!}
              className={cn(
                "flex flex-col items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className={cn("text-[10px] font-semibold", isActive ? "font-bold" : "")}>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
