import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, NgForm } from "@angular/forms";
import { CourseService } from "../../services/course.service";
import { CourseSpecializationService } from "../../services/course-specialization.service";
import { Course } from 'src/app/models/Course';
import { Specialization } from 'src/app/models/Specialization';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    menuSearchOptions = {
        postGraduation: true,
        mba: false,
        mainCourse: '1',
        courseSpecialization: '1',
        onSite: false,
        semiOnSite: true,
        onlineCourse: false
    };

    displaySearch = false;
    displayDefaultHome = true;
    displayHeaderMenuItens = true;

    private courseList: Course[];
    private specializationList: Specialization[];
    private specializationListDump: Specialization[];

    constructor(private courseService: CourseService, private courseSpecService: CourseSpecializationService) { }

    ngOnInit() {
        
       this.courseService.getCourseList()
            .subscribe(response => this.courseList = response.msg);

        this.courseSpecService.getSpecializationList()
            .subscribe(response => this.specializationListDump = response.msg);

        this.courseSpecService.getSpecializationById("1")
            .subscribe(response => this.specializationList = response.msg);
            
    }

    loadSpecialization(event) {

        //cleanup specializationList array
        this.specializationList = [];

        this.specializationListDump.forEach(spec => {
            if(spec.id_atuacao == event.target.value)  
                this.specializationList.push(spec);
        });

    }

    performSearch(menuSearchOptionsForm: NgForm) {
        console.log(menuSearchOptionsForm);
        console.log(this.menuSearchOptions);

        if (menuSearchOptionsForm.invalid) return;

        this.displaySearch = true;
        this.displayDefaultHome = false;
        this.displayHeaderMenuItens = false;
        
    }
}