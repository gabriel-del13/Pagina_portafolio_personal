import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html'
})
export class ContactComponent {
  private dataService = inject(DataService);
  
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  loading = signal(false);
  success = signal(false);
  error = signal(false);

  onSubmit() {
    this.loading.set(true);
    this.success.set(false);
    this.error.set(false);

    this.dataService.sendContact(this.formData).subscribe({
      next: () => {
        this.success.set(true);
        this.loading.set(false);
        this.formData = { name: '', email: '', subject: '', message: '' };
      },
      error: (err) => {
        console.error('Error:', err);
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }
}