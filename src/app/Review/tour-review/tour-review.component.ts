import { Component } from '@angular/core';
import { Review } from '../../Entities/review';
import { ReviewServiceService } from '../../Services/review-service.service';

@Component({
  selector: 'app-tour-review',
  templateUrl: './tour-review.component.html',
  styleUrl: './tour-review.component.css'
})
export class TourReviewComponent {

  tourId: number; // Manually set the tourId here if needed
  review: Review = new Review();
  errorMessage: string = '';

  constructor(private reviewService: ReviewServiceService) {
    // Manually set the tourId here if needed
    this.tourId = 1; // Example: Set tourId to 1
  }

  addReview(): void {
    this.reviewService.addReviewToTour(this.tourId, this.review)
      .subscribe(
        (response) => {
          console.log('Review added successfully:', response);
          // Handle success as needed
        },
        (error) => {
          console.error('Failed to add review:', error);
          this.errorMessage = 'Failed to add review. Please try again.';
        }
      );
  }}

