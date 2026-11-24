export interface SkillItem {
  name: string;
  proficiency?: "Expert" | "Production Core" | "Advanced";
  tag: string;
}

export interface SkillDomain {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: "cyan" | "emerald" | "amber" | "purple";
  skills: SkillItem[];
}
