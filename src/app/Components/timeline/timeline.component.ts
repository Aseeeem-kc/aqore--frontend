import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {

  constructor(private router: Router) { }

  navigateToCVUpload(position: string): void {
    // Store the selected position in localStorage for the CV upload component
    localStorage.setItem('selectedPosition', position);
    this.router.navigate(['/cv-upload']);
  }
}
