import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TourServiceService } from '../../Services/tour-service.service';
import { Tour } from '../../Entities/tour';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-tours',
  templateUrl: './add-tours.component.html',
  styleUrl: './add-tours.component.css'
})
export class AddToursComponent {
 
  tourForm!: FormGroup;
  errorMessage: string = '';
  photoPreview: string | ArrayBuffer | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private tourService: TourServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.tourForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['', Validators.required],
      tourPhoto: [null, Validators.required],
      smallDescription:['',Validators.required],
    averageRating:['',Validators.required]
    });
  }

  addTour(): void {
    if (this.tourForm.valid) {
      const touristGuideIdParam: string | null = this.route.snapshot.paramMap.get('touristGuideId');
      let touristGuideId: number | null = touristGuideIdParam !== null ? parseInt(touristGuideIdParam, 10) : null;

      if (touristGuideId === null) {
        console.error('Tourist Guide ID is null');
        return; // Exit the function early if touristGuideId is null
      }

     
      const tour:Tour={
              name:this.tourForm.value.name,
       description: this.tourForm.value.description,
        price:this.tourForm.value.price,
        duration:this.tourForm.value.duration,
        tourPhoto:this.tourForm.value.tourPhoto,
        smallDescription:this.tourForm.value.smallDescription,
    averageRating:this.tourForm.value.averageRating
      };

      this.tourService.addTourWithTouristGuideId(touristGuideId, tour).subscribe(
        (data) => {
         console.log(data);
         Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        }).then((res=>{
          this.router.navigate(['/admin-registration/adminTouristGuides/adminTours',touristGuideId]);
        }));
        
        },
        error => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error in adding Tour",
            showConfirmButton: false,
            timer: 1500});
          this.errorMessage = 'Failed to add tour. Please try again.';
        }
      );
    }
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
}