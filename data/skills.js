// Each visible skill points to a project or an experience described in this portfolio.
// Project links are derived from data/projects.js in the UI, so changing a slug stays simple.
export const skillGroups = [
  {
    title: "Frontend",
    icon: "component",
    label: "INTERFACE LAYER",
    description: "Interfaces and interactions built for real product flows.",
    skills: [
      { name: "React.js", projectSlug: "smart-restaurant-management" },
      { name: "Next.js", projectSlug: "advanced-task-management-app" },
      { name: "JavaScript", projectSlug: "expense-tracker-app" },
      { name: "HTML & CSS", projectSlug: "smart-restaurant-management" },
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: "brain",
    label: "INTELLIGENCE LAYER",
    description: "Making AI workflows useful in everyday tools.",
    skills: [
      { name: "Python", projectSlug: "edufusion-ai" },
      { name: "Machine Learning", projectSlug: "edufusion-ai" },
      { name: "LLMs & RAG", projectSlug: "iug-intelligence-chat-bot" },
    ],
  },
  {
    title: "Backend & Tools",
    icon: "terminal",
    label: "SYSTEMS LAYER",
    description: "The APIs and tooling behind reliable experiences.",
    skills: [
      { name: "FastAPI", projectSlug: "edufusion-ai" },
      { name: "API integration", projectSlug: "smart-restaurant-management" },
      { name: "C & Linux/UNIX", projectSlug: "custom-unix-shell" },
      { name: "Git & GitHub", projectSlug: "smart-restaurant-management" },
    ],
  },
];

// Preserved from the previous skills UI, but not in the main, web/AI-focused shortlist.
// These can be promoted later as priorities change or stronger evidence is added.
export const hiddenSkills = {
  technologies: ["Java", "REST API"],
  competencies: [
    "Object-Oriented Programming",
    "System Design",
    "Clean Code",
    "Application Architecture",
    "AI Tools Development",
    "Deep Learning",
    "Computer Vision",
    "CNN",
    "Data Preprocessing",
    "Image Processing",
    "PyCaret",
    "UI Engineering",
    "Web Engineering",
    "Responsive UI",
    "Digital Tools",
  ],
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Professional" },
  ],
};
