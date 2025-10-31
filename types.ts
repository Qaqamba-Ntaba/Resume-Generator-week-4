
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  certificatesUrl?: string;
  profilePictureUrl?: string;
}

export interface Experience {
  id: number;
  jobTitle: string;
  company: string;
  dates: string;
  bulletPoints: string[];
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  dates: string;
}

export interface Skill {
  id: number;
  name: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

export type TemplateName = 'modern' | 'creative' | 'classic';

// User input types, simpler for form entry before AI processing
export interface UserExperienceInput {
  id: number;
  jobTitle: string;
  company: string;
  dates: string;
  duties: string;
}

export interface UserInput {
  personalInfo: PersonalInfo;
  summaryKeywords: string;
  experience: UserExperienceInput[];
  education: Education[];
  skills: Skill[];
}