import { useEffect, useRef } from "react"
import gsap from "gsap"

export function LuxurySilkBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Subtle floating animation for silk lines
      gsap.to(".silk-line", {
        y: "random(-20, 20)",
        x: "random(-15, 15)",
        rotation: "random(-2, 2)",
        duration: "random(8, 15)",
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.5,
          from: "random",
        },
      })

      // Opacity shimmer
      gsap.to(".silk-line", {
        opacity: "random(0.03, 0.12)",
        duration: "random(4, 8)",
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.3,
          from: "random",
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 transform-gpu"
      aria-hidden="true"
      style={{ background: "#030303" }}
    >
      {/* SVG Silk Flow Lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gold gradient definitions */}
          <linearGradient id="silkGold1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
            <stop offset="30%" stopColor="#D4AF37" stopOpacity="0.08" />
            <stop offset="70%" stopColor="#F5D76E" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="silkGold2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5D76E" stopOpacity="0" />
            <stop offset="40%" stopColor="#D4AF37" stopOpacity="0.05" />
            <stop offset="60%" stopColor="#A8891F" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#F5D76E" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="silkGold3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A8891F" stopOpacity="0" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#F5D76E" stopOpacity="0" />
          </linearGradient>

          {/* Blur filter for softness */}
          <filter id="silk-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        {/* Silk flowing lines - Layer 1 */}
        <g filter="url(#silk-blur)">
          <path
            className="silk-line"
            d="M-100,150 C200,80 400,220 700,150 S1100,280 1400,180 S1700,100 2020,200"
            fill="none"
            stroke="url(#silkGold1)"
            strokeWidth="1.5"
          />
          <path
            className="silk-line"
            d="M-50,350 C300,280 500,420 850,350 S1200,480 1500,380 S1800,320 2020,400"
            fill="none"
            stroke="url(#silkGold2)"
            strokeWidth="1"
          />
          <path
            className="silk-line"
            d="M-120,550 C250,480 480,620 800,550 S1150,680 1450,580 S1750,520 2020,600"
            fill="none"
            stroke="url(#silkGold3)"
            strokeWidth="1.2"
          />
        </g>

        {/* Silk flowing lines - Layer 2 */}
        <g filter="url(#silk-blur)">
          <path
            className="silk-line"
            d="M-80,750 C350,680 550,820 900,750 S1250,880 1550,780 S1850,720 2020,800"
            fill="none"
            stroke="url(#silkGold1)"
            strokeWidth="0.8"
          />
          <path
            className="silk-line"
            d="M-100,950 C200,880 450,1020 780,950 S1120,1080 1420,980 S1720,920 2020,1000"
            fill="none"
            stroke="url(#silkGold2)"
            strokeWidth="1.3"
          />
        </g>

        {/* Diagonal silk threads */}
        <g filter="url(#silk-blur)">
          <path
            className="silk-line"
            d="M-50,0 C150,200 100,400 300,600 S150,800 350,1080"
            fill="none"
            stroke="url(#silkGold3)"
            strokeWidth="0.6"
          />
          <path
            className="silk-line"
            d="M500,-50 C650,150 550,350 750,550 S600,750 800,1080"
            fill="none"
            stroke="url(#silkGold1)"
            strokeWidth="0.5"
          />
          <path
            className="silk-line"
            d="M1100,-50 C1250,200 1150,450 1350,700 S1200,900 1400,1130"
            fill="none"
            stroke="url(#silkGold2)"
            strokeWidth="0.7"
          />
          <path
            className="silk-line"
            d="M1700,-50 C1850,150 1750,380 1950,600 S1800,850 2020,1080"
            fill="none"
            stroke="url(#silkGold3)"
            strokeWidth="0.5"
          />
        </g>

        {/* Subtle wave patterns at bottom */}
        <g filter="url(#silk-blur)" opacity="0.5">
          <path
            className="silk-line"
            d="M0,1000 Q480,950 960,1000 T1920,1000"
            fill="none"
            stroke="url(#silkGold1)"
            strokeWidth="0.4"
          />
          <path
            className="silk-line"
            d="M0,1040 Q480,990 960,1040 T1920,1040"
            fill="none"
            stroke="url(#silkGold2)"
            strokeWidth="0.3"
          />
        </g>
      </svg>

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(212,175,55,0.02) 0%, transparent 70%)",
        }}
      />
    </div>
  )
}
