import { Skill } from './skill';

export interface Project {
  id: number;
  title: string;
  description: string;
  short_description: string;
  technologies: Skill[];
  thumbnail: string;
  github_url?: string;
  live_url?: string;
  demo_video?: string;
  status: string;
  featured: boolean;
  images?: ProjectImage[];
}

export interface ProjectImage {
  id: number;
  image: string;
  caption: string;
}