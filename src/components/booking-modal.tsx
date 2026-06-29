import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Check } from "lucide-react"

/* ── Types ─────────────────────────────── */
interface BookingService {
  name: string
  duration: number
}

interface ClientInfo {
  name: string
  phone: string
  email: string
  preferences: string
}

/* ── Data ───────────────────────────────── */
const BOOKABLE_SERVICES: BookingService[] = [
  { name: "Signature Editorial Cut & Style", duration: 75 },
  { name: "Master Class Cut", duration: 90 },
  { name: "French Balayage Masterpiece", duration: 180 },
  { name: "Global Transformation Colour", duration: 120 },
  { name: "Root Correction & Touch-Up", duration: 75 },
  { name: "Director's Shave Experience", duration: 60 },
  { name: "Signature Gentleman's Cut", duration: 60 },
  { name: "Beard Sculpting & Detailing", duration: 45 },
  { name: "The Gold Leaf Facial", duration: 90 },
  { name: "Anti-Ageing Collagen Infusion", duration: 120 },
]

const TIME_SLOTS = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM",
]

const UNAVAILABLE_SLOTS = new Set(["11:30 AM", "1:00 PM", "3:30 PM", "6:00 PM"])

/* ── Helpers ───────────────────────────── */
function generateBookingId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let id = "ACS-"
  for (let i = 0; i < 8; i++) id += chars[Math.floor(Math.random() * chars.length)]
  return id
}

