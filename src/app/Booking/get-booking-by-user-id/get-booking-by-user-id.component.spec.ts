import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBookingByUserIdComponent } from './get-booking-by-user-id.component';

describe('GetBookingByUserIdComponent', () => {
  let component: GetBookingByUserIdComponent;
  let fixture: ComponentFixture<GetBookingByUserIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetBookingByUserIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetBookingByUserIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
