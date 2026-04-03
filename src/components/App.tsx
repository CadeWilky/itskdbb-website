import { useState, useEffect, useCallback } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const IMAGES = [
  { src: '/images/DSC01599.jpg', alt: 'ItsKDBB - Editorial' },   // orange briefs, loft bed
  { src: '/images/DSC03059.jpg', alt: 'ItsKDBB - Editorial' },   // white briefs, warm studio
  { src: '/images/L1006421.jpg', alt: 'ItsKDBB - Athletic' },    // wrestling singlet
  { src: '/images/DSC02826.jpg', alt: 'ItsKDBB - Lifestyle' },   // white briefs, clean bedroom
  { src: '/images/DSC02305.jpg', alt: 'ItsKDBB - Editorial' },   // green shirt + bench
  { src: '/images/L1006354.jpg', alt: 'ItsKDBB - Fitness' },     // red/blue athletic shorts
  { src: '/images/DSC02653.jpg', alt: 'ItsKDBB - Portrait' },    // olive briefs standing
  { src: '/images/DSC03222.jpg', alt: 'ItsKDBB - Lifestyle' },   // bathtub posterior
  { src: '/images/L1006946.jpg', alt: 'ItsKDBB - Lifestyle' },   // B&W towel
  { src: '/images/DSC03044.jpg', alt: 'ItsKDBB - Editorial' },   // white briefs dramatic light
  { src: '/images/L1006638.jpg', alt: 'ItsKDBB - Portrait' },    // black briefs studio
  { src: '/images/DSC02880.jpg', alt: 'ItsKDBB - Lifestyle' },   // white thong, bedroom
];

const STATS = [
  { label: 'Age', value: '25' },
  { label: 'Height', value: "5'9\"" },
  { label: 'Chest', value: '38"' },
  { label: 'Eyes', value: 'Brown' },
  { label: 'Hair', value: 'Brown' },
  { label: 'Shoe Size', value: '11' },
  { label: 'Shirt', value: 'Large' },
  { label: 'Pants', value: '29×30' },
  { label: 'Skin', value: 'Fair' },
];

const SOCIAL = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/itskdbb_official/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'X',
    url: 'https://x.com/ItsKDbb',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Bluesky',
    url: 'https://bsky.app/profile/itskdbb.bsky.social',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.204-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z" />
      </svg>
    ),
  },
  {
    name: 'OnlyFans',
    url: 'https://onlyfans.com/itskdbb',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5c4.142 0 7.5 3.358 7.5 7.5 0 4.142-3.358 7.5-7.5 7.5-4.142 0-7.5-3.358-7.5-7.5 0-4.142 3.358-7.5 7.5-7.5zm0 2a5.5 5.5 0 1 0 0 11A5.5 5.5 0 0 0 12 6.5z" />
      </svg>
    ),
  },
];

/* ── Links landing page ─────────────────────────────────────── */
function LinksPage() {
  return (
    <div className="links-page">
      <div className="links-inner">
        <div className="links-avatar">
          <img src="/images/DSC01599.jpg" alt="ItsKDBB" />
        </div>
        <h1 className="links-brand">ItsKDBB</h1>
        <p className="links-tagline">Fitness &nbsp;·&nbsp; Editorial &nbsp;·&nbsp; Content Creator</p>

        <div className="links-buttons">
          {SOCIAL.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="links-btn">
              <span className="links-btn-icon">{s.icon}</span>
              <span>{s.name}</span>
            </a>
          ))}
          <a href="https://throne.com/itskdbb" target="_blank" rel="noopener noreferrer" className="links-btn">
            <span className="links-btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
              </svg>
            </span>
            <span>Throne Wishlist</span>
          </a>
          <a href="https://venmo.com/u/itskdbb" target="_blank" rel="noopener noreferrer" className="links-btn">
            <span className="links-btn-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.5 2c.8 1.4 1.2 2.8 1.2 4.6 0 4.8-4.1 11.1-7.5 15.4H5.9L3 3.5l6.3-.6 1.6 12.7c1.5-2.5 3.3-6.4 3.3-9.1 0-1.5-.3-2.5-.7-3.5H19.5z" />
              </svg>
            </span>
            <span>Venmo</span>
          </a>
          <a href="https://cash.app/$itsKDbb" target="_blank" rel="noopener noreferrer" className="links-btn">
            <span className="links-btn-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 3h-9A4.5 4.5 0 0 0 3 7.5v9A4.5 4.5 0 0 0 7.5 21h9a4.5 4.5 0 0 0 4.5-4.5v-9A4.5 4.5 0 0 0 16.5 3zm-2.3 11.6c-.4 1.4-1.6 2-2.9 2.1v.8h-1.1v-.8c-1-.1-2.1-.5-2.8-1.1l.9-1.4c.7.6 1.5.9 2.2.9.7 0 1.2-.3 1.2-.8 0-1.2-3.8-.8-3.8-3.3 0-1.3 1-2.1 2.3-2.3V7.5h1.1v.8c.9.1 1.7.5 2.3 1l-.9 1.3c-.5-.4-1.1-.7-1.8-.7-.6 0-1 .2-1 .7 0 1.1 3.8.8 3.8 3.2.1.3.1.5.5.8z" />
              </svg>
            </span>
            <span>Cash App</span>
          </a>
          <a href="/" className="links-btn links-btn-portfolio">
            <span className="links-btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
            </span>
            <span>Portfolio</span>
          </a>
        </div>

        <p className="links-footer">© {new Date().getFullYear()} ItsKDBB</p>
      </div>
    </div>
  );
}

