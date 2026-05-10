import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Users, Award, Globe, TrendingUp, Target, Lightbulb, Heart } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import useSEO from '../hooks/useSEO'

const milestones = [
  { year: '1998', title: 'Founded', desc: 'Vishwakarma TechnoEnergy was established in Delhi with a team of 12 engineers and a vision to transform industrial manufacturing.' },
  { year: '2003', title: 'ISO Certified', desc: 'Achieved ISO 9001 certification, setting new quality benchmarks for machinery manufacturing in North India.' },
  { year: '2008', title: 'National Expansion', desc: 'Opened service centres in Mumbai, Chennai, and Kolkata, building a nationwide distribution and support network.' },
  { year: '2014', title: 'Export Milestone', desc: 'Began exporting to 15 countries across Southeast Asia and the Middle East, marking our international footprint.' },
  { year: '2019', title: 'R&D Center Launch', desc: 'Inaugurated a 25,000 sq ft R&D facility focused on energy-efficient and smart industrial machinery.' },
  { year: '2024', title: 'Digital Transformation', desc: 'Integrated IoT and AI into product lines, offering predictive maintenance and remote monitoring solutions.' },
]

const team = [
  { name: 'Anil Kumar Bansal', role: 'Founder & CEO', img: 'https://randomuser.me/api/portraits/men/52.jpg', bio: '30+ years in industrial engineering. IIT Delhi alumni driving innovation at Vishwakarma TechnoEnergy.' },
  { name: 'Sunita Sharma', role: 'Chief Technical Officer', img: 'https://randomuser.me/api/portraits/women/57.jpg', bio: 'M.Tech in Mechanical Engineering with 20+ patents in hydraulic systems design.' },
  { name: 'Rajeev Malhotra', role: 'VP Operations', img: 'https://randomuser.me/api/portraits/men/36.jpg', bio: 'Ex-BHEL executive with deep expertise in large-scale industrial plant management.' },
  { name: 'Kavita Singh', role: 'Head of Quality', img: 'https://randomuser.me/api/portraits/women/31.jpg', bio: 'ISO lead auditor ensuring Vishwakarma products consistently exceed global quality standards.' },
]

