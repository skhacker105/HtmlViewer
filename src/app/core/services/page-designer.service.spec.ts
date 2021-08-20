import { TestBed } from '@angular/core/testing';

import { PageDesignerService } from './page-designer.service';

describe('PageDesignerService', () => {
  let service: PageDesignerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageDesignerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
