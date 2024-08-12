// import { Component } from '@angular/core';
// import { TouristGuide } from '../../Entities/tourist-guide';
// import { TouristguideServiceService } from '../../Services/touristguide-service.service';
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-admin-tourist-guides',
//   templateUrl: './admin-tourist-guides.component.html',
//   styleUrl: './admin-tourist-guides.component.css'
// })
// export class AdminTouristGuidesComponent {

//   touristGuides: TouristGuide[] = [];
//   errorMessage: string = '';

//   constructor(private touristGuideService: TouristguideServiceService,private router: Router) { }

//   ngOnInit(): void {
//     this.getAllTouristGuides();
//   }

//   getAllTouristGuides(): void {
//     this.touristGuideService.getAllTouristGuides()
//       .subscribe(
//         (data) => {
//           this.touristGuides = data;
//           this.convertPhotos(); 
//         },
//         (error) => {
//           this.errorMessage = 'Failed to retrieve tourist guides. Please try again.';
//         }
//       );
//   }

//   convertPhotos(): void {
//     this.touristGuides.forEach(guide => {
     
//       if (guide.photo) {
//         guide.photo = 'data:image/jpeg;base64,' + guide.photo;
//       }
//     });
//   }

//   navigateToUpdate(touristGuideId?: number):void{
//     this.router.navigate(['admin-registration/adminTouristGuides/update-touristGuide', touristGuideId]);
//   }
 
//   navigateToAddTours(touristGuideId?: number): void {
//     if (touristGuideId !== undefined) {
//       this.router.navigate(['admin-registration/adminTouristGuides/addTours', touristGuideId]);
//     }
//   }
  

//   navigateToGetToursByTouristGuideId(id?: number): void {
//     if (id !== undefined) {
//       this.router.navigate(['admin-registration/adminTouristGuides/adminTours', id],);
//     }
// }

// deleteTouristGuide(touristGuideId: number): any{

// const swalWithBootstrapButtons = Swal.mixin({
//   customClass: {
//     confirmButton: "btn btn-success",
//     cancelButton: "btn btn-danger"
//   },
//   buttonsStyling: false
// });
// swalWithBootstrapButtons.fire({
//   title: "Are you sure?",
//   text: "You won't be able to revert this!",
//   icon: "warning",
//   showCancelButton: true,
//   confirmButtonText: "Yes, delete it!",
//   cancelButtonText: "No, cancel!",
//   reverseButtons: true
// }).then((result) => {
//   if (result.isConfirmed) {
//   this.touristGuideService.deleteTouristGuide(touristGuideId).subscribe((response) => {
//   console.log(response); 
//     swalWithBootstrapButtons.fire({
//       title: "Deleted!",
//       text: "Your file has been deleted.",
//       icon: "success"
//     }).then((res=>{
//         this.getAllTouristGuides(); 
//       }));
//       },
//       (error) => {
//           Swal.fire({
//           title: "Error in deleting file",
//           text: error.error,
//           icon: "error"});
//           }
//          );
//   } else if (
    
//     result.dismiss === Swal.DismissReason.cancel
//   ) {
//     swalWithBootstrapButtons.fire({
//       title: "Cancelled",
//       text: "Your imaginary file is safe :)",
//       icon: "error"
//     });
//   }
// });


// }

// }


// -------------------with pagination---------------

import { Component, OnInit } from '@angular/core';
import { TouristGuide } from '../../Entities/tourist-guide';
import { TouristguideServiceService } from '../../Services/touristguide-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-tourist-guides',
  templateUrl: './admin-tourist-guides.component.html',
  styleUrls: ['./admin-tourist-guides.component.css']
})
export class AdminTouristGuidesComponent implements OnInit {
  touristGuides: TouristGuide[] = [];
  errorMessage: string = '';
  pageSize = 6;
  currentPage = 1;
  totalPages: number[] = [];

  constructor(private touristGuideService: TouristguideServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllTouristGuides();
  }

  getAllTouristGuides(): void {
    this.touristGuideService.getAllTouristGuides()
      .subscribe(
        (data) => {
          this.touristGuides = data;
          this.convertPhotos(); // Convert photos to base64
          this.calculateTotalPages(); // Calculate total pages
        },
        (error) => {
          this.errorMessage = 'Failed to retrieve tourist guides. Please try again.';
        }
      );
  }

  convertPhotos(): void {
    this.touristGuides.forEach(guide => {
      if (guide.photo) {
        guide.photo = 'data:image/jpeg;base64,' + guide.photo;
      }
    });
  }

  navigateToUpdate(touristGuideId?: number): void {
    this.router.navigate(['admin-registration/adminTouristGuides/update-touristGuide', touristGuideId]);
  }

  navigateToAddTours(touristGuideId?: number): void {
    if (touristGuideId !== undefined) {
      this.router.navigate(['admin-registration/adminTouristGuides/addTours', touristGuideId]);
    }
  }

  navigateToGetToursByTouristGuideId(id?: number): void {
    if (id !== undefined) {
      this.router.navigate(['admin-registration/adminTouristGuides/adminTours', id]);
    }
  }

  deleteTouristGuide(touristGuideId: number): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.touristGuideService.deleteTouristGuide(touristGuideId).subscribe((response) => {
          console.log(response); 
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          }).then((res => {
            this.getAllTouristGuides(); 
          }));
        },
        (error) => {
          Swal.fire({
            title: "Error in deleting file",
            text: error.error,
            icon: "error"
          });
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }

  calculateTotalPages(): void {
    const pageCount = Math.ceil(this.touristGuides.length / this.pageSize);
    this.totalPages = Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }
}
