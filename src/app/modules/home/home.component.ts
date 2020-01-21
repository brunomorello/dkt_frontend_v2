import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {

    getSpecializationList(event: Event) {
        console.log(event);
        // console.log(this.courseSpecializationList.filter(element => element.courseId == courseId));
        // return this.courseSpecializationList.filter(element => element.courseId == courseId);
    
      }
    
      performSearch(formCourseSearch: NgForm) {
    
        console.log(formCourseSearch);
    
        if(formCourseSearch.invalid) return;
    
        formCourseSearch.reset();
    
      }
}