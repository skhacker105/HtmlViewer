import { TestBed } from '@angular/core/testing';

import { PageIOService } from './page-io.service';

describe('PageIOService', () => {
  let service: PageIOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageIOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
