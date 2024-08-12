import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBookingByIdComponent } from './get-booking-by-id.component';

describe('GetBookingByIdComponent', () => {
  let component: GetBookingByIdComponent;
  let fixture: ComponentFixture<GetBookingByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetBookingByIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetBookingByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
