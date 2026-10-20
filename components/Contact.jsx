import Image from "next/image";

const email = "AbdullahShehada03@gmail.com";

export default function Contact() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-grid">
        <div className="contact-left" data-motion-group>
          <div className="badge" data-motion="fade"><span className="badge-dot" aria-hidden="true"></span> GET IN TOUCH</div>
          <h2 className="contact-title" id="contact-title" data-motion="blur">
            Let&apos;s build <span className="gradient-text">something useful</span> together.
          </h2>
          <p className="contact-desc" data-motion="fade">
            Available for remote Software Engineering, Frontend, and AI opportunities.
          </p>

          <a href={`mailto:${email}`} className="contact-email-cta" data-motion="fade">
            <span><i data-lucide="mail" aria-hidden="true"></i> Email me</span>
            <i data-lucide="arrow-up-right" aria-hidden="true"></i>
          </a>
          <a href={`mailto:${email}`} className="contact-email-address" data-motion="fade">{email}</a>

          <nav className="contact-socials" aria-label="Other ways to connect" data-motion="fade">
            <a href="https://www.linkedin.com/in/abdullah-shehada-048305283/" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.064-2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a href="https://github.com/o3boodsh" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385 0.6 0.113 0.82-0.258 0.82-0.577 0-0.285-0.01-1.04-0.015-2.04-3.338 0.725-4.042-1.61-4.042-1.61-0.546-1.385-1.333-1.755-1.333-1.755-1.089-0.745 0.083-0.729 0.083-0.729 1.205 0.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492 0.997 0.108-0.775 0.418-1.305 0.762-1.605-2.665-0.3-5.466-1.332-5.466-5.93 0-1.31 0.467-2.38 1.235-3.22-0.135-0.303-0.54-1.523 0.105-3.176 0 0 1.005-0.322 3.3 1.23 0.957-0.266 1.98-0.399 3-0.405 1.02 0.006 2.043 0.139 3 0.405 2.28-1.552 3.285-1.23 3.285-1.23 0.645 1.653 0.24 2.873 0.12 3.176 0.765 0.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92 0.42 0.36 0.81 1.096 0.81 2.22 0 1.606-0.015 2.896-0.015 3.286 0 0.315 0.21 0.69 0.825 0.57 4.765-1.59 8.2-6.085 8.2-11.385 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a href="https://wa.me/972594798828" target="_blank" rel="noopener noreferrer">
              <i data-lucide="phone" aria-hidden="true"></i>
              WhatsApp
            </a>
          </nav>
        </div>

        <div className="contact-right" data-motion="mask">
          <div className="contact-photo-frame">
            <Image
              src="/abdullah-shehada-portrait.jpeg"
              alt="Portrait of Abdullah Shehada at the Islamic University of Gaza"
              fill
              sizes="(max-width: 560px) calc(100vw - 2.5rem), (max-width: 968px) 560px, 40vw"
              className="contact-photo"
            />
          </div>
          <div className="contact-photo-overlay" aria-hidden="true"></div>
          <div className="contact-name-card">
            <div className="name">Abdullah Shehada</div>
            <div className="role">Web experiences · React, Next.js &amp; AI</div>
          </div>
        </div>
      </div>

      <div className="contact-footer-divider" data-motion="line"></div>
      <p className="contact-footer-note" data-motion="fade">© 2026 ABDULLAH SHEHADA</p>
    </section>
  );
}
