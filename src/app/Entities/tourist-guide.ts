export class TouristGuide {
    id?: number;
    name?: string;
    location?: string;
    languages?: string[];
    description?: string;
    email?: string;
    averageRating?: number;
    photo?:string;
    contactNumber?: string;
    aadharNumber?: string;
    
    constructor(
      id?: number,
      name?: string,
      location?: string,
      languages?: string[],
      description?: string,
      email?: string,
      averageRating?: number,
      photo?: string, // Change this parameter to expect a byte array
      contactNumber?: string,
      aadharNumber?: string
    ) {
      this.id = id;
      this.name = name;
      this.location = location;
      this.languages = languages;
      this.description = description;
      this.email = email;
      this.averageRating = averageRating;
      this.photo = photo; // Assign the photo byte array
      this.contactNumber = contactNumber;
      this.aadharNumber = aadharNumber;
    }
    
  }
  