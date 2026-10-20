import Image from "next/image";

export default function ProjectVisual({ project, priority = false, sizes = "(max-width: 680px) calc(100vw - 2.5rem), (max-width: 1280px) 50vw, 600px" }) {
  const initials = project.title
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <div className={`project-visual${project.image ? " project-visual--image" : ""}`}>
      {project.image ? (
        <Image
          src={project.image}
          alt={project.imageAlt || `${project.title} project cover`}
          fill
          sizes={sizes}
          priority={priority}
          className="project-visual-image"
        />
      ) : project.visualVariant === "rag" ? (
        <div className="project-visual-rag" role="img" aria-label={project.visualAlt}>
          <span className="project-visual-rag-eyebrow">{project.visualEyebrow}</span>
          <div className="project-visual-rag-flow" aria-hidden="true">
            {project.visualLabels.map((label, index) => (
              <div className="project-visual-rag-step" key={label}>
                {index > 0 && <span className="project-visual-rag-connector" />}
                <span className={`project-visual-rag-node${index === 1 ? " project-visual-rag-node--core" : ""}`}>{label}</span>
              </div>
            ))}
          </div>
          <span className="project-visual-rag-caption">{project.visualCaption}</span>
        </div>
      ) : (
        <div
          className="project-visual-placeholder"
          role="img"
          aria-label={`Screenshot for ${project.title} is not available yet`}
        >
          <div className="project-visual-grid" aria-hidden="true" />
          <div className="project-visual-topline">
            <span className="project-visual-dot" />
            <span>{project.category}</span>
          </div>
          <div className="project-visual-mark" aria-hidden="true">{initials}</div>
          <div className="project-visual-bottomline">
            <span>{project.title}</span>
            <span>Screenshot pending</span>
          </div>
        </div>
      )}
    </div>
  );
}
