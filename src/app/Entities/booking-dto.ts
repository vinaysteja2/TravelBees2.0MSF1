export interface BookingDto {
    id: number;
    bookingDate: string;
    numberOfPersons: number;
    paymentId:number;
    paymentStatus:boolean;
    userId:number;
    tour: TourDto; // Define TourDto interface for the nested object
  }
  
  export interface TourDto {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    tourPhoto: string;
    touristGuideId:number;
  }
  