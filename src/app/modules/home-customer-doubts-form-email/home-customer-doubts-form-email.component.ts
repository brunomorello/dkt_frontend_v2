import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SendGridMailAPIService } from "../../services/send-grid-mail-api.service";
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-home-customer-doubts-form-email',
  templateUrl: './home-customer-doubts-form-email.component.html',
  styleUrls: ['./home-customer-doubts-form-email.component.css']
})
export class HomeCustomerDoubtsFormEmailComponent {

  constructor(private mailService: SendGridMailAPIService) { }

  customer = {
    name: '',
    email: '',
    age: '0',
    educationLevel: 'Ensino médio completo',
    employed: false,
    currentJob: '',
    investmentIntention: '0',
    courseType: 'Presencial',
    aspiration: '',
    agreeReceiveEmails: false
  }

  errorMessage = "";

  checkChanges(element) {

    let domElement = $(`#${element}`);

    if (domElement.val() != "" || domElement.val() != "0") {
      domElement.removeClass('is-invalid');
      domElement.addClass('is-valid');
    }

  }

  sendForm(customerDoubtsForm: NgForm) {

    let domElementList = [
      $("#customer-doubts-form-cust-name"),
      $("#customer-doubts-form-cust-email"),
      $("#customer-doubts-form-cust-age"),
      $("#customer-doubts-form-cust-current-job"),
      $("#customer-doubts-form-cust-investment")
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

    console.log(customerDoubtsForm);

    let msg = {
      "text": `
        Nome: ${this.customer.name} \n
        E-mail: ${this.customer.email} \n
        Idade: ${this.customer.age} \n
        Nível de Escolaridade: ${this.customer.educationLevel} \n
        Atualmente está empregado: ${this.customer.employed} \n
        Cargo Ataul (ou último) e área de interese: ${this.customer.currentJob} \n
        Até quando pretende investir? ${this.customer.investmentIntention} \n
        Que modalidade de curso busca? ${this.customer.courseType} \n
        O que busca com o curso de MBA ou Pós Graduação: ${this.customer.aspiration} \n
        Aceito receber e-mails com informações: ${this.customer.agreeReceiveEmails}
      `
    }

    this.mailService.sendMail(msg)
    .subscribe(resp => {
        console.log(resp);

        $("#customer-form-email").modal('hide');

        if(resp.statusCode != "202" && resp.statusCode != "200") {
            this.errorMessage = "Erro para receber seu e-mail, contacte a equipe através do e-mail contato@direkte.com.br";
            
            $("#customer-form-email-alert")
              .addClass('alert-danger')
              .show()
              .focus();
        }

        this.errorMessage = "E-mail recebido com sucesso! Obrigado";
        
        this.customer = {
          name: '',
          email: '',
          age: '0',
          educationLevel: 'Ensino médio completo',
          employed: false,
          currentJob: '',
          investmentIntention: '0',
          courseType: 'Presencial',
          aspiration: '',
          agreeReceiveEmails: false
        }

        $('#customer-form-email-alert')
          .removeClass('alert-danger')
          .addClass('alert-success')
          .show()
          .focus();

        setTimeout(() => {
          $('#customer-form-email-alert').hide()
          this.errorMessage = "";
        }, 2000);
    });


  }

  //TODO
  removeValidations() {
    
  }

}
