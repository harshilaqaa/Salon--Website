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
    // 1. Ultra-fast Custom Cursor using gsap.quickTo
    // This updates the element directly on the GPU without triggering React re-renders
    const cursor = cursorRef.current
    if (!cursor) return

    // Hide default cursor in desktop
    const setX = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3.out" })
    const setY = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3.out" })

    const handleMouseMove = (e: MouseEvent) => {
      setX(e.clientX)
      setY(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    // 2. Button Hover Scale Effects via GSAP
    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 2.2, backgroundColor: "rgba(217, 119, 6, 0.15)", duration: 0.3 })
    }
    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, backgroundColor: "rgba(217, 119, 6, 0.05)", duration: 0.3 })
    }

    const buttons = heroRef.current?.querySelectorAll("button")
    buttons?.forEach(btn => {
      btn.addEventListener("mouseenter", handleMouseEnter)
      btn.addEventListener("mouseleave", handleMouseLeave)
    })

    // 3. Main Timeline & Parallax
    const ctx = gsap.context(() => {
      // Background parallax (Gentle 10% translation to keep rendering overhead low)
      gsap.to(bgRef.current, {
        yPercent: 10,
        force3D: true,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      // Smooth staggered entrance
      const tl = gsap.timeline({ delay: 0.2 })
      const headline = heroRef.current?.querySelector(".hero-headline")
      const words2 = heroRef.current?.querySelector(".hero-word-2")
      const metaElements = metaRef.current?.children

      if (headline) tl.fromTo(headline, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", force3D: true })
      if (words2) tl.fromTo(words2, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", force3D: true }, "-=0.4")
      if (sublineRef.current) tl.fromTo(sublineRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", force3D: true }, "-=0.4")
      
      if (metaElements) {
        tl.fromTo(metaElements, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stuffed: true, stagger: 0.1 }, "-=0.3")
      }
      if (ctaRef.current) tl.fromTo(ctaRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", force3D: true }, "-=0.2")
    }, heroRef)

    // Cleanup listeners and animations on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      buttons?.forEach(btn => {
        btn.removeEventListener("mouseenter", handleMouseEnter)
        btn.removeEventListener("mouseleave", handleMouseLeave)
      })
      ctx.revert()
    }
  }, [])

  return (
    <section ref={heroRef} id="experience" className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
      {/* Parallax Background Wrapper */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full will-change-transform transform-gpu">
        <img 
          src="/salon-hero-bg.webp" 
          alt="" 
          className="w-full h-full object-cover transform-gpu" 
          style={{ transform: "scale(1.05)" }} 
          draggable={false} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto w-full will-change-transform transform-gpu">
        <div className="text-[0.6rem] md:text-xs text-primary tracking-[0.5em] uppercase mb-6 md:mb-8 opacity-90">
          Est. 2010 &nbsp;·&nbsp; Haryana
        </div>

        <div className="hero-headline mb-6 md:mb-8 flex flex-col items-center justify-center opacity-0">
          <div className="font-serif font-bold italic uppercase text-white leading-none text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.04em]" style={{ transform: "skewX(-6deg)", display: "inline-block" }}>
            ADVANCE CUT
          </div>
          <span className="hero-word-2 font-sans font-light uppercase block text-center text-amber-400 tracking-[0.6em] pl-[0.6em] text-xs sm:text-base md:text-lg lg:text-2xl mt-4 leading-none opacity-0">
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
            <div key={stat.label} className="text-center opacity-0">
              <div className="font-serif text-2xl md:text-3xl text-primary leading-none tracking-[0.15em]">{stat.value}</div>
              <div className="text-[0.6rem] tracking-[0.2em] uppercase text-stone-400/80 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onReserveClick} 
            className="group px-10 py-4 bg-primary text-primary-foreground text-xs tracking-[0.3em] uppercase font-medium hover:bg-amber-500 active:scale-95 transition-all duration-300 relative overflow-hidden transform-gpu"
          >
            <span className="relative z-10">Reserve Your Experience</span>
          </button>
          <button 
            onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })} 
            className="px-10 py-4 border border-white/20 text-foreground/70 text-xs tracking-[0.3em] uppercase font-light hover:border-primary hover:text-white active:scale-95 transition-all duration-300 transform-gpu"
          >
            Discover the Menu
          </button>
        </div>
      </div>

      {/* Hardware-Accelerated Custom Cursor (Zero Layout Stutter) */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] rounded-full border border-primary/40 bg-primary/5 hidden md:block will-change-transform transform-gpu"
        style={{ left: 0, top: 0, xPercent: -50, yPercent: -50 }}
      />
    </section>
  )
}
