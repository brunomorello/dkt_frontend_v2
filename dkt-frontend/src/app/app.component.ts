import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Direkte';

  courseSearchForm = {
    postGraduation: false,
    mba: false,
    shortDuration: false,
    course: {
      mainCourse: 0,
      specialization: 0
    }
  }

  courseList = [
    {id: "1", name: "Direito"},
    {id: "2", name: "Tecnologia da Informação"},
    {id: "3", name: "Administração"}
  ];

  courseSpecializationList = [
    {
      courseId: 1,
      specializations: [
        {id: "1", name: "Direito Tributario"},
        {id: "2", name: "Direito Trabalhista"},
        {id: "3", name: "Direito Genérico"}
      ]
    },
    {
      courseId: 2,
      specializations: [
        {id: "1", name: "Cloud"},
        {id: "2", name: "Artificial Intelligence"},
        {id: "3", name: "DevOps"}
      ]
    },
    {
      courseId: 2,
      specializations: [
        {id: "1", name: "Adm1"},
        {id: "2", name: "Adm2"},
        {id: "3", name: "Adm3"}
      ]
    }
  ]

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


