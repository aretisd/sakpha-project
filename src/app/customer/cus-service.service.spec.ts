import { TestBed, inject } from '@angular/core/testing';

import { CusServiceService } from './cus-service.service';

describe('CusServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CusServiceService]
    });
  });

  it('should be created', inject([CusServiceService], (service: CusServiceService) => {
    expect(service).toBeTruthy();
  }));
});
