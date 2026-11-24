export interface SocialLinks {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  credly: string;
}

export interface Profile {
  name: string;
  headline: string;
  location: string;
  experienceYears: string;
  heroBio: string;
  extendedBio: string;
  philosophy: {
    quote: string;
    points: string[];
  };
  metrics: {
    availability: string;
    costReduction: string;
    microservices: string;
    incidentRecovery: string;
  };
  contact: SocialLinks;
  photoUrl: string;
}
