import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home-customer-doubts-form-email',
  templateUrl: './home-customer-doubts-form-email.component.html',
  styleUrls: ['./home-customer-doubts-form-email.component.css']
})
export class HomeCustomerDoubtsFormEmailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  sendForm(customerDoubtsForm: NgForm) {

    console.log(customerDoubtsForm);
    return;

  }

}
