export interface Booking {
    id: number;
    userId: number;
    tourId: number;
    bookingDate: string;
    numberOfPersons: number;
    paymentStatus: boolean;
    bookingStatus:string;
  }
  