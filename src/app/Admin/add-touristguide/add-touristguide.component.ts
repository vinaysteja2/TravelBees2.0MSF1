import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TouristguideServiceService } from '../../Services/touristguide-service.service';
import { Router } from '@angular/router';
import { TouristGuide } from '../../Entities/tourist-guide';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-touristguide',
  templateUrl: './add-touristguide.component.html',
  styleUrl: './add-touristguide.component.css'
})
export class AddTouristguideComponent {

  photoPreview: string | ArrayBuffer | null = null;
  touristGuideForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private touristGuideService: TouristguideServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
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

  addTouristGuide(): void {
    if (this.touristGuideForm.valid) {
      const newTouristGuide: TouristGuide = {
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

      this.touristGuideService.addTouristGuide(newTouristGuide).subscribe(
        (response) => {
          console.log(response);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          }).then((res=>{
            this.router.navigate(['/admin-registration/adminTouristGuides']);
          }));
         
        },
        (error) => {
          this.errorMessage = 'Failed to add tourist guide. Please try again.';
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
        const uint8Array = new Uint8Array(atob(base64Image.split(',')[1]).split('').map(char => char.charCodeAt(0)));
        const imageData = this.uint8ArrayToBase64(uint8Array);
        this.photoPreview = base64Image;
        this.touristGuideForm.patchValue({ photo: imageData }); // Corrected the control name to "photo"
        this.touristGuideForm.get('photo')?.updateValueAndValidity(); // Update form control validity
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
