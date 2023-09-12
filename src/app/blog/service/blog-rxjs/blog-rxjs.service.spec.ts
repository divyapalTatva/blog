import { TestBed } from '@angular/core/testing';

import { BlogRxjsService } from './blog-rxjs.service';

describe('BlogRxjsService', () => {
  let service: BlogRxjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogRxjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