/* ── Main portfolio app ─────────────────────────────────────── */
export default function App() {
  const isLinks = window.location.pathname === '/links';

  if (isLinks) return <LinksPage />;

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formState, handleSubmit] = useForm('xbdpanjq');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [loadedImgs, setLoadedImgs] = useState<Set<number>>(new Set());
  const handleImgLoad = useCallback((i: number) => {
    setLoadedImgs((prev) => { const s = new Set(prev); s.add(i); return s; });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (lightbox !== null && e.key === 'ArrowRight') setLightbox((prev) => prev !== null ? (prev + 1) % IMAGES.length : null);
      if (lightbox !== null && e.key === 'ArrowLeft') setLightbox((prev) => prev !== null ? (prev - 1 + IMAGES.length) % IMAGES.length : null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Navigation */}
      <header className={`site-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#hero" className="nav-brand" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
            ItsKDBB
          </a>

          <nav className={`nav-links${menuOpen ? ' open' : ''}`} aria-label="Site navigation">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>Home</a>
            <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollTo('gallery'); }}>Gallery</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
          </nav>

          <div className="nav-social">
            {SOCIAL.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="nav-social-icon">
                {s.icon}
              </a>
            ))}
          </div>

          <button
            className="nav-hamburger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section id="hero" className="hero-section">
          <div className="hero-inner">
            <div className="hero-text">
              <h1 className="hero-name">ItsKDBB</h1>
              <p className="hero-specialties">Fitness &nbsp;|&nbsp; Editorial &nbsp;|&nbsp; Content Creator</p>
              <p className="hero-bio">
                KD is a 25-year-old fitness model and content creator with a versatile look
                that moves seamlessly from high-energy fitness shoots to polished lifestyle campaigns.
                With a dedicated following across multiple platforms, KD brings authenticity and
                creative range to every project — from editorial work to premium content that
                speaks to a broad and engaged audience.
              </p>
              <div className="hero-actions">
                <a href="#gallery" className="btn btn-primary" onClick={(e) => { e.preventDefault(); scrollTo('gallery'); }}>View Gallery</a>
                <a href="#contact" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Get in Touch</a>
              </div>
            </div>
            <div className="hero-image-wrap">
              <img src="/images/DSC01599.jpg" alt="ItsKDBB" className="hero-img" />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section id="stats" className="stats-section">
          <div className="section-inner">
            <h2 className="section-title">Stats</h2>
            <div className="stats-grid">
              {STATS.map((s) => (
                <div key={s.label} className="stat-item">
                  <span className="stat-label">{s.label}</span>
                  <span className="stat-value">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="gallery-section">
          <div className="section-inner">
            <h2 className="section-title">Gallery</h2>
            <div className="gallery-grid">
              {IMAGES.map((img, i) => (
                <button
                  key={img.src}
                  className="gallery-item"
                  onClick={() => setLightbox(i)}
                  aria-label={`View ${img.alt}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className={loadedImgs.has(i) ? 'img-loaded' : ''}
                    onLoad={() => handleImgLoad(i)}
                  />
                  <div className="gallery-overlay">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0zM10 7v6m3-3H7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="contact-section">
          <div className="section-inner contact-inner">
            <div className="contact-info">
              <h2 className="section-title">Get in Touch</h2>
              <p className="contact-sub">
                Available for fitness campaigns, editorial shoots, brand collaborations, and creative projects.
                Open to travel.
              </p>
              <div className="contact-social">
                {SOCIAL.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="contact-social-link">
                    <span className="contact-social-icon">{s.icon}</span>
                    <span>{s.name}</span>
                  </a>
                ))}
              </div>
            </div>
            {formState.succeeded ? (
              <div className="contact-form contact-success">
                <p>Thanks for reaching out! I'll get back to you soon.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" type="text" name="name" placeholder="Your name" required />
                  <ValidationError field="name" prefix="Name" errors={formState.errors} />
                </div>
                <div className="form-field">
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" type="email" name="email" placeholder="your@email.com" required />
                  <ValidationError field="email" prefix="Email" errors={formState.errors} />
                </div>
                <div className="form-field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" name="message" rows={5} placeholder="Tell me about your project..." required />
                  <ValidationError field="message" prefix="Message" errors={formState.errors} />
                </div>
                <button type="submit" className="btn btn-primary btn-full" disabled={formState.submitting}>
                  {formState.submitting ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <p className="footer-name">ItsKDBB</p>
          <p className="footer-brand">Fitness · Editorial · Content Creator</p>
          <div className="footer-social">
            {SOCIAL.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="footer-social-icon">
                {s.icon}
              </a>
            ))}
          </div>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} ItsKDBB. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">&times;</button>
          <button
            className="lightbox-prev"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + IMAGES.length) % IMAGES.length); }}
            aria-label="Previous"
          >
            &#8249;
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={IMAGES[lightbox].src} alt={IMAGES[lightbox].alt} />
          </div>
          <button
            className="lightbox-next"
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % IMAGES.length); }}
            aria-label="Next"
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  );
}
