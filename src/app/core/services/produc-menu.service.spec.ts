import { TestBed } from '@angular/core/testing';

import { ProducMenuService } from './produc-menu.service';

describe('ProducMenuService', () => {
  let service: ProducMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
