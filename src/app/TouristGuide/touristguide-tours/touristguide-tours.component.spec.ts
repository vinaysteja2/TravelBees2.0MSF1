import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristguideToursComponent } from './touristguide-tours.component';

describe('TouristguideToursComponent', () => {
  let component: TouristguideToursComponent;
  let fixture: ComponentFixture<TouristguideToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TouristguideToursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TouristguideToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
