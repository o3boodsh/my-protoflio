import Link from "next/link";
import projects from "@/data/projects";
import { skillGroups } from "@/data/skills";

const projectBySlug = new Map(projects.map((project) => [project.slug, project]));

function getEvidence(skill) {
  if (skill.projectSlug) {
    const project = projectBySlug.get(skill.projectSlug);
    if (!project) return null;

    return {
      label: project.title,
      href: project.featured ? `/projects/${project.slug}` : `/projects#${project.slug}`,
    };
  }

  if (skill.experienceId) {
    return { label: "Teaching Assistant & AI Development", href: `#${skill.experienceId}` };
  }

  return null;
}

export default function Skills() {
  const visibleCount = skillGroups.reduce((count, group) => count + group.skills.length, 0);

  return (
    <section className="skills-section" id="skills" aria-labelledby="skills-title">
      <div className="skills-header" data-motion-group>
        <p className="skills-kicker" data-motion="fade">
          <span className="skills-kicker-dot" aria-hidden="true" />
          THE PRACTICE <span aria-hidden="true">/</span> {skillGroups.length} DISCIPLINES · {visibleCount} SKILLS
        </p>
        <h3 id="skills-title" data-motion="blur">Skills <span>in practice.</span></h3>
        <p className="skills-intro" data-motion="fade">
          A focused toolkit, connected to the projects and experience behind it.
        </p>
      </div>

      <div className="skills-pathways" data-motion-group>
        {skillGroups.map((group, index) => (
          <section className="skills-pathway" aria-labelledby={`skills-pathway-${index + 1}`} data-motion="fade" key={group.title}>
            <span className="skills-pathway-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>

            <div className="skills-pathway-heading">
              <span className="skills-pathway-kicker">{group.label}</span>
              <h4 id={`skills-pathway-${index + 1}`}>
                {group.title}
                <i data-lucide={group.icon} aria-hidden="true" />
              </h4>
              <p>{group.description}</p>
            </div>

            <ul className="skills-pathway-list">
              {group.skills.map((skill) => {
                const evidence = getEvidence(skill);
                const content = (
                  <>
                    <span className="skills-tool-name">{skill.name}</span>
                    {evidence && (
                      <span className="skills-tool-proof">
                        <span className="skills-tool-proof-name">{evidence.label}</span>
                        <span className="skills-tool-arrow" aria-hidden="true">↗</span>
                      </span>
                    )}
                  </>
                );

                return (
                  <li className="skills-tool" key={skill.name}>
                    {evidence ? (
                      <Link href={evidence.href} className="skills-tool-link" aria-label={`${skill.name} — view ${evidence.label}`}>
                        {content}
                      </Link>
                    ) : (
                      <span className="skills-tool-link">{content}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
