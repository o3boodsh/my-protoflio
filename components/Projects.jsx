import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import projects from "@/data/projects";

export default function Projects() {
  const homeProjects = projects.filter((project) => project.showOnHome);
  const featuredProjects = homeProjects.filter((project) => project.featured);
  const otherProjects = homeProjects.filter((project) => !project.featured);

  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-title">
      <div className="projects-header" data-motion-group>
        <div className="badge" data-motion="fade"><span className="badge-dot" /> PORTFOLIO</div>
        <h2 id="projects-title" data-motion="blur"><span className="gradient-text">Selected</span> work.</h2>
        <p data-motion="fade">A closer look at what I build, the problems behind it, and the decisions in the work.</p>
      </div>

      <div className="projects-featured-list" data-motion-group>
        {featuredProjects.map((project, index) => (
          <ProjectCard project={project} prominent priority={index === 0} sequence={index + 1} key={project.slug} />
        ))}
      </div>

      {otherProjects.length > 0 && (
        <div className="projects-more">
          <div className="projects-more-heading" data-motion-group>
            <span data-motion="fade">MORE WORK</span>
            <h3 data-motion="blur">Different problems. Same attention to detail.</h3>
          </div>
          <div className="projects-secondary-grid" data-motion-group>
            {otherProjects.map((project, index) => (
              <ProjectCard project={project} sequence={featuredProjects.length + index + 1} key={project.slug} />
            ))}
          </div>
        </div>
      )}

      <div className="projects-footer" data-motion="fade">
        <p className="projects-cta-text">Want to see the rest of the work?</p>
        <Link href="/projects" className="btn-primary projects-archive-link">
          Explore all projects <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
