export default function Experience() {
  return (
  <section className="experience-section" id="experiences">
    <div className="experience-header">
      <div className="badge"><span className="badge-dot"></span> THE JOURNEY</div>
      <h2><span className="gradient-text">Professional</span> <span style={{ color: 'var(--text-white)' }}>Evolution.</span></h2>
    </div>

    <div className="experience-timeline-wrap">
      <div className="timeline-rows">

        <div className="timeline-row" data-tech="AI">
          <span className="timeline-dot"></span>
          <span className="exp-side-label" aria-hidden="true">EXPERIENCE<span className="side-label-dot">.</span></span>
          <div className="exp-card">
            <span className="exp-icon"><i data-lucide="graduation-cap" size="18"></i></span>
            <div className="exp-date">Current</div>
            <h3 className="exp-title">Teaching Assistant & AI Development</h3>
            <div className="exp-company">Islamic University of Gaza <span className="dot-sep">•</span> Academic / Technical
              Experience</div>
            <ul className="exp-list">
              <li>Working as a Teaching Assistant while contributing to the development of an AI-powered academic
                chatbot for the university.</li>
              <li>Involved in AI, Python, LLMs, and RAG-based development to provide intelligent academic assistance,
                currently under development.</li>
            </ul>
          </div>
        </div>

        <div className="timeline-row" data-tech="React">
          <span className="timeline-dot"></span>
          <span className="exp-side-label" aria-hidden="true">EXPERIENCE<span className="side-label-dot">.</span></span>
          <div className="exp-card">
            <span className="exp-icon"><i data-lucide="code-2" size="18"></i></span>
            <div className="exp-date">Jan 2026 – Present</div>
            <h3 className="exp-title">Frontend Development Training</h3>
            <div className="exp-company">MASAR <span className="dot-sep">•</span> Professional Training</div>
            <ul className="exp-list">
              <li>Currently participating in a Frontend Development training program focused on modern web
                development.</li>
              <li>Building responsive, user-friendly interfaces using React.js, JavaScript, and HTML/CSS.</li>
            </ul>
          </div>
        </div>

        <div className="timeline-row" data-tech="Humanitarian">
          <span className="timeline-dot"></span>
          <span className="exp-side-label" aria-hidden="true">EXPERIENCE<span className="side-label-dot">.</span></span>
          <div className="exp-card">
            <span className="exp-icon"><i data-lucide="heart-handshake" size="18"></i></span>
            <div className="exp-date">Mar 2024 – Feb 2026</div>
            <h3 className="exp-title">Humanitarian & Relief Work</h3>
            <div className="exp-company">REACH <span className="dot-sep">•</span> Humanitarian / Relief Work</div>
            <ul className="exp-list">
              <li>Contributed to humanitarian and relief operations, supporting communities affected by displacement
                and humanitarian challenges.</li>
              <li>Gained practical exposure to field activities, data collection, and data handling.</li>
            </ul>
          </div>
        </div>

        <div className="timeline-row" data-tech="Data">
          <span className="timeline-dot"></span>
          <span className="exp-side-label" aria-hidden="true">EXPERIENCE<span className="side-label-dot">.</span></span>
          <div className="exp-card">
            <span className="exp-icon"><i data-lucide="clipboard-list" size="18"></i></span>
            <div className="exp-date">2023 & 2025</div>
            <h3 className="exp-title">Data Entry, Verification & Assessment</h3>
            <div className="exp-company">REACH & MASAR <span className="dot-sep">•</span> Data & Assessment Experience</div>
            <ul className="exp-list">
              <li>Performed data entry, data verification, and data analysis tasks.</li>
              <li>Conducted application evaluation and interview evaluation, supporting information management
                processes.</li>
            </ul>
          </div>
        </div>

        <div className="timeline-row" data-tech="Software">
          <span className="timeline-dot"></span>
          <span className="exp-side-label" aria-hidden="true">EXPERIENCE<span className="side-label-dot">.</span></span>
          <div className="exp-card">
            <span className="exp-icon"><i data-lucide="cpu" size="18"></i></span>
            <div className="exp-date">6 Months / 300 Hours</div>
            <h3 className="exp-title">Software Engineering Training</h3>
            <div className="exp-company">MASAR <span className="dot-sep">•</span> Professional Training</div>
            <ul className="exp-list">
              <li>Completed a Software Engineering training program covering programming, project development, and
                software design practices.</li>
              <li>Applied problem-solving and clean code principles across practical software development exercises.
              </li>
            </ul>
          </div>
        </div>

        <div className="timeline-row" data-tech="Art">
          <span className="timeline-dot"></span>
          <span className="exp-side-label" aria-hidden="true">EXPERIENCE<span className="side-label-dot">.</span></span>
          <div className="exp-card">
            <span className="exp-icon"><i data-lucide="palette" size="18"></i></span>
            <div className="exp-date">2019 – Present</div>
            <h3 className="exp-title">Drawing & Visual Art</h3>
            <div className="exp-company">Beit Al-Fan Center <span className="dot-sep">•</span> Creative Training & Skill
              Development</div>
            <ul className="exp-list">
              <li>Started learning drawing and visual art in 2019, developing practical experience in visual
                expression.</li>
              <li>Strengthened observation, attention to detail, patience, and creative thinking through ongoing
                practice.</li>
            </ul>
          </div>
        </div>

      </div>

      <div className="experience-companion-wrap">
        <div className="experience-companion" id="experience-companion">
          <div className="companion-watermark" id="companion-watermark">AI</div>
          <div id="cloud-robot-mount"></div>
        </div>
      </div>
    </div>
  </section>
  );
}
