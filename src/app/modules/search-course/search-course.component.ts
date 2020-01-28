import { Component, Input } from '@angular/core';
import { CourseSearchApiResponse } from 'src/app/models/CourseSearchApiResponse';
import { Course } from 'src/app/models/Course';
import { Specialization } from 'src/app/models/Specialization';
import { NgForm } from "@angular/forms";
import { CourseService } from 'src/app/services/course.service';

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

  private errorMessage: string;

  constructor(private courseService: CourseService) { }

  loadSpecialization(event) {

    //cleanup specializationList array
    this.specializationList = [];

    this.menuSearchOptions.courseSpecialization = "0";

    this.specializationListDump.forEach(spec => {
        if(spec.id_atuacao == event.target.value)  
            this.specializationList.push(spec);
    });

  }

  performSearch(menuSearchOptionsForm: NgForm) {

    if (menuSearchOptionsForm.invalid || this.menuSearchOptions.mainCourse == "0" || this.menuSearchOptions.courseSpecialization == "0") {
      
      this.errorMessage = "Por favor selecione uma Área de atuação e uma Especialização";
      
      $('.alert').show().focus();

      // hide alert after 2s
      setTimeout(() => {
        $('.alert').hide();
      }, 2000);

      return;

    }

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

  clearFilters() {

    this.menuSearchOptions.postGraduation = false;
    this.menuSearchOptions.mba = false;
    this.menuSearchOptions.onSite = false;
    this.menuSearchOptions.semiOnSite = false;
    this.menuSearchOptions.mainCourse = "0";
    this.menuSearchOptions.courseSpecialization = "0";

  }

}