const values = [
  { icon: Target, title: 'Precision', desc: 'We hold ourselves to the highest engineering standards — micron-perfect, always.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'Constantly pushing boundaries with R&D that keeps us 5 years ahead of the market.' },
  { icon: Heart, title: 'Integrity', desc: 'Transparent, honest business relationships built on trust and accountability.' },
  { icon: Users, title: 'Partnership', desc: 'We grow when our clients grow — your success is our most important KPI.' },
]

export default function About() {
  useSEO({
    title: 'About Vishwakarma TechnoEnergy — 25+ Years of Industrial Engineering Excellence',
    description: 'Founded in 1998, Vishwakarma TechnoEnergy has become India\'s trusted manufacturer of industrial engines and precision machinery. Learn about our story, values, and leadership team.',
    path: '/about',
  })
  return (
    <main style={{ paddingTop: 80 }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', padding: '6rem 0 5rem',
        background: 'var(--c-bg2)', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(30,90,168,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(30,90,168,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container" style={{ position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ color: 'var(--c-accent-dk)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>About Vishwakarma TechnoEnergy</span>
            <h1 style={{
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              margin: '0.75rem 0 1.25rem', lineHeight: 1.05,
              maxWidth: 700,
            }}>
              Engineering <span style={{ color: 'var(--c-primary)' }}>Excellence</span><br />Since 1998
            </h1>
            <p style={{ color: 'var(--c-text3)', fontSize: '1.05rem', maxWidth: 600, lineHeight: 1.8 }}>
              For over 25 years, Vishwakarma TechnoEnergy has been the trusted partner of India's most demanding industries — delivering precision-engineered machinery that powers progress.
            </p>
          </motion.div>
        </div>
        <div style={{ position: 'absolute', right: 0, top: 0, width: '45%', height: '100%', overflow: 'hidden' }} className="about-hero-img">
          <motion.img
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80"
            alt="Vishwakarma Factory"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--c-bg2) 10%, transparent 70%)' }} />
        </div>
        <style>{`.about-hero-img { display: block; } @media(max-width:768px){ .about-hero-img{display:none;} }`}</style>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: 'var(--c-bg)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
            {[
              { icon: Users, value: '500+', label: 'Happy Clients', color: 'var(--c-primary)' },
              { icon: Globe, value: '50+', label: 'Countries', color: '#38bdf8' },
              { icon: Award, value: '12', label: 'Awards Won', color: '#a78bfa' },
              { icon: TrendingUp, value: '₹500Cr+', label: 'Revenue 2023', color: '#34d399' },
            ].map(({ icon: Icon, value, label, color }, i) => (
              <FadeIn key={label} delay={i * 0.1}>
                <motion.div whileHover={{ scale: 1.05 }} style={{
                  padding: '2rem', borderRadius: 16, textAlign: 'center',
                  background: 'var(--c-card)',
                  border: '1px solid var(--c-border)',
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: `${color}18`, border: `1px solid ${color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1rem',
                  }}>
                    <Icon size={24} style={{ color }} />
                  </div>
                  <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2.2rem', fontWeight: 800, color }}>{value}</div>
                  <div style={{ color: 'var(--c-text3)', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '0.25rem' }}>{label}</div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section style={{ padding: '6rem 0', background: 'var(--c-bg2)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <FadeIn direction="right">
              <div style={{ position: 'relative' }}>
                <div style={{ borderRadius: 20, overflow: 'hidden', border: '2px solid rgba(30,90,168,0.25)' }}>
                  <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                    alt="Our Story" style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{
                  position: 'absolute', top: -20, left: -20,
                  width: 100, height: 100, borderRadius: '50%',
                  background: 'rgba(30,90,168,0.08)', border: '1px solid rgba(30,90,168,0.25)',
                }} />
                <div style={{
                  position: 'absolute', bottom: 20, right: -30,
                  padding: '1.25rem 1.75rem',
                  background: 'var(--c-card)', border: '1px solid rgba(30,90,168,0.3)',
                  borderRadius: 12, backdropFilter: 'blur(12px)',
                }}>
                  <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2rem', fontWeight: 800, color: 'var(--c-primary)' }}>25+</div>
                  <div style={{ color: 'var(--c-text3)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Years Strong</div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <div>
                <span style={{ color: 'var(--c-primary)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Our Story</span>
                <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', margin: '0.75rem 0 1.25rem', lineHeight: 1.1 }}>
                  From a Small Workshop to India's Trusted Machinery Brand
                </h2>
                <p style={{ color: 'var(--c-text3)', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '1rem' }}>
                  Vishwakarma TechnoEnergy began in 1998 when founder Anil Kumar Bansal set up a modest workshop in Delhi's Okhla Industrial Area with a dream: to build machinery that Indian industries could truly rely on. Starting with just 12 engineers and a handful of clients, the company quickly earned a reputation for quality and reliability.
                </p>
                <p style={{ color: 'var(--c-text3)', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '2rem' }}>
                  Today, we operate from a 2-lakh sq ft manufacturing campus, employing 800+ professionals, serving 500+ clients across 50 countries — and we're just getting started.
                </p>
                {['Built with Indian engineering talent', 'Customer-first philosophy', 'Commitment to zero-defect manufacturing'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem' }}>
                    <CheckCircle size={17} style={{ color: 'var(--c-primary)', flexShrink: 0 }} />
                    <span style={{ color: 'var(--c-text2)', fontSize: '0.95rem' }}>{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding: '6rem 0', background: 'var(--c-bg)' }}>
        <div className="container">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span style={{ color: 'var(--c-primary)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Our Core Values</span>
              <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.2rem)', margin: '0.5rem 0' }}>
                The Principles We Build By
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.75rem' }}>
            {values.map(({ icon: Icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, borderColor: 'rgba(30,90,168,0.4)' }}
                  style={{
                    padding: '2.5rem 2rem', borderRadius: 16,
                    border: '1px solid var(--c-border)',
                    background: 'var(--c-card)',
                    textAlign: 'center',
                    transition: 'border-color 0.2s',
                  }}>
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    style={{
                      width: 64, height: 64, borderRadius: 16,
                      background: 'rgba(30,90,168,0.1)', border: '1px solid rgba(30,90,168,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                    }}>
                    <Icon size={28} color="#f97316" />
                  </motion.div>
                  <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.4rem', marginBottom: '0.75rem' }}>{title}</h3>
                  <p style={{ color: 'var(--c-text3)', fontSize: '0.9rem', lineHeight: 1.7 }}>{desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ padding: '6rem 0', background: 'var(--c-bg2)' }}>
        <div className="container">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ color: 'var(--c-primary)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Our Journey</span>
              <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.2rem)', margin: '0.5rem 0' }}>
                25 Years of Milestones
              </h2>
            </div>
          </FadeIn>
          <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, transparent, rgba(30,90,168,0.4), transparent)', transform: 'translateX(-50%)' }} className="timeline-line" />
            <style>{`.timeline-line { display: block; } @media(max-width: 640px){ .timeline-line { left: 16px; } .timeline-item { flex-direction: column !important; padding-left: 48px !important; } .timeline-dot { left: 8px !important; transform: none !important; top: 8px !important; } .timeline-year { text-align: left !important; } }`}</style>
            {milestones.map((m, i) => (
              <FadeIn key={m.year} delay={i * 0.1}>
                <div className="timeline-item" style={{
                  display: 'flex', gap: '2rem',
                  alignItems: 'flex-start', marginBottom: '3rem',
                  flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                  position: 'relative',
                }}>
                  <div style={{ flex: 1, textAlign: i % 2 === 0 ? 'right' : 'left' }} className="timeline-year">
                    <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2.5rem', fontWeight: 800, color: 'rgba(30,90,168,0.25)', lineHeight: 1 }}>{m.year}</span>
                  </div>
                  <div className="timeline-dot" style={{
                    position: 'absolute', left: '50%', top: 6,
                    width: 16, height: 16, borderRadius: '50%',
                    background: 'var(--c-primary)', border: '3px solid var(--c-bg2)',
                    boxShadow: '0 0 16px rgba(30,90,168,0.5)',
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    flexShrink: 0,
                  }} />
                  <div style={{ flex: 1 }}>
                    <motion.div whileHover={{ scale: 1.02 }} style={{
                      padding: '1.5rem', borderRadius: 14,
                      background: 'var(--c-card)',
                      border: '1px solid var(--c-border)',
                    }}>
                      <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.3rem', color: 'var(--c-primary)', marginBottom: '0.5rem' }}>{m.title}</h3>
                      <p style={{ color: 'var(--c-text3)', fontSize: '0.9rem', lineHeight: 1.7 }}>{m.desc}</p>
                    </motion.div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      {/* <section style={{ padding: '6rem 0', background: 'var(--c-bg)' }}>
        <div className="container">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span style={{ color: 'var(--c-primary)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Our Leadership</span>
              <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.2rem)', margin: '0.5rem 0' }}>
                Meet the Team
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.75rem' }}>
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  style={{
                    borderRadius: 16, overflow: 'hidden',
                    border: '1px solid var(--c-border)',
                    background: 'var(--c-card)',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(30,90,168,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--c-border)'}>
                  <div style={{ position: 'relative', overflow: 'hidden', height: 240 }}>
                    <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.7), transparent)' }} />
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.25rem' }}>{member.name}</h3>
                    <div style={{ color: 'var(--c-primary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{member.role}</div>
                    <p style={{ color: 'var(--c-text3)', fontSize: '0.875rem', lineHeight: 1.6 }}>{member.bio}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── CTA ── */}
      <section style={{ padding: '5rem 0', background: 'var(--c-bg2)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <FadeIn>
            <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '1rem' }}>
              Let's Build Something Great Together
            </h2>
            <p style={{ color: 'var(--c-text3)', fontSize: '1rem', maxWidth: 480, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
              Whether you need a single machine or an entire plant setup, Vishwakarma TechnoEnergy has the expertise to deliver.
            </p>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.9rem 2.2rem',
              background: 'var(--g-primary)',
              borderRadius: 8, fontWeight: 700, fontSize: '1rem', color: '#fff',
              boxShadow: '0 8px 30px rgba(30,90,168,0.4)',
              transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}>
              Contact Us Today <ArrowRight size={18} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
