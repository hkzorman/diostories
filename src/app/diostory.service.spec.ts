import { TestBed } from '@angular/core/testing';

import { DiostoryService } from './diostory.service';

describe('DiostoryService', () => {
  let service: DiostoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiostoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
