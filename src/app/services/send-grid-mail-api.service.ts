import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SendGridMailAPIService {

  constructor(private http: HttpClient) { }

  private url = "https://api.sendgrid.com/v3/mail/send";
  private token = "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";

  sendMail(customerForm: any): Observable<Object> {

    let httpHeaders = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': '*/*'
      })
    };

    let message = {
      "personalizations": [
        {
          "to": [
            {"email": "brunomorello7@gmail.com"}
          ]
        }
      ],
      "from": {
        "email": "brunomorello7@gmail.com"
        
      },
      "subject": "Sending with SendGrid is Fun",
      "content": [
        {
          "type": "text/plain", 
          "value": customerForm
        }
      ]
    }

    return this.http.post(this.url, message, httpHeaders);

  }

}
