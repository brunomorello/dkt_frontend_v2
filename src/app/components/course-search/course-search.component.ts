import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CourseService } from "src/app/services/course.service";
import { CourseSearchResponse } from 'src/app/models/CourseSearchResponse';

@Component({
  selector: 'direkte-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.css']
})
export class CourseSearchComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) { }

  searchParams;

  searchCouseResult: Array<CourseSearchResponse> = [];

  errorMessage: string;

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => this.searchParams = params);
    
    if (this.searchParams.promo) {
      
      let promoCourseList = [
        'UX Design & Strategy',
        'Blockchain\nDevelopment & Technologies',
        'Tech-Driven Leadership',
        'Inteligência Artificial',
        'Gestão da Tecnologia da Informação'
      ];

      // change backend to receive course id

      promoCourseList.forEach(course => {
        this.courseService.searchCourseByName(course)
          .subscribe(
            courseListAPI => {
              this.searchCouseResult.push(courseListAPI)
            },
            error => {
              console.log(error);
            }
          )
      });
    }
    // hide navigation
    $('.nav-link').hide();

  }

  goToHome() {
    this.router.navigate(['/']);
  }

}
