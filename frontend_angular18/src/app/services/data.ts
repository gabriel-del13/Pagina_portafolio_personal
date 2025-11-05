import { Injectable, signal } from '@angular/core';
import { ApiService } from './api';
import { Profile } from '../models/profile';
import { Project } from '../models/project';
import { Skill } from '../models/skill';

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  profile = signal<Profile | null>(null);
  projects = signal<Project[]>([]);
  skills = signal<Skill[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private api: ApiService) {}

  loadProfile() {
    this.loading.set(true);
    this.error.set(null);
    
    this.api.get<Profile>('/profile/current/').subscribe({
      next: (data) => {
        this.profile.set(data);
        this.loading.set(false);
        console.log('Profile loaded:', data);
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.error.set('Error al cargar el perfil');
        this.loading.set(false);
      }
    });
  }

  loadProjects() {
    this.loading.set(true);
    this.error.set(null);
    
    this.api.get<PaginatedResponse<Project>>('/projects/').subscribe({
      next: (response) => {
        this.projects.set(response.results); // ← Extraer results
        this.loading.set(false);
        console.log('Projects loaded:', response.results);
      },
      error: (err) => {
        console.error('Error loading projects:', err);
        this.error.set('Error al cargar proyectos');
        this.loading.set(false);
      }
    });
  }

  loadSkills() {
    this.loading.set(true);
    this.error.set(null);
    
    this.api.get<PaginatedResponse<Skill>>('/skills/').subscribe({
      next: (response) => {
        this.skills.set(response.results); // ← Extraer results
        this.loading.set(false);
        console.log('Skills loaded:', response.results);
      },
      error: (err) => {
        console.error('Error loading skills:', err);
        this.error.set('Error al cargar habilidades');
        this.loading.set(false);
      }
    });
  }

  getProjectById(id: number) {
    return this.api.get<Project>(`/projects/${id}/`);
  }

  sendContact(data: any) {
    return this.api.post('/contact/', data);
  }
}