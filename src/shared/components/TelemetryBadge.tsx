import React from "react";
import { cn } from "../utils/cn";

interface TelemetryBadgeProps {
  status?: "online" | "healthy" | "active" | "alert";
  label: string;
  subLabel?: string;
  className?: string;
}

export function TelemetryBadge({
  status = "online",
  label,
  subLabel,
  className,
}: TelemetryBadgeProps) {
  const dotColors = {
    online: "bg-emerald-400 shadow-[0_0_10px_#10B981]",
    healthy: "bg-cyan-400 shadow-[0_0_10px_#06B6D4]",
    active: "bg-emerald-400 shadow-[0_0_10px_#10B981]",
    alert: "bg-amber-400 shadow-[0_0_10px_#F59E0B]",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md font-mono text-xs text-zinc-300 tracking-wider",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            dotColors[status]
          )}
        />
        <span
          className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            dotColors[status]
          )}
        />
      </span>
      <span className="font-medium text-zinc-200">{label}</span>
      {subLabel && <span className="text-zinc-500 font-mono">[{subLabel}]</span>}
    </div>
  );
}
