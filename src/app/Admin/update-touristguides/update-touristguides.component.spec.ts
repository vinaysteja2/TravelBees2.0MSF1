import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTouristguidesComponent } from './update-touristguides.component';

describe('UpdateTouristguidesComponent', () => {
  let component: UpdateTouristguidesComponent;
  let fixture: ComponentFixture<UpdateTouristguidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateTouristguidesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateTouristguidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
