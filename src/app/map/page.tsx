"use client"

import { useState } from "react"
import { 
  MapPin, Search, Navigation, Filter, AlertCircle,
  Clock, Truck, Recycle, Info, ChevronUp, RefreshCw,
  Layers, Eye, ThumbsUp, AlertTriangle
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useMode } from "@/components/shared/ModeProvider"
import { RuralMap } from "@/components/rural/RuralMap"

const locations = [
  { id: 1, type: "bin", lat: "38%", lng: "28%", fill: 18, status: "low", address: "Sector 14 Main Gate", lastCleaned: "2h ago", nextPickup: "Tomorrow, 6 AM", capacity: "120L" },
  { id: 2, type: "bin", lat: "52%", lng: "48%", fill: 67, status: "medium", address: "City Center Park", lastCleaned: "5h ago", nextPickup: "Today, 4 PM", capacity: "120L" },
  { id: 3, type: "bin", lat: "22%", lng: "62%", fill: 91, status: "high", address: "Green View Market", lastCleaned: "12h ago", nextPickup: "ASAP", capacity: "120L" },
  { id: 4, type: "vehicle", lat: "58%", lng: "33%", address: "Collection Truck #402", route: "Sector 14 Route", eta: "~18 min away" },
  { id: 5, type: "complaint", lat: "45%", lng: "70%", address: "Illegal Dumping Reported", status: "in-progress" },
]

