import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TourServiceService } from '../../Services/tour-service.service';
import { Tour } from '../../Entities/tour';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-tour',
  templateUrl: './update-tour.component.html',
  styleUrls: ['./update-tour.component.css']
})
export class UpdateTourComponent implements OnInit {

  tours: Tour[] = [];

  tourForm!: FormGroup;
  errorMessage: string = '';
  photoPreview: string | ArrayBuffer | null = null;
  tourId: number=0;
  touristGuideId: number | null = null; // Variable to store touristGuideId
  constructor(
    private formBuilder: FormBuilder,
    private tourService: TourServiceService,
    private route: ActivatedRoute, private router:Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.tourId = +this.route.snapshot.paramMap.get('tourId')!;
    this.getTourDetails(this.tourId);
    this.route.queryParams.subscribe(params => {
      this.touristGuideId = +params['touristGuideId']; // Retrieve touristGuideId from query params
    });
  }

  initializeForm(): void {
    this.tourForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['', Validators.required],
      tourPhoto: [null],
      smallDescription: ['', Validators.required],
      averageRating: ['', Validators.required]
    });
  }

  
  getTourDetails(tourId: number): void {
    this.tourService.getTourById(tourId).subscribe(
      (tour: Tour) => {
        this.tourForm.patchValue({
          name: tour.name,
          description: tour.description,
          price: tour.price,
          duration: tour.duration,
          smallDescription: tour.smallDescription,
          averageRating: tour.averageRating
        });
        if (tour.tourPhoto) {
         
          this.photoPreview = 'data:image/jpeg;base64,' + tour.tourPhoto
          this.tourForm.patchValue({ tourPhoto: tour.tourPhoto });
        }
      },
      error => {
        this.errorMessage = 'Failed to retrieve tour details';
      }
    );
  }
  convertPhotos(): void {
    this.tours.forEach(tour => {
      if (tour.tourPhoto) {
        tour.tourPhoto = 'data:img/jpeg;base64,' + tour.tourPhoto;
      }
    });
  }

  
    onPhotoSelected(event: any): void {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        
        reader.readAsDataURL(file);
        reader.onload = () => {
          
          const base64Image = reader.result as string;
          const uint8Array = new Uint8Array(atob(base64Image.split(',')[1]).split('').map(char=>char.charCodeAt(0)));
          const imageData = this.uint8ArrayToBase64(uint8Array);
          this.photoPreview = base64Image;
          this.tourForm.patchValue({ tourPhoto: imageData });
          this.tourForm.get('tourPhoto')?.updateValueAndValidity();
        };
      }
    }
  
    uint8ArrayToBase64(uint8Array: Uint8Array): string {
      let binary = '';
      for (let i = 0; i < uint8Array.length; i++) {
        binary += String.fromCharCode(uint8Array[i]);
      }
      return window.btoa(binary);
    }

  updateTour(): void {
    if (this.tourForm.valid) {
      const updatedTour: Tour = {
        id: this.tourId,
        name: this.tourForm.value.name,
        description: this.tourForm.value.description,
        price: this.tourForm.value.price,
        duration: this.tourForm.value.duration,
        tourPhoto: this.tourForm.value.tourPhoto,
        smallDescription: this.tourForm.value.smallDescription,
        averageRating: this.tourForm.value.averageRating
      };
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.tourService.updateTour(this.tourId, updatedTour).subscribe(
          (data) => {
          console.log('Tour updated successfully');
            console.log(data);
          Swal.fire("Changes Updated Successfully!", "", "success").then((res=>{
            this.router.navigate(['admin-registration/adminTouristGuides/adminTours', this.touristGuideId]);
          }));
        },
        error => {
          Swal.fire({
            title: "Error",
            text: error.error,
            icon: "error"
          });
               this.errorMessage = 'Failed to update tour. Please try again.';
             }
           );
        } else if (result.isDenied) {
          Swal.fire("Changes are not Updated", "", "info");
        }
      });
     
    }
  }
}
