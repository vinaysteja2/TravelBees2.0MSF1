import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToursComponent } from './add-tours.component';

describe('AddToursComponent', () => {
  let component: AddToursComponent;
  let fixture: ComponentFixture<AddToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddToursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
