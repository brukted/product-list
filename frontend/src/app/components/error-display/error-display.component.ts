import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.css']
})
export class ErrorDisplayComponent {
  @Input() message: string = "An error occurred. Please refresh the page and try again.";
}
