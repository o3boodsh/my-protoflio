import HeroSculpture from "@/components/HeroSculpture";

export default function Hero() {
  return (
    <section className="hero-section" id="home" aria-labelledby="hero-title">
      <div className="hero-content">
        <div className="hero-topline hero-reveal hero-reveal--intro">
          <span className="hero-intro">Hello, I&apos;m Abdullah</span>
          <span className="hero-status">
            <span className="hero-status-dot" aria-hidden="true"></span>
            Available for Remote Work
          </span>
        </div>

        <h1 className="hero-title hero-reveal hero-reveal--headline" id="hero-title">
          I build <span className="hero-title-highlight">intelligent web experiences</span>{" "}
          <span className="hero-title-tech">with React, Next.js, and AI.</span>
        </h1>

        <p className="hero-description hero-reveal hero-reveal--description">
          Computer Engineer and Teaching Assistant focused on clear interfaces and practical AI.
        </p>

        <div className="cta-group hero-cta-group hero-reveal hero-reveal--actions">
          <a href="#projects" className="btn-primary hero-primary">
            View Projects <i data-lucide="arrow-right" aria-hidden="true"></i>
          </a>
          <a href="/Abdullah_Shehada_General_CV.pdf" download className="btn-secondary hero-secondary">
            Download CV <i data-lucide="download" aria-hidden="true"></i>
          </a>
        </div>

        <ul className="hero-facts hero-reveal hero-reveal--details" aria-label="At a glance">
          <li><i data-lucide="graduation-cap" aria-hidden="true"></i>Computer Engineering — GPA 90.7</li>
          <li><i data-lucide="presentation" aria-hidden="true"></i>Teaching Assistant</li>
          <li><i data-lucide="map-pin" aria-hidden="true"></i>Gaza, Palestine</li>
        </ul>

        <nav className="hero-socials hero-reveal hero-reveal--socials" aria-label="Social profiles">
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
        </nav>
      </div>

      <HeroSculpture />

      <a href="#discovery" className="hero-scroll-indicator hero-reveal hero-reveal--scroll" aria-label="Scroll to About section">
        <span className="hero-scroll-line" aria-hidden="true"></span>
        <span>Scroll to explore</span>
        <i data-lucide="arrow-down" aria-hidden="true"></i>
      </a>
    </section>
  );
}
