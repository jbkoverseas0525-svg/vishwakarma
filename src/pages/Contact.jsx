import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ChevronDown } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import useSEO from '../hooks/useSEO'

const initialForm = { name: '', email: '', phone: '', company: '', product: '', message: '' }

export default function Contact() {
  useSEO({
    title: 'Contact Vishwakarma TechnoEnergy — Ahmedabad, Gujarat | Industrial Engine Enquiries',
    description: 'Get in touch with Vishwakarma TechnoEnergy for industrial engine enquiries, quotes, and support. 1103, Krupal Pathshala - 1 opp.HP Petrol Pump Nr. Shivranjani Cross Road Ahmedabad - 380015 · vishwakarmatecheng.office@gmail.com · +91 83206 84142.',
    path: '/contact',
  })
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim() || !/^\+?[\d\s\-]{8,}$/.test(form.phone)) e.phone = 'Valid phone required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    setLoading(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '7c0bbcee-b82e-4eec-a6a1-da7effc3ca4b',
          subject: `New Contact Enquiry from ${form.name} — Vishwakarma TechnoEnergy`,
          from_name: 'Vishwakarma TechnoEnergy Website',
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          product: form.product,
          message: `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCompany: ${form.company || '—'}\nProduct of Interest: ${form.product || '—'}\n\nMessage:\n${form.message}`,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setErrors({ submit: data.message || 'Could not send. Please try again.' })
      }
    } catch (_) {
      setErrors({ submit: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '0.85rem 1rem',
    background: 'var(--c-card)',
    border: `1px solid ${errors[field] ? '#ef4444' : 'var(--c-border2)'}`,
    borderRadius: 10, color: 'var(--c-text)', fontSize: '0.95rem',
    outline: 'none', transition: 'border-color 0.2s',
    fontFamily: 'Inter, sans-serif',
    boxSizing: 'border-box',
  })

  return (
    <main style={{ paddingTop: 80 }}>

      {/* ── HERO ── */}
      <section style={{ padding: '5rem 0 4rem', background: 'var(--c-bg2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(30,90,168,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(30,90,168,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ color: 'var(--c-accent-dk)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Contact Vishwakarma TechnoEnergy</span>
            <h1 style={{
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              margin: '0.75rem 0 1.25rem', lineHeight: 1.05,
            }}>
              Let's Start a <span style={{ color: 'var(--c-primary)' }}>Conversation</span>
            </h1>
            <p style={{ color: 'var(--c-text3)', fontSize: '1.05rem', maxWidth: 520, margin: '0 auto', lineHeight: 1.8 }}>
              Our engineers are ready to understand your requirements and deliver the right machinery solution. Get in touch today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ── */}
      <section style={{ padding: '4rem 0', background: 'var(--c-bg)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '1.5rem', marginBottom: '5rem',
            alignItems: 'stretch',
          }}>
            {[
              { icon: MapPin, title: 'Visit Us',      primary: 'Nr. Shivranjani Cross Road',   secondary: '1103, Krupal Pathshala - 1 opp.HP Petrol Pump',           color: '#1a2456' },
              { icon: Mail,   title: 'Email Us',      primary: 'vishwakarmatecheng.office@gmail.com', secondary: 'We reply within 24 hours',                 color: '#f58220' },
              { icon: Phone,  title: 'Call Us',       primary: '+91 83206 84142',            secondary: 'Mon–Sat · Sales & Support',               color: '#1a2456' },
              { icon: Clock,  title: 'Working Hours', primary: 'Mon–Sat: 10:00 AM – 6:00 PM', secondary: 'Sunday: Closed',                           color: '#f58220' },
            ].map(({ icon: Icon, title, primary, secondary, color }, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -6 }}
                  style={{
                    padding: '1.85rem 1.6rem',
                    borderRadius: 16,
                    background: 'var(--c-card)',
                    border: '1px solid var(--c-border)',
                    boxShadow: '0 1px 3px var(--c-shadow)',
                    height: '100%',
                    display: 'flex', flexDirection: 'column',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}55`; e.currentTarget.style.boxShadow = `0 18px 36px var(--c-shadow-lg)` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border)'; e.currentTarget.style.boxShadow = '0 1px 3px var(--c-shadow)' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: `${color}18`, border: `1px solid ${color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.1rem',
                  }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <h3 style={{
                    fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
                    fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--c-text3)', marginBottom: '0.5rem',
                  }}>{title}</h3>
                  <p style={{
                    color: 'var(--c-text)', fontSize: '0.95rem', fontWeight: 600,
                    lineHeight: 1.4, marginBottom: '0.35rem', wordBreak: 'break-word',
                  }}>{primary}</p>
                  <p style={{
                    color: 'var(--c-text3)', fontSize: '0.82rem', lineHeight: 1.5,
                    marginTop: 'auto',
                  }}>{secondary}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          {/* ── COMPANY CREDENTIALS ── */}
          <FadeIn>
            <div style={{
              marginBottom: '5rem',
              padding: 'clamp(1.5rem, 3vw, 2.25rem)',
              borderRadius: 18,
              background: 'linear-gradient(135deg, var(--c-bg-blue) 0%, #fff 100%)',
              border: '1px solid var(--c-primary-lt)',
              boxShadow: '0 12px 40px rgba(30,90,168,0.10)',
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ color: 'var(--c-accent-dk)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                    Registered & Certified
                  </span>
                  <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginTop: '0.35rem' }}>
                    A fully registered & compliant Indian partnership firm
                  </h3>
                </div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.35rem 0.85rem',
                  background: 'var(--c-accent)',
                  borderRadius: 100,
                  color: '#fff', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                  boxShadow: '0 6px 16px rgba(127,186,58,0.35)',
                }}>
                  <CheckCircle size={13} /> Verified
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem' }}>
                {[
                  { label: 'GSTIN',    value: '24AAVFJ6564H1ZT' },
                 
                  { label: 'PAN',      value: 'AAVFJ6564H' },
            
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    padding: '0.9rem 1rem',
                    background: '#fff',
                    border: '1px solid var(--c-border)',
                    borderRadius: 12,
                  }}>
                    <div style={{ color: 'var(--c-text3)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{label}</div>
                    <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.98rem', color: 'var(--c-primary)', letterSpacing: '0.02em', wordBreak: 'break-all' }}>{value}</div>
                  </div>
                ))}
              </div>

              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '1.25rem',
                marginTop: '1.25rem', paddingTop: '1.25rem',
                borderTop: '1px solid var(--c-border)',
                fontSize: '0.82rem', color: 'var(--c-text3)',
              }}>
                <div><strong style={{ color: 'var(--c-text2)' }}>Constitution:</strong> Partnership</div>
                <div><strong style={{ color: 'var(--c-text2)' }}>Jurisdiction:</strong> Gujarat, India</div>
                <div><strong style={{ color: 'var(--c-text2)' }}>Est.:</strong> 1998</div>
              </div>
            </div>
          </FadeIn>

          {/* ── FORM + MAP ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>

            {/* Form */}
            <FadeIn direction="right">
              <div style={{
                padding: '2.5rem', borderRadius: 20,
                background: 'var(--c-card)',
                border: '1px solid var(--c-border)',
              }}>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '3rem 0' }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      style={{
                        width: 80, height: 80, borderRadius: '50%',
                        background: 'rgba(52,211,153,0.12)', border: '2px solid #34d399',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                      }}>
                      <CheckCircle size={40} color="#34d399" />
                    </motion.div>
                    <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: '1.8rem', marginBottom: '0.75rem', color: '#34d399' }}>Message Sent!</h3>
                    <p style={{ color: 'var(--c-text3)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                      Thank you for reaching out to Vishwakarma TechnoEnergy. Our team will get back to you within 24 business hours.
                    </p>
                    <button onClick={() => { setSubmitted(false); setForm(initialForm) }} style={{
                      padding: '0.75rem 2rem',
                      background: 'var(--g-primary)',
                      borderRadius: 8, fontWeight: 700, fontSize: '0.95rem', color: '#fff',
                      border: 'none', cursor: 'pointer',
                    }}>
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: '1.8rem', marginBottom: '0.5rem' }}>Send Us a Message</h2>
                    <p style={{ color: 'var(--c-text3)', fontSize: '0.9rem', marginBottom: '2rem' }}>Fill in the details and our team will respond within 24 hours.</p>

                    <form onSubmit={handleSubmit} noValidate>
                      <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--c-text2)', marginBottom: '0.4rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Full Name *</label>
                          <input name="name" value={form.name} onChange={handleChange}
                            style={inputStyle('name')} placeholder="John Doe"
                            onFocus={e => e.target.style.borderColor = 'var(--c-primary)'}
                            onBlur={e => e.target.style.borderColor = errors.name ? '#ef4444' : 'var(--c-border2)'} />
                          {errors.name && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.name}</span>}
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--c-text2)', marginBottom: '0.4rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Email *</label>
                          <input name="email" type="email" value={form.email} onChange={handleChange}
                            style={inputStyle('email')} placeholder="john@company.com"
                            onFocus={e => e.target.style.borderColor = 'var(--c-primary)'}
                            onBlur={e => e.target.style.borderColor = errors.email ? '#ef4444' : 'var(--c-border2)'} />
                          {errors.email && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.email}</span>}
                        </div>
                      </div>

                      <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--c-text2)', marginBottom: '0.4rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Phone *</label>
                          <input name="phone" value={form.phone} onChange={handleChange}
                            style={inputStyle('phone')} placeholder="+91 83206 84142"
                            onFocus={e => e.target.style.borderColor = 'var(--c-primary)'}
                            onBlur={e => e.target.style.borderColor = errors.phone ? '#ef4444' : 'var(--c-border2)'} />
                          {errors.phone && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.phone}</span>}
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--c-text2)', marginBottom: '0.4rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Company</label>
                          <input name="company" value={form.company} onChange={handleChange}
                            style={inputStyle('company')} placeholder="Your Company Name"
                            onFocus={e => e.target.style.borderColor = 'var(--c-primary)'}
                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                        </div>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--c-text2)', marginBottom: '0.4rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Product of Interest</label>
                        <div style={{ position: 'relative' }}>
                          <select name="product" value={form.product} onChange={handleChange}
                            style={{ ...inputStyle('product'), appearance: 'none', paddingRight: '2.5rem', cursor: 'pointer', background: 'var(--c-card)' }}
                            onFocus={e => e.target.style.borderColor = 'var(--c-primary)'}
                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}>
                            <option value="">Select a product...</option>
                            <option>Industrial Engines</option>
                            <option>Power Generators</option>
                            <option>CNC Machines</option>
                            <option>Hydraulic Systems</option>
                            <option>Conveyor Systems</option>
                            <option>Control Panels</option>
                            <option>Custom / Other</option>
                          </select>
                          <ChevronDown size={16} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--c-text3)', pointerEvents: 'none' }} />
                        </div>
                      </div>

                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--c-text2)', marginBottom: '0.4rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Message *</label>
                        <textarea name="message" value={form.message} onChange={handleChange} rows={5}
                          style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 120 }}
                          placeholder="Tell us about your requirements, quantity, delivery timeline..."
                          onFocus={e => e.target.style.borderColor = 'var(--c-primary)'}
                          onBlur={e => e.target.style.borderColor = errors.message ? '#ef4444' : 'var(--c-border2)'} />
                        {errors.message && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.message}</span>}
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          width: '100%', padding: '0.95rem',
                          background: loading ? 'rgba(30,90,168,0.5)' : 'var(--g-primary)',
                          borderRadius: 10, fontWeight: 700, fontSize: '1rem',
                          color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                          letterSpacing: '0.04em',
                          boxShadow: '0 8px 30px rgba(30,90,168,0.3)',
                        }}>
                        {loading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                              style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                            />
                            Sending...
                          </>
                        ) : (
                          <><Send size={18} /> Send Message</>
                        )}
                      </motion.button>

                      {errors.submit && (
                        <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.75rem', textAlign: 'center' }}>
                          {errors.submit}
                        </p>
                      )}
                    </form>
                  </>
                )}
              </div>
            </FadeIn>

            {/* Map + Office Details */}
            <FadeIn direction="left">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Map embed placeholder */}
                <div style={{
                  borderRadius: 16, overflow: 'hidden',
                  border: '1px solid var(--c-border)',
                  height: 320, position: 'relative',
                  background: 'var(--c-card)',
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80"
                    alt="Location map"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
                  />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: '50%',
                      background: 'var(--g-primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 8px 24px rgba(30,90,168,0.5)',
                    }}>
                      <MapPin size={26} color="#fff" />
                    </div>
                    <div style={{ textAlign: 'center', padding: '0 1rem' }}>
                      <p style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>Vishwakarma TechnoEnergy Head Office</p>
                      <p style={{ color: 'var(--c-text2)', fontSize: '0.85rem' }}>  1103, Krupal Pathshala - 1 opp.HP Petrol Pump <br />
                  Nr. Shivranjani Cross Road,<br />
                  Ahmedabad - 380015, Gujarat<br /></p>
                    </div>
                    <a href="https://www.google.com/maps/place/Krupal+Pathshala+1,+306,+Shivranjani+Cross+Rd,+Satellite,+Ahmedabad,+Gujarat+380015/@23.023149,72.520491,15z/data=!3m1!4b1!4m6!3m5!1s0x395e84d021d27323:0xbf7bffee1c0f9f8f!8m2!3d23.0231497!4d72.5307908!16s%2Fg%2F11y8mz3g15?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" style={{
                      padding: '0.5rem 1.25rem',
                      background: 'rgba(30,90,168,0.2)', border: '1px solid rgba(30,90,168,0.4)',
                      borderRadius: 8, color: 'var(--c-primary)', fontSize: '0.85rem', fontWeight: 600,
                    }}>
                      Open in Maps
                    </a>
                  </div>
                </div>

                {/* Office cards */}
                {[
                  { city: 'Email',   addr: 'Drop us a message — we respond within 24 hours.',                       phone: 'vishwakarmatecheng.office@gmail.com' },
                  { city: 'Address', addr: '1103, Krupal Pathshala - 1 opp.HP Petrol Pump  Nr. Shivranjani Cross Road,',                  phone: 'Ahmedabad – 382445, Gujarat, India' },
                ].map(({ city, addr, phone }) => (
                  <motion.div key={city} whileHover={{ x: 6 }} style={{
                    padding: '1.5rem',
                    background: 'var(--c-card)',
                    border: '1px solid var(--c-border)',
                    borderRadius: 14, borderLeft: '3px solid #f97316',
                  }}>
                    <h4 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--c-primary)', marginBottom: '0.5rem' }}>{city}</h4>
                    <p style={{ color: 'var(--c-text3)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.4rem' }}>{addr}</p>
                    <p style={{ color: 'var(--c-text2)', fontSize: '0.875rem' }}>{phone}</p>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '6rem 0', background: 'var(--c-bg2)', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative glows */}
        <div style={{ position: 'absolute', top: -120, right: -120, width: 360, height: 360, background: 'radial-gradient(circle, rgba(127,186,58,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -120, width: 320, height: 320, background: 'radial-gradient(circle, rgba(30,90,168,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative' }}>
          <div className="faq-grid" style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: '4rem', alignItems: 'flex-start' }}>

            {/* Left heading */}
            <FadeIn direction="right">
              <div style={{ position: 'sticky', top: 100 }}>
                <span style={{ color: 'var(--c-accent-dk)', fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Got Questions?</span>
                <h2 style={{
                  fontFamily: 'Rajdhani, sans-serif', fontWeight: 800,
                  fontSize: 'clamp(1.9rem, 4vw, 2.8rem)',
                  margin: '0.5rem 0 1.25rem', lineHeight: 1.1,
                }}>
                  Frequently <span style={{ color: 'var(--c-primary)' }}>Asked</span>&nbsp;Questions
                </h2>
                <p style={{ color: 'var(--c-text3)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '2rem', maxWidth: 380 }}>
                  Everything you need to know about our products, services, and support. Can't find what you're looking for?
                </p>
                <a href="mailto:vishwakarmatecheng.office@gmail.com" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.8rem 1.6rem', background: 'var(--g-primary)',
                  borderRadius: 10, fontWeight: 700, fontSize: '0.88rem', color: '#fff',
                  boxShadow: '0 8px 24px rgba(30,90,168,0.3)',
                  transition: 'transform 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''}>
                  <Send size={15} /> Email Our Team
                </a>
              </div>
            </FadeIn>

            {/* Right FAQs */}
            <div>
              <FAQList />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .faq-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
            .faq-grid > div:first-child > div { position: static !important; }
          }
        `}</style>
      </section>
    </main>
  )
}

const faqs = [
  { q: 'What industries does Vishwakarma TechnoEnergy serve?', a: 'We serve manufacturing, construction, mining, energy, steel, agriculture, and more across India and 50+ countries.' },
  { q: 'Do you offer customised machinery solutions?', a: 'Yes, our in-house R&D team designs custom machinery tailored to your specific production requirements and industry standards.' },
  { q: 'What is the typical delivery timeline?', a: 'Standard products: 2–4 weeks. Custom solutions: 6–12 weeks depending on complexity and specifications.' },
  { q: 'Do you provide after-sales support and maintenance?', a: 'Absolutely. We offer 24/7 emergency support, scheduled maintenance plans, and a nationwide network of 50+ service technicians.' },
  { q: 'What certifications do your products carry?', a: 'Our products carry CE and BIS certifications. Select products are CPCB-compliant for emission standards.' },
]

function FAQItem({ q, a, index, delay }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      style={{
        marginBottom: '0.85rem',
        borderRadius: 14,
        background: '#fff',
        border: `1px solid ${open ? 'var(--c-primary-lt)' : 'var(--c-border)'}`,
        boxShadow: open ? '0 20px 40px rgba(30,90,168,0.15)' : '0 1px 3px var(--c-shadow)',
        overflow: 'hidden',
        transition: 'border-color 0.25s, box-shadow 0.25s',
      }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', padding: '1.2rem 1.4rem',
          background: 'transparent', border: 'none',
          color: 'var(--c-text)', textAlign: 'left', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '1rem',
        }}>
        <div style={{
          flexShrink: 0,
          width: 36, height: 36, borderRadius: '50%',
          background: open ? 'var(--g-primary)' : 'var(--c-bg-blue)',
          border: `1px solid ${open ? 'transparent' : 'var(--c-primary-lt)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: '0.85rem',
          color: open ? '#fff' : 'var(--c-primary)',
          transition: 'all 0.25s',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>
        <span style={{
          flex: 1,
          fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.05rem',
          lineHeight: 1.35,
          color: open ? 'var(--c-primary)' : 'var(--c-text)',
          transition: 'color 0.25s',
        }}>
          {q}
        </span>
        {/* Plus / minus animated toggle */}
        <div style={{
          flexShrink: 0,
          width: 28, height: 28, borderRadius: 8,
          background: open ? 'var(--c-bg-blue)' : 'var(--c-bg2)',
          border: '1px solid var(--c-border)',
          position: 'relative',
          transition: 'all 0.25s',
        }}>
          <motion.span
            animate={{ rotate: open ? 0 : 90 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 12, height: 2, borderRadius: 1,
              background: open ? 'var(--c-primary)' : 'var(--c-text2)',
            }} />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 2, height: 12, borderRadius: 1,
              background: 'var(--c-text2)',
            }} />
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ overflow: 'hidden' }}>
        <div style={{
          padding: '0 1.4rem 1.3rem 4.2rem',
          color: 'var(--c-text2)', fontSize: '0.93rem', lineHeight: 1.75,
        }}>
          {a}
        </div>
      </motion.div>
    </motion.div>
  )
}

function FAQList() {
  return (
    <div>
      {faqs.map((f, i) => <FAQItem key={f.q} q={f.q} a={f.a} index={i} delay={i * 0.06} />)}
    </div>
  )
}
