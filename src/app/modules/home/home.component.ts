import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CourseService } from "../../services/course.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    mainFormSearch = new FormGroup({
        postGraduation: new FormControl(true),
        mba: new FormControl(),
        shortDuration: new FormControl(),
        mainCourse: new FormControl(),
        courseSpecialization: new FormControl(),
        onSiteCourse: new FormControl(true),
        semiOnSiteCourse: new FormControl(true),
        onlineCourse: new FormControl()
    });

    private courseList = [];

    constructor(private courseService: CourseService) { }

    ngOnInit() {
        
        // this.courseService.getCourseList()
        //     .subscribe(courseList => {
        //         this.courseList = courseList;
        //     });

    }

    getSpecializationList() {
        
        console.log(this.mainFormSearch.get('mainCourse'));
    
      }
    
      performSearch() {

        if (this.mainFormSearch.valid) {
            console.log(this.mainFormSearch.value);
        } else {
            console.log(`Fillout all fields`);
        }
    
      }
}