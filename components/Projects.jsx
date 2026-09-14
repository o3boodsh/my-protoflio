import projects from "@/data/projects";

export default function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-header">
        <div className="badge"><span className="badge-dot"></span> PORTFOLIO</div>
        <h2>
          <span className="gradient-text">Featured</span>
          <span className="italic-soft">Masterpieces.</span>
        </h2>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.title}>
            <div className="project-thumb">
              {/* When the real screenshot is ready, replace thumb-placeholder below with an <img> */}
              <div className="thumb-placeholder">
                <i data-lucide="image" size="28"></i>
                <span>{project.label}</span>
              </div>
              <a
                href="https://github.com/o3boodsh"
                target="_blank"
                rel="noopener"
                className="thumb-code-btn"
              >
                <i data-lucide="code-2" size="16"></i>
              </a>
            </div>
            <div className="project-body">
              <div className="project-title">{project.title}</div>
              <div className="project-subtitle">{project.subtitle}</div>
              <p className="project-desc">{project.desc}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span className="project-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="projects-footer">
        <p className="projects-cta-text">Want to see more of my work?</p>
        <a
          href="https://github.com/o3boodsh"
          target="_blank"
          rel="noopener"
          className="btn-primary btn-github"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385 0.6 0.113 0.82-0.258 0.82-0.577 0-0.285-0.01-1.04-0.015-2.04-3.338 0.725-4.042-1.61-4.042-1.61-0.546-1.385-1.333-1.755-1.333-1.755-1.089-0.745 0.083-0.729 0.083-0.729 1.205 0.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492 0.997 0.108-0.775 0.418-1.305 0.762-1.605-2.665-0.3-5.466-1.332-5.466-5.93 0-1.31 0.467-2.38 1.235-3.22-0.135-0.303-0.54-1.523 0.105-3.176 0 0 1.005-0.322 3.3 1.23 0.957-0.266 1.98-0.399 3-0.405 1.02 0.006 2.043 0.139 3 0.405 2.28-1.552 3.285-1.23 3.285-1.23 0.645 1.653 0.24 2.873 0.12 3.176 0.765 0.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92 0.42 0.36 0.81 1.096 0.81 2.22 0 1.606-0.015 2.896-0.015 3.286 0 0.315 0.21 0.69 0.825 0.57 4.765-1.59 8.2-6.085 8.2-11.385 0-6.627-5.373-12-12-12z" />
          </svg>
          EXPLORE GITHUB
        </a>
      </div>
    </section>
  );
}
