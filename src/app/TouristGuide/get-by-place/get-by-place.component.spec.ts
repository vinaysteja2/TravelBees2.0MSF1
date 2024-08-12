import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetByPlaceComponent } from './get-by-place.component';

describe('GetByPlaceComponent', () => {
  let component: GetByPlaceComponent;
  let fixture: ComponentFixture<GetByPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetByPlaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetByPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
