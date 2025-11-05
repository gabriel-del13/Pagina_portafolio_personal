import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.html'
})
export class ProjectsComponent implements OnInit {
  dataService = inject(DataService);
  filter = signal('all');

  ngOnInit() {
    this.dataService.loadProjects();
  }

  get filteredProjects() {
    if (this.filter() === 'all') return this.dataService.projects();
    return this.dataService.projects().filter(p => p.status === this.filter());
  }

  setFilter(status: string) {
    this.filter.set(status);
  }
}