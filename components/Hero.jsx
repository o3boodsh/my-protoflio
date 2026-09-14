export default function Hero() {
  return (
  <section className="hero-section" id="home">
    <div className="hero-content">
      <div className="badge">
        <span className="badge-dot"></span>
        AI TOOLS & FRONTEND ENGINEERING
      </div>
      <div className="typewriter-container">
        <span id="typewriter-text"></span>
        <span className="cursor"></span>
      </div>
      <h1 className="hero-title">
        <span className="gradient-text">Abdullah</span>
        <span className="white-text">Shehada.</span>
      </h1>
      <p className="hero-description">
        Computer Engineering graduate (Excellent, GPA 90.7) and AI Tools Developer building intelligent, user-friendly
        applications across Frontend Engineering, Machine Learning, and Software Engineering.
      </p>
      <div className="cta-group">
        <a href="https://www.linkedin.com/in/abdullah-shehada-048305283/" target="_blank" rel="noopener"
          className="btn-secondary">View CV <i data-lucide="external-link"></i></a>
        <a href="#projects" className="btn-primary">View Projects <i data-lucide="arrow-right"></i></a>
      </div>
    </div>
    <div className="robot-frame">
      <div className="radial-glow"></div>
      <div id="robot-mount"></div>
    </div>
  </section>
  );
}
