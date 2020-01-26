import { Component, Input } from '@angular/core';
import { CourseSearchApiResponse } from 'src/app/models/CourseSearchApiResponse';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.css']
})
export class SearchCourseComponent {

  @Input() menuSearchOptions;

  @Input() searchCouseResult: CourseSearchApiResponse;

}
