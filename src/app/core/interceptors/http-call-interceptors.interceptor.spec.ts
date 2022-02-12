import { TestBed } from '@angular/core/testing';

import { HttpCallInterceptorsInterceptor } from './http-call-interceptors.interceptor';

describe('HttpCallInterceptorsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpCallInterceptorsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpCallInterceptorsInterceptor = TestBed.inject(HttpCallInterceptorsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
