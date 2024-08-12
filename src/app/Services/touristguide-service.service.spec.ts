import { TestBed } from '@angular/core/testing';

import { TouristguideServiceService } from './touristguide-service.service';

describe('TouristguideServiceService', () => {
  let service: TouristguideServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristguideServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
