export interface ProjectMetric {
  label: string;
  value: string;
  change?: string;
}

export interface ArchitectureHighlight {
  domain: string;
  title: string;
  description: string;
  badges: string[];
}

export interface ArchitectureDecision {
  title: string;
  category: string;
  decision: string;
  tradeoff: string;
  badges: string[];
}

export interface EngineeringBreakdown {
  contextScale: {
    problem: string;
    scaleSummary: string;
    metrics: { label: string; value: string }[];
    scopePoints: string[];
  };
  coreDecisions: ArchitectureDecision[];
  reliabilitySecurity: {
    uptimeSla: string;
    resilienceMechanisms: { title: string; detail: string }[];
    securityCompliance: string[];
  };
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  role: string;
  category: "Flagship SaaS" | "AI Platform" | "Cloud & DevOps";
  liveUrl?: string;
  githubUrl?: string;
  summary: string;
  overview: string;
  highlights: string[];
  architecture: ArchitectureHighlight[];
  stack: string[];
  metrics: ProjectMetric[];
  statusTelemetry: {
    status: "Operational" | "Live Production" | "Active";
    uptime: string;
    nodeCount?: string;
    syncLatency?: string;
  };
  featured: boolean;
  engineeringBreakdown?: EngineeringBreakdown;
}
