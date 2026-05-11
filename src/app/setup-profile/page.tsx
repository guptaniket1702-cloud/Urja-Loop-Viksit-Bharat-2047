"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Camera, User, MapPin, Zap, ShieldCheck, 
  Mail, Sprout, Recycle, Check, Map 
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function SetupProfileScreen() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Citizen",
    isFarmer: false,
    farmerDetails: {
      farmType: "",
      biomassWaste: "",
      farmLocation: "",
      wantsToSellBiomass: false
    },
    location: "",
    pinCode: "",
    preferredStation: "",
    alerts: {
      collectionReminders: true,
      creditUpdates: true,
      stationAlerts: true,
      sustainabilityInsights: true
    }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const roles = ["Citizen", "Farmer", "Collector", "Recycler / Vendor", "Municipality"]

  const toggleAlert = (key: keyof typeof formData.alerts) => {
    setFormData(prev => ({
      ...prev,
      alerts: {
        ...prev.alerts,
        [key]: !prev.alerts[key]
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.location) {
      setIsSubmitting(true)
      setTimeout(() => {
        router.push("/permissions")
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden p-4 sm:p-6 transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      {/* Header Strategy */}
      <div className="w-full max-w-2xl mx-auto pt-8 pb-6 z-10 animate-in slide-in-from-top-6 fade-in duration-1000">
        <div className="flex items-center gap-3 mb-3">
           <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
              <User size={16} strokeWidth={2.5} />
           </div>
           <span className="text-[11px] font-bold text-primary uppercase tracking-[0.2em]">Profile Setup</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Create Your UrjaLoop Identity</h1>
        <p className="text-sm sm:text-base font-medium text-muted-foreground mt-3 max-w-lg leading-relaxed">
          Set up your profile to start tracking waste contributions, earn Urja Credits, and access nearby recycling services.
        </p>
      </div>

      {/* Main Form Deck */}
      <div className="flex-1 flex flex-col z-10 w-full max-w-2xl mx-auto animate-in slide-in-from-bottom-10 fade-in duration-1000 fill-mode-both pb-24">
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Profile Avatar Section */}
          <div className="ultra-glass rounded-3xl p-8 shadow-xl shadow-black/5 border border-white/10 relative overflow-hidden flex flex-col sm:flex-row items-center gap-6">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50"></div>
             <div className="relative group cursor-pointer shrink-0 z-10">
               <div className="w-28 h-28 rounded-full bg-foreground/5 border border-border flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-105 shadow-inner">
                 <User size={40} className="text-foreground/20" strokeWidth={1.5} />
                 <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               </div>
               <div className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg border-4 border-background group-hover:scale-110 transition-transform">
                 <Camera size={16} strokeWidth={2.5} />
               </div>
             </div>
             <div className="text-center sm:text-left z-10">
                <h3 className="text-base font-semibold text-foreground">Upload Profile Photo</h3>
                <p className="text-xs text-muted-foreground mt-1">Optional but recommended for community verification</p>
             </div>
          </div>

          {/* Section 1 — Basic Information */}
          <div className="space-y-5">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
               <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px]">1</span> Basic Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground ml-1">Full Name</label>
                <div className="relative flex items-center">
                  <User size={18} className="absolute left-4 text-muted-foreground/50" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                    className="w-full bg-foreground/5 border border-border rounded-xl h-14 pl-12 pr-4 font-medium text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/40"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground ml-1">Email Address</label>
                <div className="relative flex items-center">
                  <Mail size={18} className="absolute left-4 text-muted-foreground/50" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter your email"
                    className="w-full bg-foreground/5 border border-border rounded-xl h-14 pl-12 pr-4 font-medium text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/40"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-border"></div>

          {/* Section 2 — User Type */}
          <div className="space-y-5">
            <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-2">
               <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                 <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px]">2</span> Select Your Role
               </h2>
               <p className="text-xs text-muted-foreground">Your role helps personalize waste collection and rewards.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setFormData({...formData, role})}
                  className={cn(
                    "h-12 px-5 rounded-xl text-sm font-medium transition-all border flex items-center gap-2",
                    formData.role === role
                      ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                      : "bg-foreground/5 text-foreground/70 border-border hover:border-primary/30 hover:bg-foreground/10"
                  )}
                >
                  {formData.role === role && <Check size={16} />}
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-border"></div>

          {/* Section 3 — Farmer Toggle */}
          <div className="space-y-5">
             <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
               <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px]">3</span> Agricultural Details
             </h2>
             
             <div className="flex items-center justify-between bg-foreground/5 border border-border rounded-2xl p-5">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                     <Sprout size={20} />
                   </div>
                   <div className="pr-4">
                     <h3 className="text-sm font-semibold text-foreground">Are you involved in farming or agricultural waste generation?</h3>
                   </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, isFarmer: !formData.isFarmer})}
                  className={cn(
                    "w-14 h-8 rounded-full transition-colors relative shrink-0",
                    formData.isFarmer ? "bg-primary" : "bg-foreground/20"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform shadow-sm",
                    formData.isFarmer ? "translate-x-6" : "translate-x-0"
                  )} />
                </button>
             </div>

             {formData.isFarmer && (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in slide-in-from-top-4 fade-in duration-300">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground ml-1">Farm Type</label>
                    <select
                      value={formData.farmerDetails.farmType}
                      onChange={(e) => setFormData({...formData, farmerDetails: {...formData.farmerDetails, farmType: e.target.value}})}
                      className="w-full bg-foreground/5 border border-border rounded-xl h-14 px-4 font-medium text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                    >
                      <option value="" disabled>Crop / Dairy / Mixed Farming</option>
                      <option value="Crop">Crop Farming</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Mixed">Mixed Farming</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground ml-1">Biomass Waste Generated</label>
                    <select
                      value={formData.farmerDetails.biomassWaste}
                      onChange={(e) => setFormData({...formData, farmerDetails: {...formData.farmerDetails, biomassWaste: e.target.value}})}
                      className="w-full bg-foreground/5 border border-border rounded-xl h-14 px-4 font-medium text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                    >
                      <option value="" disabled>Select Volume</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground ml-1">Farm Location</label>
                    <input
                      type="text"
                      value={formData.farmerDetails.farmLocation}
                      onChange={(e) => setFormData({...formData, farmerDetails: {...formData.farmerDetails, farmLocation: e.target.value}})}
                      placeholder="Village / District"
                      className="w-full bg-foreground/5 border border-border rounded-xl h-14 px-4 font-medium text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/40"
                    />
                  </div>
                  <div className="space-y-2 flex flex-col justify-center">
                    <div className="flex items-center justify-between bg-foreground/5 border border-border rounded-xl h-14 px-4 mt-6 sm:mt-0">
                       <span className="text-sm font-medium text-foreground">Interested in Biomass Selling?</span>
                       <button
                        type="button"
                        onClick={() => setFormData({...formData, farmerDetails: {...formData.farmerDetails, wantsToSellBiomass: !formData.farmerDetails.wantsToSellBiomass}})}
                        className={cn(
                          "w-12 h-6 rounded-full transition-colors relative shrink-0",
                          formData.farmerDetails.wantsToSellBiomass ? "bg-primary" : "bg-foreground/20"
                        )}
                      >
                        <div className={cn(
                          "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform shadow-sm",
                          formData.farmerDetails.wantsToSellBiomass ? "translate-x-6" : "translate-x-0"
                        )} />
                      </button>
                    </div>
                  </div>
               </div>
             )}
          </div>

          <div className="w-full h-px bg-border"></div>

          {/* Section 4 — Location */}
          <div className="space-y-5">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
               <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px]">4</span> Location Settings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground ml-1">Primary Location</label>
                <div className="relative flex items-center">
                  <MapPin size={18} className="absolute left-4 text-muted-foreground/50" />
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="City / Village Name"
                    className="w-full bg-foreground/5 border border-border rounded-xl h-14 pl-12 pr-4 font-medium text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/40"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground ml-1">PIN Code</label>
                <div className="relative flex items-center">
                  <Map size={18} className="absolute left-4 text-muted-foreground/50" />
                  <input
                    type="text"
                    value={formData.pinCode}
                    onChange={(e) => setFormData({...formData, pinCode: e.target.value})}
                    placeholder="Enter PIN code"
                    className="w-full bg-foreground/5 border border-border rounded-xl h-14 pl-12 pr-4 font-medium text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/40"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground ml-1">Preferred Loop Station</label>
                <div className="relative flex items-center">
                  <Recycle size={18} className="absolute left-4 text-muted-foreground/50" />
                  <select
                    value={formData.preferredStation}
                    onChange={(e) => setFormData({...formData, preferredStation: e.target.value})}
                    className="w-full bg-foreground/5 border border-border rounded-xl h-14 pl-12 pr-4 font-medium text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                  >
                    <option value="" disabled>Select nearby station</option>
                    <option value="Station 1">Central City Station</option>
                    <option value="Station 2">North Block Hub</option>
                    <option value="Station 3">Village Junction</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-border"></div>

          {/* Section 5 — Notifications & Rewards */}
          <div className="space-y-5">
             <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
               <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px]">5</span> Notifications & Rewards
             </h2>
             <p className="text-xs text-muted-foreground mb-4">Enable Smart Alerts</p>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
               {[
                 { id: 'collectionReminders', label: 'Collection reminders' },
                 { id: 'creditUpdates', label: 'Credit reward updates' },
                 { id: 'stationAlerts', label: 'Nearby station alerts' },
                 { id: 'sustainabilityInsights', label: 'Sustainability insights' }
               ].map((alert) => (
                 <div key={alert.id} className="flex items-center justify-between bg-foreground/5 border border-border rounded-xl p-4">
                    <span className="text-sm font-medium text-foreground">{alert.label}</span>
                    <button
                      type="button"
                      onClick={() => toggleAlert(alert.id as keyof typeof formData.alerts)}
                      className={cn(
                        "w-12 h-6 rounded-full transition-colors relative shrink-0",
                        formData.alerts[alert.id as keyof typeof formData.alerts] ? "bg-primary" : "bg-foreground/20"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform shadow-sm",
                        formData.alerts[alert.id as keyof typeof formData.alerts] ? "translate-x-6" : "translate-x-0"
                      )} />
                    </button>
                 </div>
               ))}
             </div>
          </div>

          {/* Verification Protocol Execution */}
          <div className="pt-6 space-y-6">
            <button
              type="submit"
              disabled={!formData.name || !formData.location || isSubmitting}
              className={cn(
                "w-full h-16 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-3 relative overflow-hidden",
                formData.name && formData.location
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]" 
                  : "bg-foreground/5 text-muted-foreground cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Activate Urja Profile
                  <Zap size={18} />
                </>
              )}
            </button>
            <div className="text-center space-y-4">
               <p className="text-xs font-medium text-muted-foreground">
                 Your contribution supports cleaner cities and circular waste recovery systems.
               </p>
               <div className="flex flex-wrap items-center justify-center gap-2 text-muted-foreground/50 text-[10px] uppercase font-bold tracking-wider">
                  <span className="flex items-center gap-1"><ShieldCheck size={12} /> Data secured</span>
                  <span>•</span>
                  <span>Location privacy protected</span>
                  <span>•</span>
                  <span>Verified contribution tracking</span>
               </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
