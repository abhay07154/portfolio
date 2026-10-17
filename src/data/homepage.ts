export const profile = {
  name: "Abhay Upadhyay",
  role: "Software Engineer — Backend & AI Systems",
  education: "B.Tech ECE, IIIT Allahabad",
  github: "https://github.com/abhay07154",
  currentWork: "building at Pocket FM.",
} as const;

export type Experience = {
  company: string;
  headline: string;
  role: string;
  period: string;
  technologies: string;
  responsibilities: readonly string[];
};

// Supplied career facts. Keep private implementation details out of public copy.
export const experience = {
  pocketFm: {
    company: "Pocket FM",
    headline: "AI-powered content workflows",
    role: "Software Engineer, Backend",
    period: "July 2026–present",
    technologies: "Django, Next.js, Temporal",
    responsibilities: [
      "Build AI-powered content workflows, backend APIs, and asynchronous processing.",
      "Work on Temporal orchestration and production integrations.",
    ],
  },
  yugabyte: {
    company: "Yugabyte",
    headline: "distributed database testing",
    role: "SDET Intern",
    period: "Aug–Dec 2025",
    technologies: "Cypress, Python, Kubernetes, AWS, Azure",
    responsibilities: [
      "Test distributed databases through automation, upgrade testing, and point-in-time recovery (PITR) testing.",
      "Worked on CI reliability.",
    ],
  },
  amazon: {
    company: "Amazon",
    headline: "backend services & processing",
    role: "SDE Intern",
    period: "May–July 2025",
    technologies: "Java, AWS Lambda, API Gateway, DynamoDB, S3",
    responsibilities: [
      "Built backend services and optimized concurrent JSON processing, achieving an approximately 5× improvement.",
      "Improved operational tooling and test coverage.",
    ],
  },
} satisfies Record<string, Experience>;

export type ExperienceId = keyof typeof experience;

export const domainIds = ["backend", "ai-systems", "frontend"] as const;
export type DomainId = (typeof domainIds)[number];

export type ExpertiseArea = {
  title: string;
  description: string;
};

export type DomainContent = {
  label: string;
  positioning: string;
  description: string;
  experienceIds: readonly ExperienceId[];
  expertise: readonly ExpertiseArea[];
};

// Employment highlights, not public project case studies. No private project links.
export const domainContent: Record<DomainId, DomainContent> = {
  backend: {
    label: "Backend",
    positioning: profile.role,
    description:
      "I build backend services with Java and AWS, and APIs and async workflows with Django and Temporal.",
    experienceIds: ["amazon"],
    expertise: [
      {
        title: "Backend services",
        description:
          "Built backend services at Amazon using Java, AWS Lambda, API Gateway, DynamoDB, and S3.",
      },
      {
        title: "Async processing",
        description:
          "Work on backend APIs, asynchronous processing, and Temporal orchestration at Pocket FM.",
      },
      {
        title: "Database testing",
        description:
          "Tested distributed databases at Yugabyte, covering upgrades, point-in-time recovery, and CI reliability.",
      },
    ],
  },
  "ai-systems": {
    label: "AI Systems",
    positioning: "Software Engineer — AI-Powered Workflows",
    description:
      "I work on AI-powered content workflows at Pocket FM, using Django, Temporal, and production integrations.",
    experienceIds: ["pocketFm"],
    expertise: [
      {
        title: "Content workflows",
        description:
          "Build AI-powered content workflows as a backend software engineer at Pocket FM.",
      },
      {
        title: "Orchestration",
        description:
          "Use Temporal for workflow orchestration and asynchronous processing at Pocket FM.",
      },
      {
        title: "Integrations",
        description:
          "Work on Django backend APIs and production integrations for AI-powered content workflows.",
      },
    ],
  },
  frontend: {
    label: "Frontend",
    positioning: "Software Engineer — UI Integration & Testing",
    description:
      "My work spans Next.js at Pocket FM and Cypress test automation and CI reliability at Yugabyte.",
    experienceIds: ["yugabyte"],
    expertise: [
      {
        title: "Next.js",
        description:
          "Work with Next.js alongside Django and Temporal in Pocket FM’s engineering stack.",
      },
      {
        title: "Cypress testing",
        description:
          "Used Cypress for automation during my SDET internship at Yugabyte.",
      },
      {
        title: "CI reliability",
        description:
          "Worked on automation and CI reliability at Yugabyte using Cypress and Python.",
      },
    ],
  },
};

export const portfolioIds = ["all", ...domainIds] as const;
export type PortfolioId = (typeof portfolioIds)[number];
export const portfolioContent: Record<PortfolioId, DomainContent> = {
  all: {
    label: "Everything",
    positioning: profile.role,
    description:
      "I build backend services, work on AI-powered workflows, and test the systems behind them. Three domains below — pick the one you came for.",
    experienceIds: ["pocketFm", "amazon", "yugabyte"],
    expertise: [
      domainContent.backend.expertise[0],
      domainContent["ai-systems"].expertise[1],
      domainContent.frontend.expertise[1],
    ],
  },
  ...domainContent,
};
export const disciplines = [
  "Backend services",
  "AI workflows",
  "Distributed databases",
  "APIs & data",
  "Temporal",
  "Next.js",
  "Test automation",
  "Cloud infrastructure",
] as const;
