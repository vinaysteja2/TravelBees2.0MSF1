import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTouristguideComponent } from './add-touristguide.component';

describe('AddTouristguideComponent', () => {
  let component: AddTouristguideComponent;
  let fixture: ComponentFixture<AddTouristguideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTouristguideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTouristguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
