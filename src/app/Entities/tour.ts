export class Tour {
    id?:number;
    name?: string;
    description?: string;
    price?: number;
    duration?: number;
    tourPhoto?: string; // Assuming tour photo is a base64 encoded string
  smallDescription?:string;
  averageRating?:number;
  
    constructor(
      id?:number,
      name?: string,
      description?: string,
      price?: number,
      duration?: number,
      tourPhoto?: string,
      smallDescription?:string,
      averageRating?:number
    ) {
      
      this.id=id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.duration = duration;
      this.tourPhoto = tourPhoto;
      this.smallDescription=smallDescription;
      this.averageRating=averageRating;
  
    }
  }
  