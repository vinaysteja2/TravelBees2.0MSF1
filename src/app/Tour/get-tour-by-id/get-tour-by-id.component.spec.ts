import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTourByIdComponent } from './get-tour-by-id.component';

describe('GetTourByIdComponent', () => {
  let component: GetTourByIdComponent;
  let fixture: ComponentFixture<GetTourByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetTourByIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetTourByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
