import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import {
  Settings, Zap, Shield, Wrench, ArrowRight, Award,
  CheckCircle, Factory, Cpu, Gauge,
  Users, LifeBuoy, Download, X, ChevronLeft, ChevronRight,
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

/* ─── Reusable auto-rotating slideshow ─── */
function AutoSlideshow({ images, interval = 3500, alt = '', imgStyle }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => setIdx(p => (p + 1) % images.length), interval)
    return () => clearInterval(t)
  }, [images.length, interval])
  return (
    <>
      <motion.img key={idx} src={images[idx]} alt={alt}
        initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={imgStyle} />
      {images.length > 1 && (
        <div style={{
          position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 7, zIndex: 2,
        }}>
          {images.map((_, i) => (
            <button key={i} type="button" onClick={() => setIdx(i)} aria-label={`Show image ${i + 1}`}
              style={{
                width: i === idx ? 22 : 9, height: 9, borderRadius: 5, padding: 0, cursor: 'pointer',
                border: 'none', background: i === idx ? 'var(--c-primary)' : 'rgba(30,90,168,0.3)',
                transition: 'all 0.3s',
              }} />
          ))}
        </div>
      )}
    </>
  )
}

/* ─── Products (using uploaded images) ─── */
const products = [
  {
    title: 'Air-Cooled Diesel Engines',
    category: 'Power Solutions',
    images: ['/Image1.png','/Image3.png', '/Image4.png', '/Image5.png'],
    Icon: Factory,
    stat: '500+', statLabel: 'Units deployed',
    desc: 'Rugged, low-maintenance air-cooled diesel engines built to deliver dependable power across generators, agriculture, construction, and utility applications.',
    points: ['Generators & standby power', 'Agriculture & irrigation', 'Construction & mining'],
    applications: [
      { name: 'Generators', text: 'Portable and standby generators frequently use air-cooled diesel engines. They offer dependable backup power for household, commercial, and industrial applications, and are a popular choice due to their small size, ease of upkeep, and longevity.' },
      { name: 'Agriculture', text: 'Agricultural machinery such as pumps, irrigation systems, tractors, and harvesters heavily rely upon air-cooled diesel engines. Their rugged design allows them to resist harsh field conditions while providing effective power for agricultural applications.' },
      { name: 'Construction & Mining', text: 'Construction equipment such as compactors, loaders, excavators, and portable compressors utilize air-cooled diesel engines. Their capacity to function in harsh settings makes them suitable for heavy-duty applications.' },
      { name: 'Construction', text: 'These engines power generators, compactors, and other equipment used on construction sites.' },
      { name: 'Power Generation', text: 'Portable generators, both large and small, use air-cooled diesel engines to provide backup power in homes, for outdoor events, and in remote locations where grid electricity is unreliable.' },
      { name: 'Pumping Systems', text: 'They are used in irrigation systems, water pumps, and firefighting pumps.' },
      { name: 'Utility Equipment', text: 'They power various utility equipment like jetting machines, cleaning machines, and boom sprayers.' },
    ],
    advantages: [
      { name: 'Simplicity', text: 'Air-cooled engines have a simpler cooling system compared to water-cooled engines, making them easier to maintain and repair.' },
      { name: 'Portability', text: 'Their compact size and lack of a complex cooling system make them ideal for portable applications.' },
      { name: 'Reliability', text: 'They are known for their durability and reliability, especially in harsh environments.' },
      { name: 'Cost-effectiveness', text: 'They are often more affordable than water-cooled engines, making them a good choice for budget-conscious users.' },
    ],
  },
  {
    title: 'Marine Engine',
    category: 'Marine Power',
    images: ['/Marine1.png', '/Marine2.png', '/Marine3.png', '/MArineENgine4.png'],
    Icon: Gauge,
    stat: '24/7', statLabel: 'Continuous duty',
    desc: 'Versatile air-cooled diesel power for marine and remote-area duties — pumps, compressors, generation, and utility equipment that must run reliably in isolated environments.',
    points: ['Pumps & compressors', 'Power generation', 'Pumping & utility systems'],
    applications: [
      { name: 'Pumps & Compressors', text: 'Pumps and compressors for a variety of purposes, including water pumping, oil and gas exploration, and pneumatic systems, are often powered by air-cooled diesel engines. Their adaptability and ability to work efficiently in isolated areas make them ideal for these duties.' },
      { name: 'Construction', text: 'These engines power generators, compactors, and other equipment used on construction sites.' },
      { name: 'Power Generation', text: 'Portable generators, both large and small, use air-cooled diesel engines to provide backup power in homes, for outdoor events, and in remote locations where grid electricity is unreliable.' },
      { name: 'Pumping Systems', text: 'They are used in irrigation systems, water pumps, and firefighting pumps.' },
      { name: 'Utility Equipment', text: 'They power various utility equipment like jetting machines, cleaning machines, and boom sprayers.' },
    ],
    advantages: [],
  },
]

