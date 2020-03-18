import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePreRegistrationComponent } from './course-pre-registration.component';

describe('CoursePreRegistrationComponent', () => {
  let component: CoursePreRegistrationComponent;
  let fixture: ComponentFixture<CoursePreRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursePreRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePreRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
