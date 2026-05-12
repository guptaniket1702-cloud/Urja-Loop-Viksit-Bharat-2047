"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Leaf, ArrowRight, ShieldCheck, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LoginScreen() {
  const router = useRouter()
  const [phone, setPhone] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length >= 10 && agreed) {
      setIsSubmitting(true)
      setTimeout(() => {
        router.push("/verify-otp")
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0A0C0B] relative overflow-hidden p-6 transition-colors duration-300">

      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#1F7A3D]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#34D399]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md space-y-12 z-10">

        {/* Branding */}
        <div className="flex flex-col items-center text-center space-y-4">
          <Link href="/" className="group relative">
            <div className="w-16 h-16 bg-[#1F7A3D] rounded-2xl flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105">
              <Leaf className="text-white w-8 h-8" strokeWidth={2} fill="currentColor" />
            </div>
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl -z-10 scale-125 animate-pulse"></div>
          </Link>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-foreground tracking-tighter uppercase">Access Terminal</h1>
            <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em] opacity-80">UrjaLoop Network Authentication</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 dark:bg-card/50 backdrop-blur-xl border border-neutral-200 dark:border-border/50 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">

            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <label htmlFor="phone" className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                  Mobile Identifier
                </label>
                <Phone size={14} className="text-primary opacity-40" />
              </div>
              <div className="relative flex items-center group/input">
                <div className="absolute left-6 font-black text-foreground flex items-center gap-3 border-r border-foreground/10 pr-5 h-8">
                  <span className="text-base">🇮🇳</span>
                  <span className="text-[13px] text-muted-foreground opacity-60">+91</span>
                </div>
                <input
                  id="phone"
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="X XXXX XXXX"
                  className="w-full h-20 ultra-glass border border-foreground/10 rounded-2xl pl-24 pr-8 text-xl font-black tracking-widest text-foreground focus:outline-none focus:border-primary/50 transition-all placeholder:opacity-20 bg-foreground/5"
                />
              </div>
            </div>

            {/* Protocol Agreement */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-foreground/5 border border-foreground/5 group/terms cursor-pointer" onClick={() => setAgreed(!agreed)}>
              <div className="pt-0.5">
                <div className={cn(
                  "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300",
                  agreed ? "bg-primary border-primary text-white shadow-lg shadow-primary/30" : "border-foreground/10 bg-foreground/5"
                )}>
                  {agreed && <ShieldCheck size={16} strokeWidth={3} />}
                </div>
              </div>
              <p className="text-[11px] font-black text-muted-foreground leading-relaxed uppercase tracking-widest opacity-60 group-hover/terms:opacity-100 transition-opacity">
                I accept the <span className="text-primary hover:underline">Network Protocols</span> and <span className="text-primary hover:underline">Privacy Matrix</span>.
              </p>
            </div>

            <button
              type="submit"
              disabled={phone.length < 10 || !agreed || isSubmitting}
              className={cn(
                "w-full h-20 rounded-3xl font-black text-[13px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 relative overflow-hidden group/btn",
                phone.length >= 10 && agreed
                  ? "btn-premium shadow-primary/30 active:scale-95"
                  : "bg-foreground/5 text-muted-foreground opacity-40 cursor-not-allowed grayscale"
              )}
            >
              {isSubmitting ? (
                <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Continue <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* System Trust Badge */}
        <div className="flex items-center justify-center gap-4 text-muted-foreground/40 pt-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/5"></div>
          <div className="flex items-center gap-3">
            <ShieldCheck size={18} className="text-emerald-500 shadow-sm shadow-emerald-500/20" strokeWidth={2.5} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Encrypted Network Node 🇮🇳</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/5"></div>
        </div>
      </div>
    </div>
  )
}
