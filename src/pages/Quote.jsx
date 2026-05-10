import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, ArrowLeft, CheckCircle, Send, Check,
  Factory, Zap, Cpu, Gauge, Layers, Wrench,
  Package, Calendar, Briefcase, User, Mail, Phone, Building2, Globe,
} from 'lucide-react'
import FadeIn from '../components/FadeIn'
import useSEO from '../hooks/useSEO'

const productOptions = [
  { id: 'diesel-10hp', name: 'Air-Cooled Diesel Engine',  desc: '10 HP · 3000 RPM · 550 CC',        img: '/Image1.png', Icon: Factory },
  { id: 'petrol',      name: 'Industrial Petrol Engine',  desc: 'Portable · 6-15 HP',               img: '/Image2.png', Icon: Zap     },
  { id: 'single-cyl',  name: 'Single-Cylinder Diesel',    desc: 'High flywheel inertia',            img: '/Image3.png', Icon: Cpu     },
  { id: 'medium-duty', name: 'Medium-Duty Industrial',    desc: 'Continuous-duty rated',            img: '/Image4.png', Icon: Gauge   },
  { id: 'twin-cyl',    name: 'Twin-Cylinder Power Unit',  desc: 'Twin cylinder · high output',      img: '/Image5.png', Icon: Layers  },
  { id: 'custom',      name: 'Custom / Other Requirement',desc: 'Tell us what you need',            img: null,          Icon: Wrench  },
]

const steps = [
  { num: 1, title: 'Products', desc: 'What you need' },
  { num: 2, title: 'Project',  desc: 'Requirements' },
  { num: 3, title: 'Contact',  desc: 'Your details' },
  { num: 4, title: 'Review',   desc: 'Confirm & send' },
]

const initialData = {
  products: [],
  quantity: '',
  timeline: '',
  application: '',
  notes: '',
  name: '',
  company: '',
  email: '',
  phone: '',
  country: 'India',
  contactMethod: 'email',
}

