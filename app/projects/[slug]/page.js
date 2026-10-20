import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectVisual from "@/components/ProjectVisual";
import ThemeToggle from "@/components/ThemeToggle";
import projects from "@/data/projects";

export function generateStaticParams() {
  return projects.filter((project) => project.featured || project.caseStudy).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug && (item.featured || item.caseStudy));
  if (!project) return {};

  return {
    title: `${project.title} | Abdullah Shehada`,
    description: project.shortDescription,
  };
}

export default async function ProjectCaseStudy({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug && (item.featured || item.caseStudy));
  if (!project) notFound();

  return (
    <main className="project-page-shell project-case-study">
      <div className="project-page-topbar">
        <Link href="/#projects" className="project-page-back">← Back to portfolio</Link>
        <div className="project-page-topbar-actions">
          <span className="project-page-brand">ABDULLAH</span>
          <ThemeToggle />
        </div>
      </div>

      <header className="project-page-intro" data-motion-group="case-intro">
        <span className="project-page-eyebrow" data-motion="fade">{project.category} / {project.status ? "PROJECT OVERVIEW" : "CASE STUDY"}</span>
        <h1 data-motion="blur">{project.title}<span className="gradient-text">.</span></h1>
        <p data-motion="fade">{project.shortDescription}</p>
        <div className="project-case-actions" data-motion="fade">
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-card-action project-card-action--primary">Live Demo <span aria-hidden="true">↗</span></a>}
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-card-action">GitHub <span aria-hidden="true">↗</span></a>}
        </div>
      </header>

      <div className="project-case-visual" data-motion="scale">
        <ProjectVisual project={project} priority sizes="(max-width: 1280px) calc(100vw - 2.5rem), 1240px" />
      </div>

      <div className="project-case-content">
        <div className="project-case-main" data-motion-group="case-main">
          <section className="project-case-panel" data-motion="fade">
            <span className="project-page-eyebrow">01 / THE PROBLEM</span>
            <h2>What needed solving</h2>
            <p>{project.problem}</p>
          </section>
          <section className="project-case-panel" data-motion="fade">
            <span className="project-page-eyebrow">02 / THE APPROACH</span>
            <h2>Project approach</h2>
            <p>{project.solution}</p>
          </section>
        </div>
        <aside className="project-case-sidebar" data-motion-group="case-sidebar">
          {project.roleVerified && (
            <div className="project-case-panel" data-motion="fade">
              <span className="project-page-eyebrow">MY ROLE</span>
              <p>{project.role}</p>
            </div>
          )}
          <div className="project-case-panel" data-motion="fade">
            <span className="project-page-eyebrow">TECHNOLOGIES</span>
            <div className="project-card-technologies">
              {project.technologies.map((technology) => <span className="project-card-technology" key={technology}>{technology}</span>)}
            </div>
          </div>
          <div className="project-case-panel" data-motion="fade">
            <span className="project-page-eyebrow">HIGHLIGHTS</span>
            <ul className="project-card-highlights">
              {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
          </div>
        </aside>
      </div>
      <div className="project-case-footer" data-motion="fade"><Link href="/projects">View all projects <span aria-hidden="true">→</span></Link></div>
    </main>
  );
}