const statusColor = {
  low: { bg: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400", badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", label: "Low Fill" },
  medium: { bg: "bg-amber-500", text: "text-amber-600 dark:text-amber-400", badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400", label: "Medium Fill" },
  high: { bg: "bg-red-500", text: "text-red-600 dark:text-red-400", badge: "bg-red-500/10 text-red-600 dark:text-red-400", label: "Needs Pickup" },
}

export default function MapPage() {
  const { mode } = useMode()
  const [selectedEntity, setSelectedEntity] = useState<typeof locations[0]>(locations[2])
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [showTransparency, setShowTransparency] = useState(true)
  const [isSheetExpanded, setIsSheetExpanded] = useState(false)

  if (mode === "rural") {
    return <RuralMap />
  }

  return (
    <div className="h-[calc(100vh-0rem)] w-full relative overflow-hidden bg-background animate-in fade-in duration-700">
      
      {/* Map Simulation Background */}
      <div className="absolute inset-0 z-0">
        {/* City grid simulation */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(var(--primary-rgb, 16,185,129), 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--primary-rgb, 16,185,129), 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px"
        }} />
        {/* Road lines simulation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
          <line x1="0" y1="40%" x2="100%" y2="40%" stroke="currentColor" strokeWidth="3" />
          <line x1="0" y1="65%" x2="100%" y2="65%" stroke="currentColor" strokeWidth="2" />
          <line x1="35%" y1="0" x2="35%" y2="100%" stroke="currentColor" strokeWidth="3" />
          <line x1="68%" y1="0" x2="68%" y2="100%" stroke="currentColor" strokeWidth="2" />
          <rect x="30%" y="35%" width="20%" height="12%" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" rx="4" />
          <rect x="55%" y="42%" width="15%" height="10%" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" rx="4" />
        </svg>

        {/* Heatmap overlay */}
        {showHeatmap && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bg-red-500/20 rounded-full blur-3xl w-32 h-32" style={{ top: "18%", left: "57%" }} />
            <div className="absolute bg-amber-500/15 rounded-full blur-3xl w-24 h-24" style={{ top: "48%", left: "43%" }} />
            <div className="absolute bg-emerald-500/10 rounded-full blur-3xl w-20 h-20" style={{ top: "33%", left: "23%" }} />
          </div>
        )}

        {/* Entity Markers */}
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => { setSelectedEntity(loc); setIsSheetExpanded(false) }}
            style={{ top: loc.lat, left: loc.lng }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 hover:scale-110 z-10"
          >
            {loc.type === "bin" && (
              <div className="relative">
                {(loc.fill ?? 0) > 85 && (
                  <div className={cn("absolute -inset-2 rounded-full animate-ping opacity-30", statusColor[loc.status as keyof typeof statusColor].bg)} />
                )}
                <div className={cn(
                  "w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg border-2 border-background transition-all",
                  selectedEntity.id === loc.id ? "scale-125 ring-2 ring-primary" : "",
                  loc.status === "low" ? "bg-emerald-500 text-white" :
                  loc.status === "medium" ? "bg-amber-500 text-white" : "bg-red-500 text-white"
                )}>
                  <Recycle size={18} strokeWidth={2.5} />
                </div>
                {/* Fill indicator */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-background text-foreground text-[9px] font-black px-1.5 py-0.5 rounded-full border border-border shadow-sm whitespace-nowrap">
                  {loc.fill}%
                </div>
              </div>
            )}
            {loc.type === "vehicle" && (
              <div className={cn("w-11 h-11 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-lg border-2 border-background transition-all",
                selectedEntity.id === loc.id ? "scale-125 ring-2 ring-blue-500" : ""
              )}>
                <Truck size={18} strokeWidth={2.5} />
              </div>
            )}
            {loc.type === "complaint" && (
              <div className={cn("w-11 h-11 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg border-2 border-background transition-all",
                selectedEntity.id === loc.id ? "scale-125 ring-2 ring-orange-500" : ""
              )}>
                <AlertTriangle size={18} strokeWidth={2.5} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Top Search Bar */}
      <div className="absolute top-4 left-4 right-16 z-20">
        <div className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-lg flex items-center gap-3 px-4 py-3">
          <Search size={18} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Search locations, bins, complaints..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      {/* Right Toolbar */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
        <button
          onClick={() => setShowHeatmap(!showHeatmap)}
          className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border border-border transition-all",
            showHeatmap ? "bg-primary text-primary-foreground" : "bg-card/95 backdrop-blur-xl text-muted-foreground hover:text-foreground"
          )}
          title="Waste Density Heatmap"
        >
          <Layers size={16} />
        </button>
        <button
          onClick={() => setShowTransparency(!showTransparency)}
          className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border border-border transition-all",
            showTransparency ? "bg-primary text-primary-foreground" : "bg-card/95 backdrop-blur-xl text-muted-foreground hover:text-foreground"
          )}
          title="Transparency Mode"
        >
          <Eye size={16} />
        </button>
        <button className="w-10 h-10 rounded-2xl bg-card/95 backdrop-blur-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary shadow-lg transition-all">
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Legend */}
      <div className="hidden md:flex absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-lg px-4 py-2 items-center gap-4">
        {[
          { color: "bg-emerald-500", label: "Low Fill" },
          { color: "bg-amber-500", label: "Medium" },
          { color: "bg-red-500", label: "Needs Pickup" },
          { color: "bg-blue-500", label: "Collection Truck" },
          { color: "bg-orange-500", label: "Complaint" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={cn("w-2.5 h-2.5 rounded-full", l.color)} />
            <span className="text-[11px] font-medium text-muted-foreground">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom Sheet — Entity Details */}
      <div className={cn(
        "absolute bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-20 bg-card/95 backdrop-blur-xl border border-border rounded-3xl shadow-2xl transition-all duration-500",
        isSheetExpanded ? "max-h-[70vh] overflow-y-auto" : ""
      )}>
        {/* Drag handle */}
        <button
          onClick={() => setIsSheetExpanded(!isSheetExpanded)}
          className="w-full flex items-center justify-center py-3"
        >
          <div className="w-8 h-1 bg-border rounded-full" />
        </button>

        <div className="px-5 pb-5">
          {/* Status badge */}
          {selectedEntity.type === "bin" && (
            <>
              <div className="flex items-center justify-between mb-4">
                <Badge className={cn("text-xs border-none rounded-xl px-3 py-1 font-semibold",
                  statusColor[selectedEntity.status as keyof typeof statusColor]?.badge
                )}>
                  {statusColor[selectedEntity.status as keyof typeof statusColor]?.label}
                </Badge>
                <span className="text-xs text-muted-foreground font-medium">{selectedEntity.address}</span>
              </div>

              {/* Fill level visual */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted-foreground">Fill Level</span>
                  <span className="text-sm font-bold text-foreground">{selectedEntity.fill}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all",
                    selectedEntity.status === "low" ? "bg-emerald-500" :
                    selectedEntity.status === "medium" ? "bg-amber-500" : "bg-red-500"
                  )} style={{ width: `${selectedEntity.fill}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-muted/40 rounded-2xl">
                  <Clock size={13} className="text-muted-foreground mb-1.5" />
                  <p className="text-[10px] text-muted-foreground">Last Cleaned</p>
                  <p className="text-xs font-bold text-foreground mt-0.5">{selectedEntity.lastCleaned}</p>
                </div>
                <div className="p-3 bg-muted/40 rounded-2xl">
                  <Truck size={13} className="text-muted-foreground mb-1.5" />
                  <p className="text-[10px] text-muted-foreground">Next Pickup</p>
                  <p className="text-xs font-bold text-foreground mt-0.5">{selectedEntity.nextPickup}</p>
                </div>
              </div>

              <button className="w-full bg-primary text-primary-foreground py-2.5 rounded-2xl text-xs font-bold tracking-wide hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2">
                <Navigation size={14} /> Get Directions
              </button>
            </>
          )}

          {selectedEntity.type === "vehicle" && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                  <Truck size={20} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{selectedEntity.address}</p>
                  <p className="text-xs text-muted-foreground">{selectedEntity.route}</p>
                </div>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-2xl">
                <p className="text-xs text-muted-foreground">Estimated Arrival</p>
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">{selectedEntity.eta}</p>
              </div>
              <p className="text-[10px] text-muted-foreground mt-3">📍 Approximate location shown for privacy.</p>
            </div>
          )}

          {selectedEntity.type === "complaint" && (
            <div>
              <Badge className="bg-orange-500/10 text-orange-600 dark:text-orange-400 border-none mb-3">In Progress</Badge>
              <p className="text-sm font-bold text-foreground mb-2">{selectedEntity.address}</p>
              <button className="w-full border border-orange-500/30 text-orange-600 dark:text-orange-400 py-2.5 rounded-2xl text-xs font-bold hover:bg-orange-500/10 transition-all">
                View Complaint Details →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Transparency mode overlay */}
      {showTransparency && (
        <div className="absolute top-[4.5rem] md:top-4 left-4 z-20 bg-card/90 backdrop-blur-xl border border-border rounded-2xl p-3 shadow-lg">
          <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-2">Transparency Mode</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              9 bins — good condition
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              2 bins — needs attention
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              1 bin — pickup required
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
