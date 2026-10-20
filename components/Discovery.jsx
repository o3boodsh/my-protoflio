import Skills from "@/components/Skills";

export default function Discovery() {
  return (
  <section className="discovery-section" id="discovery">
    <div className="discovery-container">
      <div className="discovery-text" data-motion-group>
        <div className="badge" data-motion="fade"><span className="badge-dot"></span> DISCOVERY</div>
        <h2 data-motion="blur"><span className="gradient-text">AI Tools</span> <span style={{ color: 'var(--text-white)' }}>Developer.</span>
        </h2>
        <p data-motion="fade">Computer Engineering graduate with an Excellent academic record and a strong interest in Artificial
          Intelligence and Frontend Engineering. I currently work as a Teaching Assistant at the Islamic University of
          Gaza and contribute to the development of an AI academic chatbot for the university. Throughout my learning
          journey, I have built practical experience across software engineering, frontend development, AI and machine
          learning, computer vision, system design, APIs, and Linux/UNIX systems.</p>
        <a href="#experiences" className="btn-primary" data-motion="fade">Explore More <i data-lucide="arrow-right"></i></a>
      </div>
      <div className="discovery-grid" data-motion-group>
        <div className="discovery-card" data-motion="about-tile">
          <div className="icon-wrapper"><i data-lucide="graduation-cap" size="24"></i></div>
          <div className="stat-number">90.7</div>
          <div className="stat-label">GPA Score</div>
          <div className="stat-desc">Excellent Graduate Honor</div>
        </div>
        <div className="discovery-card" data-motion="about-tile">
          <div className="icon-wrapper"><i data-lucide="cpu" size="24"></i></div>
          <div className="stat-number">8+</div>
          <div className="stat-label">Projects Built</div>
          <div className="stat-desc">Web, AI & systems projects</div>
        </div>
        <div className="discovery-card" data-motion="about-tile">
          <div className="icon-wrapper"><i data-lucide="presentation" size="24"></i></div>
          <div className="stat-number">TA</div>
          <div className="stat-label">Teaching Assistant</div>
          <div className="stat-desc">Islamic University of Gaza</div>
        </div>
        <div className="discovery-card" data-motion="about-tile">
          <div className="icon-wrapper"><i data-lucide="bot" size="24"></i></div>
          <div className="stat-number">AI</div>
          <div className="stat-label">Academic Chatbot</div>
          <div className="stat-desc">In development — IUG RAG project</div>
        </div>
      </div>
    </div>

    <Skills />
  </section>
  );
}
