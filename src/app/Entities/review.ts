export class Review {
    id?: number;
    userId?: number;
    tourId?: number;
    touristGuideId?: number;
    comment?: string;
    rating?: number;
  
    constructor(
      id?: number,
      userId?: number,
      tourId?: number,
      touristGuideId?: number,
      comment?: string,
      rating?: number
    ) {''
      this.id = id;
      this.userId = userId;
      this.tourId = tourId;
      this.touristGuideId = touristGuideId;
      this.comment = comment;
      this.rating = rating;
    }
  }
  