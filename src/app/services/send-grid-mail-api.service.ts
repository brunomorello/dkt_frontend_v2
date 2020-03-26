import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SendGridMailAPIService {

  constructor(private http: HttpClient) { }

  private url = "https://www.direkte.com.br:10009/mail/sendMail";

  sendMail(message: any): Observable<any> {
    return this.http.post(this.url, message);
  }

}
