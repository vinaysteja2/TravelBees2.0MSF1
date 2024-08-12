import { Component } from '@angular/core';
import { TouristGuide } from '../../Entities/tourist-guide';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TouristguideServiceService } from '../../Services/touristguide-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-touristguides',
  templateUrl: './update-touristguides.component.html',
  styleUrl: './update-touristguides.component.css'
})
export class UpdateTouristguidesComponent {
  touristGuide: TouristGuide[] = [];

  touristGuideForm!: FormGroup;
  errorMessage: string = '';
  photoPreview: string | ArrayBuffer | null = null;
 // tourId: number=0;
  touristGuideId: number=0; // Variable to store touristGuideId
  constructor(
    private formBuilder: FormBuilder,
    private touristGuideService: TouristguideServiceService,
    private route: ActivatedRoute, private router:Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
     this.touristGuideId = +this.route.snapshot.paramMap.get('touristGuideId')!;
    // this.route.queryParams.subscribe(params => {
    //   this.touristGuideId = +params['touristGuideId']; // Retrieve touristGuideId from query params
    // });
    this.getTouristGuideDetails(this.touristGuideId);
 
  }

  initializeForm(): void {
    this.touristGuideForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      languages: ['', Validators.required],
      description: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      averageRating: ['', Validators.required],
      photo: ['', Validators.required], // Corrected the control name to "photo"
      contactNumber: ['', Validators.required],
      aadharNumber: ['', Validators.required]
    });
  }

  
  getTouristGuideDetails(touristGuideId: number): void {
    this.touristGuideService.getTouristGuideById(touristGuideId).subscribe(
      (touristGuide: TouristGuide) => {
        this.touristGuideForm.patchValue({
          name: touristGuide.name,
          location: touristGuide.location,
          languages: (touristGuide.languages ?? []).join(', '),
          description: touristGuide.description,
          email: touristGuide.email,
          averageRating: touristGuide.averageRating,
          contactNumber: touristGuide.contactNumber,
          aadharNumber: touristGuide.aadharNumber
        });
        if (touristGuide.photo) {
         
          this.photoPreview = 'data:image/jpeg;base64,' + touristGuide.photo
          this.touristGuideForm.patchValue({ photo: touristGuide.photo });
        }
      },
      error => {
        this.errorMessage = 'Failed to retrieve tour details';
      }
    );
  }
  convertPhotos(): void {
    this.touristGuide.forEach(touristGuide => {
      if (touristGuide.photo) {
        touristGuide.photo = 'data:img/jpeg;base64,' + touristGuide.photo;
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
          this.touristGuideForm.patchValue({ photo: imageData });
          this.touristGuideForm.get('photo')?.updateValueAndValidity();
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

  updateTouristGuide(): void {
    if (this.touristGuideForm.valid) {
      const updatedTouristGuide: TouristGuide = {
        name: this.touristGuideForm.value.name,
        location: this.touristGuideForm.value.location,
        languages: this.touristGuideForm.value.languages.split(',').map((lang: string) => lang.trim()), // Trim each language
        description: this.touristGuideForm.value.description,
        email: this.touristGuideForm.value.email,
        averageRating: parseFloat(this.touristGuideForm.value.averageRating),
        photo: this.touristGuideForm.value.photo,
        contactNumber: this.touristGuideForm.value.contactNumber,
        aadharNumber: this.touristGuideForm.value.aadharNumber
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

      this.touristGuideService.updateTouristGuide(this.touristGuideId, updatedTouristGuide).subscribe(
        () => {
          console.log('Tourist guide updated successfully');
          Swal.fire("Changes Updated Successfully!", "", "success").then((res=>{
            this.router.navigate(['/admin-registration/adminTouristGuides']);
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

