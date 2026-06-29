import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useMotionValue, useSpring } from "framer-motion"

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

  // Mouse follower coordinates
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)
  
  // High-performance spring settings (faster response, less layout calculation)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 0.5 })
  const followerScale = useMotionValue(1)
  const followerScaleSpring = useSpring(followerScale, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      // Use requestAnimationFrame to let the browser throttle mouse events smoothly
      window.requestAnimationFrame(() => {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
      })
    }
    window.addEventListener("mousemove", handleMouse, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [mouseX, mouseY])

  const expandFollower = () => followerScale.set(2.2)
  const shrinkFollower = () => followerScale.set(1)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax - forced to 3D hardware acceleration
      gsap.to(bgRef.current, {
        yPercent: 15,
        force3D: true,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      const tl = gsap.timeline({ delay: 0.3 })
      const headline = heroRef.current?.querySelector(".hero-headline")
      const words2 = heroRef.current?.querySelector(".hero-word-2")

      if (headline) {
        tl.fromTo(headline, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", force3D: true })
      }
      if (words2) {
        tl.fromTo(words2, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", force3D: true }, "-=0.5")
      }
      if (sublineRef.current) {
        tl.fromTo(sublineRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", force3D: true }, "-=0.4")
      }
      if (metaRef.current) {
        tl.fromTo(metaRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", force3D: true }, "-=0.4")
      }
      if (ctaRef.current) {
        tl.fromTo(ctaRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", force3D: true }, "-=0.3")
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} id="experience" className="relative w-full h-screen overflow-hidden flex items-center justify-center transform-gpu">
      <div ref={bgRef} className="absolute inset-0 w-full h-full transform-gpu will-change-transform">
        <img src="/salon-hero-bg.webp" alt="" className="w-full h-full object-cover transform-gpu" style={{ transform: "scale(1.1)" }} draggable={false} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto w-full transform-gpu">
        <motion.div initial={{ opacity: 0, letterSpacing: "0.1em" }} animate={{ opacity: 1, letterSpacing: "0.5em" }} transition={{ duration: 1.2, delay: 0.1 }} className="text-[0.6rem] md:text-xs text-primary tracking-[0.5em] uppercase mb-6 md:mb-8">
          Est. 2010 &nbsp;·&nbsp; Haryana
        </motion.div>

        <div className="hero-headline mb-6 md:mb-8 transform-gpu will-change-transform flex flex-col items-center justify-center">
          <div className="font-serif font-bold italic uppercase text-white leading-none text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.04em]" style={{ transform: "skewX(-6deg)", display: "inline-block" }}>
            ADVANCE CUT
          </div>
          <span className="hero-word-2 font-sans font-light uppercase block text-center text-amber-400 tracking-[0.6em] pl-[0.6em] text-xs sm:text-base md:text-lg lg:text-2xl mt-4 leading-none">
            SALON
          </span>
        </div>

        <div ref={sublineRef} className="opacity-0 mb-8 md:mb-12 transform-gpu">
          <p className="font-serif italic text-[clamp(1rem,3vw,1.75rem)] text-stone-400/80 tracking-widest font-light">The Art of Hair Couture</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-primary/30" />
            <span className="text-[0.6rem] tracking-[0.4em] uppercase text-stone-500/70">Where Every Cut is a Masterpiece</span>
            <div className="h-px w-16 bg-primary/30" />
          </div>
        </div>

        <div ref={metaRef} className="opacity-0 flex items-center justify-center gap-8 mb-10 md:mb-14 transform-gpu">
          {[
            { value: "15+", label: "Years of Excellence" },
            { value: "6", label: "Houses" },
            { value: "12K+", label: "Elite Clientele" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-2xl md:text-3xl text-primary leading-none tracking-[0.15em]">{stat.value}</div>
              <div className="text-[0.6rem] tracking-[0.2em] uppercase text-stone-400/80 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4 transform-gpu">
          <motion.button onClick={onReserveClick} onMouseEnter={expandFollower} onMouseLeave={shrinkFollower} className="group px-10 py-4 bg-primary text-primary-foreground text-xs tracking-[0.3em] uppercase font-medium hover:bg-primary/90 transition-all duration-400 relative overflow-hidden" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <span className="relative z-10">Reserve Your Experience</span>
          </motion.button>
          <motion.button onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })} onMouseEnter={expandFollower} onMouseLeave={shrinkFollower} className="px-10 py-4 border border-white/20 text-foreground/70 text-xs tracking-[0.3em] uppercase font-light hover:border-primary/50 hover:text-foreground transition-all duration-400" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            Discover the Menu
          </motion.button>
        </div>
      </div>

      {/* High-Performance Custom Cursor (No blend-modes, utilizes GPU layers) */}
      <motion.div 
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-primary/10 border border-primary/40 hidden md:block will-change-transform transform-gpu" 
        style={{ 
          x: springX, 
          y: springY, 
          translateX: "-50%", 
          translateY: "-50%", 
          scale: followerScaleSpring, 
          width: 32, 
          height: 32 
        }} 
      />
    </section>
  )
}
