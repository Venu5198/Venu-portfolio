import { Certification, Award, Education } from "../types/certification";

export const certificationsData: Certification[] = [
  {
    id: "aws-devops-pro",
    title: "AWS Certified DevOps Engineer – Professional",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "Jan 2025",
    status: "Active",
    credlyUrl: "https://www.credly.com/users/venu-krishnaya",
    category: "Cloud",
  },
  {
    id: "cka",
    title: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation (CNCF)",
    issueDate: "Jun 2023",
    status: "Certified",
    credlyUrl: "https://www.credly.com/users/venu-krishnaya",
    category: "Containerization",
  },
  {
    id: "terraform-assoc",
    title: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    issueDate: "Nov 2022",
    status: "Certified",
    credlyUrl: "https://www.credly.com/users/venu-krishnaya",
    category: "Infrastructure as Code",
  },
];

export const awardsData: Award[] = [
  {
    id: "reliability-champion",
    title: "Reliability Champion Award",
    issuer: "SyncRivo",
    date: "Mar 2025",
    description:
      "Awarded for exceptional operational excellence, sustaining 99.98% production uptime across distributed real-time messaging services and maintaining zero message loss.",
    impact: "99.98% Uptime & 0% Duplication Across 4 Enterprise Platforms",
  },
];

export const educationData: Education = {
  degree: "Bachelor of Technology (B.Tech)",
  field: "Computer Science and Engineering",
  institution: "Tirupati",
  location: "Andhra Pradesh, India",
};
