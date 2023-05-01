import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-progress',
  templateUrl: './loading-progress.component.html',
  styleUrls: ['./loading-progress.component.css']
})
export class LoadingProgressComponent {
  @Input() message: string = "Loading...";
}
