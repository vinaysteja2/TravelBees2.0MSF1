import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TouristguideServiceService } from '../../Services/touristguide-service.service';

@Component({
  selector: 'app-touristguide-tours',
  templateUrl: './touristguide-tours.component.html',
  styleUrl: './touristguide-tours.component.css'
})
export class TouristguideToursComponent {

  userId3:number=0;
  touristGuide: any={};
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private touristGuideService: TouristguideServiceService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId3 = +params['userId'] || 0; // Extract userId from query parameters
    });
    const idParam = this.route.snapshot.paramMap.get('Id');
    if (idParam !== null) {
      this.id = +idParam;
      this.getTouristGuide();
    } else {
      console.error('No ID parameter found in the route.');
    }
  }

  getTouristGuide(): void {
    this.touristGuideService.getTouristGuideToursById(this.id)
      .subscribe(
        (data) => {
          this.touristGuide = data;
          this.convertPhotos(); // Convert photos to base64
        },
        (error) => {
          console.error('Error fetching tourist guide:', error);
        }
      );
  }

  convertPhotos(): void {
    if (this.touristGuide.photo) {
      this.touristGuide.photo = `data:image/jpeg;base64,` + this.touristGuide.photo;
    }
    if (this.touristGuide.tour) {
      this.touristGuide.tour.forEach((tour: any) => {
        if (tour.tourPhoto) { // Adjusted to use tourPhoto instead of photo
          tour.tourPhoto = `data:image/jpeg;base64,` + tour.tourPhoto;
        }
      });
    }
  }
  getTourDetails(tourId: number): void {
    this.router.navigate(['/user-registration/tourById', tourId],{ queryParams: { userId: this.userId3 }});
  }
}


