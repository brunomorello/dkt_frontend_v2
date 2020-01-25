import { TestBed } from '@angular/core/testing';

import { CourseSpecializationService } from './course-specialization.service';

describe('CourseSpecializationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseSpecializationService = TestBed.get(CourseSpecializationService);
    expect(service).toBeTruthy();
  });
});
