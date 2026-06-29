import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Clock, Share2, BookOpen, Play, Navigation, MessageCircle } from "lucide-react"

interface Location {
  house: string
  neighborhood: string
  address: string
  phone: string
  phoneAlt?: string
  whatsapp: string
  hours: string
  mapsQuery: string
}

const LOCATIONS: Location[] = [
  {
    house: "House I",
    neighborhood: "Gurugram",
    address: "Sector 4, Gurugram\nHaryana — 122001",
    phone: "+91 95828 06555",
    whatsapp: "919582806555",
    hours: "Open Daily: 10:00 AM – 8:00 PM",
    mapsQuery: "Advance+Cut+Salon+Sector+4+Gurugram",
  },
  {
    house: "House II",
    neighborhood: "Gurugram",
    address: "Sector 9A, Gurugram\nHaryana — 122001",
    phone: "+91 99109 95230",
    phoneAlt: "+91 124 420 8695",
    whatsapp: "919910995230",
    hours: "Open Daily: 10:00 AM – 8:00 PM",
    mapsQuery: "Advance+Cut+Salon+Sector+9A+Gurugram",
  },
  {
    house: "House III",
    neighborhood: "Gurugram",
    address: "Sector 15 Part 2, Gurugram\nHaryana — 122001",
    phone: "+91 93550 00102",
    phoneAlt: "+91 124 438 7162",
    whatsapp: "919355000102",
    hours: "Open Daily: 10:00 AM – 8:00 PM",
    mapsQuery: "Advance+Cut+Salon+Sector+15+Gurugram",
  },
  {
    house: "House IV",
    neighborhood: "Gurugram",
    address: "Sector 49, Gurugram\nHaryana — 122018",
    phone: "+91 97189 59090",
    phoneAlt: "+91 124 427 3498",
    whatsapp: "919718959090",
    hours: "Open Daily: 10:00 AM – 8:00 PM",
    mapsQuery: "Advance+Cut+Salon+Sector+49+Gurugram",
  },
  {
    house: "House V",
    neighborhood: "Gurugram",
    address: "New Colony, Gurugram\nHaryana — 122001",
    phone: "+91 93550 00101",
    phoneAlt: "+91 124 422 1512",
    whatsapp: "919355000101",
    hours: "Open Daily: 10:00 AM – 8:00 PM",
    mapsQuery: "Advance+Cut+Salon+New+Colony+Gurugram",
  },
  {
    house: "House VI",
    neighborhood: "Hisar",
    address: "Complex Hisar\nHaryana — 125001",
    phone: "+91 99966 30605",
    whatsapp: "919996630605",
    hours: "Open Daily: 10:00 AM – 8:00 PM",
    mapsQuery: "Advance+Cut+Salon+Complex+Hisar",
  },
]

const FOOTER_LINKS = {
  "The Studio": [
    "Our Philosophy",
    "The Experience",
    "Career Opportunities",
    "Press & Media",
  ],
  "Services": [
    "Hair Couture",
    "Technical Colour",
    "Bespoke Grooming",
    "Skin Rituals",
    "Bridal Collections",
  ],
  "Client Care": [
    "Book an Appointment",
    "Gift Vouchers",
    "Loyalty Programme",
    "Cancellation Policy",
    "Contact Us",
  ],
}

interface FooterProps {
  onReserveClick: () => void
}

