import React from "react";
import { ThemeProvider } from "@/shared/context/ThemeContext";
import { PortfolioShell } from "@/features/PortfolioShell";

export default function Home() {
  return (
    <ThemeProvider>
      <PortfolioShell />
    </ThemeProvider>
  );
}
