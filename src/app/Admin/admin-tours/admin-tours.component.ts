// import { Component } from '@angular/core';
// import { Tour } from '../../Entities/tour';
// import { TourServiceService } from '../../Services/tour-service.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-admin-tours',
//   templateUrl: './admin-tours.component.html',
//   styleUrl: './admin-tours.component.css'
// })
// export class AdminToursComponent {

//   tours: Tour[] = [];
//   errorMessage: string = '';
//   touristGuideId: number | null = null;

//   constructor(private touristGuideService: TourServiceService, private route: ActivatedRoute, private router: Router) { }

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       const id = +params['touristGuideId'];
//       if (!isNaN(id) && id > 0) {
//         this.touristGuideId = id;
//         this.getToursByTouristGuideId();
//       } else {
//         console.error('Invalid Tourist Guide ID');
       
//       }
//     });
//   }

//   getToursByTouristGuideId(): void {
//     if (this.touristGuideId !== null) {
//       this.touristGuideService.getToursByTouristGuideId(this.touristGuideId)
//         .subscribe(
//           (data) => {
//             this.tours = data;
//             console.log(data);
//             this.convertPhotos();
//           },
//           (error) => {
//             this.errorMessage = 'Failed to retrieve tours. Please try again.';
//           }
//         );
//     }
//   }

//   convertPhotos(): void {
//     this.tours.forEach(tour => {
//       if (tour.tourPhoto) {
//         tour.tourPhoto = 'data:img/jpeg;base64,' + tour.tourPhoto;
//       }
//     });
//   }

//   deleteTouristGuide(tourId: number): any{
    
   
//     const swalWithBootstrapButtons = Swal.mixin({
//       customClass: {
//         confirmButton: "btn btn-success",
//         cancelButton: "btn btn-danger"
//       },
//       buttonsStyling: false
//     });
//     swalWithBootstrapButtons.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "No, cancel!",
//       reverseButtons: true
//     }).then((result) => {
//       if (result.isConfirmed) {
//          this.touristGuideService.deleteTourById(tourId).subscribe((response) => {
          
//           console.log(response); 
//         swalWithBootstrapButtons.fire({
//           title: "Deleted!",
//           text: "Your file has been deleted.",
//           icon: "success"
//         }).then((res=>{
//           this.getToursByTouristGuideId(); 
//         }));
//       },
//       (error) => {
//               console.error('Error deleting tourist guide:', error);
//               Swal.fire({
//                 title: "Error in deleting file",
//                 text: error.error,
//                 icon: "error"});
              
//             }
//           );
//       } else if (
        
//         result.dismiss === Swal.DismissReason.cancel
//       ) {
//         swalWithBootstrapButtons.fire({
//           title: "Cancelled",
//           text: "Your imaginary file is safe :)",
//           icon: "error"
//         });
//       }
//     });
//   }
  
//   navigateToUpdate(tourId: number): void {
//     this.router.navigate(['admin-registration/adminTouristGuides/update-tour', tourId],{ queryParams: { touristGuideId: this.touristGuideId} });
//   }

// }

import { Component, OnInit } from '@angular/core';
import { Tour } from '../../Entities/tour';
import { TourServiceService } from '../../Services/tour-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-tours',
  templateUrl: './admin-tours.component.html',
  styleUrls: ['./admin-tours.component.css']
})
export class AdminToursComponent implements OnInit {
  tours: Tour[] = [];
  pagedTours: Tour[] = [];
  errorMessage: string = '';
  touristGuideId: number | null = null;

  // Pagination properties
  currentPage: number = 0;
  itemsPerPage: number = 6; // 3 columns and 2 rows

  constructor(private tourService: TourServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['touristGuideId'];
      if (!isNaN(id) && id > 0) {
        this.touristGuideId = id;
        this.getToursByTouristGuideId();
      } else {
        console.error('Invalid Tourist Guide ID');
      }
    });
  }

  getToursByTouristGuideId(): void {
    if (this.touristGuideId !== null) {
      this.tourService.getToursByTouristGuideId(this.touristGuideId)
        .subscribe(
          (data) => {
            this.tours = data;
            this.convertPhotos();
            this.setPage(0); // Set initial page
          },
          (error) => {
            this.errorMessage = 'Failed to retrieve tours. Please try again.';
          }
        );
    }
  }

  convertPhotos(): void {
    this.tours.forEach(tour => {
      if (tour.tourPhoto) {
        tour.tourPhoto = 'data:img/jpeg;base64,' + tour.tourPhoto;
      }
    });
  }

  deleteTouristGuide(tourId: number): void {
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
        this.tourService.deleteTourById(tourId).subscribe((response) => {
          console.log(response);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          }).then((res => {
            this.getToursByTouristGuideId();
          }));
        },
        (error) => {
          console.error('Error deleting tourist guide:', error);
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

  navigateToUpdate(tourId: number): void {
    this.router.navigate(['admin-registration/adminTouristGuides/update-tour', tourId], { queryParams: { touristGuideId: this.touristGuideId } });
  }

  // Pagination methods
  setPage(page: number): void {
    this.currentPage = page;
    const start = page * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedTours = this.tours.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.tours.length / this.itemsPerPage);
  }

  get totalPagesArray(): number[] {
    return new Array(this.totalPages);
  }
}
