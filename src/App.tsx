import { ConciergeBooking } from "@/components/concierge-booking";
import { useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Footer } from "@/components/footer"
import { LuxurySilkBackground } from "@/components/luxury-silk-background"

gsap.registerPlugin(ScrollTrigger)

function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9997]"
      aria-hidden="true"
      style={{ mixBlendMode: "overlay" }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.04 }}
      >
        <filter id="salon-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="1"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#salon-noise)" />
      </svg>
    </div>
  )
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-6 max-w-7xl mx-auto px-6 py-8 relative z-10">
      <div className="h-px flex-1 bg-stone-800/40" />
      <span className="text-[0.55rem] tracking-[0.5em] uppercase text-stone-500/60 whitespace-nowrap">
        {label}
      </span>
      <div className="h-px flex-1 bg-stone-800/40" />
    </div>
  )
}

const PILLARS = [
  {
    number: "01",
    subtitle: "THE SANCTUARY",
    title: "Bespoke Consultation",
    description:
      "Every appointment begins with a 15-minute one-on-one with your artist—understanding your lifestyle, your vision, and the language of your individual beauty.",
  },
  {
    number: "02",
    subtitle: "THE ATELIER",
    title: "Precision Execution",
    description:
      "Our artists train continuously at international academies. Techniques are refined. Standards are uncompromising. Results are transformative.",
  },
  {
    number: "03",
    subtitle: "THE RITUAL",
    title: "The Finishing Ritual",
    description:
      "Your session concludes with a personalised home-care prescription, a premium finish product selection, and a complimentary styling guide.",
  },
]

export function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openReserve = () => {
    setIsBookingOpen(true)
  }

  // Scroll-reveal for experience pillars
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".pillar-item") as any[]
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.9, stagger: 0.15, ease: "power3.out",
            scrollTrigger: {
              trigger: "#experience-pillars",
              start: "top 80%",
              once: true,
            },
          }
        )
      }

      // Manifesto reveal
      gsap.fromTo(
        "#manifesto .manifesto-content",
        { y: 35, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: "#manifesto",
            start: "top 78%",
            once: true,
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen text-foreground relative" style={{ background: "#030303" }}>
      <LuxurySilkBackground />
      <GrainOverlay />

      <Navbar onReserveClick={() => openReserve()} />

      <Hero onReserveClick={() => openReserve()} />

      {/* Experience Pillars */}
      <section id="experience-pillars" className="py-24 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="mb-16 md:mb-20 text-center">
            <p className="text-[10px] tracking-[0.3em] text-amber-500/60 uppercase mb-2">
              COLLECTION 2026
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide">
              The Experience
            </h2>
          </div>

          {/* Staggered editorial grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 lg:gap-x-12">
            {PILLARS.map((pillar, index) => (
              <div
                key={pillar.number}
                className={`pillar-item group ${index === 1 ? 'md:translate-y-12' : ''}`}
              >
                <div className="mb-4">
                  <p className="text-[10px] tracking-[0.3em] text-amber-500/50 uppercase mb-2">
                    {pillar.number} / {pillar.subtitle}
                  </p>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4 tracking-wide">
                  {pillar.title}
                </h3>
                <p className="text-sm text-stone-400/80 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider label="Excellence in Every Detail" />

      {/* Manifesto */}
      <section id="manifesto" className="py-24 md:py-36 relative overflow-hidden z-10">
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="font-serif leading-none text-foreground tracking-tight"
            style={{ fontSize: "20vw", opacity: 0.015 }}
          >
            ACS
          </span>
        </div>
        <div className="manifesto-content max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-[10px] tracking-[0.3em] text-amber-500/60 uppercase mb-6">
            MANIFESTO
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-primary/30" />
            <span className="text-[0.6rem] tracking-[0.5em] uppercase text-primary">
              Our Philosophy
            </span>
            <div className="h-px w-12 bg-primary/30" />
          </div>
          <blockquote className="font-serif text-[clamp(1.4rem,3.5vw,2.75rem)] leading-[1.25] text-foreground font-light mb-8 italic">
            &ldquo;I always believed that hair should be treated like a piece of beautiful fabric.
            Architecture with an organic element.&rdquo;
          </blockquote>
          <p className="text-xs tracking-[0.35em] uppercase text-primary">
            &mdash; VIDAL SASSOON
          </p>
        </div>
      </section>

      <Divider label="Crafted for the Discerning" />

      <Services onReserveClick={() => openReserve()} />

      <Footer onReserveClick={() => openReserve()} />

      {/* Premium Concierge Engine */}
      <ConciergeBooking
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  )
}

export default App;