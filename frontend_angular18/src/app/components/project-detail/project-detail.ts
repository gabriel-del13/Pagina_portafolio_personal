import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-detail.html'
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private dataService = inject(DataService);
  
  project = signal<Project | null>(null);
  loading = signal(true);
  selectedImage = signal<string | null>(null);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getProjectById(id).subscribe({
      next: (data) => {
        this.project.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading.set(false);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  openImageModal(imageUrl: string) {
    this.selectedImage.set(imageUrl);
    document.body.style.overflow = 'hidden';
  }

  closeImageModal() {
    this.selectedImage.set(null);
    document.body.style.overflow = 'auto';
  }
}