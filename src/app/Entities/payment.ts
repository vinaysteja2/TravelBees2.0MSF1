export class Payment {
     id: number | undefined;
     bookingId: number | undefined;
     totalPrice: number | undefined;
     paymentMode: PaymentMode | undefined;
     paymentDate: string | undefined;
     totalNoOfPersons:number|undefined;
     paymentId:string|undefined;
   
     constructor(
       id?: number,
       bookingId?: number,
       totalPrice?: number,
       paymentMode?: PaymentMode,
       paymentDate?: string,
       totalNoOfPersons?:number,
       paymentId?:string,
     ) {
       this.id = id;
       this.bookingId = bookingId;
       this.totalPrice = totalPrice;
       this.paymentMode = paymentMode;
       this.paymentDate = paymentDate;
       this. totalNoOfPersons=totalNoOfPersons;
       this.paymentId=paymentId;
     }
   }
   
   export enum PaymentMode {
     CREDIT_CARD = 'CREDIT_CARD',
     DEBIT_CARD = 'DEBIT_CARD',
     NET_BANKING = 'NET_BANKING',
     CASH = 'CASH'
   }
   