import { Profile } from "../types/profile";

export const profileData: Profile = {
  name: "Venu K",
  headline: "Backend Developer — Python, DevOps & AI",
  location: "Tirupati, Andhra Pradesh, India",
  experienceYears: "3.6+ Years",
  heroBio:
    "Backend Developer specializing in Python, distributed event systems, DevOps, and AI workflow automation. Key contributor across engineering teams at SyncRivo (real-time messaging bridge syncing Slack, Microsoft Teams, Google Chat, Zoom, and Webex) and OCNORA (AI workflow automation platform)—building high-throughput FastAPI microservices, Redis event queues, Kubernetes/GCP infrastructure, CI/CD pipelines, and autonomous agent runners.",
  extendedBio:
    "Experienced in developing cloud-native distributed backends, real-time cross-platform event bridges, and autonomous AI workflow engines alongside cross-functional engineering teams. Proven record maintaining 99.9%+ availability across 20+ production microservices while cutting cloud infrastructure costs by 20–25%.",
  philosophy: {
    quote: "Building reliable systems, automating everything worth automating.",
    points: [
      "Automate repetitive work",
      "Design for failure",
      "Measure what matters",
      "Keep infrastructure simple",
      "Make production safer with every change",
    ],
  },
  metrics: {
    availability: "99.9%+",
    costReduction: "20–25%",
    microservices: "20+ Services",
    incidentRecovery: "35% Faster",
  },
  contact: {
    email: "venukrishnaya@gmail.com",
    phone: "+91 6281369468",
    github: "https://github.com/Venu5198",
    linkedin: "https://www.linkedin.com/in/venu-k-2a4460383",
    credly: "https://www.credly.com/users/venu-krishnaya",
  },
  photoUrl: "/images/venu-profile.jpg",
};
