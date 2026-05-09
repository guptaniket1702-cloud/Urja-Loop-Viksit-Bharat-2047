"use client"

import { useState } from "react"
import { 
  AlertTriangle, MapPin, Camera, CheckCircle2, Clock,
  Upload, ShieldCheck, AlertCircle, ChevronRight,
  Filter, MessageSquare, Image, Target, Zap, Phone
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const STATUS_STEPS = ["Submitted", "Under Review", "Assigned", "In Progress", "Resolved"]

const myComplaints = [
  { 
    id: "CMP-001", type: "Overflowing Bin", location: "Sector 14 Market",
    time: "2 hours ago", status: "In Progress", statusIdx: 3,
    assignedTo: "Team Alpha — Truck #402", expectedResolution: "Today, 4:00 PM",
    severity: "High", aiValidated: true,
    image: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&q=80&w=400"
  },
  { 
    id: "CMP-002", type: "Illegal Dumping", location: "Behind Metro Station",
    time: "Yesterday", status: "Resolved", statusIdx: 4,
    assignedTo: "Rapid Response Team", expectedResolution: "Resolved 10:30 AM",
    severity: "High", aiValidated: true,
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=400"
  },
  { 
    id: "CMP-003", type: "Damaged Bin Cover", location: "Park Entrance",
    time: "10 mins ago", status: "Submitted", statusIdx: 0,
    assignedTo: "Awaiting Assignment", expectedResolution: "To be determined",
    severity: "Low", aiValidated: false,
    image: null
  },
]

export default function Complaints() {
  const [activeTab, setActiveTab] = useState<"new" | "history">("history")
  const [selectedComplaint, setSelectedComplaint] = useState(myComplaints[0])
  const [formStep, setFormStep] = useState(0)

  return (
    <div className="p-4 pb-32 lg:p-8 space-y-6 animate-in fade-in duration-700 min-h-screen">
      
      {/* Header */}
      <div className="pt-2 space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Complaint Center</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Transparent · AI-Validated · Citizen-Powered</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 rounded-2xl">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">AI Verified</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Open", value: "2", color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "In Progress", value: "1", color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Resolved", value: "12", color: "text-emerald-500", bg: "bg-emerald-500/10" },
        ].map((s) => (
          <div key={s.label} className={cn("p-3 rounded-2xl", s.bg)}>
            <p className={cn("text-xl font-bold", s.color)}>{s.value}</p>
            <p className="text-xs text-muted-foreground font-medium mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tab Switch */}
      <div className="flex gap-2 p-1 bg-muted rounded-2xl">
        <button onClick={() => setActiveTab("new")}
          className={cn("flex-1 py-2 rounded-xl text-xs font-bold transition-all", 
            activeTab === "new" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}>
          + File Report
        </button>
        <button onClick={() => setActiveTab("history")}
          className={cn("flex-1 py-2 rounded-xl text-xs font-bold transition-all",
            activeTab === "history" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}>
          My Complaints
        </button>
      </div>

      {activeTab === "new" ? (
        /* --- FILE NEW COMPLAINT FORM --- */
        <Card className="border border-border bg-card shadow-sm rounded-3xl">
          <CardContent className="p-6 space-y-5">
            <h2 className="text-base font-bold text-foreground">File a New Complaint</h2>
            
            {/* Photo Upload */}
            <div className="w-full aspect-video border-2 border-dashed border-border rounded-2xl bg-muted/40 flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 hover:bg-muted/60 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-card rounded-2xl border border-border flex items-center justify-center mb-3 group-hover:border-primary/40 transition-all">
                <Camera size={20} className="text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground">Capture or Upload Photo</p>
              <p className="text-xs text-muted-foreground mt-1">Evidence helps faster resolution</p>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location</label>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-3 p-3 bg-muted/40 border border-border rounded-2xl">
                  <MapPin size={16} className="text-primary flex-shrink-0" />
                  <input type="text" defaultValue="Sector 14 · New Delhi"
                    className="bg-transparent border-none outline-none text-sm text-foreground flex-1" />
                </div>
                <button className="w-12 h-12 bg-muted/40 border border-border rounded-2xl flex items-center justify-center text-primary hover:bg-primary/10 transition-all">
                  <Target size={18} />
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground px-1">📍 GPS location captured automatically</p>
            </div>

            {/* Issue Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Issue Type</label>
              <select className="w-full p-3 bg-muted/40 border border-border rounded-2xl text-sm text-foreground outline-none focus:border-primary/50 transition-all">
                <option>Overflowing Bin</option>
                <option>Illegal / Open Dumping</option>
                <option>Damaged Infrastructure</option>
                <option>Bio-Hazard / Health Risk</option>
                <option>Missed Collection</option>
              </select>
            </div>

            {/* Severity */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Severity</label>
              <div className="flex gap-2">
                {["Low", "Medium", "High"].map((level) => (
                  <button key={level} className={cn("flex-1 py-2 rounded-xl text-xs font-bold border transition-all",
                    level === "High" ? "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400" :
                    level === "Medium" ? "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                    "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  )}>
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</label>
              <textarea
                placeholder="Describe the issue clearly..."
                rows={3}
                className="w-full p-3 bg-muted/40 border border-border rounded-2xl text-sm text-foreground outline-none focus:border-primary/50 transition-all resize-none placeholder:text-muted-foreground/60"
              />
            </div>

            {/* AI Validation Note */}
            <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-2xl">
              <ShieldCheck size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">AI-Assisted Validation</span> — Your complaint will be reviewed by our AI system for duplicate detection and severity confirmation before assignment.
              </p>
            </div>

            <button className="w-full bg-primary text-primary-foreground py-3 rounded-2xl text-sm font-bold tracking-wide hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2">
              <Upload size={16} /> Submit Complaint
            </button>
          </CardContent>
        </Card>
      ) : (
        /* --- COMPLAINT HISTORY --- */
        <div className="space-y-4">
          {myComplaints.map((complaint) => (
            <Card key={complaint.id}
              onClick={() => setSelectedComplaint(complaint)}
              className={cn("border bg-card shadow-sm rounded-3xl cursor-pointer transition-all hover:shadow-md",
                selectedComplaint.id === complaint.id ? "border-primary/40" : "border-border"
              )}>
              <CardContent className="p-0">
                <div className="flex">
                  {/* Image */}
                  <div className="w-24 h-full min-h-[120px] flex-shrink-0 rounded-l-3xl overflow-hidden">
                    {complaint.image ? (
                      <img src={complaint.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Image size={20} className="text-muted-foreground/40" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">{complaint.id}</p>
                        <p className="text-sm font-bold text-foreground">{complaint.type}</p>
                      </div>
                      <Badge className={cn("text-[10px] border-none rounded-xl px-2 py-0.5 font-semibold flex-shrink-0",
                        complaint.status === "Resolved" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                        complaint.status === "In Progress" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" :
                        "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      )}>
                        {complaint.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-1.5 mb-3">
                      <MapPin size={10} className="text-muted-foreground" />
                      <p className="text-[11px] text-muted-foreground">{complaint.location}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex gap-1">
                      {STATUS_STEPS.map((_, i) => (
                        <div key={i} className={cn("flex-1 h-1 rounded-full transition-all",
                          i <= complaint.statusIdx ? "bg-primary" : "bg-muted"
                        )} />
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-muted-foreground">{STATUS_STEPS[complaint.statusIdx]}</span>
                      {complaint.aiValidated && (
                        <div className="flex items-center gap-1">
                          <ShieldCheck size={10} className="text-primary" />
                          <span className="text-[10px] text-primary font-semibold">AI Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Detail */}
                {selectedComplaint.id === complaint.id && (
                  <div className="border-t border-border mx-4 pt-4 pb-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-muted/40 rounded-2xl">
                        <p className="text-[10px] text-muted-foreground">Assigned To</p>
                        <p className="text-xs font-semibold text-foreground mt-1">{complaint.assignedTo}</p>
                      </div>
                      <div className="p-3 bg-muted/40 rounded-2xl">
                        <p className="text-[10px] text-muted-foreground">Resolution ETA</p>
                        <p className="text-xs font-semibold text-foreground mt-1">{complaint.expectedResolution}</p>
                      </div>
                    </div>
                    
                    {/* Timeline */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Timeline</p>
                      {STATUS_STEPS.slice(0, complaint.statusIdx + 1).map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 size={11} className="text-primary" />
                          </div>
                          <p className="text-xs text-foreground font-medium">{step}</p>
                        </div>
                      ))}
                      {STATUS_STEPS.slice(complaint.statusIdx + 1).map((step, i) => (
                        <div key={i} className="flex items-center gap-3 opacity-40">
                          <div className="w-5 h-5 rounded-full border border-border flex-shrink-0" />
                          <p className="text-xs text-muted-foreground">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
