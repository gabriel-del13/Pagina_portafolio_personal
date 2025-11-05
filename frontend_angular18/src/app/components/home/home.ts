import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {
  dataService = inject(DataService);

  ngOnInit() {
    this.dataService.loadProfile();
    this.dataService.loadProjects();
  }

  get featuredProjects() {
    return this.dataService.projects().filter(p => p.featured).slice(0, 3);
  }
}