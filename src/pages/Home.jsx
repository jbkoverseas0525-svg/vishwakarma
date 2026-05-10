import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  Settings, Zap, Shield, Wrench, ArrowRight, Award,
  CheckCircle, Factory, Cpu, Gauge, Layers,
  Users, LifeBuoy, Download,
} from 'lucide-react'
import FadeIn from '../components/FadeIn'
import CatalogModal from '../components/CatalogModal'
import useSEO from '../hooks/useSEO'

/* ─── Animated Counter ─── */
function Counter({ end, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, end, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

/* ─── Products (using uploaded images) ─── */
const products = [
  {
    title: 'Heavy-Duty Diesel Engine',
    category: 'Power Solutions',
    img: '/Image1.png',
    Icon: Factory,
    stat: '500+', statLabel: 'Units deployed',
    desc: 'Rugged air-cooled diesel engines delivering consistent performance for agricultural, construction, and general-purpose industrial applications.',
    points: ['High torque, low-fuel consumption', 'Compact yet robust construction', 'Simple service & maintenance'],
  },
  {
    title: 'Industrial Petrol Engine',
    category: 'Compact Power',
    img: '/Image2.png',
    Icon: Zap,
    stat: '6-15 HP', statLabel: 'Output range',
    desc: 'Portable single-cylinder petrol engines engineered for water pumps, threshers, generators, and other small industrial equipment.',
    points: ['Easy recoil start', 'Low vibration design', 'Wide application range'],
  },
  {
    title: 'Single-Cylinder Diesel Unit',
    category: 'Precision Machinery',
    img: '/Image3.png',
    Icon: Cpu,
    stat: 'ISO 9001', statLabel: 'Quality certified',
    desc: 'Precision-built single-cylinder diesel units with superior flywheel inertia for stable power transmission in demanding environments.',
    points: ['High flywheel inertia', 'Fuel-efficient combustion', 'Long service intervals'],
  },
  {
    title: 'Medium-Duty Industrial Engine',
    category: 'Industrial Systems',
    img: '/Image4.png',
    Icon: Gauge,
    stat: '99%', statLabel: 'Uptime guarantee',
    desc: 'Durable medium-duty engines designed for industrial water pumps, concrete mixers, and continuous-duty applications.',
    points: ['Continuous duty rated', 'Corrosion-resistant finish', 'Proven reliability worldwide'],
  },
  {
    title: 'Twin-Cylinder Power Unit',
    category: 'High Performance',
    img: '/Image5.png',
    Icon: Layers,
    stat: '2,500+', statLabel: 'Running hours',
    desc: 'Twin-cylinder power unit engineered for higher-output industrial applications requiring sustained performance and reliability.',
    points: ['Balanced twin-cylinder design', 'Low-maintenance operation', 'Industrial-grade components'],
  },
]

/* ─── Sticky Scroll Section ─── */
function ProductScrollSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef([])

  useEffect(() => {
    const observers = products.map((_, i) => {
      const el = itemRefs.current[i]
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i) },
        { threshold: 0.55, rootMargin: '-10% 0px -10% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const active = products[activeIndex]

  return (
    <div className="product-scroll-wrapper" style={{ display: 'flex' }}>

      {/* Left: Sticky Image Panel */}
      <div className="product-scroll-left" style={{
        width: '50%', position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        background: 'var(--c-bg-blue)',
      }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeIndex}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
            <img src={active.img} alt={active.title}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 20px 40px rgba(15,23,42,0.15))' }} />
          </motion.div>
        </AnimatePresence>

        {/* Category Badge */}
        <AnimatePresence mode="wait">
          <motion.div key={`badge-${activeIndex}`}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            style={{
              position: 'absolute', top: 32, left: 32, zIndex: 2,
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.35rem 1rem', background: '#fff',
              border: '1px solid var(--c-primary-lt)', borderRadius: 100,
              boxShadow: '0 4px 14px rgba(30,90,168,0.15)',
            }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--c-accent)', animation: 'pulse 2s infinite' }} />
            <span style={{ color: 'var(--c-primary)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {active.category}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Bottom stat */}
        <AnimatePresence mode="wait">
          <motion.div key={`stat-${activeIndex}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            style={{
              position: 'absolute', bottom: 74, left: 32, zIndex: 2,
              padding: '1rem 1.25rem', background: '#fff',
              borderRadius: 12, boxShadow: '0 10px 30px rgba(15,23,42,0.12)',
              borderLeft: '4px solid var(--c-accent)',
            }}>
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: 'var(--c-primary)', lineHeight: 1 }}>
              {active.stat}
            </div>
            <div style={{ color: 'var(--c-text3)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '0.2rem' }}>
              {active.statLabel}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress */}
        <div style={{ position: 'absolute', bottom: 32, left: 32, display: 'flex', gap: '6px', zIndex: 2 }}>
          {products.map((_, i) => (
            <motion.div key={i}
              animate={{ width: i === activeIndex ? 28 : 8, background: i === activeIndex ? 'var(--c-primary)' : 'var(--c-border2)' }}
              transition={{ duration: 0.3 }}
              style={{ height: 6, borderRadius: 3 }} />
          ))}
        </div>

        <div style={{
          position: 'absolute', top: 32, right: 32, zIndex: 2,
          fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
          fontSize: '0.85rem', color: 'var(--c-text3)', letterSpacing: '0.1em',
        }}>
          {String(activeIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(products.length).padStart(2, '0')}
        </div>
      </div>

      {/* Right: Scroll cards */}
      <div className="product-scroll-right" style={{ width: '50%', background: 'var(--c-bg)' }}>
        {products.map((card, i) => (
          <div key={card.title}
            ref={el => { itemRefs.current[i] = el }}
            className="product-scroll-item"
            style={{
              minHeight: '100vh', padding: '5rem 3.5rem',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              borderBottom: '1px solid var(--c-border)',
              transition: 'opacity 0.35s',
              opacity: i === activeIndex ? 1 : 0.38,
            }}>
            <motion.div animate={{ x: i === activeIndex ? 0 : 12 }} transition={{ duration: 0.4 }}>

              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: i === activeIndex ? 'var(--c-bg-blue)' : 'var(--c-bg2)',
                border: `1px solid ${i === activeIndex ? 'var(--c-primary-lt)' : 'var(--c-border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
                transition: 'all 0.35s',
              }}>
                <card.Icon size={24} color={i === activeIndex ? 'var(--c-primary)' : 'var(--c-text3)'} />
              </div>

              <div style={{ color: 'var(--c-text3)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                0{i + 1} &mdash; {card.category}
              </div>

              <h2 style={{
                fontFamily: 'Rajdhani, sans-serif', fontWeight: 800,
                fontSize: 'clamp(1.7rem, 3vw, 2.6rem)', lineHeight: 1.1,
                marginBottom: '1rem', color: 'var(--c-text)',
              }}>
                {card.title}
              </h2>

              <p style={{ color: 'var(--c-text2)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: 420 }}>
                {card.desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
                {card.points.map(pt => (
                  <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <CheckCircle size={15} style={{ color: 'var(--c-accent)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--c-text2)', fontSize: '0.88rem' }}>{pt}</span>
                  </div>
                ))}
              </div>

              <button type="button" onClick={() => window.dispatchEvent(new Event('open-quote-modal'))} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                padding: '0.7rem 1.5rem',
                background: i === activeIndex ? 'var(--g-primary)' : 'transparent',
                border: `1px solid ${i === activeIndex ? 'transparent' : 'var(--c-primary-lt)'}`,
                borderRadius: 8, fontWeight: 700, fontSize: '0.85rem',
                color: i === activeIndex ? '#fff' : 'var(--c-primary)',
                boxShadow: i === activeIndex ? '0 6px 20px rgba(30,90,168,0.3)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.35s', width: 'fit-content',
              }}>
                Request Quote <ArrowRight size={15} />
              </button>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── USP cards ─── */
const usps = [
  { icon: Settings, num: '500+', label: 'Projects Delivered', title: 'Precision Engineering', desc: 'Every component manufactured to ISO standards with micron-level tolerances and zero-defect philosophy.' },
  { icon: Zap,      num: '25+',  label: 'Years Experience',   title: 'High Performance',    desc: 'Engineered for peak output under the harshest industrial conditions without compromise on quality.' },
  { icon: Shield,   num: '98%',  label: 'Uptime Rate',        title: 'Certified Quality',   desc: 'ISO 9001:2015 certified manufacturing processes ensuring consistent, world-class quality every time.' },
  { icon: Wrench,   num: '50+',  label: 'Service Technicians',title: '24/7 Support',        desc: 'Round-the-clock technical support backed by a pan-India network of expert service teams.' },
]

/* ─── Process steps ─── */
const processSteps = [
  { num: '01', icon: Users,    title: 'Consultation',           desc: 'We sit with you to understand operational requirements, site conditions, and output targets.', tag: 'Discovery' },
  { num: '02', icon: Cpu,      title: 'Engineering & Design',   desc: 'Customised designs and simulations ensure optimal performance before a component is built.',   tag: 'Design'    },
  { num: '03', icon: Factory,  title: 'Precision Manufacturing',desc: 'Every part is machined in our ISO-certified facility with end-to-end quality inspection.',     tag: 'Build'     },
  { num: '04', icon: LifeBuoy, title: 'Installation & Support', desc: 'Our field team handles delivery, commissioning, training, and 24/7 ongoing support.',          tag: 'Deploy'    },
]

const testimonials = [
  { name: 'Rajiv Sharma',  role: 'Plant Manager, SteelCorp India',  text: 'Vishwakarma engines have been running continuously for over 3 years without a single breakdown. Exceptional reliability.', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Priya Mehta',   role: 'COO, PowerGrid Solutions',        text: 'The machinery we sourced from Vishwakarma TechnoEnergy handles our peak loads flawlessly. Best investment we made this decade.',         img: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Anand Kumar',   role: 'Director, AutoFab Industries',    text: 'Precision, reliability, and service — Vishwakarma TechnoEnergy delivers on all three fronts. Truly world-class partners.',              img: 'https://randomuser.me/api/portraits/men/65.jpg' },
]

export default function Home() {
  useSEO({
    title: 'Vishwakarma TechnoEnergy — Industrial Engines & Precision Machinery Manufacturer',
    description: 'Manufacturer of air-cooled diesel engines, petrol engines and precision industrial machinery in Ahmedabad. ISO 9001:2015 certified. Trusted by 500+ clients across 50+ countries.',
    path: '/',
  })
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  useEffect(() => {
    const handler = () => setQuoteOpen(true)
    window.addEventListener('open-quote-modal', handler)
    return () => window.removeEventListener('open-quote-modal', handler)
  }, [])

  return (
    <main>

      {/* ════ HERO ════ */}
      <section ref={heroRef} className="hero-section" style={{
        position: 'relative', minHeight: '92vh',
        display: 'flex', alignItems: 'center', overflow: 'hidden',
        paddingTop: '7rem', paddingBottom: '4rem',
        background: 'var(--g-hero)',
      }}>

        {/* Animated aurora blobs */}
        <motion.div
          animate={{ x: [0, 50, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: -220, right: -180, width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(127,186,58,0.22) 0%, transparent 65%)',
            pointerEvents: 'none', filter: 'blur(10px)',
          }} />
        <motion.div
          animate={{ x: [0, -40, 30, 0], y: [0, 40, -20, 0], scale: [1, 1.15, 1, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', bottom: -200, left: -180, width: 550, height: 550,
            background: 'radial-gradient(circle, rgba(30,90,168,0.18) 0%, transparent 65%)',
            pointerEvents: 'none', filter: 'blur(10px)',
          }} />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: '30%', left: '40%', width: 380, height: 380,
            background: 'radial-gradient(circle, rgba(59,130,196,0.10) 0%, transparent 70%)',
            pointerEvents: 'none', filter: 'blur(8px)',
          }} />

        {/* Blueprint grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(30,90,168,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,90,168,0.07) 1px, transparent 1px)',
          backgroundSize: '72px 72px', pointerEvents: 'none', zIndex: 1,
        }} />

        {/* Giant decorative watermark */}
        <div className="hero-watermark" style={{
          position: 'absolute', bottom: '-4rem', right: '-2rem',
          fontFamily: 'Rajdhani, sans-serif', fontWeight: 800,
          fontSize: 'clamp(10rem, 25vw, 22rem)', lineHeight: 0.8,
          color: 'var(--c-primary)', opacity: 0.04,
          pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.03em',
          zIndex: 1,
        }}>VTE</div>

        <motion.div style={{ opacity: heroOpacity, position: 'relative', zIndex: 2, width: '100%' }}>
          <div className="container">
            <div className="hero-grid" style={{
              display: 'grid', gridTemplateColumns: '1.05fr 1fr',
              gap: '4rem', alignItems: 'center',
            }}>

              {/* ── Left ── */}
              <div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.4rem 1rem',
                    background: 'rgba(255,255,255,0.85)',
                    border: '1px solid var(--c-primary-lt)',
                    borderRadius: 100, marginBottom: '1.5rem',
                    boxShadow: '0 4px 14px rgba(30,90,168,0.12)',
                    backdropFilter: 'blur(8px)',
                  }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--c-accent)', animation: 'pulse 2s infinite' }} />
                  <span style={{ color: 'var(--c-primary)', fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    Precision Machinery · We Build Trust
                  </span>
                </motion.div>

                {/* Headline — word-by-word reveal */}
                <h1 style={{
                  fontFamily: 'Rajdhani, sans-serif', fontWeight: 800,
                  fontSize: 'clamp(2.3rem, 5.8vw, 4.2rem)',
                  lineHeight: 1.08, marginBottom: '1.25rem',
                  color: 'var(--c-text)', overflow: 'hidden',
                }}>
                  {[
                    { t: 'Engineering', c: 'var(--c-text)' },
                    { t: 'Industrial', c: 'var(--c-primary)' },
                    { t: 'Power', c: 'var(--c-primary)' },
                    { t: 'for', c: 'var(--c-text)' },
                    { t: 'Every', c: 'var(--c-text)' },
                    { t: 'Demand', c: 'var(--c-accent-dk)' },
                  ].map((w, i) => (
                    <motion.span key={i}
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.55, delay: 0.2 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{ display: 'inline-block', marginRight: '0.6rem', color: w.c }}>
                      {w.t}
                    </motion.span>
                  ))}
                </h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.75 }}
                  style={{
                    color: 'var(--c-text2)', fontSize: 'clamp(0.96rem, 1.4vw, 1.08rem)',
                    lineHeight: 1.8, maxWidth: 520, marginBottom: '2rem',
                  }}>
                  Vishwakarma TechnoEnergy delivers world-class industrial engines and precision equipment — built for the toughest environments and trusted by companies across India and beyond.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.88 }}
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '2rem' }}>
                  <button type="button" onClick={() => setQuoteOpen(true)} className="btn-shine" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    position: 'relative', overflow: 'hidden',
                    padding: '0.9rem 1.8rem',
                    background: 'var(--g-primary)',
                    border: 'none', cursor: 'pointer',
                    borderRadius: 10, fontWeight: 700, fontSize: '0.92rem', color: '#fff',
                    boxShadow: '0 10px 28px rgba(30,90,168,0.32)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 36px rgba(30,90,168,0.45)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 10px 28px rgba(30,90,168,0.32)' }}>
                    Get a Free Quote <ArrowRight size={16} />
                  </button>
                  <button type="button" onClick={() => setCatalogOpen(true)} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.9rem 1.7rem',
                    border: '1px solid var(--c-border2)',
                    borderRadius: 10, fontWeight: 600, fontSize: '0.92rem',
                    color: 'var(--c-text)',
                    background: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(8px)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-primary)'; e.currentTarget.style.color = 'var(--c-primary)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border2)'; e.currentTarget.style.color = 'var(--c-text)' }}>
                    <Download size={15} /> Download Catalog
                  </button>
                </motion.div>

                {/* Trust badges row */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.05 }}
                  style={{
                    display: 'flex', flexWrap: 'wrap', gap: '1.25rem',
                    alignItems: 'center', marginBottom: '2rem',
                  }}>
                  <span style={{ color: 'var(--c-text3)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Trusted by:
                  </span>
                  {['ISO 9001', 'CE', 'BIS', 'MSME'].map((b, i) => (
                    <motion.div key={b}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, delay: 1.15 + i * 0.08 }}
                      style={{
                        padding: '0.3rem 0.8rem',
                        background: 'rgba(255,255,255,0.7)',
                        border: '1px solid var(--c-border)',
                        borderRadius: 6,
                        fontSize: '0.72rem', fontWeight: 700,
                        color: 'var(--c-text2)', letterSpacing: '0.06em',
                        backdropFilter: 'blur(8px)',
                      }}>
                      {b}
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 1.2 }}
                  style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem',
                    paddingTop: '1.75rem', borderTop: '1px solid var(--c-border)',
                  }}>
                  {[
                    { value: 500, suffix: '+', label: 'Clients' },
                    { value: 25, suffix: '+', label: 'Years' },
                    { value: 98, suffix: '%', label: 'Uptime' },
                    { value: 50, suffix: '+', label: 'Countries' },
                  ].map(({ value, suffix, label }) => (
                    <div key={label}>
                      <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', fontWeight: 800, color: 'var(--c-primary)', lineHeight: 1 }}>
                        <Counter end={value} suffix={suffix} />
                      </div>
                      <div style={{ color: 'var(--c-text3)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '0.35rem' }}>{label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* ── Right: hero product image with orbit ── */}
              <motion.div className="hero-grid-right"
                initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ position: 'relative' }}>
                <motion.div style={{ y: heroY, position: 'relative' }}>

                  {/* Rotating gradient ring behind image */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                    style={{
                      position: 'absolute', inset: '-20px',
                      borderRadius: 32,
                      background: 'conic-gradient(from 0deg, #1a2456, #f58220, #2d3a78, #1a2456)',
                      filter: 'blur(18px)', opacity: 0.25,
                      pointerEvents: 'none',
                    }} />
                  {/* Dotted decorative circle */}
                  <div style={{
                    position: 'absolute', top: -28, left: -28, width: 140, height: 140,
                    border: '2px dashed rgba(30,90,168,0.25)',
                    borderRadius: '50%', pointerEvents: 'none',
                  }} />
                  {/* Accent square */}
                  <div style={{
                    position: 'absolute', bottom: -18, right: -18,
                    width: 90, height: 90, borderRadius: 18,
                    background: 'var(--c-accent)', opacity: 0.15,
                    pointerEvents: 'none',
                  }} />

                  {/* Image card */}
                  <div className="hero-img-card" style={{
                    position: 'relative', borderRadius: 24, overflow: 'hidden',
                    boxShadow: '0 40px 80px var(--c-shadow-lg), 0 16px 32px var(--c-shadow)',
                    border: '1px solid var(--c-border)',
                    background: 'linear-gradient(135deg, #ffffff 0%, #fef5ec 100%)',
                    padding: '2rem',
                    minHeight: 380,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <motion.img src="/Image5.png" alt="Vishwakarma Industrial Machinery"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ width: '100%', maxHeight: 420, objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 28px 44px rgba(15,23,42,0.22))' }} />
                    <div style={{
                      position: 'absolute', top: 20, right: 20,
                      padding: '0.35rem 0.85rem',
                      background: 'var(--c-accent)',
                      borderRadius: 100,
                      fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: '#fff',
                      boxShadow: '0 6px 16px rgba(127,186,58,0.4)',
                    }}>
                      ★ Best Seller
                    </div>
                    {/* Shine sweep */}
                    <div className="shine-sweep" />
                  </div>

                  {/* Top-left ISO card */}
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    whileHover={{ y: -4, scale: 1.03 }}
                    style={{
                      position: 'absolute', top: 24, left: -22,
                      padding: '0.75rem 1rem',
                      background: '#fff',
                      border: '1px solid var(--c-border)',
                      borderRadius: 12,
                      boxShadow: '0 12px 30px var(--c-shadow-lg)',
                      display: 'flex', alignItems: 'center', gap: '0.7rem',
                    }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: 'rgba(127,186,58,0.18)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Shield size={18} color="#d96a0a" />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: '0.92rem', color: 'var(--c-text)', lineHeight: 1 }}>ISO 9001:2015</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--c-text3)', marginTop: '0.15rem' }}>Certified</div>
                    </div>
                  </motion.div>

                  {/* Middle-right spec card (NEW) */}
                  <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.05 }}
                    whileHover={{ x: 4, scale: 1.03 }}
                    style={{
                      position: 'absolute', top: '45%', right: -28,
                      transform: 'translateY(-50%)',
                      padding: '0.75rem 1rem',
                      background: '#fff',
                      border: '1px solid var(--c-border)',
                      borderRadius: 12,
                      boxShadow: '0 12px 30px var(--c-shadow-lg)',
                      minWidth: 132,
                    }}>
                    <div style={{ color: 'var(--c-text3)', fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Rated</div>
                    <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: 'var(--c-primary)', lineHeight: 1.1 }}>10 HP</div>
                    <div style={{ color: 'var(--c-text3)', fontSize: '0.72rem', marginTop: '0.15rem' }}>3000 RPM · 550 CC</div>
                  </motion.div>

                  {/* Bottom-right projects card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    whileHover={{ y: -4, scale: 1.03 }}
                    style={{
                      position: 'absolute', bottom: 24, right: -22,
                      padding: '0.9rem 1.15rem',
                      background: 'var(--g-primary)',
                      borderRadius: 12,
                      boxShadow: '0 16px 34px rgba(30,90,168,0.35)',
                      color: '#fff',
                    }}>
                    <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: '1.4rem', lineHeight: 1 }}>500+</div>
                    <div style={{ fontSize: '0.68rem', letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.92, marginTop: '0.15rem' }}>Projects Delivered</div>
                  </motion.div>

                  {/* Bottom-left rating pill */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.35 }}
                    style={{
                      position: 'absolute', bottom: -18, left: 28,
                      padding: '0.55rem 0.95rem',
                      background: '#fff',
                      border: '1px solid var(--c-border)',
                      borderRadius: 100,
                      boxShadow: '0 10px 24px var(--c-shadow)',
                      display: 'flex', alignItems: 'center', gap: '0.45rem',
                    }}>
                    <span style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#f59e0b', fontSize: '0.8rem' }}>★</span>)}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--c-text2)' }}>4.9 / 5.0</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Shine keyframes & mobile tweaks */}
        <style>{`
          .hero-img-card { isolation: isolate; }
          .shine-sweep {
            position: absolute; inset: 0; pointer-events: none;
            background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%);
            transform: translateX(-100%);
            transition: transform 0.9s ease;
          }
          .hero-img-card:hover .shine-sweep { transform: translateX(100%); }
          @media (max-width: 768px) {
            .hero-watermark { font-size: 9rem !important; bottom: -1.5rem !important; right: -1rem !important; }
          }
        `}</style>
      </section>

      {/* ════ USP ════ */}
      <section className="section-pad" style={{ background: 'var(--c-bg2)', padding: '5.5rem 0' }}>
        <div className="container">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{ color: 'var(--c-accent-dk)', fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Why Vishwakarma TechnoEnergy</span>
              <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', margin: '0.5rem 0 0.65rem' }}>
                Built Different. Built Better.
              </h2>
              <p style={{ color: 'var(--c-text3)', fontSize: '0.96rem', maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
                Four pillars that set Vishwakarma TechnoEnergy apart in the industrial machinery space.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {usps.map(({ icon: Icon, num, label, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  style={{
                    padding: '2rem 1.75rem',
                    background: 'var(--c-card)',
                    border: '1px solid var(--c-border)',
                    borderRadius: 16,
                    position: 'relative', overflow: 'hidden',
                    boxShadow: '0 1px 3px var(--c-shadow)',
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-primary-lt)'; e.currentTarget.style.boxShadow = '0 20px 40px var(--c-shadow-lg)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.boxShadow = '0 1px 3px var(--c-shadow)' }}>

                  <div style={{
                    position: 'absolute', top: -8, right: 10,
                    fontFamily: 'Rajdhani, sans-serif', fontWeight: 900,
                    fontSize: '5.5rem', lineHeight: 1, opacity: 0.06,
                    color: 'var(--c-primary)', pointerEvents: 'none', userSelect: 'none',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div style={{
                    width: 52, height: 52, borderRadius: 12,
                    background: 'var(--c-bg-blue)', border: '1px solid var(--c-primary-lt)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem',
                  }}>
                    <Icon size={24} color="var(--c-primary)" />
                  </div>

                  <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2rem', fontWeight: 800, color: 'var(--c-primary)', lineHeight: 1, marginBottom: '0.2rem' }}>{num}</div>
                  <div style={{ color: 'var(--c-text3)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.9rem' }}>{label}</div>

                  <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.55rem' }}>{title}</h3>
                  <p style={{ color: 'var(--c-text3)', fontSize: '0.86rem', lineHeight: 1.75 }}>{desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════ STICKY SCROLL PRODUCTS ════ */}
      <section style={{ background: 'var(--c-bg2)' }}>
        <div style={{ padding: '4rem 0 1rem', textAlign: 'center' }}>
          <FadeIn>
            <span style={{ color: 'var(--c-accent-dk)', fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Our Products</span>
            <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', margin: '0.5rem 0 0.5rem' }}>
              Engineered for Every Challenge
            </h2>
            <p style={{ color: 'var(--c-text3)', fontSize: '0.94rem', maxWidth: 440, margin: '0 auto 0.4rem', lineHeight: 1.7 }}>
              Scroll down to explore our complete product line.
            </p>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}
              style={{ color: 'var(--c-primary)', fontSize: '1.1rem', marginTop: '0.25rem' }}>↓</motion.div>
          </FadeIn>
        </div>
        <ProductScrollSection />
      </section>

      {/* ════ WHY CHOOSE ════ */}
      <section className="section-pad" style={{ padding: '6rem 0', background: 'var(--c-bg)' }}>
        <div className="container">
          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

            <FadeIn direction="right">
              <div style={{ position: 'relative' }}>
                <div style={{
                  borderRadius: 20, overflow: 'hidden',
                  background: 'var(--c-bg-blue)',
                  padding: '2.5rem',
                  boxShadow: '0 40px 80px var(--c-shadow-lg)',
                  border: '1px solid var(--c-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  minHeight: 440,
                }}>
                  <img src="/Image3.png" alt="Vishwakarma Engine" style={{
                    width: '100%', maxHeight: 380, objectFit: 'contain', display: 'block',
                    filter: 'drop-shadow(0 18px 36px rgba(15,23,42,0.2))',
                  }} />
                </div>
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute', bottom: -22, right: -18,
                    background: 'var(--g-primary)',
                    borderRadius: 16, padding: '1.15rem 1.5rem',
                    boxShadow: '0 16px 40px rgba(30,90,168,0.35)', textAlign: 'center',
                  }}>
                  <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2.2rem', fontWeight: 800, lineHeight: 1, color: '#fff' }}>25+</div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)' }}>Years Strong</div>
                </motion.div>
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div>
                <span style={{ color: 'var(--c-accent-dk)', fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Why Choose Us</span>
                <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 3.8vw, 2.75rem)', margin: '0.75rem 0 1.25rem', lineHeight: 1.1 }}>
                  Trusted by India's Most Demanding Industries
                </h2>
                <p style={{ color: 'var(--c-text2)', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '1.75rem' }}>
                  With 25+ years of engineering excellence, Vishwakarma TechnoEnergy is synonymous with reliability, performance, and innovation in every sector we serve.
                </p>
                {[
                  'ISO 9001:2015 Certified Manufacturing',
                  'In-house R&D and engineering team',
                  'Pan-India service network — 50+ technicians',
                  'Customised solutions for every industry',
                  'Energy-efficient, low-emission machinery',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem' }}>
                    <CheckCircle size={17} style={{ color: 'var(--c-accent)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--c-text2)', fontSize: '0.93rem' }}>{item}</span>
                  </div>
                ))}
                <Link to="/about" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '2rem',
                  padding: '0.85rem 1.9rem', background: 'var(--g-primary)',
                  borderRadius: 10, fontWeight: 700, fontSize: '0.92rem', color: '#fff',
                  boxShadow: '0 8px 26px rgba(30,90,168,0.3)', transition: 'transform 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''}>
                  About Our Company <ArrowRight size={16} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════ PROCESS ════ */}
      <section className="section-pad" style={{ padding: '6rem 0', background: 'var(--c-bg2)' }}>
        <div className="container">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span style={{ color: 'var(--c-accent-dk)', fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>How We Work</span>
              <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', margin: '0.5rem 0 0.65rem' }}>
                From Concept to Commissioning
              </h2>
              <p style={{ color: 'var(--c-text3)', fontSize: '0.94rem', maxWidth: 440, margin: '0 auto', lineHeight: 1.75 }}>
                A proven 4-step process that delivers every project on spec and on time.
              </p>
            </div>
          </FadeIn>

          <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', position: 'relative' }}>
            <div className="process-connector" style={{
              position: 'absolute', top: 52, left: '12.5%', right: '12.5%', height: 2,
              background: 'linear-gradient(to right, transparent, var(--c-primary-lt), var(--c-primary-lt), transparent)',
              zIndex: 0,
            }} />
            {processSteps.map(({ num, icon: Icon, title, desc, tag }, i) => (
              <FadeIn key={title} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }}
                  style={{
                    padding: '1.9rem 1.5rem', borderRadius: 16,
                    background: 'var(--c-card)',
                    border: '1px solid var(--c-border)',
                    boxShadow: '0 1px 3px var(--c-shadow)',
                    position: 'relative', zIndex: 1,
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-primary-lt)'; e.currentTarget.style.boxShadow = '0 18px 36px var(--c-shadow-lg)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.boxShadow = '0 1px 3px var(--c-shadow)' }}>

                  <div style={{
                    width: 54, height: 54, borderRadius: '50%',
                    background: 'var(--g-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.25rem',
                    boxShadow: '0 8px 20px rgba(30,90,168,0.3)',
                    position: 'relative',
                  }}>
                    <Icon size={22} color="#fff" />
                    <div style={{
                      position: 'absolute', top: -6, right: -6,
                      width: 22, height: 22, borderRadius: '50%',
                      background: 'var(--c-accent)',
                      border: '2px solid #fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: '0.65rem', color: '#fff',
                    }}>
                      {num}
                    </div>
                  </div>

                  <div style={{
                    display: 'inline-block', marginBottom: '0.65rem',
                    padding: '0.15rem 0.6rem',
                    background: 'var(--c-bg-blue)',
                    border: '1px solid var(--c-primary-lt)',
                    borderRadius: 100, color: 'var(--c-primary)', fontSize: '0.68rem', fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>{tag}</div>

                  <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.18rem', marginBottom: '0.55rem' }}>{title}</h3>
                  <p style={{ color: 'var(--c-text3)', fontSize: '0.86rem', lineHeight: 1.75 }}>{desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════ TESTIMONIALS ════ */}
      <section className="section-pad" style={{ padding: '6rem 0', background: 'var(--c-bg)' }}>
        <div className="container">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{ color: 'var(--c-accent-dk)', fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Client Stories</span>
              <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', margin: '0.5rem 0' }}>
                Trusted by Industry Leaders
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }}
                  style={{
                    padding: '2rem', borderRadius: 16, background: 'var(--c-card)',
                    border: '1px solid var(--c-border)', boxShadow: '0 1px 3px var(--c-shadow)',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-primary-lt)'; e.currentTarget.style.boxShadow = '0 18px 36px var(--c-shadow-lg)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.boxShadow = '0 1px 3px var(--c-shadow)' }}>
                  <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1.1rem' }}>
                    {[...Array(5)].map((_, j) => <span key={j} style={{ color: '#f59e0b', fontSize: '1rem' }}>★</span>)}
                  </div>
                  <p style={{ color: 'var(--c-text2)', fontSize: '0.94rem', lineHeight: 1.75, marginBottom: '1.4rem', fontStyle: 'italic' }}>"{t.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <img src={t.img} alt={t.name} style={{ width: 46, height: 46, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--c-primary-lt)' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.93rem' }}>{t.name}</div>
                      <div style={{ color: 'var(--c-text3)', fontSize: '0.8rem' }}>{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section className="section-pad" style={{ padding: '5rem 0', background: 'var(--c-bg2)' }}>
        <div className="container">
          <FadeIn>
            <div style={{
              position: 'relative', overflow: 'hidden',
              padding: 'clamp(2.25rem, 5vw, 4rem)',
              borderRadius: 24,
              background: 'var(--g-primary)',
              boxShadow: '0 30px 60px rgba(30,90,168,0.32)',
            }}>
              <div style={{ position: 'absolute', top: -70, right: -70, width: 280, height: 280, borderRadius: '50%', background: 'rgba(127,186,58,0.15)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: -100, left: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />

              <div style={{
                position: 'relative',
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2.25rem', alignItems: 'center',
              }}>
                <div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.3rem 0.85rem',
                    background: 'rgba(255,255,255,0.18)',
                    border: '1px solid rgba(255,255,255,0.28)',
                    borderRadius: 100, marginBottom: '1.1rem',
                  }}>
                    <Award size={13} color="#fff" />
                    <span style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Let's Build Together</span>
                  </div>
                  <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: 'clamp(1.7rem, 3.8vw, 2.6rem)', color: '#fff', lineHeight: 1.1, marginBottom: '0.75rem' }}>
                    Ready to Power Your Operations?
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '0.98rem', lineHeight: 1.7, maxWidth: 460 }}>
                    Connect with our engineers for a free consultation and customised quote tailored to your needs.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setQuoteOpen(true)} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.9rem 1.9rem', background: '#fff',
                    border: 'none', cursor: 'pointer',
                    borderRadius: 10, fontWeight: 700, fontSize: '0.92rem', color: 'var(--c-primary)',
                    boxShadow: '0 10px 26px rgba(0,0,0,0.18)',
                    justifyContent: 'center', transition: 'transform 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = ''}>
                    Request Free Quote <ArrowRight size={16} />
                  </button>
                  <a href="mailto:info@vishwakarmatechnoenergy.com" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.9rem 1.9rem',
                    border: '1.5px solid rgba(255,255,255,0.55)',
                    borderRadius: 10, fontWeight: 600, fontSize: '0.92rem', color: '#fff',
                    background: 'rgba(255,255,255,0.08)',
                    justifyContent: 'center', transition: 'background 0.2s',
                    wordBreak: 'break-all',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
                    info@vishwakarmatechnoenergy.com
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <CatalogModal open={catalogOpen} onClose={() => setCatalogOpen(false)} />
      <CatalogModal open={quoteOpen} onClose={() => setQuoteOpen(false)} title="Quote Inquiry" mode="quote" />
    </main>
  )
}
