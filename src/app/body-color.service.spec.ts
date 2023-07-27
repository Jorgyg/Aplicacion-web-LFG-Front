import { TestBed } from '@angular/core/testing';

import { BodyColorService } from './body-color.service';

describe('BodyColorService', () => {
  let service: BodyColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
