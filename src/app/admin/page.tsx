"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  Shield, Activity, Users, Recycle, AlertTriangle, Truck,
  CheckCircle2, Clock, MapPin, ShoppingCart, ScanLine,
  User, ChevronRight, Zap, RefreshCw, LogOut, Bell,
  TrendingUp, Leaf, Eye, Radio, Globe, BarChart3,
  Search, Filter, Maximize2, MoreHorizontal
} from "lucide-react"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"
import { DEMO_EVENTS, DEMO_COMPLAINTS, DEMO_BINS, DEMO_VEHICLES } from "./demo-data"

interface LiveEvent {
  id: number
  action: string
  user: string
  location: string
  credits: number
  icon: string
  color: string
  time: string
}

const iconMap: Record<string, any> = {
  scan: ScanLine, alert: AlertTriangle, bin: Recycle,
  cart: ShoppingCart, user: User, truck: Truck, check: CheckCircle2,
}

const colorMap: Record<string, string> = {
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  red: "bg-red-500/10 text-red-400 border-red-500/20",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
}

const severityColor: Record<string, string> = {
  High: "bg-red-500/10 text-red-400 border-red-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
}

export default function AdminDashboard() {
  const router = useRouter()
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([])
  const [eventCounter, setEventCounter] = useState(0)
  const [kpis, setKpis] = useState({ citizens: 1247, bins: 24, complaints: 8, co2: 4820 })
  const [complaints, setComplaints] = useState(DEMO_COMPLAINTS)
  const [bins, setBins] = useState(DEMO_BINS)
  const [vehicles, setVehicles] = useState(DEMO_VEHICLES)
  const [isLive, setIsLive] = useState(true)
  const [selectedTab, setSelectedTab] = useState<"feed" | "complaints" | "bins" | "fleet" | "analytics" | "map">("feed")

  // Real-time simulation
  useEffect(() => {
    if (!isLive) return
    const interval = setInterval(() => {
      const event = DEMO_EVENTS[Math.floor(Math.random() * DEMO_EVENTS.length)]
      const now = new Date()
      const newEvent: LiveEvent = {
        ...event,
        id: Date.now(),
        time: now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      }
      setLiveEvents(prev => [newEvent, ...prev].slice(0, 50))
      setEventCounter(prev => prev + 1)
      
      setKpis(prev => ({
        ...prev,
        citizens: prev.citizens + (event.icon === "user" ? 1 : 0),
        co2: prev.co2 + Math.floor(Math.random() * 5),
      }))

      setBins(prev => prev.map(b => ({
        ...b,
        fill: Math.max(0, Math.min(100, b.fill + Math.floor(Math.random() * 5) - 1)),
      })))
    }, 3500)
    return () => clearInterval(interval)
  }, [isLive])

  useEffect(() => {
    const channel = supabase
      .channel("admin-global")
      .on("postgres_changes", { event: "*", schema: "public", table: "activity_log" }, (payload) => {
         if (payload.eventType === "INSERT") {
           const d = payload.new as any
           setLiveEvents(prev => [{
             id: Date.now(), action: d.action, user: "Live User",
             location: d.description || "Sector 14", credits: d.points_earned || 0,
             icon: "scan", color: "emerald",
             time: new Date().toLocaleTimeString(),
           }, ...prev].slice(0, 50))
         }
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "complaints" }, (payload) => {
        if (payload.eventType === "INSERT") {
          const c = payload.new as any
          setComplaints(prev => [{ id: c.id, type: c.type, location: c.location_name, severity: c.severity, status: c.status, time: "Just now" }, ...prev].slice(0, 20))
        }
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "smart_bins" }, (payload) => {
        const b = payload.new as any
        setBins(prev => prev.map(bin => bin.id === b.id ? { ...bin, fill: b.fill_level, status: b.status } : bin))
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 overflow-hidden flex">
      
      {/* ── COMMAND SIDEBAR ── */}
      <aside className="w-20 lg:w-64 border-r border-white/5 bg-[#080808]/80 backdrop-blur-3xl flex flex-col items-center lg:items-start py-8 px-4 gap-8 z-50">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <Shield size={22} className="text-black" />
          </div>
          <div className="hidden lg:block">
            <h1 className="text-sm font-black uppercase tracking-tighter leading-none">UrjaLoop</h1>
            <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-[0.2em] mt-1">Admin Command</p>
          </div>
        </div>

        <nav className="flex-1 w-full space-y-2">
          {[
            { id: "feed", icon: Activity, label: "Live Intel" },
            { id: "complaints", icon: AlertTriangle, label: "Incidents" },
            { id: "bins", icon: Recycle, label: "Infra-Health" },
            { id: "fleet", icon: Truck, label: "Fleet OPS" },
            { id: "analytics", icon: BarChart3, label: "Advanced Metrics" },
            { id: "map", icon: Globe, label: "Geospatial" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedTab(item.id as any)}
              className={cn(
                "w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 group relative",
                selectedTab === item.id ? "bg-emerald-500/10 text-emerald-400" : "text-white/20 hover:text-white/40 hover:bg-white/5"
              )}
            >
              <item.icon size={20} className={cn(selectedTab === item.id ? "scale-110" : "group-hover:scale-110 transition-transform")} />
              <span className="hidden lg:block text-xs font-bold uppercase tracking-widest">{item.label}</span>
              {selectedTab === item.id && (
                <div className="absolute left-[-16px] w-1 h-8 bg-emerald-500 rounded-r-full shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
              )}
            </button>
          ))}
        </nav>

        <div className="w-full pt-8 border-t border-white/5 space-y-2">
          <button onClick={() => router.push("/dashboard")} className="w-full flex items-center gap-4 p-3 rounded-2xl text-white/20 hover:text-red-400 hover:bg-red-500/5 transition-all">
            <LogOut size={20} />
            <span className="hidden lg:block text-xs font-bold uppercase tracking-widest">Exit Core</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN INTELLIGENCE CENTER ── */}
      <main className="flex-1 h-screen overflow-y-auto relative flex flex-col">
        
        {/* Top Header Bar */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-40">
          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl focus-within:border-emerald-500/50 transition-all">
                <Search size={14} className="text-white/20" />
                <input type="text" placeholder="Search Neural Nodes..." className="bg-transparent border-none outline-none text-xs text-white/60 w-48 placeholder:text-white/10 font-medium" />
             </div>
             <div className="flex items-center gap-4 border-l border-white/5 pl-6">
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">System Status</span>
                   <div className="flex items-center gap-2 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">All Systems Operational</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <Radio size={12} className="text-emerald-400 animate-pulse" />
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Live Stream Active</span>
             </div>
             <button className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all relative">
                <Bell size={18} />
                <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
             </button>
          </div>
        </header>

        {/* Content Content Area */}
        <div className="p-8 space-y-8 max-w-[1600px]">
          
          {/* KPI Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Active Citizens", value: kpis.citizens.toLocaleString(), delta: "+2.4%", icon: Users, color: "blue" },
              { label: "Waste Node Health", value: `${Math.floor(100 - (bins.filter(b => b.fill > 80).length / bins.length * 100))}%`, delta: "-0.8%", icon: Recycle, color: "emerald" },
              { label: "Critical Alerts", value: kpis.complaints.toString(), delta: "+3", icon: AlertTriangle, color: "amber" },
              { label: "Eco-Emission Delta", value: `${(kpis.co2 / 1000).toFixed(1)}T`, delta: "+12.1%", icon: Leaf, color: "purple" },
            ].map((kpi, i) => (
              <div key={i} className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 relative overflow-hidden group hover:border-white/10 transition-all">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-${kpi.color}-500/5 blur-3xl group-hover:bg-${kpi.color}-500/10 transition-all`} />
                <div className="flex justify-between items-start relative z-10">
                  <div className={cn("p-3 rounded-2xl", `bg-${kpi.color}-500/10 text-${kpi.color}-400`)}>
                    <kpi.icon size={22} />
                  </div>
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/5 px-2 py-1 rounded-lg">{kpi.delta}</span>
                </div>
                <div className="mt-6">
                  <p className="text-3xl font-black tracking-tighter">{kpi.value}</p>
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">{kpi.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Main Content View (Dynamic based on selectedTab) */}
            <div className="xl:col-span-2 bg-[#0c0c0c] border border-white/5 rounded-[2.5rem] flex flex-col overflow-hidden">
               
               {selectedTab === "feed" && (
                 <>
                   <div className="p-6 border-b border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                            <Activity size={16} />
                         </div>
                         <h3 className="text-sm font-black uppercase tracking-widest">Global Activity Stream</h3>
                      </div>
                      <div className="flex gap-2">
                         <button className="p-2 rounded-lg bg-white/5 text-white/30 hover:text-white"><Filter size={14} /></button>
                         <button className="p-2 rounded-lg bg-white/5 text-white/30 hover:text-white"><Maximize2 size={14} /></button>
                      </div>
                   </div>
                   
                   <div className="flex-1 overflow-y-auto max-h-[600px] p-4 space-y-3 custom-scrollbar">
                      {liveEvents.map((event, i) => {
                        const Icon = iconMap[event.icon] || Activity
                        return (
                          <div key={event.id} className={cn(
                            "flex items-center gap-4 p-4 rounded-[1.5rem] border transition-all duration-500",
                            i === 0 ? "bg-emerald-500/5 border-emerald-500/20 scale-[1.01] shadow-[0_0_20px_rgba(16,185,129,0.1)]" : "bg-white/[0.02] border-white/5"
                          )}>
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border", colorMap[event.color])}>
                              <Icon size={20} className={i === 0 ? "animate-pulse" : ""} />
                            </div>
                            <div className="flex-1 min-w-0">
                               <div className="flex items-center gap-2">
                                  <p className="text-[13px] font-black text-white/90">{event.action}</p>
                                  {i === 0 && <span className="text-[8px] bg-emerald-500 text-black px-1.5 py-0.5 rounded-full font-black uppercase">Now</span>}
                               </div>
                               <p className="text-[11px] text-white/40 font-medium truncate mt-0.5">{event.user} <span className="mx-1 opacity-30">·</span> {event.location}</p>
                            </div>
                            <div className="text-right flex flex-col items-end gap-1">
                               <span className="text-[10px] font-black font-mono text-white/20 tracking-tighter">{event.time}</span>
                               {event.credits !== 0 && (
                                 <div className={cn("text-[10px] font-black px-2 py-0.5 rounded-lg", event.credits > 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400")}>
                                    {event.credits > 0 ? "+" : ""}{event.credits}C
                                 </div>
                               )}
                            </div>
                          </div>
                        )
                      })}
                   </div>
                 </>
               )}

               {selectedTab === "complaints" && (
                 <div className="p-6 space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-widest mb-4">Active Incident Log</h3>
                    <div className="space-y-3">
                       {complaints.map(c => (
                         <div key={c.id} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between hover:border-white/10 transition-all">
                            <div className="flex items-center gap-4">
                               <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border", severityColor[c.severity])}>
                                  <AlertTriangle size={18} />
                               </div>
                               <div>
                                  <p className="text-xs font-black text-white/90">{c.type}</p>
                                  <p className="text-[10px] text-white/30 font-medium">{c.location} · {c.id}</p>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">{c.status}</p>
                               <p className="text-[9px] text-white/20 font-mono mt-0.5">{c.time}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               )}

               {selectedTab === "bins" && (
                 <div className="p-6">
                    <h3 className="text-sm font-black uppercase tracking-widest mb-6">Neural Node Infrastructure</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {bins.map(bin => (
                         <div key={bin.id} className="p-5 bg-white/[0.02] border border-white/5 rounded-3xl group hover:border-emerald-500/20 transition-all">
                            <div className="flex justify-between items-start mb-4">
                               <div>
                                  <p className="text-xs font-black text-white/90">{bin.name}</p>
                                  <p className="text-[10px] text-white/30 font-medium">{bin.location}</p>
                               </div>
                               <span className={cn("text-lg font-black font-mono", bin.fill > 80 ? "text-red-500" : "text-emerald-500")}>{bin.fill}%</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                               <div className={cn("h-full rounded-full transition-all duration-1000", bin.fill > 80 ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-emerald-500")} style={{ width: `${bin.fill}%` }} />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               )}

               {selectedTab === "fleet" && (
                 <div className="p-6">
                    <h3 className="text-sm font-black uppercase tracking-widest mb-6">Fleet Dispatch Monitor</h3>
                    <div className="space-y-3">
                       {vehicles.map(v => (
                         <div key={v.id} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40">
                                  <Truck size={18} />
                               </div>
                               <div>
                                  <p className="text-xs font-black text-white/90">{v.plate}</p>
                                  <p className="text-[10px] text-white/30 font-medium">{v.type} · {v.driver}</p>
                               </div>
                            </div>
                            <div className={cn("px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest", v.status === "on_route" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-white/5 text-white/20")}>
                               {v.status === "on_route" ? "In Transit" : "Idle"}
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               )}

            </div>

            {/* AI Intelligence / Quick Insights */}
            <div className="space-y-6">
               <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-[2.5rem] p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 text-black/10 group-hover:scale-110 transition-transform duration-700">
                     <Zap size={120} />
                  </div>
                  <div className="relative z-10">
                     <h3 className="text-xl font-black text-black uppercase tracking-tighter mb-2">Neural Priority</h3>
                     <p className="text-sm text-black/60 font-bold mb-6 max-w-[200px]">3 Smart Bins require immediate fleet dispatch in Sector 14.</p>
                     <button className="px-6 py-3 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Optimize Routes</button>
                  </div>
               </div>

               <div className="bg-[#0c0c0c] border border-white/5 rounded-[2.5rem] p-6">
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Network Load</h3>
                     <MoreHorizontal size={14} className="text-white/20" />
                  </div>
                  <div className="space-y-4">
                     {[
                       { label: "Urban Sector A", value: 84, color: "bg-emerald-500" },
                       { label: "Rural Hub 02", value: 42, color: "bg-blue-500" },
                       { label: "Market Center", value: 92, color: "bg-red-500" },
                     ].map((item, i) => (
                       <div key={i} className="space-y-2">
                          <div className="flex justify-between items-end">
                             <p className="text-[10px] font-bold text-white/60">{item.label}</p>
                             <p className="text-[10px] font-black font-mono">{item.value}%</p>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                             <div className={cn("h-full rounded-full transition-all duration-1000", item.color)} style={{ width: `${item.value}%` }} />
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="bg-[#0c0c0c] border border-white/5 rounded-[2.5rem] p-6 flex items-center justify-between group cursor-pointer hover:border-emerald-500/30 transition-all">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                        <TrendingUp size={20} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Sustainability</p>
                        <p className="text-sm font-bold text-white/90">View Impact Report</p>
                     </div>
                  </div>
                  <ChevronRight size={16} className="text-white/20 group-hover:translate-x-1 transition-transform" />
               </div>
            </div>

          </div>

        </div>

      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}</style>
    </div>
  )
}
