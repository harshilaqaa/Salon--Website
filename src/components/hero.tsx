import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  onReserveClick: () => void
}

export function Hero({ onReserveClick }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const sublineRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Ultra-smooth cursor positioning directly accessing the hardware layer
    const setX = gsap.quickTo(cursor, "x", { duration: 0.25, ease: "power3.out" })
    const setY = gsap.quickTo(cursor, "y", { duration: 0.25, ease: "power3.out" })

    const handleMouseMove = (e: MouseEvent) => {
      setX(e.clientX)
      setY(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    // Smooth hover reactions for buttons
    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1.8, backgroundColor: "rgba(245, 158, 11, 0.12)", borderColor: "rgba(245, 158, 11, 0.5)", duration: 0.25 })
    }
    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, backgroundColor: "rgba(245, 158, 11, 0.03)", borderColor: "rgba(245, 158, 11, 0.25)", duration: 0.25 })
    }

    const buttons = heroRef.current?.querySelectorAll("button")
    buttons?.forEach((btn) => {
      btn.addEventListener("mouseenter", handleMouseEnter)
      btn.addEventListener("mouseleave", handleMouseLeave)
    })

    // Elements timeline
    const ctx = gsap.context(() => {
      // Gentle parallax background tracking
      gsap.to(bgRef.current, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      const tl = gsap.timeline({ delay: 0.2 })

      tl.fromTo(".hero-title-text", 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" }
      )
      .fromTo(".hero-word-2", 
        { y: 15, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" }, 
        "-=0.4"
      )
      .fromTo(sublineRef.current, 
        { y: 15, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" }, 
        "-=0.4"
      )
      .fromTo(".stat-box-item", 
        { y: 12, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.45, ease: "power2.out", stagger: 0.08 }, 
        "-=0.3"
      )
      .fromTo(ctaRef.current, 
        { y: 12, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" }, 
        "-=0.2"
      )
    }, heroRef)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      buttons?.forEach((btn) => {
        btn.removeEventListener("mouseenter", handleMouseEnter)
        btn.removeEventListener("mouseleave", handleMouseLeave)
      })
      ctx.revert()
    }
  }, [])

  return (
    <section ref={heroRef} id="experience" className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <img 
          src="/salon-hero-bg.webp" 
          alt="" 
          className="w-full h-full object-cover" 
          style={{ transform: "scale(1.06)" }} 
          draggable={false} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto w-full">
        <div className="text-[0.6rem] md:text-xs text-primary tracking-[0.5em] uppercase mb-6 md:mb-8 opacity-90">
          Est. 2010 &nbsp;·&nbsp; Haryana
        </div>

        <div className="hero-headline mb-6 md:mb-8 flex flex-col items-center justify-center">
          <div className="hero-title-text font-serif font-bold italic uppercase text-white leading-none text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.04em]" style={{ transform: "skewX(-6deg)", display: "inline-block" }}>
            ADVANCE CUT
          </div>
          <span className="hero-word-2 font-sans font-light uppercase block text-center text-amber-400 tracking-[0.6em] pl-[0.6em] text-xs sm:text-base md:text-lg lg:text-2xl mt-4 leading-none">
            SALON
          </span>
        </div>

        <div ref={sublineRef} className="opacity-0 mb-8 md:mb-12">
          <p className="font-serif italic text-[clamp(1rem,3vw,1.75rem)] text-stone-400/80 tracking-widest font-light">The Art of Hair Couture</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-primary/30" />
            <span className="text-[0.6rem] tracking-[0.4em] uppercase text-stone-500/70">Where Every Cut is a Masterpiece</span>
            <div className="h-px w-16 bg-primary/30" />
          </div>
        </div>

        <div ref={metaRef} className="flex items-center justify-center gap-8 mb-10 md:mb-14">
          {[
            { value: "15+", label: "Years of Excellence" },
            { value: "6", label: "Houses" },
            { value: "12K+", label: "Elite Clientele" },
          ].map((stat) => (
            <div key={stat.label} className="stat-box-item text-center opacity-0">
              <div className="font-serif text-2xl md:text-3xl text-primary leading-none tracking-[0.15em]">{stat.value}</div>
              <div className="text-[0.6rem] tracking-[0.2em] uppercase text-stone-400/80 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onReserveClick} 
            className="group px-10 py-4 bg-primary text-primary-foreground text-xs tracking-[0.3em] uppercase font-medium hover:bg-amber-500 active:scale-95 transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">Reserve Your Experience</span>
          </button>
          <button 
            onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })} 
            className="px-10 py-4 border border-white/20 text-foreground/70 text-xs tracking-[0.3em] uppercase font-light hover:border-primary hover:text-white active:scale-95 transition-all duration-300"
          >
            Discover the Menu
          </button>
        </div>
      </div>

      {/* Reconfigured High-Performance Cursor Element */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] rounded-full border border-primary/25 bg-primary/5 hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </section>
  )
}
