import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Download, Award } from 'lucide-react'
import CatalogModal from './CatalogModal'

export default function Footer() {
  const [catalogOpen, setCatalogOpen] = useState(false)
  return (
    <footer style={{
      background: 'var(--c-footer)',
      padding: '4rem 0 1.5rem',
      color: '#cbd5e1',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem',
        }}>

          {/* Brand */}
          <div>
            <div style={{
              background: '#fff', padding: '0.6rem 0.9rem',
              borderRadius: 10, display: 'inline-block', marginBottom: '1rem',
            }}>
              <img src="/Logo.jpeg" alt="Vishwakarma TechnoEnergy"
                style={{ height: 50, width: 'auto', objectFit: 'contain', display: 'block' }} />
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.75, maxWidth: 280, marginTop: '0.5rem' }}>
              Delivering precision-engineered machinery solutions that power industries across India and beyond. <em>We build trust.</em>
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.25rem' }}>
              {[['f', 'Facebook'], ['in', 'LinkedIn'], ['tw', 'Twitter'], ['yt', 'YouTube']].map(([label, title]) => (
                <motion.a key={label} href="#" title={title} whileHover={{ y: -3 }}
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#94a3b8', fontWeight: 700, fontSize: '0.72rem',
                    textTransform: 'uppercase', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-accent)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--c-accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}>
                  {label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              marginBottom: '1.25rem', color: '#fff',
            }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {[['Home', '/'], ['About Us', '/about'], ['Contact', '/contact']].map(([label, path]) => (
                <li key={label}>
                  <Link to={path} style={{ color: '#94a3b8', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--c-accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
                    → {label}
                  </Link>
                </li>
              ))}
              <li>
                <button type="button" onClick={() => setCatalogOpen(true)}
                  style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--c-accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
                  <Download size={14} /> Download Catalog
                </button>
              </li>
              {[['View Certificate', '/Certificate.pdf'], ['NSIC Certificate', '/AnotherCertified.pdf']].map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer"
                    style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--c-accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
                    <Award size={14} /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              marginBottom: '1.25rem', color: '#fff',
            }}>Reach Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                <MapPin size={15} style={{ color: 'var(--c-accent)', marginTop: 3, flexShrink: 0 }} />
                <span style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.6 }}>
                 1103, Krupal Pathshala - 1 opp.HP Petrol Pump <br />
                  Nr. Shivranjani Cross Road,<br />
                  Ahmedabad - 380015, Gujarat
                </span>
              </div>
              <a href="mailto:vishwakarmatecheng.office@gmail.com" style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', color: '#94a3b8', fontSize: '0.88rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--c-accent)'}
                onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
                <Mail size={15} style={{ color: 'var(--c-accent)', flexShrink: 0 }} />
                vishwakarmatecheng.office@gmail.com
              </a>
              <a href="tel:+917490018322" style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', color: '#94a3b8', fontSize: '0.88rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--c-accent)'}
                onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
                <Phone size={15} style={{ color: 'var(--c-accent)', flexShrink: 0 }} />
                +91 83206 84142
              </a>
              <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                <Clock size={15} style={{ color: 'var(--c-accent)', flexShrink: 0 }} />
                <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Mon–Sat: 11:00 AM – 6:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance / Credentials */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.5rem', paddingBottom: '1.25rem',
          display: 'flex', flexWrap: 'wrap', gap: '1.25rem 2rem',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Registered & Certified:
          </div>
          {[
            { label: 'GSTIN', value: '24AALCV7395P1Z9' },
            { label: 'PAN',   value: 'AALCV7395P' },
           
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{ color: 'var(--c-accent)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {label}
              </span>
              <span style={{ color: '#cbd5e1', fontSize: '0.82rem', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, letterSpacing: '0.04em' }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom line */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '1.25rem',
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
        }}>
          <p style={{ color: '#64748b', fontSize: '0.8rem' }}>© {new Date().getFullYear()} Vishwakarma TechnoEnergy Pvt. Ltd.. All rights reserved.</p>
          <p style={{ color: '#64748b', fontSize: '0.8rem' }}>We Build Trust.</p>
        </div>
      </div>
      <CatalogModal open={catalogOpen} onClose={() => setCatalogOpen(false)} />
    </footer>
  )
}