function buildCalendarDays(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days: (number | null)[] = Array(firstDay).fill(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(d)
  return days
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

/* ── Sub-step components ────────────────── */
function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center">
          <div
            className={[
              "w-6 h-6 rounded-full flex items-center justify-center text-[0.6rem] font-medium transition-all duration-400",
              i + 1 === step
                ? "bg-primary text-primary-foreground"
                : i + 1 < step
                ? "bg-primary/30 text-primary"
                : "bg-secondary text-muted-foreground",
            ].join(" ")}
          >
            {i + 1 < step ? <Check size={10} /> : i + 1}
          </div>
          {i < total - 1 && (
            <div
              className={[
                "w-8 h-px mx-1 transition-all duration-400",
                i + 1 < step ? "bg-primary/50" : "bg-border",
              ].join(" ")}
            />
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Main Component ─────────────────────── */
interface BookingModalProps {
  open: boolean
  onClose: () => void
  preSelectedService?: string
}

export function BookingModal({ open, onClose, preSelectedService }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState<Set<string>>(
    preSelectedService ? new Set([preSelectedService]) : new Set()
  )
  const [calYear, setCalYear] = useState(new Date().getFullYear())
  const [calMonth, setCalMonth] = useState(new Date().getMonth())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: "", phone: "", email: "", preferences: "",
  })
  const [bookingId] = useState(() => generateBookingId())

  const calDays = buildCalendarDays(calYear, calMonth)
  const today = new Date()
  const totalDuration = BOOKABLE_SERVICES
    .filter((s) => selectedServices.has(s.name))
    .reduce((acc, s) => acc + s.duration, 0)

  const toggleService = useCallback((name: string) => {
    setSelectedServices((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }, [])

  const handleClose = () => {
    onClose()
    // reset after animation completes
    setTimeout(() => {
      setStep(1)
      setSelectedServices(preSelectedService ? new Set([preSelectedService]) : new Set())
      setSelectedDay(null)
      setSelectedTime(null)
      setClientInfo({ name: "", phone: "", email: "", preferences: "" })
    }, 400)
  }

  const isPastDay = (day: number) => {
    const d = new Date(calYear, calMonth, day)
    d.setHours(0, 0, 0, 0)
    const t = new Date()
    t.setHours(0, 0, 0, 0)
    return d < t
  }

  const step1Valid = selectedServices.size > 0
  const step2Valid = selectedDay !== null && selectedTime !== null
  const step3Valid = clientInfo.name.trim() !== "" && clientInfo.phone.trim() !== "" && clientInfo.email.trim() !== ""

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  }

  const [dir, setDir] = useState(1)

  const goNext = () => { setDir(1); setStep((s) => s + 1) }
  const goPrev = () => { setDir(-1); setStep((s) => s - 1) }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-[50%] translate-y-[-50%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[640px] lg:w-[720px] max-h-[90vh] z-[201] bg-card border border-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-border flex-shrink-0">
              <div>
                <p className="text-[0.6rem] tracking-[0.4em] uppercase text-primary mb-0.5">
                  Advance Cut Salon
                </p>
                <h2 className="font-serif text-xl text-foreground">
                  {step === 1 && "Select Your Treatment"}
                  {step === 2 && "Choose Your Date & Time"}
                  {step === 3 && "Your Client Dossier"}
                  {step === 4 && "Reservation Confirmed"}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
              {step < 4 && <StepIndicator step={step} total={3} />}

              <AnimatePresence mode="wait" custom={dir}>
                {/* ── STEP 1: Services ── */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="text-sm text-muted-foreground mb-6 font-light leading-relaxed">
                      Select one or more treatments for your visit. A personalised consultation
                      is included with every booking.
                    </p>
                    <div className="flex flex-col gap-3">
                      {BOOKABLE_SERVICES.map((service) => {
                        const isSelected = selectedServices.has(service.name)
                        return (
                          <motion.button
                            key={service.name}
                            onClick={() => toggleService(service.name)}
                            className={[
                              "flex items-center justify-between w-full p-4 border text-left transition-all duration-300",
                              isSelected
                                ? "border-primary bg-accent"
                                : "border-border hover:border-primary/30 hover:bg-secondary/30",
                            ].join(" ")}
                            whileHover={{ scale: 1.005 }}
                            whileTap={{ scale: 0.998 }}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={[
                                  "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0",
                                  isSelected ? "border-primary bg-primary" : "border-muted-foreground/40",
                                ].join(" ")}
                              >
                                {isSelected && <Check size={8} className="text-primary-foreground" />}
                              </div>
                              <div>
                                <div className="text-sm text-foreground font-medium">{service.name}</div>
                                <div className="text-xs text-muted-foreground mt-0.5">{service.duration} mins</div>
                              </div>
                            </div>
                          </motion.button>
                        )
                      })}
                    </div>

                    {selectedServices.size > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 border border-primary/20 bg-accent"
                      >
                        <div className="flex items-center text-sm">
                          <span className="text-muted-foreground font-light">{selectedServices.size} treatment{selectedServices.size > 1 ? "s" : ""}</span>
                          <span className="mx-2 text-border">·</span>
                          <span className="text-muted-foreground font-light">{totalDuration} mins</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* ── STEP 2: Date & Time ── */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-serif text-lg text-foreground">
                        {MONTH_NAMES[calMonth]} {calYear}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1) }
                            else setCalMonth((m) => m - 1)
                          }}
                          className="p-1.5 border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1) }
                            else setCalMonth((m) => m + 1)
                          }}
                          className="p-1.5 border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Day labels */}
                    <div className="grid grid-cols-7 mb-2">
                      {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                        <div key={i} className="text-center text-[0.6rem] tracking-[0.15em] uppercase text-muted-foreground py-1">
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Days grid */}
                    <div className="grid grid-cols-7 gap-1 mb-8">
                      {calDays.map((day, i) => {
                        if (day === null) return <div key={`null-${i}`} />
                        const past = isPastDay(day)
                        const isSelected = selectedDay === day
                        const isToday =
                          day === today.getDate() &&
                          calMonth === today.getMonth() &&
                          calYear === today.getFullYear()

                        return (
                          <button
                            key={day}
                            disabled={past}
                            onClick={() => { setSelectedDay(day); setSelectedTime(null) }}
                            className={[
                              "aspect-square flex items-center justify-center text-xs transition-all duration-200",
                              past ? "opacity-20 cursor-not-allowed" : "cursor-pointer",
                              isSelected ? "bg-primary text-primary-foreground" : "",
                              !isSelected && isToday ? "border border-primary/50 text-primary" : "",
                              !isSelected && !past ? "hover:bg-secondary text-foreground" : "",
                              !isSelected && past ? "text-muted-foreground" : "",
                            ].join(" ")}
                          >
                            {day}
                          </button>
                        )
                      })}
                    </div>

                    {/* Time Slots */}
                    {selectedDay && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                          Available Times — {MONTH_NAMES[calMonth]} {selectedDay}
                        </p>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                          {TIME_SLOTS.map((slot) => {
                            const unavail = UNAVAILABLE_SLOTS.has(slot)
                            const isChosen = selectedTime === slot
                            return (
                              <button
                                key={slot}
                                disabled={unavail}
                                onClick={() => !unavail && setSelectedTime(slot)}
                                className={[
                                  "time-slot px-2 py-2 text-[0.65rem] tracking-wide text-center",
                                  isChosen ? "selected" : "",
                                  unavail ? "unavailable" : "",
                                ].join(" ")}
                              >
                                {slot}
                              </button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* ── STEP 3: Client Dossier ── */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    custom={dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="text-sm text-muted-foreground mb-8 font-light leading-relaxed">
                      Your details are held with the utmost discretion and used solely
                      to ensure a seamless, personalised experience.
                    </p>

                    <div className="flex flex-col gap-8">
                      <div>
                        <label className="text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground block mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={clientInfo.name}
                          onChange={(e) => setClientInfo((p) => ({ ...p, name: e.target.value }))}
                          placeholder="Your full name"
                          className="luxury-input"
                        />
                      </div>
                      <div>
                        <label className="text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground block mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          value={clientInfo.phone}
                          onChange={(e) => setClientInfo((p) => ({ ...p, phone: e.target.value }))}
                          placeholder="+91 XXXXX XXXXX"
                          className="luxury-input"
                        />
                      </div>
                      <div>
                        <label className="text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground block mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={clientInfo.email}
                          onChange={(e) => setClientInfo((p) => ({ ...p, email: e.target.value }))}
                          placeholder="your@email.com"
                          className="luxury-input"
                        />
                      </div>
                      <div>
                        <label className="text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground block mb-1">
                          Ambiance Preferences
                        </label>
                        <textarea
                          value={clientInfo.preferences}
                          onChange={(e) => setClientInfo((p) => ({ ...p, preferences: e.target.value }))}
                          placeholder="Any preferences, allergies, or special requests..."
                          rows={3}
                          className="luxury-input resize-none"
                          style={{ borderBottom: "1px solid oklch(0.22 0 0)" }}
                        />
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="mt-8 p-5 border border-border/60 bg-background">
                      <p className="text-[0.6rem] tracking-[0.3em] uppercase text-primary mb-4">
                        Booking Summary
                      </p>
                      <div className="space-y-2">
                        {Array.from(selectedServices).map((s) => (
                          <div key={s} className="text-xs">
                            <span className="text-muted-foreground font-light">{s}</span>
                          </div>
                        ))}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3 pt-3 border-t border-border/60">
                          <span>
                            {MONTH_NAMES[calMonth]} {selectedDay}, {calYear}
                          </span>
                          <span className="text-border">·</span>
                          <span>{selectedTime}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── STEP 4: Confirmation ── */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    custom={dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center py-4"
                  >
                    {/* Animated Check */}
                    <div className="mb-8 check-circle-anim">
                      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                        <circle
                          cx="36" cy="36" r="34"
                          stroke="#D4AF37"
                          strokeWidth="1.5"
                          strokeOpacity="0.4"
                        />
                        <circle
                          cx="36" cy="36" r="26"
                          stroke="#D4AF37"
                          strokeWidth="1"
                          strokeOpacity="0.2"
                        />
                        <path
                          className="check-path-anim"
                          d="M22 36L31 45L50 26"
                          stroke="#D4AF37"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      <p className="text-[0.6rem] tracking-[0.5em] uppercase text-primary mb-4">
                        Reservation Confirmed
                      </p>
                      <h3 className="font-serif text-3xl text-foreground mb-2">
                        Welcome, {clientInfo.name.split(" ")[0]}.
                      </h3>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-sm mb-8">
                        Your experience has been reserved. A confirmation will be sent to{" "}
                        <span className="text-foreground">{clientInfo.email}</span>.
                      </p>

                      <div className="inline-block border border-primary/30 px-8 py-5 mb-6">
                        <p className="text-[0.6rem] tracking-[0.4em] uppercase text-muted-foreground mb-2">
                          Booking Reference
                        </p>
                        <p className="font-serif text-2xl text-primary tracking-widest">
                          {bookingId}
                        </p>
                      </div>

                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>{MONTH_NAMES[calMonth]} {selectedDay}, {calYear} · {selectedTime}</p>
                        <p>{selectedServices.size} treatment{selectedServices.size > 1 ? "s" : ""} · {totalDuration} mins</p>
                      </div>

                      <motion.button
                        onClick={handleClose}
                        className="mt-8 px-8 py-3 bg-primary text-primary-foreground text-xs tracking-[0.3em] uppercase hover:bg-primary/90 transition-all duration-300"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Done
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer navigation */}
            {step < 4 && (
              <div className="flex-shrink-0 flex items-center justify-between px-6 md:px-8 py-4 border-t border-border bg-background/50">
                <button
                  onClick={goPrev}
                  disabled={step === 1}
                  className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={14} /> Back
                </button>

                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={[
                        "w-1.5 h-1.5 rounded-full transition-all duration-300",
                        s === step ? "bg-primary w-4" : s < step ? "bg-primary/40" : "bg-border",
                      ].join(" ")}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={() => {
                    if (step === 3 && step3Valid) goNext()
                    else if (step === 2 && step2Valid) goNext()
                    else if (step === 1 && step1Valid) goNext()
                  }}
                  disabled={
                    (step === 1 && !step1Valid) ||
                    (step === 2 && !step2Valid) ||
                    (step === 3 && !step3Valid)
                  }
                  className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-primary hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  whileHover={{ x: 3 }}
                >
                  {step === 3 ? "Confirm" : "Continue"} <ChevronRight size={14} />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
