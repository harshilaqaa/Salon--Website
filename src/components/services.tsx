import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

interface ServiceItem {
  name: string
  description: string
  duration: string
  tag?: string
}

interface ServiceCategory {
  id: string
  label: string
  services: ServiceItem[]
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "hair-couture",
    label: "Hair Couture",
    services: [
      {
        name: "The Signature Editorial Cut & Style",
        description: "A bespoke precision cut tailored to your facial architecture, bone structure, and lifestyle. Completed with a luxury blow-dry and finish.",
        duration: "75 mins",
        tag: "Signature",
      },
      {
        name: "The Master Class Cut",
        description: "An immersive consultation-led experience with our lead director. Includes scalp ritual, precision cut, and a personalised home-care prescription.",
        duration: "90 mins",
        tag: "Director's Choice",
      },
      {
        name: "Bridal Couture Styling",
        description: "Meticulously crafted bridal hair—from rehearsal to ceremony. Includes a trial session, day-of styling, and on-site touch-up kit.",
        duration: "180 mins",
        tag: "By Appointment",
      },
      {
        name: "The Relaxation Blow-Dry",
        description: "A signature scalp massage followed by expert tension release and a sleek, voluminous blow-finish. The ultimate midweek reset.",
        duration: "45 mins",
      },
      {
        name: "Keratin Smoothing Treatment",
        description: "A professional-grade keratin infusion that eliminates frizz, restores lustre, and restructures each strand for up to 16 weeks of effortless beauty.",
        duration: "120 mins",
      },
    ],
  },
  {
    id: "technical-color",
    label: "Technical Colour",
    services: [
      {
        name: "French Balayage Masterpiece",
        description: "Hand-painted colour artistry inspired by Parisian technique. Creates a seamless, lived-in gradient from root to tip that evolves beautifully over time.",
        duration: "180 mins",
        tag: "Artisanal",
      },
      {
        name: "Global Transformation Colour",
        description: "Full-spectrum colour change using ammonia-free, OLAPLEX-enriched formulas. Includes a deep conditioning treatment and gloss seal.",
        duration: "120 mins",
      },
      {
        name: "Root Correction & Touch-Up",
        description: "Precise root refresh using colour-matched formulas. Includes a toner application and conditioning serum to restore depth and vibrancy.",
        duration: "75 mins",
      },
      {
        name: "Platinum Lightening & Toning",
        description: "Expert high-lift lightening crafted for ultra-blonde or ash transformations. Includes strand testing and a clinical bond-building treatment.",
        duration: "210 mins",
        tag: "Specialist",
      },
      {
        name: "Glossing & Toning Ritual",
        description: "Deposit-only colour service that adds dimension, corrects brassiness, and delivers a mirror-finish gloss. Zero damage. Maximum impact.",
        duration: "45 mins",
      },
    ],
  },
  {
    id: "bespoke-grooming",
    label: "Bespoke Grooming",
    services: [
      {
        name: "The Director's Shave Experience",
        description: "A straight-razor shave preceded by a hot steam preparation and followed by a cool sandalwood aftershave ritual. For those who understand the art of precision.",
        duration: "60 mins",
        tag: "Signature",
      },
      {
        name: "Signature Gentleman's Cut",
        description: "Expert scissor or clipper technique sculpted to your lifestyle and personality. Includes a scalp massage and a premium finishing product application.",
        duration: "60 mins",
      },
      {
        name: "Beard Sculpting & Detailing",
        description: "Precision beard shaping, defining, and conditioning. Our barbers use a combination of open-blade and scissor techniques for unparalleled definition.",
        duration: "45 mins",
      },
      {
        name: "The Obsidian Package",
        description: "Our comprehensive gentlemen's ritual: haircut, beard groom, scalp treatment, hot towel shave, and bespoke finishing. The pinnacle of grooming.",
        duration: "150 mins",
        tag: "Premium Bundle",
      },
      {
        name: "Grey Blending & Highlight",
        description: "A sophisticated technique to integrate, soften, or enhance natural grey. Looks entirely natural and builds in dimension with each visit.",
        duration: "90 mins",
      },
    ],
  },
  {
    id: "skin-rituals",
    label: "Skin Rituals",
    services: [
      {
        name: "The Gold Leaf Facial",
        description: "24-karat gold-infused facial ritual with deep tissue massage, hyaluronic acid serum, and LED light therapy. Delivers visible radiance in a single session.",
        duration: "90 mins",
        tag: "Signature",
      },
      {
        name: "Vitamin C Brightening Peel",
        description: "Medical-grade exfoliation paired with a high-potency vitamin C concentrate. Corrects hyperpigmentation and restores an even, luminous skin tone.",
        duration: "75 mins",
      },
      {
        name: "The Purifying Caviar Masque",
        description: "A detoxifying masque enriched with marine caviar extract and black charcoal. Draws out impurities while intensely hydrating depleted skin.",
        duration: "60 mins",
      },
      {
        name: "Men's Power Skin Reset",
        description: "A targeted deep-cleanse and hydration treatment formulated specifically for men's skin. Includes massage, exfoliation, and blue-light anti-acne therapy.",
        duration: "60 mins",
      },
      {
        name: "Anti-Ageing Collagen Infusion",
        description: "Peptide-rich serum infused via micro-needling technique to stimulate collagen production. A clinical approach to visible rejuvenation with zero downtime.",
        duration: "120 mins",
        tag: "Clinical",
      },
    ],
  },
]

