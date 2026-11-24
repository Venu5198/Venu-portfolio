export type PipelineStageStatus = "idle" | "running" | "passed" | "failed";

export interface PipelineStage {
  id: string;
  step: string;
  name: string;
  command: string;
  description: string;
  durationMs: number;
  outputSummary: string;
}

export interface PipelineRunState {
  currentStageIndex: number;
  isRunning: boolean;
  isComplete: boolean;
  totalDurationMs: number;
  stageStatuses: Record<string, PipelineStageStatus>;
  terminalLogs: string[];
}
