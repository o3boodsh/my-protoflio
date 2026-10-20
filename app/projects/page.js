import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import ThemeToggle from "@/components/ThemeToggle";
import projects from "@/data/projects";

export const metadata = {
  title: "Projects | Abdullah Shehada",
  description: "Explore software, frontend, AI, and systems projects by Abdullah Shehada.",
};

export default function ProjectsArchive() {
  return (
    <main className="project-page-shell">
      <div className="project-page-topbar">
        <Link href="/#projects" className="project-page-back">← Back to portfolio</Link>
        <div className="project-page-topbar-actions">
          <span className="project-page-brand">ABDULLAH</span>
          <ThemeToggle />
        </div>
      </div>
      <header className="project-page-intro" data-motion-group="archive-intro">
        <span className="project-page-eyebrow" data-motion="fade">PROJECT ARCHIVE</span>
        <h1 data-motion="blur">All projects<span className="gradient-text">.</span></h1>
        <p data-motion="fade">Frontend interfaces, AI tools, and systems work in one place.</p>
      </header>
      <div className="projects-archive-grid" data-motion-group="archive-projects">
        {projects.map((project, index) => (
          <ProjectCard project={project} prominent={project.featured} priority={index === 0} sequence={index + 1} key={project.slug} />
        ))}
      </div>
    </main>
  );
}
