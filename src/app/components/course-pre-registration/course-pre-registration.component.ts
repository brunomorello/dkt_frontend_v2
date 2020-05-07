import { Component, OnInit, Input } from '@angular/core';
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
    course: '',
    currentJob: '',
    currentEmployeeCompany: '',
    graduationCollege: '',
    graduationYear: '',
    lgpdConsentment: ''
  };

  @Input() collegeId: string;

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
      // $("#customer-phone"),
      $("#customer-current-job"),
      $("#customer-current-employee-company")      
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

    // Getting Customer Consentment 
    if($('#customer-lgpd-consentment').prop('checked') == false) {
      $('#customer-lgpd-consentment').removeClass('is-valid');
      $('#customer-lgpd-consentment').addClass('is-invalid');
      invalidField = true;
    }

    // if($('#customer-phone').val().toString().length != 11 ) {
    //   $('#customer-phone').removeClass('is-valid');
    //   $('#customer-phone').addClass('is-invalid');
    //   invalidField = true;
    // }

    if(invalidField) return;

    let msg = {
      "text": `
        Nome: ${this.customer.name} \n
        E-mail: ${this.customer.email} \n
        Cargo Atual (ou último): ${this.customer.currentJob} \n
        Empresa Atual (ou última): ${this.customer.currentEmployeeCompany} \n
        Faculdade: ${this.customer.graduationCollege} \n
        Ano de Graduação: ${this.customer.graduationCollege} \n
        Curso de Interesse: ${this.customer.course} \n\n
        Consentimento do Cliente (LGDP): ${this.customer.lgpdConsentment}
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
      course: '',
      currentJob: '',
      currentEmployeeCompany: '',
      graduationCollege: '',
      graduationYear: '',
      lgpdConsentment: ''
    };

    $("#customer-form-email-alert")
      .removeClass('alert-danger')
      .addClass('alert-success')
      .show()
      .focus();
    
    setTimeout(() => {
      $('#customer-form-email-alert').hide()
      // remove is-valid class from required fields
      domElementList.forEach(element => {
        element.removeClass('is-valid');
        invalidField = true;        
      });
      // remove is-valid class from unrequired fields
      $("#customer-lgpd-consentment").removeClass('is-valid');
      $("#customer-graduation-year").removeClass('is-valid');
      $("#customer-graduation-college").removeClass('is-valid');
      this.errorMessage = "";
    }, 2000);

  }

}
