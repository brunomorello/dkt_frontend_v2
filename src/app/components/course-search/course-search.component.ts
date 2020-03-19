import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CourseService } from "src/app/services/course.service";
import { CourseSpecializationService } from "../../services/course-specialization.service";
import { CourseSearchResponse } from 'src/app/models/CourseSearchResponse';
import { SendGridMailAPIService } from "../../services/send-grid-mail-api.service";
import { Course } from "../../models/Course";
import { Specialization } from "../../models/Specialization";

@Component({
  selector: 'direkte-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.css']
})
export class CourseSearchComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private courseSpecService: CourseSpecializationService,
    private mailService: SendGridMailAPIService
  ) { }

  displayHeaderMenuItens = false;

  searchParams;

  searchCouseResult: Array<CourseSearchResponse> = [];

  errorMessage: string;

  // Customer Pre-registration form
  customer = {
    name: '',
    email: '',
    phone: '',
    course: ''
  };

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

  courseList: Course[];
  specializationList: Specialization[];
  specializationListDump: Specialization[];

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => this.searchParams = params);
    
    if (this.searchParams.promo) {
      
      let promoCourseList = [
        1810,	//UX Design & Strategy	43	FIAP
        1811,	//Blockchain Development & Technologies	43	FIAP
        1823,	//Tech-Driven Leadership	43	FIAP
        1837,	//MBA em Artificial Intelligence	44	Impacta
        1842 //	MBA em Gestão de TI e Negócios Digitais	44	Impacta
      ];

      // change backend to receive course id

      promoCourseList.forEach(course => {
        this.courseService.searchCourseById(course)
          .subscribe(
            courseListAPI => {
              this.searchCouseResult.push(courseListAPI)
            },
            error => {
              console.log(error);
            }
          )
      });
    } else {
      //list courses by queryparams
      let searchCouseObj = {
        'pesquisa': this.searchParams
      };
      
      this.performSearch(searchCouseObj, false);

    }
    // hide navigation
    $('.nav-link').hide();

    this.courseService.getCourseList()
        .subscribe(response => this.courseList = response.msg);

    this.courseSpecService.getSpecializationList()
        .subscribe(response => this.specializationListDump = response.msg);

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

  checkChanges(element) {

    let domElement = $(`#${element}`);

    if (domElement.val() != "" || domElement.val() != "0") {    
      domElement.removeClass('is-invalid');
      domElement.addClass('is-valid');
    } 
    
    if(domElement.val() == "") {
      domElement.removeClass('is-valid');
      domElement.addClass('is-invalid');
    }

  }

  setCourseDetails(courseDetails: CourseSearchResponse) {
    this.customer.course = `
      Instituição: ${courseDetails.instituicao.nome} - ${courseDetails.instituicao.sigla} \n
      Curso: ${courseDetails.nome}
    `;
  }

  sendRegistration(coursePreRegistration: NgForm) {
    
    let domElementList = [
      $("#customer-name"),
      $("#customer-email"),
      $("#customer-phone")
    ];

    let invalidField = false;

    // validation of empty elements
    domElementList.forEach(element => {
      if (element.val() == "" || element.val() == "0" || element.val() == null) {
        element.addClass('is-invalid');
        invalidField = true;
      }
    });

    if(invalidField) return;

    let msg = {
      "text": `
        Nome: ${this.customer.name} \n
        E-mail: ${this.customer.email} \n
        Contato: ${this.customer.phone} \n
        Curso de Interesse: ${this.customer.course}
      `
    };

    this.mailService.sendMail(msg)
        .subscribe(resp => {
          console.log(resp);
          
          $("#course-pre-registration-modal").modal("hide");

          // if(resp.statusCode != 202 && resp.statusCode != 200) {
          //   this.errorMessage = "Erro para receber seu e-mail, contacte a equipe através do e-mail contato@direkte.com.br";

          //   $("#customer-form-email-alert")
          //     .addClass('alert-danger')
          //     .show()
          //     .focus();
          // }
          this.errorMessage = "E-mail recebido com sucesso! Obrigado";
      });


    this.customer = {
      name: '',
      email: '',
      phone: '',
      course: ''
    };

    $("#customer-form-email-alert")
      .removeClass('alert-danger')
      .addClass('alert-success')
      .show()
      .focus();
    
    setTimeout(() => {
      $('#customer-form-email-alert').hide()
      this.errorMessage = "";
    }, 2000);

  }

  performSearch(searchObject, modalSearch) {

    // console.log(searchObject);
    // console.log(this.menuSearchOptions);

    // control for modal search to check required inputs inserted by user
    if(modalSearch) {
      if(this.menuSearchOptions.mainCourse == "0" || this.menuSearchOptions.courseSpecialization == "0") {
        this.errorMessage = "Por favor, escolha uma Área de Atuação e uma Especialização!";      
      }
  
      if(this.menuSearchOptions.mba == false && this.menuSearchOptions.postGraduation == false) {
        this.errorMessage = "Por favor, escolha a opção MBA ou Pós-Graduação!";      
      }
  
      if(this.menuSearchOptions.onSite == false && this.menuSearchOptions.semiOnSite == false) {
        this.errorMessage = "Por favor, escolha uma modalidade (Presencial ou À Distância)";      
      }
  
      if(this.errorMessage) {
        $("#alert-search-course-modal").addClass('alert-danger').show();
        setTimeout(() => {
          $("#alert-search-course-modal").removeClass('alert-danger').hide();
          this.errorMessage = null;
        }, 2000);
        return;
      }
    }

    this.searchCouseResult = [];
    
    if(!searchObject) {

      let courseSearchId = this.courseList.find(element => element.id == this.menuSearchOptions.mainCourse);
      let specSearchId = this.specializationListDump.find(element => element.id == this.menuSearchOptions.courseSpecialization);

      searchObject = {
        pesquisa: {
          atuacao: courseSearchId.nome,
          especializacao: specSearchId.nome,
          mba: this.menuSearchOptions.mba,
          pos: this.menuSearchOptions.postGraduation,
          modalidade: [],
          pagina: ''
        }
      };
      
      if (this.menuSearchOptions.onSite) {
        searchObject.pesquisa.modalidade.push(1);
      }
      if (this.menuSearchOptions.semiOnSite) {
        searchObject.pesquisa.modalidade.push(2);
      }
    }

    this.courseService.searchCourse(searchObject)
        .subscribe(resp => {
          console.log(resp);
          resp.msg.forEach(course => this.searchCouseResult.push(course));
          
          $("#course-search-modal").modal("hide");
          
        },
        error => {
          console.log(error);
        });
  }

}
