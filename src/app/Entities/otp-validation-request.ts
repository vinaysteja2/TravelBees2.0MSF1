
    export class OtpValidationRequest {
        username?: string;
        otpNumber?: string;
      
        constructor(username?: string, otpNumber?: string) {
          this.username = username;
          this.otpNumber = otpNumber;
        }
      }
      

