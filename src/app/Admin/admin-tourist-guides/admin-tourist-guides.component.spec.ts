import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTouristGuidesComponent } from './admin-tourist-guides.component';

describe('AdminTouristGuidesComponent', () => {
  let component: AdminTouristGuidesComponent;
  let fixture: ComponentFixture<AdminTouristGuidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTouristGuidesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTouristGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