/* ─── Slideshow arrow button style ─── */
const arrowBtnStyle = {
  position: 'absolute', top: '42%', transform: 'translateY(-50%)', zIndex: 3,
  width: 42, height: 42, borderRadius: '50%', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)',
  border: '1px solid var(--c-border)', color: 'var(--c-primary)',
  boxShadow: '0 6px 18px rgba(15,23,42,0.15)',
  transition: 'background 0.2s, transform 0.2s',
}

/* ─── Single product row: image gallery + details, side by side ─── */
function ProductRow({ product, index, onReadMore }) {
  const [imgIndex, setImgIndex] = useState(0)
  const len = product.images.length

  // Auto-rotate this product's own gallery
  useEffect(() => {
    if (len <= 1) return
    const timer = setInterval(() => setImgIndex(p => (p + 1) % len), 3500)
    return () => clearInterval(timer)
  }, [len])

  return (
    <div className="product-row" style={{
      display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3.5rem', alignItems: 'center',
      maxWidth: 1280, margin: '0 auto', padding: '3.5rem 1.5rem',
      borderTop: index === 0 ? 'none' : '1px solid var(--c-border)',
    }}>

      {/* ── Image / slideshow ── */}
      <div className="product-row-media">
        <div style={{
          position: 'relative', borderRadius: 20, overflow: 'hidden',
          background: '#ffffff', border: '1px solid var(--c-border)',
          boxShadow: '0 20px 50px rgba(15,23,42,0.10)',
          aspectRatio: '4 / 3.1',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem',
        }}>
          <motion.img key={imgIndex}
            src={product.images[imgIndex]} alt={`${product.title} — view ${imgIndex + 1}`}
            initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} />

          {/* Category badge */}
          <div style={{
            position: 'absolute', top: 16, left: 16,
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.35rem 1rem', background: '#fff',
            border: '1px solid var(--c-primary-lt)', borderRadius: 100,
            boxShadow: '0 4px 14px rgba(30,90,168,0.15)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--c-accent)', animation: 'pulse 2s infinite' }} />
            <span style={{ color: 'var(--c-primary)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {product.category}
            </span>
          </div>

          {/* Image counter */}
          {len > 1 && (
            <div style={{
              position: 'absolute', top: 16, right: 16,
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.8rem',
              color: 'var(--c-text3)', letterSpacing: '0.1em',
            }}>
              {String(imgIndex + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(len).padStart(2, '0')}
            </div>
          )}

          {/* Prev / Next arrows */}
          {len > 1 && (
            <>
              <button type="button" aria-label="Previous image"
                onClick={() => setImgIndex(p => (p - 1 + len) % len)}
                style={{ ...arrowBtnStyle, left: 16 }}>
                <ChevronLeft size={20} />
              </button>
              <button type="button" aria-label="Next image"
                onClick={() => setImgIndex(p => (p + 1) % len)}
                style={{ ...arrowBtnStyle, right: 16 }}>
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Stat chip */}
          <div style={{
            position: 'absolute', bottom: 16, left: 16,
            padding: '0.7rem 1rem', background: '#fff',
            borderRadius: 12, boxShadow: '0 10px 30px rgba(15,23,42,0.12)',
            borderLeft: '4px solid var(--c-accent)',
          }}>
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.5rem', fontWeight: 800, color: 'var(--c-primary)', lineHeight: 1 }}>
              {product.stat}
            </div>
            <div style={{ color: 'var(--c-text3)', fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '0.2rem' }}>
              {product.statLabel}
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        {len > 1 && (
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            {product.images.map((src, gi) => (
              <button key={src} type="button" onClick={() => setImgIndex(gi)}
                aria-label={`Show image ${gi + 1}`}
                style={{
                  width: 60, height: 60, borderRadius: 10, cursor: 'pointer', padding: 4,
                  background: '#fff', overflow: 'hidden',
                  border: `2px solid ${gi === imgIndex ? 'var(--c-primary)' : 'var(--c-border)'}`,
                  opacity: gi === imgIndex ? 1 : 0.6,
                  transition: 'all 0.25s',
                }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Details ── */}
      <div className="product-row-info">
        <div style={{
          width: 56, height: 56, borderRadius: 14,
          background: 'var(--c-bg-blue)', border: '1px solid var(--c-primary-lt)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
        }}>
          <product.Icon size={24} color="var(--c-primary)" />
        </div>

        <div style={{ color: 'var(--c-text3)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
          0{index + 1} &mdash; {product.category}
        </div>

        <h2 style={{
          fontFamily: 'Rajdhani, sans-serif', fontWeight: 800,
          fontSize: 'clamp(1.7rem, 3vw, 2.6rem)', lineHeight: 1.1,
          marginBottom: '1rem', color: 'var(--c-text)',
        }}>
          {product.title}
        </h2>

        <p style={{ color: 'var(--c-text2)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: 460 }}>
          {product.desc}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
          {product.points.map(pt => (
            <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <CheckCircle size={15} style={{ color: 'var(--c-accent)', flexShrink: 0 }} />
              <span style={{ color: 'var(--c-text2)', fontSize: '0.88rem' }}>{pt}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button type="button" onClick={() => onReadMore(index)} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            padding: '0.7rem 1.5rem', background: 'var(--g-primary)',
            border: '1px solid transparent',
            borderRadius: 8, fontWeight: 700, fontSize: '0.85rem', color: '#fff',
            boxShadow: '0 6px 20px rgba(30,90,168,0.3)',
            cursor: 'pointer', transition: 'all 0.35s', width: 'fit-content',
          }}>
            Read More <ArrowRight size={15} />
          </button>
          <button type="button" onClick={() => window.dispatchEvent(new Event('open-quote-modal'))} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            padding: '0.7rem 1.5rem', background: 'transparent',
            border: '1px solid var(--c-border2)',
            borderRadius: 8, fontWeight: 700, fontSize: '0.85rem', color: 'var(--c-text2)',
            cursor: 'pointer', transition: 'all 0.35s', width: 'fit-content',
          }}>
            Request Quote
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Products Section ─── */
function ProductScrollSection() {
  const [detailIndex, setDetailIndex] = useState(null)

  return (
    <div style={{ background: 'var(--c-bg)' }}>
      <style>{`
        @media (max-width: 860px) {
          .product-row { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>

      {products.map((p, i) => (
        <ProductRow key={p.title} product={p} index={i} onReadMore={setDetailIndex} />
      ))}

      {/* Product detail modal */}
      <AnimatePresence>
        {detailIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setDetailIndex(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1.5rem',
            }}>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--c-bg)', borderRadius: 20,
                width: '100%', maxWidth: 720, maxHeight: '88vh', overflowY: 'auto',
                boxShadow: '0 40px 90px rgba(15,23,42,0.4)',
                border: '1px solid var(--c-border)', position: 'relative',
              }}>
              {(() => {
                const p = products[detailIndex]
                return (
                  <div>
                    {/* Header */}
                    <div style={{
                      position: 'sticky', top: 0, zIndex: 2,
                      display: 'flex', alignItems: 'center', gap: '1rem',
                      padding: '1.5rem 1.75rem',
                      background: 'var(--c-bg)',
                      borderBottom: '1px solid var(--c-border)',
                    }}>
                      <div style={{
                        width: 80, height: 80, borderRadius: 14, flexShrink: 0,
                        background: '#ffffff', border: '1px solid var(--c-primary-lt)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                      }}>
                        <img src={p.images[0]} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '0.4rem' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: 'var(--c-accent-dk)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                          {p.category}
                        </div>
                        <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2rem)', lineHeight: 1.1, color: 'var(--c-text)' }}>
                          {p.title}
                        </h2>
                      </div>
                      <button type="button" onClick={() => setDetailIndex(null)} aria-label="Close" style={{
                        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                        border: '1px solid var(--c-border)', background: 'var(--c-bg2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                        color: 'var(--c-text2)',
                      }}>
                        <X size={18} />
                      </button>
                    </div>

                    {/* Body */}
                    <div style={{ padding: '1.75rem' }}>
                      <p style={{ color: 'var(--c-text2)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                        {p.desc}
                      </p>

                      <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: 'var(--c-primary)', marginBottom: '1rem', letterSpacing: '0.02em' }}>
                        Applications
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: p.advantages.length ? '2rem' : 0 }}>
                        {p.applications.map(({ name, text }) => (
                          <div key={name} style={{ display: 'flex', gap: '0.75rem' }}>
                            <CheckCircle size={17} style={{ color: 'var(--c-accent)', flexShrink: 0, marginTop: '0.2rem' }} />
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--c-text)', marginBottom: '0.2rem' }}>{name}</div>
                              <p style={{ color: 'var(--c-text3)', fontSize: '0.88rem', lineHeight: 1.7 }}>{text}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {p.advantages.length > 0 && (
                        <>
                          <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: 'var(--c-primary)', marginBottom: '1rem', letterSpacing: '0.02em' }}>
                            Key Advantages
                          </h3>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                            {p.advantages.map(({ name, text }) => (
                              <div key={name} style={{
                                padding: '1rem 1.15rem', borderRadius: 12,
                                background: 'var(--c-bg2)', border: '1px solid var(--c-border)',
                              }}>
                                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--c-text)', marginBottom: '0.3rem' }}>{name}</div>
                                <p style={{ color: 'var(--c-text3)', fontSize: '0.86rem', lineHeight: 1.65 }}>{text}</p>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      <button type="button" onClick={() => { setDetailIndex(null); window.dispatchEvent(new Event('open-quote-modal')) }} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '2rem',
                        padding: '0.85rem 1.8rem', background: 'var(--g-primary)',
                        border: 'none', cursor: 'pointer',
                        borderRadius: 10, fontWeight: 700, fontSize: '0.9rem', color: '#fff',
                        boxShadow: '0 8px 24px rgba(30,90,168,0.3)',
                      }}>
                        Request a Quote <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── USP cards ─── */
const usps = [
  { icon: Settings, num: '500+', label: 'Projects Delivered', title: 'Precision Engineering', desc: 'Every component manufactured to exacting standards with micron-level tolerances and zero-defect philosophy.' },
  { icon: Zap,      num: '25+',  label: 'Years Experience',   title: 'High Performance',    desc: 'Engineered for peak output under the harshest industrial conditions without compromise on quality.' },
  { icon: Shield,   num: '98%',  label: 'Uptime Rate',        title: 'Certified Quality',   desc: 'Rigorous, audited manufacturing processes ensuring consistent, world-class quality every time.' },
  { icon: Wrench,   num: '50+',  label: 'Service Technicians',title: '24/7 Support',        desc: 'Round-the-clock technical support backed by a pan-India network of expert service teams.' },
]

/* ─── Process steps ─── */
const processSteps = [
  { num: '01', icon: Users,    title: 'Consultation',           desc: 'We sit with you to understand operational requirements, site conditions, and output targets.', tag: 'Discovery' },
  { num: '02', icon: Cpu,      title: 'Engineering & Design',   desc: 'Customised designs and simulations ensure optimal performance before a component is built.',   tag: 'Design'    },
  { num: '03', icon: Factory,  title: 'Precision Manufacturing',desc: 'Every part is machined in our quality-controlled facility with end-to-end quality inspection.',     tag: 'Build'     },
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
    description: 'Manufacturer of air-cooled diesel engines, petrol engines and precision industrial machinery in Ahmedabad. Trusted by 500+ clients across 50+ countries.',
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
                  {['CE', 'BIS', 'MSME'].map((b, i) => (
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

                  {/* Top-left quality card */}
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
                      <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: '0.92rem', color: 'var(--c-text)', lineHeight: 1 }}>Quality Assured</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--c-text3)', marginTop: '0.15rem' }}>Trusted Standard</div>
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

      {/* ════ PRODUCTS ════ */}
      <section style={{ background: 'var(--c-bg2)', paddingBottom: '4rem' }}>
        <div style={{ padding: '4rem 0 1rem', textAlign: 'center' }}>
          <FadeIn>
            <span style={{ color: 'var(--c-accent-dk)', fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Our Products</span>
            <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', margin: '0.5rem 0 0.5rem' }}>
              Engineered for Every Challenge
            </h2>
            <p style={{ color: 'var(--c-text3)', fontSize: '0.94rem', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
              Explore our complete product line — each engineered for reliability in the field.
            </p>
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
                  position: 'relative',
                  borderRadius: 20, overflow: 'hidden',
                  background: 'var(--c-bg-blue)',
                  padding: '2.5rem',
                  boxShadow: '0 40px 80px var(--c-shadow-lg)',
                  border: '1px solid var(--c-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  minHeight: 440,
                }}>
                  <AutoSlideshow
                    images={['/Image3.png', '/Image1.png',  '/Image5.png']}
                    alt="Vishwakarma Engine"
                    imgStyle={{
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
                  <a href="mailto:vishwakarmatecheng.office@gmail.com" style={{
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
                   vishwakarmatecheng.office@gmail.com
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
