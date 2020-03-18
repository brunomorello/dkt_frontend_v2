import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CourseService } from "src/app/services/course.service";
import { CourseSearchResponse } from 'src/app/models/CourseSearchResponse';
import { SendGridMailAPIService } from "../../services/send-grid-mail-api.service";

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
    private mailService: SendGridMailAPIService
  ) { }

  searchParams;

  searchCouseResult: Array<CourseSearchResponse> = [];

  errorMessage: string;

  customer = {
    name: '',
    email: '',
    phone: '',
    course: ''
  };

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

      this.courseService.searchCourse(searchCouseObj)
        .subscribe(resp => {
          console.log(resp);
          resp.msg.forEach(course => this.searchCouseResult.push(course));          
        },
        error => {
          console.log(error);
        });
    }
    // hide navigation
    $('.nav-link').hide();

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

}
