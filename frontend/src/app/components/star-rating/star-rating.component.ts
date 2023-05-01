import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  indices: number[] = [1, 2, 3, 4, 5];
  @Input() rating = 0;
  @Input() active = false;
  @Output() private ratingUpdated = new EventEmitter();

  onClick(index: number) {
    if (!this.active)
      return;
    this.rating = index;
    this.ratingUpdated.emit(this.rating);
  }

  getIconAtIndex(index: number) {
    if (this.rating >= index) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}