export default function Quote() {
  useSEO({
    title: 'Request a Quote — Vishwakarma TechnoEnergy Industrial Engines',
    description: 'Get a customised quote for Vishwakarma TechnoEnergy diesel engines, petrol engines and industrial machinery. Simple 4-step form — our engineers respond within 24 hours.',
    path: '/quote',
  })
  const [step, setStep] = useState(1)
  const [data, setData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function validate(s) {
    const e = {}
    if (s === 1 && data.products.length === 0) e.products = 'Please select at least one product'
    if (s === 2) {
      if (!data.quantity.trim()) e.quantity = 'Quantity is required'
      if (!data.timeline) e.timeline = 'Please choose a delivery timeline'
    }
    if (s === 3) {
      if (!data.name.trim()) e.name = 'Name is required'
      if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) e.email = 'Valid email required'
      if (!data.phone.trim() || !/^\+?[\d\s\-]{8,}$/.test(data.phone)) e.phone = 'Valid phone required'
    }
    return e
  }

  function next() {
    const e = validate(step)
    if (Object.keys(e).length) { setErrors(e); return }
    setErrors({})
    setStep(s => s + 1)
    window.scrollTo({ top: 280, behavior: 'smooth' })
  }
  function back() { setErrors({}); setStep(s => s - 1); window.scrollTo({ top: 280, behavior: 'smooth' }) }

  function toggleProduct(id) {
    setData(d => ({ ...d, products: d.products.includes(id) ? d.products.filter(p => p !== id) : [...d.products, id] }))
    if (errors.products) setErrors(p => ({ ...p, products: '' }))
  }

  function update(field, value) {
    setData(d => ({ ...d, [field]: value }))
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }))
  }

  async function submit() {
    const e = validate(3)
    if (Object.keys(e).length) { setErrors(e); setStep(3); return }
    setLoading(true)
    try {
      const productList = data.products.join(', ') || '—'
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '7c0bbcee-b82e-4eec-a6a1-da7effc3ca4b',
          subject: `New Quote Request from ${data.name} — Vishwakarma TechnoEnergy`,
          from_name: 'Vishwakarma TechnoEnergy Website',
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          country: data.country,
          message:
            `Name: ${data.name}\nCompany: ${data.company || '—'}\nEmail: ${data.email}\nPhone: ${data.phone}\nCountry: ${data.country}\nPreferred contact: ${data.contactMethod}\n\n` +
            `Products: ${productList}\nQuantity: ${data.quantity}\nTimeline: ${data.timeline}\n\nNotes:\n${data.notes || '—'}`,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setSubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setErrors({ submit: json.message || 'Could not send. Please try again.' })
      }
    } catch (_) {
      setErrors({ submit: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        padding: '7rem 0 3rem',
        background: 'var(--g-hero)',
      }}>
        <div style={{ position: 'absolute', top: -140, right: -140, width: 380, height: 380, background: 'radial-gradient(circle, rgba(127,186,58,0.15) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -120, left: -120, width: 320, height: 320, background: 'radial-gradient(circle, rgba(30,90,168,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(30,90,168,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30,90,168,0.06) 1px, transparent 1px)', backgroundSize: '72px 72px', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span style={{ color: 'var(--c-accent-dk)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Request for Quotation</span>
            <h1 style={{
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 800,
              fontSize: 'clamp(2.3rem, 5.5vw, 4rem)',
              margin: '0.5rem 0 1rem', lineHeight: 1.1,
            }}>
              Get a <span style={{ color: 'var(--c-primary)' }}>Customised Quote</span> in 4 Easy Steps
            </h1>
            <p style={{ color: 'var(--c-text2)', fontSize: '1rem', maxWidth: 560, margin: '0 auto', lineHeight: 1.75 }}>
              Tell us about your requirements and our engineers will get back to you within 24 business hours with a tailored proposal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── STEPPER ── */}
      {!submitted && (
        <section style={{ background: 'var(--c-bg)', padding: '2rem 0', borderBottom: '1px solid var(--c-border)', position: 'sticky', top: 64, zIndex: 10, backdropFilter: 'blur(10px)' }}>
          <div className="container">
            <div className="stepper" style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', position: 'relative' }}>
              {/* progress line */}
              <div style={{ position: 'absolute', top: 20, left: '12%', right: '12%', height: 2, background: 'var(--c-border)', zIndex: 0 }} />
              <motion.div
                animate={{ width: `${((step - 1) / (steps.length - 1)) * 76}%` }}
                transition={{ duration: 0.4 }}
                style={{ position: 'absolute', top: 20, left: '12%', height: 2, background: 'var(--g-primary)', zIndex: 1 }} />

              {steps.map(({ num, title, desc }) => {
                const done = step > num
                const active = step === num
                return (
                  <div key={num} style={{ flex: 1, textAlign: 'center', position: 'relative', zIndex: 2 }}>
                    <motion.div
                      animate={{
                        background: (done || active) ? 'var(--g-primary)' : '#fff',
                        borderColor: (done || active) ? 'transparent' : 'var(--c-border2)',
                        color: (done || active) ? '#fff' : 'var(--c-text3)',
                      }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: 40, height: 40, borderRadius: '50%',
                        margin: '0 auto 0.6rem',
                        border: '2px solid',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: '0.95rem',
                        boxShadow: active ? '0 8px 20px rgba(30,90,168,0.35)' : 'none',
                      }}>
                      {done ? <Check size={18} /> : num}
                    </motion.div>
                    <div style={{
                      fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.85rem',
                      color: active ? 'var(--c-primary)' : (done ? 'var(--c-text)' : 'var(--c-text3)'),
                      letterSpacing: '0.04em',
                    }}>{title}</div>
                    <div className="step-desc" style={{
                      fontSize: '0.72rem', color: 'var(--c-text3)', marginTop: '0.15rem',
                    }}>{desc}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── FORM CONTENT ── */}
      <section style={{ background: 'var(--c-bg2)', padding: '3rem 0 6rem', minHeight: '60vh' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <SuccessScreen key="success" data={data} />
            ) : (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'var(--c-card)',
                  border: '1px solid var(--c-border)',
                  borderRadius: 20,
                  padding: 'clamp(1.5rem, 4vw, 2.75rem)',
                  boxShadow: '0 12px 40px var(--c-shadow)',
                }}>
                {step === 1 && <StepProducts data={data} toggleProduct={toggleProduct} error={errors.products} />}
                {step === 2 && <StepDetails data={data} update={update} errors={errors} />}
                {step === 3 && <StepContact data={data} update={update} errors={errors} />}
                {step === 4 && <StepReview data={data} setStep={setStep} />}

                {/* Nav buttons */}
                <div style={{
                  display: 'flex', gap: '0.75rem', marginTop: '2.5rem',
                  paddingTop: '1.75rem', borderTop: '1px solid var(--c-border)',
                  justifyContent: step === 1 ? 'flex-end' : 'space-between', flexWrap: 'wrap',
                }}>
                  {step > 1 && (
                    <button onClick={back} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                      padding: '0.8rem 1.6rem',
                      background: 'transparent',
                      border: '1px solid var(--c-border2)',
                      borderRadius: 10, fontWeight: 600, fontSize: '0.9rem',
                      color: 'var(--c-text)', cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-primary)'; e.currentTarget.style.color = 'var(--c-primary)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-border2)'; e.currentTarget.style.color = 'var(--c-text)' }}>
                      <ArrowLeft size={15} /> Back
                    </button>
                  )}

                  {step < 4 ? (
                    <button onClick={next} style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                      padding: '0.9rem 1.9rem',
                      background: 'var(--g-primary)',
                      border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '0.92rem',
                      color: '#fff', cursor: 'pointer',
                      boxShadow: '0 8px 24px rgba(30,90,168,0.32)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 32px rgba(30,90,168,0.45)' }}
                      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 24px rgba(30,90,168,0.32)' }}>
                      Continue <ArrowRight size={15} />
                    </button>
                  ) : (
                    <motion.button
                      onClick={submit} disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.95rem 2.2rem',
                        background: loading ? 'var(--c-border2)' : 'var(--g-primary)',
                        border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '0.95rem',
                        color: '#fff', cursor: loading ? 'not-allowed' : 'pointer',
                        boxShadow: '0 8px 24px rgba(30,90,168,0.32)',
                      }}>
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                            style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} />
                          Sending...
                        </>
                      ) : (
                        <><Send size={15} /> Submit Quote Request</>
                      )}
                    </motion.button>
                  )}
                </div>
                {errors.submit && (
                  <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.75rem', textAlign: 'right' }}>
                    {errors.submit}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .step-desc { display: none; }
          .stepper { gap: 0.25rem !important; }
        }
      `}</style>
    </main>
  )
}

/* ─── Step 1: Products ─── */
function StepProducts({ data, toggleProduct, error }) {
  return (
    <div>
      <StepHeader icon={Package} title="Which products are you interested in?" sub="Select one or more — you can also choose 'Custom' if your need isn't listed." />
      {error && <ErrorText msg={error} />}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
        {productOptions.map(p => {
          const selected = data.products.includes(p.id)
          return (
            <motion.button
              key={p.id}
              onClick={() => toggleProduct(p.id)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              style={{
                position: 'relative', textAlign: 'left',
                padding: '1.25rem',
                background: selected ? 'var(--c-bg-blue)' : '#fff',
                border: `2px solid ${selected ? 'var(--c-primary)' : 'var(--c-border)'}`,
                borderRadius: 14, cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selected ? '0 12px 28px rgba(30,90,168,0.18)' : '0 1px 3px var(--c-shadow)',
              }}>
              {selected && (
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}
                  style={{
                    position: 'absolute', top: 10, right: 10,
                    width: 24, height: 24, borderRadius: '50%',
                    background: 'var(--g-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 10px rgba(30,90,168,0.35)',
                  }}>
                  <Check size={14} color="#fff" />
                </motion.div>
              )}
              <div style={{
                height: 110, borderRadius: 10, marginBottom: '0.85rem',
                background: selected ? '#fff' : 'var(--c-bg2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                {p.img ? (
                  <img src={p.img} alt={p.name}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 6px 12px rgba(15,23,42,0.12))' }} />
                ) : (
                  <p.Icon size={36} color="var(--c-primary)" />
                )}
              </div>
              <h4 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: '0.3rem', color: 'var(--c-text)' }}>{p.name}</h4>
              <p style={{ color: 'var(--c-text3)', fontSize: '0.8rem', lineHeight: 1.5 }}>{p.desc}</p>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Step 2: Details ─── */
function StepDetails({ data, update, errors }) {
  return (
    <div>
      <StepHeader icon={Calendar} title="Tell us about your project" sub="A few details help our engineers prepare the right quote for you." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
        <Field label="Quantity *" error={errors.quantity}>
          <input type="text" value={data.quantity} onChange={e => update('quantity', e.target.value)}
            placeholder="e.g. 5 units, 100+, etc." style={inputStyle(errors.quantity)} />
        </Field>
        <Field label="Delivery Timeline *" error={errors.timeline}>
          <select value={data.timeline} onChange={e => update('timeline', e.target.value)}
            style={{ ...inputStyle(errors.timeline), appearance: 'none' }}>
            <option value="">Choose timeline…</option>
            <option>Urgent (1-2 weeks)</option>
            <option>Standard (3-4 weeks)</option>
            <option>Flexible (2-3 months)</option>
            <option>Long-term project (3-6 months)</option>
            <option>Just exploring / No deadline</option>
          </select>
        </Field>
      </div>
      <Field label="Application / Use Case">
        <select value={data.application} onChange={e => update('application', e.target.value)}
          style={{ ...inputStyle(), appearance: 'none' }}>
          <option value="">Select industry…</option>
          <option>Agriculture (pumps, threshers, tillers)</option>
          <option>Construction (mixers, compactors)</option>
          <option>Industrial (factory, workshop)</option>
          <option>Power Generation (gensets)</option>
          <option>Marine / Offshore</option>
          <option>Custom / Other</option>
        </select>
      </Field>
      <Field label="Additional Notes or Specifications" style={{ marginTop: '1.25rem' }}>
        <textarea value={data.notes} onChange={e => update('notes', e.target.value)} rows={4}
          placeholder="Share any custom specifications, site conditions, power requirements, or other details…"
          style={{ ...inputStyle(), resize: 'vertical', minHeight: 110, fontFamily: 'inherit' }} />
      </Field>
    </div>
  )
}

/* ─── Step 3: Contact ─── */
function StepContact({ data, update, errors }) {
  return (
    <div>
      <StepHeader icon={User} title="Who should we get back to?" sub="We'll reach out with a proposal tailored to your needs — no spam, ever." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
        <Field label="Full Name *" icon={User} error={errors.name}>
          <input type="text" value={data.name} onChange={e => update('name', e.target.value)}
            placeholder="John Doe" style={inputStyle(errors.name, true)} />
        </Field>
        <Field label="Company Name" icon={Building2}>
          <input type="text" value={data.company} onChange={e => update('company', e.target.value)}
            placeholder="Your company" style={inputStyle(null, true)} />
        </Field>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
        <Field label="Email *" icon={Mail} error={errors.email}>
          <input type="email" value={data.email} onChange={e => update('email', e.target.value)}
            placeholder="you@company.com" style={inputStyle(errors.email, true)} />
        </Field>
        <Field label="Phone *" icon={Phone} error={errors.phone}>
          <input type="tel" value={data.phone} onChange={e => update('phone', e.target.value)}
            placeholder="+91 83206 84142" style={inputStyle(errors.phone, true)} />
        </Field>
      </div>
      <Field label="Country / Region" icon={Globe}>
        <input type="text" value={data.country} onChange={e => update('country', e.target.value)}
          placeholder="India" style={inputStyle(null, true)} />
      </Field>
      <div style={{ marginTop: '1.5rem' }}>
        <label style={labelStyle}>Preferred Contact Method</label>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {[['email', 'Email'], ['phone', 'Phone'], ['whatsapp', 'WhatsApp']].map(([v, l]) => (
            <button key={v} type="button" onClick={() => update('contactMethod', v)}
              style={{
                padding: '0.65rem 1.25rem',
                background: data.contactMethod === v ? 'var(--c-bg-blue)' : '#fff',
                border: `2px solid ${data.contactMethod === v ? 'var(--c-primary)' : 'var(--c-border)'}`,
                borderRadius: 10, fontWeight: 600, fontSize: '0.88rem',
                color: data.contactMethod === v ? 'var(--c-primary)' : 'var(--c-text2)',
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Step 4: Review ─── */
function StepReview({ data, setStep }) {
  const selected = data.products.map(id => productOptions.find(p => p.id === id)).filter(Boolean)
  return (
    <div>
      <StepHeader icon={Briefcase} title="Review your quote request" sub="Please double-check everything before sending." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ReviewBlock title="Selected Products" onEdit={() => setStep(1)}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {selected.length ? selected.map(p => (
              <span key={p.id} style={pillStyle}>{p.name}</span>
            )) : <span style={{ color: 'var(--c-text3)', fontSize: '0.88rem' }}>None selected</span>}
          </div>
        </ReviewBlock>
        <ReviewBlock title="Project Details" onEdit={() => setStep(2)}>
          <ReviewRow k="Quantity"   v={data.quantity || '—'} />
          <ReviewRow k="Timeline"   v={data.timeline || '—'} />
          <ReviewRow k="Application" v={data.application || '—'} />
          {data.notes && <ReviewRow k="Notes" v={data.notes} />}
        </ReviewBlock>
        <ReviewBlock title="Contact Information" onEdit={() => setStep(3)}>
          <ReviewRow k="Name"    v={data.name} />
          {data.company && <ReviewRow k="Company" v={data.company} />}
          <ReviewRow k="Email"   v={data.email} />
          <ReviewRow k="Phone"   v={data.phone} />
          <ReviewRow k="Country" v={data.country} />
          <ReviewRow k="Preferred contact" v={data.contactMethod} />
        </ReviewBlock>
      </div>
    </div>
  )
}

/* ─── Success Screen ─── */
function SuccessScreen({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'var(--c-card)',
        border: '1px solid var(--c-border)',
        borderRadius: 20,
        padding: 'clamp(2rem, 5vw, 3.5rem)',
        textAlign: 'center',
        boxShadow: '0 12px 40px var(--c-shadow)',
      }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}
        style={{
          width: 96, height: 96, borderRadius: '50%',
          background: 'linear-gradient(135deg, #f58220 0%, #d96a0a 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: '0 16px 40px rgba(127,186,58,0.4)',
        }}>
        <CheckCircle size={52} color="#fff" />
      </motion.div>
      <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', marginBottom: '0.75rem', color: 'var(--c-accent-dk)' }}>
        Quote Request Sent!
      </h2>
      <p style={{ color: 'var(--c-text2)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 520, margin: '0 auto 2rem' }}>
        Thank you, <strong>{data.name || 'friend'}</strong>. We've received your request and our team will reach out to <strong>{data.email}</strong> within 24 business hours with a tailored proposal.
      </p>
      <div style={{
        display: 'inline-flex', flexDirection: 'column', gap: '0.25rem',
        padding: '1rem 1.5rem', background: 'var(--c-bg-blue)',
        border: '1px solid var(--c-primary-lt)', borderRadius: 12,
        marginBottom: '2rem',
      }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--c-text3)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>Reference ID</div>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: 'var(--c-primary)' }}>
          VTE-{Date.now().toString().slice(-6)}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{
          padding: '0.8rem 1.7rem', background: 'var(--g-primary)',
          borderRadius: 10, fontWeight: 700, fontSize: '0.9rem', color: '#fff',
          boxShadow: '0 8px 22px rgba(30,90,168,0.3)',
        }}>Back to Home</Link>
        <Link to="/about" style={{
          padding: '0.8rem 1.7rem',
          border: '1px solid var(--c-border2)',
          borderRadius: 10, fontWeight: 600, fontSize: '0.9rem', color: 'var(--c-text)',
        }}>Explore Our Company</Link>
      </div>
    </motion.div>
  )
}

/* ─── Helpers ─── */
function StepHeader({ icon: Icon, title, sub }) {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: 'var(--c-bg-blue)', border: '1px solid var(--c-primary-lt)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1rem',
      }}>
        <Icon size={22} color="var(--c-primary)" />
      </div>
      <h2 style={{
        fontFamily: 'Rajdhani, sans-serif', fontWeight: 800,
        fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)', marginBottom: '0.4rem',
      }}>{title}</h2>
      <p style={{ color: 'var(--c-text3)', fontSize: '0.92rem', lineHeight: 1.6 }}>{sub}</p>
    </div>
  )
}

function Field({ label, icon: Icon, error, children, style }) {
  return (
    <div style={style}>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: 'relative' }}>
        {Icon && <Icon size={15} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--c-text3)', pointerEvents: 'none' }} />}
        {children}
      </div>
      {error && <ErrorText msg={error} />}
    </div>
  )
}

function ErrorText({ msg }) {
  return <div style={{ color: '#dc2626', fontSize: '0.78rem', marginTop: '0.35rem' }}>{msg}</div>
}

function ReviewBlock({ title, onEdit, children }) {
  return (
    <div style={{
      padding: '1.25rem',
      background: 'var(--c-bg2)',
      border: '1px solid var(--c-border)',
      borderRadius: 12,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h4 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-primary)' }}>{title}</h4>
        <button onClick={onEdit} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: 'var(--c-primary)', fontWeight: 600, fontSize: '0.82rem',
        }}>Edit</button>
      </div>
      {children}
    </div>
  )
}

function ReviewRow({ k, v }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', padding: '0.4rem 0', fontSize: '0.9rem', alignItems: 'flex-start' }}>
      <span style={{ color: 'var(--c-text3)', fontWeight: 500, minWidth: 120 }}>{k}</span>
      <span style={{ color: 'var(--c-text)', flex: 1 }}>{v}</span>
    </div>
  )
}

const labelStyle = {
  display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--c-text2)',
  marginBottom: '0.4rem', letterSpacing: '0.04em', textTransform: 'uppercase',
}
const pillStyle = {
  padding: '0.3rem 0.75rem',
  background: 'var(--c-bg-blue)',
  border: '1px solid var(--c-primary-lt)',
  borderRadius: 100, color: 'var(--c-primary)',
  fontSize: '0.8rem', fontWeight: 600,
}
function inputStyle(error, hasIcon) {
  return {
    width: '100%',
    padding: hasIcon ? '0.78rem 1rem 0.78rem 2.4rem' : '0.78rem 1rem',
    background: '#fff',
    border: `1px solid ${error ? '#dc2626' : 'var(--c-border2)'}`,
    borderRadius: 10, color: 'var(--c-text)', fontSize: '0.94rem',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
  }
}
