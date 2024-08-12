import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TouristguideServiceService } from '../../Services/touristguide-service.service';

@Component({
  selector: 'app-select-place',
  templateUrl: './select-place.component.html',
  styleUrl: './select-place.component.css'
})
export class SelectPlaceComponent {

  locations: string[] = [];
  selectedLocation: string = '';
  userId1: number=0;

  constructor(
    private router: Router, // Inject Router
    private touristGuideService: TouristguideServiceService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId1 = +params['id'] || Number(localStorage.getItem('id')); // Extract userId from query parameters
    });
    console.log(this.userId1);
    this.getAllLocations();
    
  }

  getAllLocations(): void {
    this.touristGuideService.getAllLocations()
      .subscribe(locations => {
        this.locations = locations;
        console.log("hhh");
      });
  }

  onSubmit(): void {
    // Navigate to other component with the selected location
    // For example:
    this.router.navigate(['/user-registration/getByPlace'], { queryParams: { location: this.selectedLocation,userId: this.userId1 }});
  }

}
