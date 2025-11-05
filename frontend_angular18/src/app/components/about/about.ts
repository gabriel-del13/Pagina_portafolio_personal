import { Component, computed,OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html'
})
export class AboutComponent implements OnInit {
  dataService = inject(DataService);

  ngOnInit() {
    this.dataService.loadProfile();
    this.dataService.loadSkills();
  }
}