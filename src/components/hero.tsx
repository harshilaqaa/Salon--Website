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

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 })
  const followerScale = useMotionValue(1)
  const followerScaleSpring = useSpring(followerScale, { stiffness: 200, damping: 25 })
  const dotSpringX = useSpring(mouseX, { stiffness: 60, damping: 15 })
  const dotSpringY = useSpring(mouseY, { stiffness: 60, damping: 15 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [mouseX, mouseY])

  const expandFollower = () => followerScale.set(2.8)
  const shrinkFollower = () => followerScale.set(1)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      const tl = gsap.timeline({ delay: 0.5 })
      const headline = heroRef.current?.querySelector(".hero-headline")
      const words2 = heroRef.current?.querySelector(".hero-word-2")

      if (headline) {
        tl.fromTo(headline, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "power4.out" })
      }
      if (words2) {
        tl.fromTo(words2, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
      }
      if (sublineRef.current) {
        tl.fromTo(sublineRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.4")
      }
      if (metaRef.current) {
        tl.fromTo(metaRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.4")
      }
      if (ctaRef.current) {
        tl.fromTo(ctaRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.3")
      }

      gsap.fromTo(bgRef.current, { scale: 1 }, { scale: 1.08, duration: 18, ease: "sine.inOut", yoyo: true, repeat: -1 })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} id="experience" className="relative w-full h-screen overflow-hidden flex items-center justify-center" style={{ perspective: "1200px" }}>
      <div ref={bgRef} className="absolute inset-0 w-full h-full transform-gpu will-change-transform" style={{ transformOrigin: "center center" }}>
        <img src="/salon-hero-bg.webp" alt="" className="w-full h-full object-cover transform-gpu" style={{ transform: "scale(1.15)" }} draggable={false} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)" }} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto w-full transform-gpu">
        <motion.div initial={{ opacity: 0, letterSpacing: "0.1em" }} animate={{ opacity: 1, letterSpacing: "0.5em" }} transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="text-[0.6rem] md:text-xs text-primary tracking-[0.5em] uppercase mb-6 md:mb-8">
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

        <div ref={sublineRef} className="opacity-0 mb-8 md:mb-12">
          <p className="font-serif italic text-[clamp(1rem,3vw,1.75rem)] text-stone-400/80 tracking-widest font-light">The Art of Hair Couture</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-primary/30" />
            <span className="text-[0.6rem] tracking-[0.4em] uppercase text-stone-500/70">Where Every Cut is a Masterpiece</span>
            <div className="h-px w-16 bg-primary/30" />
          </div>
        </div>

        <div ref={metaRef} className="opacity-0 flex items-center justify-center gap-8 mb-10 md:mb-14">
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

        <div ref={ctaRef} className="opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button onClick={onReserveClick} onMouseEnter={expandFollower} onMouseLeave={shrinkFollower} className="group px-10 py-4 bg-primary text-primary-foreground text-xs tracking-[0.3em] uppercase font-medium hover:bg-primary/90 transition-all duration-400 relative overflow-hidden" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <span className="relative z-10">Reserve Your Experience</span>
            <motion.div className="absolute inset-0 bg-white/10" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.5, ease: "easeInOut" }} />
          </motion.button>
          <motion.button onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })} onMouseEnter={expandFollower} onMouseLeave={shrinkFollower} className="px-10 py-4 border border-white/20 text-foreground/70 text-xs tracking-[0.3em] uppercase font-light hover:border-primary/50 hover:text-foreground transition-all duration-400" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            Discover the Menu
          </motion.button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[0.55rem] tracking-[0.4em] uppercase text-stone-500/50">Scroll</span>
        <motion.div className="w-px h-10 bg-gradient-to-b from-primary/50 to-transparent" animate={{ scaleY: [0, 1, 0], transformOrigin: "top" }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>

      <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-primary/70 mix-blend-difference hidden md:block" style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%", scale: followerScaleSpring, width: 20, height: 20 }} />
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full bg-primary/20 hidden md:block" style={{ x: dotSpringX, y: dotSpringY, translateX: "-50%", translateY: "-50%", width: 6, height: 6 }} />
    </section>
  )
}
