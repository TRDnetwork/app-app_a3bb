```tsx
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

interface Project {
  id: number
  title: string
  description: string
  link: string
}

interface Toast {
  id: number
  message: string
  type: 'success' | 'error'
}

const App: React.FC = () => {
  const [name] = useState('Alex Morgan')
  const [title] = useState('Frontend Developer & Designer')
  const [about] = useState('I create beautiful, functional web experiences with a focus on clean code and thoughtful design. With over 5 years of experience in React and modern frontend tools, I help startups and established companies bring their digital products to life.')
  
  const projects: Project[] = [
    {
      id: 1,
      title: 'EcoCommerce Platform',
      description: 'A sustainable e‑commerce dashboard with real‑time analytics and carbon footprint tracking.',
      link: 'https://example.com/ecocommerce'
    },
    {
      id: 2,
      title: 'Mindful Meditation App',
      description: 'A mobile‑first meditation app with personalized sessions and progress visualization.',
      link: 'https://example.com/mindful'
    },
    {
      id: 3,
      title: 'Urban Garden Planner',
      description: 'An interactive web tool for planning and managing urban vegetable gardens.',
      link: 'https://example.com/gardenplanner'
    }
  ]

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [touchStartY, setTouchStartY] = useState(0)
  const [pullDistance, setPullDistance] = useState(0)
  const toastCounter = useRef(0)

  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const heroInView = useInView(heroRef, { once: true })
  const aboutInView = useInView(aboutRef, { once: true })
  const projectsInView = useInView(projectsRef, { once: true })
  const contactInView = useInView(contactRef, { once: true })

  // Pull to refresh logic
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (window.scrollY === 0) {
      setTouchStartY(e.touches[0].clientY)
    }
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (touchStartY && window.scrollY === 0) {
      const currentY = e.touches[0].clientY
      const distance = currentY - touchStartY
      if (distance > 0) {
        setPullDistance(Math.min(distance, 100))
        e.preventDefault()
      }
    }
  }, [touchStartY])

  const handleTouchEnd = useCallback(() => {
    if (pullDistance > 60) {
      setIsRefreshing(true)
      setTimeout(() => {
        setIsRefreshing(false)
        addToast('Refreshed!', 'success')
      }, 1000)
    }
    setPullDistance(0)
    setTouchStartY(0)
  }, [pullDistance])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true })
      container.addEventListener('touchmove', handleTouchMove, { passive: false })
      container.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchmove', handleTouchMove)
        container.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  const addToast = useCallback((message: string, type: 'success' | 'error') => {
    const id = ++toastCounter.current
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {}
    if (!formData.name.trim()) errors.name = 'Name is required'
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (!formData.message.trim()) errors.message = 'Message is required'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }, [formData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // This would call the Vercel function at /api/send-email
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        addToast('Message sent successfully! I\'ll get back to you soon.', 'success')
        setFormData({ name: '', email: '', message: '' })
        setFormErrors({})
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      addToast('Something went wrong. Please try again later.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Mobile navigation
  const scrollToSection = (section: string) => {
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-bg text-text safe-top safe-bottom">
      {/* Pull to refresh indicator */}
      {isRefreshing && (
        <motion.div
          initial={{ y: -60 }}
          animate={{ y: 0 }}
          className="pull-refresh-indicator"
        >
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      )}

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-sm border-t border-surface z-40 safe-bottom">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3">
            {['hero', 'about', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="mobile-tap-target flex flex-col items-center justify-center text-text-dim hover:text-accent transition-colors"
              >
                <span className="text-xs capitalize">{section}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="hero"
        ref={heroRef}
        className="pt-16 pb-12 md:py-20 lg:py-32 px-4 xs:px-6 container mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl xs:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight mb-4 md:mb-6 leading-tight">
            {name}
          </h1>
          <p className="text-lg xs:text-xl md:text-2xl lg:text-3xl text-dim mb-6 md:mb-8 px-2">
            {title}
          </p>
          <div className="w-20 xs:w-24 h-1 bg-accent mx-auto"></div>
        </motion.div>
      </section>

      {/* About Section */}
      <section 
        id="about"
        ref={aboutRef}
        className="py-12 md:py-16 px-4 xs:px-6 container mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-display text-2xl xs:text-3xl md:text-4xl mb-6 md:mb-8">About Me</h2>
          <p className="text-base xs:text-lg md:text-xl text-dim leading-relaxed md:leading-loose">
            {about}
          </p>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects"
        ref={projectsRef}
        className="py-12 md:py-16 px-4 xs:px-6 container mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={projectsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="font-display text-2xl xs:text-3xl md:text-4xl mb-8 md:mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                className="bg-surface rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                <h3 className="font-display text-xl xs:text-2xl mb-3 md:mb-4">{project.title}</h3>
                <p className="text-dim mb-4 md:mb-6 text-sm xs:text-base">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-tap-target inline-flex items-center text-accent font-medium hover:text-accent-alt transition-colors text-base"
                >
                  View Project
                  <svg className="w-4 h-4 xs:w-5 xs:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact"
        ref={contactRef}
        className="py-12 md:py-16 px-4 xs:px-6 container mx-auto mb-16 lg:mb-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={contactInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-display text-2xl xs:text-3xl md:text-4xl mb-8 md:mb-12 text-center">Get In Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div>
              <label htmlFor="name" className="block text-base xs:text-lg mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mobile-tap-target w-full px-4 py-3 rounded-lg border ${formErrors.name ? 'border-red-500' : 'border-surface'} bg-white focus-glow transition-colors text-base`}
                placeholder="Your name"
              />
              {formErrors.name && <p className="mt-2 text-red-500 text-sm">{formErrors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-base xs:text-lg mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mobile-tap-target w-full px-4 py-3 rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-surface'} bg-white focus-glow transition-colors text-base`}
                placeholder="you@example.com"
              />
              {formErrors.email && <p className="mt-2 text-red-500 text-sm">{formErrors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="message" className="block text-base xs:text-lg mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`mobile-tap-target w-full px-4 py-3 rounded-lg border ${formErrors.message ? 'border-red-500' : 'border-surface'} bg-white focus-glow transition-colors text-base`}
                placeholder="Tell me about your project..."
              />
              {formErrors.message && <p className="mt-2 text-red-500 text-sm">{formErrors.message}</p>}
            </div>

            {/* Honeypot field */}
            <div className="hidden">
              <label htmlFor="website">Website</label>
              <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mobile-tap-target w-full bg-accent text-white py-3 xs:py-4 px-6 rounded-lg font-medium text-base xs:text-lg hover:bg-accent-alt disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 focus-glow active:scale-95"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 md:py-8 px-4 xs:px-6 container mx-auto text-center text-dim text-sm xs:text-base">
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
      </footer>

      {/* Toast Container - Mobile optimized */}
      <div className="fixed bottom-16 lg:bottom-4 right-2 left-2 lg:left-auto lg:right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`rounded-lg px-4 py-3 shadow-lg ${toast.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm xs:text-base">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="mobile-tap-target ml-3 text-current hover:opacity-70 p-1"
              >
                <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default App
```