import { Project } from "../types/project";

export const projectsData: Project[] = [
  {
    id: "syncrivo",
    slug: "syncrivo",
    title: "SyncRivo",
    tagline:
      "Enterprise real-time messaging bridge syncing Slack, Microsoft Teams, Google Chat, Zoom Team Chat, and Cisco Webex.",
    role: "Founding Engineer & Sole Developer (Full Stack, DevOps & AI)",
    category: "Flagship SaaS",
    liveUrl: "https://syncrivo.ai/en/",
    summary:
      "Built and run alone from first commit to production: multi-service distributed architecture syncing messages, threads, attachments, edits, deletes, and reactions across 5 enterprise platforms with zero loop duplication.",
    overview:
      "Designed and deployed a high-throughput, low-latency messaging bridge serving enterprise cross-organization collaboration across Slack, Microsoft Teams, Google Chat, Zoom Team Chat, and Cisco Webex. Solved complex distributed messaging challenges including asynchronous race conditions, bidirectional @mention translations, file chunk proxies, and strict enterprise compliance.",
    highlights: [
      "Interoperability across 5 platforms: Slack, Microsoft Teams, Google Chat, Zoom Team Chat, and Cisco Webex.",
      "Official verified listings on Microsoft AppSource, Google Workspace Marketplace, Zoom App Marketplace, and Webex App Hub.",
      "Multi-service architecture (shared auth library, auth/dashboard service, chat service, React 19 frontend), each with dedicated CI/CD pipelines.",
      "FastAPI backends on MongoDB with Redis cluster for sub-millisecond deduplication, caching, and distributed locks.",
      "Real-time sync of edits, deletes, threads, attachments, and file cards across all 5 platforms with native sender attribution.",
      "Native sender attribution via Teams delegated tokens, Slack chat:write.customize, Google domain-wide delegation, Zoom OAuth, and Webex OAuth.",
      "Comprehensive loop/echo protection algorithms preventing cascading message reflection across interconnected channels.",
      "In-chat interactive .search and .support commands with native modal dialogs in Slack and Teams.",
      "Enterprise security: HttpOnly sessions, CSRF guards, RBAC, rate-limiting, and led HIPAA readiness with BAA negotiations and SOC 2 prep.",
      "Zero-downtime Cloud Run operations with proactive cold-start mitigation, cost audits, and automated rollback guards.",
    ],
    architecture: [
      {
        domain: "Backend & Event Mesh",
        title: "FastAPI + Redis Event Bus",
        description:
          "High-throughput webhook receivers with Redis pub/sub queueing to decouple platform ingestion from transformation and delivery across 5 messaging APIs.",
        badges: ["FastAPI", "Python", "Redis", "MongoDB", "AsyncIO"],
      },
      {
        domain: "Enterprise Identity & Auth",
        title: "Versioned Artifact Registry Library",
        description:
          "Custom multi-tenant auth module published as a private Python package to Google Artifact Registry, standardizing token lifecycle, Zoom/Teams/Slack OAuth, and permission validation.",
        badges: ["OAuth 2.0", "Artifact Registry", "JWT", "RBAC", "HIPAA"],
      },
      {
        domain: "Platform Normalization",
        title: "Bidirectional Translation Engine",
        description:
          "Unified normalization schema mapping Markdown, Slack mrkdwn, Teams HTML, Zoom formatting, and Webex formatting seamlessly with identity attribution.",
        badges: ["Slack API", "Microsoft Graph", "Google Chat", "Zoom API", "Webex"],
      },
      {
        domain: "Frontend & Operations",
        title: "React 19 Operations Hub",
        description:
          "Modern administrative portal featuring interactive channel mappings, audit logs, team invites, and connection health telemetry.",
        badges: ["React 19", "Vite", "Tailwind CSS", "shadcn/ui", "TanStack"],
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "MongoDB",
      "Redis",
      "React 19",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "Google Cloud Run",
      "Artifact Registry",
    ],
    metrics: [
      { label: "Platforms Synced", value: "5 Ecosystems" },
      { label: "Bridge Latency", value: "< 95ms" },
      { label: "Uptime SLA", value: "99.98%" },
      { label: "Loop Guards", value: "100% Echo Free" },
    ],
    statusTelemetry: {
      status: "Operational",
      uptime: "99.98%",
      syncLatency: "88ms",
      nodeCount: "5 Active Platforms",
    },
    featured: true,
  },
  {
    id: "ocnora",
    slug: "ocnora",
    title: "OCNORA",
    tagline:
      "AI workflow automation platform coordinating AI agents, 1,000+ app integrations, and software delivery.",
    role: "Founding Engineer & Sole Developer (AI Workflow Automation Platform)",
    category: "AI Platform",
    liveUrl: "https://ocnora.ai/",
    summary:
      "Engineered an autonomous workflow platform from scratch: custom state-machine execution engine connecting 1,000+ providers, natural-language workflow synthesis with AI cost governance, and an autonomous Git worktree code runner.",
    overview:
      "Built alone to challenge existing workflow builders like n8n. Architected an enterprise-grade execution graph supporting arbitrary triggers, nested step execution, dry runs, suspend/resume of long-running workflows, and an AI agent fleet that implements product backlog tasks in isolated git worktrees.",
    highlights: [
      "Custom stateful workflow execution engine connecting 1,000+ cataloged app and cloud providers (GCP, AWS, Salesforce, Notion, Workspace, HTTP).",
      "Built 'Build with AI' module: translates natural language requirements into fully connected workflow graphs with automatic parameter filling and prompt enhancements.",
      "AI model catalog with auto-discovery and per-node LLM routing (Gemini, Claude, GPT), with tenant-level USD and token budgets.",
      "Autonomous Development Runner: AI coding agents that pick up queued backlog tasks in isolated git worktrees, execute verification suites, and open GitHub PRs.",
      "Visual node-graph builder canvas, Ops Center, and live execution diff viewer built with Next.js and Tailwind CSS.",
      "Took a 120-defect legacy test backlog to zero through comprehensive verification gates (lint, types, unit, component, Playwright E2E).",
      "Enterprise security: envelope-encrypted secrets (Cloud KMS / AWS KMS), tenant isolation in data layer, OIDC / SAML 2.0 SSO, and JIT provisioning.",
      "Self-hosted deployment via Docker Compose or Helm, plus managed cloud deployments on Cloud Run and GKE.",
    ],
    architecture: [
      {
        domain: "Workflow Runtime",
        title: "Stateful Execution Graph",
        description:
          "Topological sorting engine supporting asynchronous polling, event triggers, conditional branch branching, and checkpoint state persistence.",
        badges: ["Python", "AsyncIO", "MongoDB", "Docker", "GKE"],
      },
      {
        domain: "AI Intelligence Layer",
        title: "Model Router & Cost Ledger",
        description:
          "Intelligent model selector balancing token price and context requirements with hard budget alerts and per-call token consumption limits.",
        badges: ["LLM Routing", "Prompt Engineering", "Cost Guardrails", "Token Ledger"],
      },
      {
        domain: "Autonomous CI/CD Agent",
        title: "Worktree Task Dispatcher",
        description:
          "Isolated development runner that leases git branches, runs automated fixes, executes test suites, and opens pull requests with automated test evidence.",
        badges: ["Git Worktrees", "AI Agents", "GitHub Actions", "pytest"],
      },
      {
        domain: "Interactive Canvas UI",
        title: "High-Performance Node Editor",
        description:
          "Interactive workflow canvas featuring sub-millisecond node dragging, live execution diffs, and inspectable payload inspector.",
        badges: ["Next.js", "Tailwind CSS", "React Flow", "Vitest", "Playwright"],
      },
    ],
    stack: [
      "Python",
      "MongoDB",
      "Next.js",
      "Tailwind CSS",
      "Docker",
      "Google Cloud Run",
      "GKE",
      "pytest",
      "Vitest",
      "Playwright",
    ],
    metrics: [
      { label: "App Providers", value: "1,000+ Ready" },
      { label: "Defects Cleared", value: "120 → 0 Bugs" },
      { label: "Execution Engine", value: "Sub-10ms Dispatch" },
      { label: "AI Worktree Runner", value: "Autonomous PRs" },
    ],
    statusTelemetry: {
      status: "Live Production",
      uptime: "99.95%",
      syncLatency: "14ms",
      nodeCount: "1,000+ Providers",
    },
    featured: true,
  },
  {
    id: "gcp-cost-finops",
    slug: "gcp-cost-finops",
    title: "GCP FinOps & Resource Optimization Engine",
    tagline:
      "Automated cloud-cost optimization engine eliminating underutilized resources and optimizing container cold starts.",
    role: "DevOps & Cloud Architect",
    category: "Cloud & DevOps",
    summary:
      "Engineered automated cloud optimization workflows analyzing telemetry, container compute profiles, and storage lifecycles to reduce monthly cloud expenditure by 20–25%.",
    overview:
      "Developed scheduled cloud functions and custom Prometheus exporters that audit persistent disks, unattached IPs, idle Cloud Run instances, and compute allocations across development and production environments.",
    highlights: [
      "Achieved 20–25% reduction in total cloud spend within 60 days of deployment.",
      "Optimized Cloud Run min-instance configurations to eliminate cold starts on critical paths while minimizing idle billing.",
      "Automated ephemeral environment tear-down and automated disk snapshot pruning.",
    ],
    architecture: [
      {
        domain: "FinOps Telemetry",
        title: "Cost Anomaly Detector",
        description:
          "Python automation scraping GCP billing APIs and Cloud Monitoring to alert on spending spikes and resource regressions.",
        badges: ["GCP", "Python", "Cloud Monitoring", "BigQuery"],
      },
    ],
    stack: ["Google Cloud", "Python", "Docker", "Prometheus", "Terraform", "GitHub Actions"],
    metrics: [
      { label: "Cost Reduction", value: "20–25%" },
      { label: "Idle Waste", value: "Zero Unused IPs" },
    ],
    statusTelemetry: {
      status: "Active",
      uptime: "99.99%",
    },
    featured: false,
  },
  {
    id: "gitops-platform-fleet",
    slug: "gitops-platform-fleet",
    title: "Kubernetes GitOps & Argo Fleet",
    tagline:
      "Production-grade Kubernetes platform operating 20+ microservices with automated blue-green rollouts.",
    role: "Platform & DevOps Engineer",
    category: "Cloud & DevOps",
    summary:
      "Designed and maintained declarative multi-cluster deployment topologies using Argo CD and Helm, enabling 99.9%+ availability and 35% faster incident turnaround.",
    overview:
      "Standardized deployment manifest repositories with Helm charts, automated rollback thresholds, RBAC access boundaries, and Prometheus alert managers.",
    highlights: [
      "Engineered automated GitOps delivery pipelines handling 20+ production services.",
      "Implemented automated canary and blue-green deployments via Argo Rollouts.",
      "Reduced mean time to recovery (MTTR) by 30–35% with correlated Prometheus/Grafana dashboards.",
    ],
    architecture: [
      {
        domain: "Continuous Delivery",
        title: "Argo CD Declarative Fleet",
        description:
          "Git-driven desired-state reconciliation with automated drift detection and instant rollback mechanisms.",
        badges: ["Argo CD", "Kubernetes", "Helm", "GitOps", "Argo Rollouts"],
      },
    ],
    stack: ["Kubernetes", "Argo CD", "Helm", "Docker", "Prometheus", "Grafana", "GitHub Actions"],
    metrics: [
      { label: "Microservices", value: "20+ Active" },
      { label: "Service Uptime", value: "99.9%+" },
    ],
    statusTelemetry: {
      status: "Active",
      uptime: "99.99%",
    },
    featured: false,
  },
];
