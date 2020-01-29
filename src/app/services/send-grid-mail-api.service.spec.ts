import { TestBed } from '@angular/core/testing';

import { SendGridMailAPIService } from './send-grid-mail-api.service';

describe('SendGridMailAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendGridMailAPIService = TestBed.get(SendGridMailAPIService);
    expect(service).toBeTruthy();
  });
});
