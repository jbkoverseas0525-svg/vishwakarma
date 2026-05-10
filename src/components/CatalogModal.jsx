import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function CatalogModal({ open, onClose, title = 'Brochure Inquiry', mode = 'brochure' }) {
  const [form, setForm] = useState({ name: '', number: '', email: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.number.trim() || !form.email.trim()) return
    setSubmitting(true)
    const isQuote = mode === 'quote'
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '7c0bbcee-b82e-4eec-a6a1-da7effc3ca4b',
          subject: isQuote
            ? `New Quote Inquiry from ${form.name} — Vishwakarma TechnoEnergy`
            : 'New Brochure Inquiry — Vishwakarma TechnoEnergy',
          from_name: 'Vishwakarma TechnoEnergy Website',
          name: form.name,
          email: form.email,
          phone: form.number,
          message: isQuote
            ? `Quote inquiry\n\nName: ${form.name}\nPhone: ${form.number}\nEmail: ${form.email}`
            : `Brochure / Catalog download request\n\nName: ${form.name}\nPhone: ${form.number}\nEmail: ${form.email}`,
        }),
      })
    } catch (_) { /* ignore network failure */ }

    if (!isQuote) {
      const link = document.createElement('a')
      link.href = '/CATALOG.pdf'
      link.target = '_blank'
      link.rel = 'noreferrer'
      link.download = 'Vishwakarma-Catalog.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    setSubmitting(false)
    setForm({ name: '', number: '', email: '' })
    onClose()
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(0,0,0,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}>
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 12,
              width: '100%', maxWidth: 560,
              boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
              overflow: 'hidden',
            }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--c-border)',
            }}>
              <h3 style={{
                fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
                fontSize: '1.5rem', color: 'var(--c-text)', margin: 0,
              }}>{title}</h3>
              <button onClick={onClose} aria-label="Close"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--c-text2)', padding: 4 }}>
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
              {[
                { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter Name' },
                { label: 'Number', name: 'number', type: 'tel', placeholder: 'Enter number' },
                { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter email' },
              ].map((f) => (
                <div key={f.name} style={{ marginBottom: '1.1rem' }}>
                  <label style={{
                    display: 'block', marginBottom: '0.5rem',
                    fontSize: '0.95rem', color: 'var(--c-text)', fontWeight: 500,
                  }}>
                    {f.label}<span style={{ color: '#000' }}>*</span>
                  </label>
                  <input
                    required
                    type={f.type}
                    name={f.name}
                    value={form[f.name]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    style={{
                      width: '100%', padding: '0.85rem 1rem',
                      border: '1px solid var(--c-accent, #c9a227)',
                      borderRadius: 4, fontSize: '0.95rem',
                      outline: 'none', background: '#fff',
                      color: 'var(--c-text)',
                      textOverflow: 'ellipsis',
                    }}
                  />
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
                <button type="submit" disabled={submitting}
                  style={{
                    padding: '0.7rem 2rem',
                    background: '#fff',
                    border: '1px solid var(--c-text)',
                    borderRadius: 4,
                    fontSize: '1rem', fontWeight: 500, color: 'var(--c-text)',
                    cursor: submitting ? 'wait' : 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--c-text)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--c-text)' }}>
                  {submitting ? 'Submitting…' : 'Submit'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
