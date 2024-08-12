import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);

  }

    ngAfterViewInit() {
      const progressCircle = document.querySelector(".autoplay-progress svg") as HTMLElement;
      const progressContent = document.querySelector(".autoplay-progress span") as HTMLElement;
  
      const swiperEl = document.querySelector("swiper-container") as any;
      swiperEl.addEventListener("autoplaytimeleft", (e: any) => {
        const [swiper, time, progress] = e.detail;
        progressCircle.style.setProperty("--progress", (1 - progress).toString());
        progressContent.textContent = `${Math.ceil(time / 1000)}s`;
      });
    }


    user = {
      username: 'JohnDoe',
      email: 'john.doe@example.com',
      mobileNo: '123-456-7890'
      // Add more user details as needed
    };
}

