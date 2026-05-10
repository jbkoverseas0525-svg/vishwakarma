import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'
import CatalogModal from './CatalogModal'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '0.65rem 0' : '1rem 0',
        background: scrolled ? 'var(--c-nav)' : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '1px solid var(--c-border)' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 14px var(--c-shadow)' : 'none',
        transition: 'all 0.3s ease',
      }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link to="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0, minWidth: 0 }}>
          <img
            src="/Logo.jpeg"
            alt="Vishwakarma TechnoEnergy"
            style={{
              height: scrolled ? 40 : 48,
              width: 'auto',
              maxWidth: '60vw',
              objectFit: 'contain',
              transition: 'height 0.3s',
            }}
          />
        </Link>

        {/* Desktop Links */}
        <ul className="desktop-nav" style={{ display: 'flex', gap: '2.25rem', listStyle: 'none', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.path} className="nav-link" style={{
                fontWeight: 600, fontSize: '0.88rem', letterSpacing: '0.05em', textTransform: 'uppercase',
                color: location.pathname === link.path ? 'var(--c-primary)' : 'var(--c-text2)',
                position: 'relative', paddingBottom: '4px', transition: 'color 0.2s',
              }}>
                {link.name}
                {location.pathname === link.path && (
                  <motion.span layoutId="underline" style={{
                    position: 'absolute', bottom: -2, left: 0, right: 0,
                    height: 2, background: 'var(--c-accent)', borderRadius: 2,
                  }} />
                )}
              </Link>
            </li>
          ))}

          {/* Catalog download */}
          <li>
            <button type="button" onClick={() => setCatalogOpen(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.04em',
                color: 'var(--c-primary)', padding: '0.5rem 0.9rem',
                border: '1px solid var(--c-primary)', borderRadius: 8,
                background: 'transparent', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--c-primary)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--c-primary)' }}>
              <Download size={15} /> Catalog
            </button>
          </li>

          <li>
            <button type="button" onClick={() => setQuoteOpen(true)} style={{
              padding: '0.55rem 1.3rem',
              background: 'var(--g-primary)',
              border: 'none', cursor: 'pointer',
              borderRadius: 8, fontWeight: 700, fontSize: '0.85rem',
              letterSpacing: '0.05em', textTransform: 'uppercase',
              color: '#fff', boxShadow: '0 4px 14px rgba(30,90,168,0.28)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(30,90,168,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 14px rgba(30,90,168,0.28)' }}>
              Get Quote
            </button>
          </li>
        </ul>

        {/* Mobile */}
        <div className="mobile-controls" style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }}>
          <button type="button" onClick={() => setCatalogOpen(true)}
            style={{
              width: 38, height: 38, borderRadius: 8,
              border: '1px solid var(--c-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--c-primary)', background: 'transparent', cursor: 'pointer',
            }}
            title="Download Catalog">
            <Download size={16} />
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--c-text)', padding: 4 }}>
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden', background: '#fff', borderTop: '1px solid var(--c-border)' }}>
            <div style={{ padding: '1.25rem 1rem' }}>
              {navLinks.map((link, i) => (
                <motion.div key={link.name} initial={{ x: -18, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.06 }}>
                  <Link to={link.path} style={{
                    display: 'block', padding: '0.8rem 0',
                    fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
                    fontSize: '1.15rem', letterSpacing: '0.05em', textTransform: 'uppercase',
                    color: location.pathname === link.path ? 'var(--c-primary)' : 'var(--c-text)',
                    borderBottom: '1px solid var(--c-border)',
                  }}>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ x: -18, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.22 }}>
                <button type="button" onClick={() => { setMenuOpen(false); setQuoteOpen(true) }} style={{
                  display: 'inline-block', marginTop: '1rem',
                  padding: '0.75rem 1.75rem',
                  background: 'var(--g-primary)',
                  border: 'none', cursor: 'pointer',
                  borderRadius: 8, fontWeight: 700, fontSize: '0.9rem',
                  letterSpacing: '0.05em', textTransform: 'uppercase', color: '#fff',
                }}>
                  Get Quote
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link:hover { color: var(--c-primary) !important; }
      `}</style>

      <CatalogModal open={catalogOpen} onClose={() => setCatalogOpen(false)} />
      <CatalogModal open={quoteOpen} onClose={() => setQuoteOpen(false)} title="Quote Inquiry" mode="quote" />
    </motion.nav>
  )
}
