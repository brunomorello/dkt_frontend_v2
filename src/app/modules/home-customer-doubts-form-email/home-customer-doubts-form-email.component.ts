import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home-customer-doubts-form-email',
  templateUrl: './home-customer-doubts-form-email.component.html',
  styleUrls: ['./home-customer-doubts-form-email.component.css']
})
export class HomeCustomerDoubtsFormEmailComponent {

  constructor() { }

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

      console.log(element.val());

      if (element.val() == "" || element.val() == "0" || element.val() == null) {
        element.addClass('is-invalid');
        invalidField = true;
        console.log(element);
      }
    });

    if(invalidField) return;

    console.log(customerDoubtsForm);

  }

  removeValidations() {
    
  }

}
