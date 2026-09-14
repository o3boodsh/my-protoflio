export default function Discovery() {
  return (
  <section className="discovery-section" id="discovery">
    <div className="discovery-container">
      <div className="discovery-text">
        <div className="badge"><span className="badge-dot"></span> DISCOVERY</div>
        <h2><span className="gradient-text">AI Tools</span> <span style={{ color: 'var(--text-white)' }}>Developer.</span>
        </h2>
        <p>Computer Engineering graduate with an Excellent academic record and a strong interest in Artificial
          Intelligence and Frontend Engineering. I currently work as a Teaching Assistant at the Islamic University of
          Gaza and contribute to the development of an AI academic chatbot for the university. Throughout my learning
          journey, I have built practical experience across software engineering, frontend development, AI and machine
          learning, computer vision, system design, APIs, and Linux/UNIX systems.</p>
        <a href="#experiences" className="btn-primary">Explore More <i data-lucide="arrow-right"></i></a>
      </div>
      <div className="discovery-grid">
        <div className="discovery-card">
          <div className="icon-wrapper"><i data-lucide="graduation-cap" size="24"></i></div>
          <div className="stat-number">90.7</div>
          <div className="stat-label">GPA Score</div>
          <div className="stat-desc">Excellent Graduate Honor</div>
        </div>
        <div className="discovery-card">
          <div className="icon-wrapper"><i data-lucide="cpu" size="24"></i></div>
          <div className="stat-number">8+</div>
          <div className="stat-label">Projects Built</div>
          <div className="stat-desc">Web, AI & systems projects</div>
        </div>
        <div className="discovery-card">
          <div className="icon-wrapper"><i data-lucide="presentation" size="24"></i></div>
          <div className="stat-number">TA</div>
          <div className="stat-label">Teaching Assistant</div>
          <div className="stat-desc">Islamic University of Gaza</div>
        </div>
        <div className="discovery-card">
          <div className="icon-wrapper"><i data-lucide="bot" size="24"></i></div>
          <div className="stat-number">AI</div>
          <div className="stat-label">Academic Chatbot</div>
          <div className="stat-desc">In development — IUG RAG project</div>
        </div>
      </div>
    </div>

    
    <div className="discovery-divider"></div>

    <div className="discovery-subhead">
      <h3><i data-lucide="brain" size="20"></i> Tech Stack & Toolkit</h3>
      <p>The languages, frameworks, and tools I reach for daily.</p>
    </div>

    <div className="skills-container">
      
      <div className="skills-col-left">
        <div className="tech-grid">
          <div className="tech-item"><span className="tech-icon"><i data-lucide="code-2"></i></span><span
              className="tech-label">JavaScript</span></div>
          <div className="tech-item"><span className="tech-icon"><i data-lucide="terminal"></i></span><span
              className="tech-label">Python</span></div>
          <div className="tech-item"><span className="tech-icon"><i data-lucide="coffee"></i></span><span
              className="tech-label">Java</span></div>
          <div className="tech-item"><span className="tech-icon"><i data-lucide="cpu"></i></span><span
              className="tech-label">C</span></div>
          <div className="tech-item"><span className="tech-icon"><i data-lucide="component"></i></span><span
              className="tech-label">React.js</span></div>
          <div className="tech-item"><span className="tech-icon"><i data-lucide="layers"></i></span><span
              className="tech-label">Next.js</span></div>
          <div className="tech-item"><span className="tech-icon"><i data-lucide="file-code"></i></span><span
              className="tech-label">HTML5/CSS3</span></div>
          <div className="tech-item"><span className="tech-icon"><i data-lucide="server"></i></span><span
              className="tech-label">FastAPI</span></div>
          <div className="tech-item"><span className="tech-icon"><i data-lucide="plug"></i></span><span
              className="tech-label">REST API</span></div>
          <div className="tech-item"><span className="tech-icon"><i data-lucide="brain"></i></span><span
              className="tech-label">Machine Learning</span></div>
          <div className="tech-item"><span className="tech-icon"><i data-lucide="git-branch"></i></span><span
              className="tech-label">Git & GitHub</span></div>
          <div className="tech-item"><span className="tech-icon"><i data-lucide="monitor"></i></span><span
              className="tech-label">Linux/UNIX</span></div>
        </div>
      </div>

      
      <div className="skills-col-right">
        
        <div className="lang-box">
          <h3><i data-lucide="languages" size="20"></i> Languages</h3>
          <div className="lang-item">
            <span className="lang-name">Arabic</span>
            <span className="lang-level">NATIVE</span>
          </div>
          <div className="lang-item">
            <span className="lang-name">English</span>
            <span className="lang-level">PROFESSIONAL</span>
          </div>
        </div>

        
        <div className="comp-box">
          <h3><i data-lucide="badge-check" size="20"></i> Competencies</h3>
          <div className="comp-tags">
            <span className="comp-tag">Object-Oriented Programming</span>
            <span className="comp-tag">System Design</span>
            <span className="comp-tag">Clean Code</span>
            <span className="comp-tag">Application Architecture</span>
            <span className="comp-tag">AI Tools Development</span>
            <span className="comp-tag">Deep Learning</span>
            <span className="comp-tag">Computer Vision</span>
            <span className="comp-tag">CNN</span>
            <span className="comp-tag">LLMs</span>
            <span className="comp-tag">Data Preprocessing</span>
            <span className="comp-tag">Image Processing</span>
            <span className="comp-tag">PyCaret</span>
            <span className="comp-tag">UI Engineering</span>
            <span className="comp-tag">Web Engineering</span>
            <span className="comp-tag">Responsive UI</span>
            <span className="comp-tag">Digital Tools</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