interface ServicesProps {
  onReserveClick: () => void
}

export function Services({ onReserveClick }: ServicesProps) {
  const [activeTab, setActiveTab] = useState("hair-couture")
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1, stagger: 0.15, ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              once: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const activeCategory = SERVICE_CATEGORIES.find((c) => c.id === activeTab)!

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 md:py-36 relative overflow-hidden z-10"
    >
      {/* Decorative gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <p className="text-[10px] tracking-[0.3em] text-amber-500/60 uppercase mb-2">
            HAIR & SKIN ATelier
          </p>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-primary/40" />
            <span className="text-[0.6rem] tracking-[0.5em] uppercase text-primary">
              Our Offerings
            </span>
          </div>
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.92] text-foreground mb-6 tracking-wide">
            The Bespoke<br />
            <em className="not-italic gold-shimmer">Menu</em>
          </h2>
          <p className="text-stone-400/80 text-sm md:text-base leading-relaxed max-w-lg font-light tracking-wide">
            Each service is a carefully choreographed ritual—conceived by artists,
            executed with precision, and tailored to the singular beauty of your individual form.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-12 border-b border-stone-800/40 overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={[
                  "px-6 py-3 text-xs tracking-[0.2em] uppercase font-light transition-all duration-300 relative whitespace-nowrap",
                  activeTab === cat.id
                    ? "text-primary"
                    : "text-stone-500 hover:text-foreground",
                ].join(" ")}
              >
                {cat.label}
                {activeTab === cat.id && (
                  <motion.div
                    layoutId="service-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards - Staggered Editorial Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {activeCategory.services.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`service-card group relative bg-[#070707]/50 backdrop-blur-sm border border-amber-500/10 p-6 md:p-7 cursor-pointer hover:border-amber-500/25 ${
                  i % 3 === 1 ? 'md:translate-y-8' : i % 3 === 2 ? 'md:translate-y-4' : ''
                }`}
                onClick={() => onReserveClick()}
              >
                {/* Tag */}
                {service.tag && (
                  <div className="absolute top-4 right-4">
                    <span className="text-[0.55rem] tracking-[0.25em] uppercase text-primary border border-primary/30 px-2 py-1">
                      {service.tag}
                    </span>
                  </div>
                )}

                {/* Service info */}
                <div className="mb-6">
                  <h3 className="font-serif text-xl md:text-2xl text-foreground leading-snug mb-3 pr-16 tracking-wide">
                    {service.name}
                  </h3>
                  <p className="text-stone-400/80 text-sm leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-800/40">
                  <div className="flex items-center gap-4">
                    <span className="text-[0.65rem] tracking-[0.15em] uppercase text-stone-500/70">
                      {service.duration}
                    </span>
                  </div>
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 text-[0.6rem] tracking-[0.2em] uppercase text-primary transition-all duration-300"
                  >
                    Reserve →
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 border-t border-stone-800/40"
        >
          <div>
            <p className="font-serif text-lg text-foreground mb-1 tracking-wide">
              Tailored to <em>your</em> vision
            </p>
            <p className="text-sm text-stone-400/80 font-light">
              All services include a complimentary 15-minute consultation and premium beverage service.
            </p>
          </div>
          <button
            onClick={() => onReserveClick()}
            className="flex-shrink-0 px-8 py-3 border border-primary text-primary text-xs tracking-[0.3em] uppercase font-light hover:bg-primary hover:text-primary-foreground transition-all duration-400"
          >
            Book a Service
          </button>
        </motion.div>
      </div>
    </section>
  )
}
