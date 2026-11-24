export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  status: "Active" | "Certified";
  credlyUrl?: string;
  verifyUrl?: string;
  code?: string;
  category: "Cloud" | "Containerization" | "Infrastructure as Code" | "Honor";
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  impact: string;
}

export interface Education {
  degree: string;
  field: string;
  location: string;
  institution: string;
}
