import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, NgForm } from "@angular/forms";
import { CourseService } from "../../services/course.service";
import { CourseSpecializationService } from "../../services/course-specialization.service";
import { Course } from 'src/app/models/Course';
import { Specialization } from 'src/app/models/Specialization';
import { CourseSearchApiResponse } from 'src/app/models/CourseSearchApiResponse';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    // Menu Search JSON using two-way data binding
    menuSearchOptions = {
        postGraduation: true,
        mba: true,
        mainCourse: '0',
        courseSpecialization: '0',
        onSite: true,
        semiOnSite: true,
        onlineCourse: false
    };

    // controls to display DOM Elements
    displaySearch = false;
    displayDefaultHome = true;
    displayHeaderMenuItens = true;

    // course search result JSON
    searchCouseResult: CourseSearchApiResponse;

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

        // Sets an invalid option to initialize select element
        this.menuSearchOptions.courseSpecialization = "0";

        this.specializationListDump.forEach(spec => {
            if(spec.id_atuacao == event.target.value)  
                this.specializationList.push(spec);
        });

    }

    performSearch(menuSearchOptionsForm: NgForm) {

        if (menuSearchOptionsForm.invalid) return;

        // controls to display DOM Elements
        this.displaySearch = true;
        this.displayDefaultHome = false;
        this.displayHeaderMenuItens = false;

        // storing course and course specialization
        let mainCouseAux = this.courseList.find(element => element.id == this.menuSearchOptions.mainCourse);
        let courseSpecializationAux = this.specializationListDump.find(element => element.id == this.menuSearchOptions.courseSpecialization);

        let searchCouseObj = {
            'pesquisa': {
                'atuacao': mainCouseAux.nome,
                'mba': this.menuSearchOptions.mba,
                'pos': this.menuSearchOptions.postGraduation,
                'especializacao': courseSpecializationAux.nome,
                'modalidade': [],
                'pagina': ''
            }
        }
        
        if (this.menuSearchOptions.onSite) {
            searchCouseObj.pesquisa.modalidade.push(1);
        }

        if (this.menuSearchOptions.semiOnSite) {
            searchCouseObj.pesquisa.modalidade.push(2);
        }

        this.courseService.searchCourse(searchCouseObj)
            .subscribe(response => this.searchCouseResult = response);
        
    }
}