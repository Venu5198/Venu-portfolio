"use client";

import React from "react";

export function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle Architectural Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient Gradient Flares */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -left-48 w-[450px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px]" />
      <div className="absolute top-2/3 -right-48 w-[450px] h-[350px] bg-amber-500/10 rounded-full blur-[140px]" />

      {/* Telemetry Coordinate Stamps */}
      <div className="hidden lg:block absolute top-28 left-8 font-mono text-[10px] text-zinc-700 select-none">
        <div>[GEO: 13.6288° N, 79.4192° E]</div>
        <div>[NODE: TIRUPATI_AP_IN]</div>
        <div>[STACK: CLOUD_NATIVE_GITOPS]</div>
      </div>

      <div className="hidden lg:block absolute top-28 right-8 font-mono text-[10px] text-zinc-700 text-right select-none">
        <div>[SYS: REALTIME_TELEMETRY]</div>
        <div>[CLUSTER: PRODUCTION_ACTIVE]</div>
        <div>[KERNEL: LINUX_x86_64]</div>
      </div>
    </div>
  );
}
