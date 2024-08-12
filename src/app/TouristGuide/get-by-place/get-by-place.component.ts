import { Component } from '@angular/core';
import { TouristGuide } from '../../Entities/tourist-guide';
import { TouristguideServiceService } from '../../Services/touristguide-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-get-by-place',
  templateUrl: './get-by-place.component.html',
  styleUrl: './get-by-place.component.css'
})
export class GetByPlaceComponent {

  userId2:number=0;
location: string = '';
touristGuides: TouristGuide[] = [];
errorMessage: string = '';
activeIndex: number = 0;
constructor(private touristGuideService:TouristguideServiceService,private router: Router,
  private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId2 = +params['userId'] || 0;
      this.location = params['location'];
      if (this.location) {
        this.getAllTouristGuides();
      } else {
        // Handle if location is not provided
      }
    });
  }
getAllTouristGuides(): void {
  this.touristGuideService.searchTouristGuides(this.location)
    .subscribe(
      (data) => {
        this.touristGuides = data;
        this.convertPhotos(); // Convert photos to base64
      },
      (error) => {
        this.errorMessage = 'Failed to retrieve tourist guides. Please try again.';
      }
    );
}



convertPhotos(): void {
  this.touristGuides.forEach(guide => {
    // Assuming guide.photo is already in base64 format
    // You can directly use it without conversion
    if (guide.photo) {
      guide.photo = 'data:image/jpeg;base64,' + guide.photo;
    }
  });
}
// navigateToAddTours(touristGuideId?: number): void {
//   if (touristGuideId !== undefined) {
//     this.router.navigate(['/addTours', touristGuideId]);
//   }
// }

// navigateToGetToursByTouristGuideId(id?: number): void {
//   if (id !== undefined) {
//     this.router.navigate(['/getToursByTouristGuideId', id]);
//   }
navigateToGetToursByTouristGuideId(Id?: number): void {
     if (Id !== undefined) {
       this.router.navigate(['/user-registration/touristGuideTours', Id],{ queryParams: {userId: this.userId2 }});
     }


}}


