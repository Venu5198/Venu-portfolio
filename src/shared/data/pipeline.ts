import { PipelineStage } from "../types/pipeline";

export const pipelineStages: PipelineStage[] = [
  {
    id: "typecheck",
    step: "01",
    name: "Typecheck (tsc)",
    command: "npx tsc --noEmit",
    description: "Evaluates strict TypeScript signatures across all components, shared types, and data models.",
    durationMs: 460,
    outputSummary: "Found 0 type errors across all source files. Strict checking passed.",
  },
  {
    id: "build",
    step: "02",
    name: "Production Build (next build)",
    command: "next build --turbopack",
    description: "Compiles server & client modules, generates optimized chunks, and verifies tree shaking.",
    durationMs: 620,
    outputSummary: "Compiled client/server bundle in 2.8s. Production bundle optimized.",
  },
  {
    id: "routes",
    step: "03",
    name: "Route & Asset Verification",
    command: "verify static routes (4/4)",
    description: "Prerenders static routes (/ and /_not-found) with sub-millisecond edge hydration.",
    durationMs: 380,
    outputSummary: "Static pages 4/4 generated. Zero hydration mismatches detected.",
  },
  {
    id: "edge",
    step: "04",
    name: "Edge Deploy Readiness",
    command: "deploy --prod (zero-downtime)",
    description: "Verifies immutable caching, HTTP/3 headers, and seamless traffic cutover.",
    durationMs: 320,
    outputSummary: "All verification gates green. Ready for edge deployment.",
  },
];