export function Footer({ onReserveClick }: FooterProps) {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  return (
    <footer id="flagships" className="relative overflow-hidden z-10">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Associated Houses */}
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10">
        <div className="mb-16">
          <p className="text-[10px] tracking-[0.3em] text-amber-500/60 uppercase mb-2">
            FLAGSHIP STUDIOS
          </p>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-primary/40" />
            <span className="text-[0.6rem] tracking-[0.5em] uppercase text-primary">
              Our Houses
            </span>
          </div>
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] text-foreground leading-tight tracking-wide">
            Visit Us
          </h2>
        </div>

        {/* Luxury Grid - Floating Glass Panes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {LOCATIONS.map((loc, i) => (
            <motion.div
              key={loc.house}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-[#070707]/60 backdrop-blur-md border border-amber-500/10 p-6 md:p-7 hover:scale-[1.01] hover:border-amber-500/25 transition-all duration-500 ease-out"
            >
              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-primary/30 to-transparent" />
                <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-primary/30 to-transparent" />
              </div>

              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-[0.6rem] tracking-[0.4em] uppercase text-primary mb-1">
                    {loc.neighborhood}
                  </p>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors duration-500 tracking-wide">
                    {loc.house}
                  </h3>
                </div>
                <MapPin
                  size={16}
                  className="text-primary/30 group-hover:text-primary transition-colors duration-500 mt-1 flex-shrink-0"
                />
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-3">
                  <MapPin size={12} className="text-stone-500/70 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-stone-400/80 font-light leading-relaxed whitespace-pre-line">
                    {loc.address}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={12} className="text-stone-500/70 flex-shrink-0" />
                  <div className="flex flex-col">
                    <a
                      href={`tel:${loc.phone.replace(/\s/g, "")}`}
                      className="text-sm text-stone-400/80 hover:text-primary transition-colors duration-300 font-light"
                    >
                      {loc.phone}
                    </a>
                    {loc.phoneAlt && (
                      <a
                        href={`tel:${loc.phoneAlt.replace(/\s/g, "")}`}
                        className="text-xs text-stone-500/60 hover:text-primary transition-colors duration-300 font-light"
                      >
                        {loc.phoneAlt}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock size={12} className="text-stone-500/70 flex-shrink-0" />
                  <p className="text-sm text-stone-400/80 font-light">{loc.hours}</p>
                </div>
              </div>

              <div className="pt-5 border-t border-stone-800/40 flex items-center justify-between gap-4">
                <button
                  onClick={onReserveClick}
                  className="relative gold-underline-trigger text-xs tracking-[0.25em] uppercase text-primary hover:text-foreground transition-colors duration-300 font-light"
                >
                  Book
                  <span className="gold-underline" />
                </button>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://wa.me/${loc.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase text-stone-400 hover:text-primary transition-colors duration-300 font-light"
                    title="Chat on WhatsApp"
                  >
                    <MessageCircle size={12} />
                    WhatsApp
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${loc.mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase text-stone-500 hover:text-primary transition-colors duration-300 font-light"
                  >
                    <Navigation size={12} />
                    Directions
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-y border-stone-800/40 py-14 mb-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-sm">
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-2 tracking-wide">
                Join the Inner Circle
              </h3>
              <p className="text-sm text-stone-400/80 font-light leading-relaxed">
                Early access to appointments, seasonal collections, and exclusive invitations
                to private studio evenings.
              </p>
            </div>

            <div className="flex-shrink-0 w-full md:w-auto md:min-w-[340px]">
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <p className="font-serif text-xl text-primary mb-1">
                    Welcome to the Inner Circle
                  </p>
                  <p className="text-xs tracking-[0.2em] uppercase text-stone-500 font-light">
                    Your invitation has been received
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="YOUR EMAIL ADDRESS"
                    className="luxury-input pr-32"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-0 bottom-0 h-full px-5 text-[0.65rem] tracking-[0.2em] uppercase text-primary hover:text-foreground transition-colors duration-300"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16 relative z-10">
          {/* Brand column */}
          <div>
            <div className="mb-6">
              <div className="font-serif text-xl font-bold italic tracking-[0.08em] uppercase text-foreground mb-1" style={{ transform: 'skewX(-3deg)' }}>
                ADVANCE CUT
              </div>
              <div className="text-[0.5rem] tracking-[0.8em] uppercase text-primary font-light font-sans ml-1">
                SALON
              </div>
            </div>
            <p className="text-xs text-stone-400/80 font-light leading-relaxed mb-6">
              Where precision meets artistry.<br />
              The art of hair couture.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Share2, href: "#", label: "Instagram" },
                { Icon: BookOpen, href: "#", label: "Facebook" },
                { Icon: Play, href: "#", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 border border-stone-800/50 text-stone-500 hover:text-primary hover:border-primary/30 transition-all duration-300"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[0.6rem] tracking-[0.35em] uppercase text-primary mb-5 font-medium">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); if (link === "Book an Appointment") onReserveClick() }}
                      className="relative gold-underline-trigger text-xs text-stone-400/80 hover:text-foreground transition-colors duration-300 font-light tracking-wide"
                    >
                      {link}
                      <span className="gold-underline" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-stone-800/40 relative z-10">
          <p className="text-[0.6rem] tracking-[0.15em] text-stone-600 font-light">
            © {new Date().getFullYear()} Advance Cut Salon. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Notice"].map((link) => (
              <a
                key={link}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="relative gold-underline-trigger text-[0.6rem] tracking-[0.1em] text-stone-600 hover:text-stone-400 transition-colors duration-300"
              >
                {link}
                <span className="gold-underline" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
