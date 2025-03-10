import { TestBed } from '@angular/core/testing';

import { FormsJsonService } from './forms-json.service';

describe('FormsJsonService', () => {
  let service: FormsJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormsJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
