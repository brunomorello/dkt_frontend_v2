import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { SendGridMailAPIService } from "../../services/send-grid-mail-api.service";

@Component({
  selector: 'direkte-course-pre-registration',
  templateUrl: './course-pre-registration.component.html',
  styleUrls: ['./course-pre-registration.component.css']
})
export class CoursePreRegistrationComponent implements OnInit {

  constructor(private mailService: SendGridMailAPIService) { }

  customer = {
    name: '',
    email: '',
    phone: '',
    course: ''
  };

  errorMessage = "";

  ngOnInit() {
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

  sendRegistration(coursePreRegistration: NgForm) {

    console.log(coursePreRegistration);
    
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

    if($('#customer-email').val().toString().indexOf('@') < 1) {
      $('#customer-email').removeClass('is-valid');
      $('#customer-email').addClass('is-invalid');
      invalidField = true;
    }

    if($('#customer-phone').val().toString().length != 11 ) {
      $('#customer-phone').removeClass('is-valid');
      $('#customer-phone').addClass('is-invalid');
      invalidField = true;
    }

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

          if(resp.statusCode != 202 && resp.statusCode != 200) {
            this.errorMessage = "Erro para receber seu e-mail, contacte a equipe através do e-mail contato@direkte.com.br";

            $("#customer-form-email-alert")
              .addClass('alert-danger')
              .show()
              .focus();
          }
        });

    this.errorMessage = "E-mail recebido com sucesso! Obrigado";

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
      domElementList.forEach(element => {
        element.removeClass('is-valid');
        invalidField = true;        
      });
      this.errorMessage = "";
    }, 2000);

  }

}
