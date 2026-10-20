import Link from "next/link";
import ProjectVisual from "@/components/ProjectVisual";

export default function ProjectCard({ project, prominent = false, priority = false, sequence }) {
  return (
    <article
      id={project.slug}
      className={`project-card ${prominent ? "project-card--featured" : "project-card--compact"}`}
      data-motion="scale"
    >
      <ProjectVisual
        project={project}
        priority={priority}
        sizes={prominent ? "(max-width: 968px) calc(100vw - 2.5rem), (max-width: 1280px) 50vw, 650px" : undefined}
      />
      <div className="project-card-content">
        <div className="project-card-heading">
          {sequence != null && <span className="project-card-index" aria-hidden="true">{String(sequence).padStart(2, "0")}</span>}
          <span className="project-card-category">{project.category}</span>
          {prominent && <span className="project-card-featured-label">{project.status || "Featured project"}</span>}
        </div>
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-description">{project.shortDescription}</p>

        <div className="project-card-technologies" aria-label="Technologies used">
          {project.technologies.slice(0, prominent ? 4 : 3).map((technology) => (
            <span className="project-card-technology" key={technology}>{technology}</span>
          ))}
        </div>

        <ul className="project-card-highlights">
          {project.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        {(project.liveUrl || project.githubUrl || project.featured || project.caseStudy) && (
          <div className="project-card-actions">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-card-action project-card-action--primary">
                Live Demo <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-card-action" aria-label={`View ${project.title} repository on ${project.githubAttribution ? `${project.githubAttribution}'s GitHub` : "GitHub"}`}>
                {project.githubAttribution ? "GitHub · Nizar" : "GitHub"} <span aria-hidden="true">↗</span>
              </a>
            )}
            {(project.featured || project.caseStudy) && (
              <Link href={`/projects/${project.slug}`} className={`project-card-action project-card-action--case-study${project.liveUrl ? "" : " project-card-action--primary"}`}>
                {project.status ? "View Project" : "View Case Study"} <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
