export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  email: string;
  github?: string;
  linkedin?: string;
  profile_image?: string;
  resume?: string;
}