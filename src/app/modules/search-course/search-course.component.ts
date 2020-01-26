import { Component, Input } from '@angular/core';
import { CourseSearchApiResponse } from 'src/app/models/CourseSearchApiResponse';
import { Course } from 'src/app/models/Course';
import { Specialization } from 'src/app/models/Specialization';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.css']
})
export class SearchCourseComponent {

  @Input() menuSearchOptions;

  @Input() searchCouseResult: CourseSearchApiResponse;

  @Input() courseList: Course[];

  @Input() specializationListDump: Specialization[];

  @Input() specializationList: Specialization[];

}
