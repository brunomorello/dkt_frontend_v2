import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseSpecApiResponse } from "../models/CourseSpecApiResponse";

@Injectable({
  providedIn: 'root'
})
export class CourseSpecializationService {

  constructor(private http: HttpClient) { }

  private endpoint = "http://direkte.com.br:10009";

  getSpecializationList(): Observable<CourseSpecApiResponse> {
    return this.http.get<CourseSpecApiResponse>(`${this.endpoint}/especializacao/listarTodos`);
  }

  getSpecializationById(id: string): Observable<CourseSpecApiResponse> {
    return this.http.get<CourseSpecApiResponse>(`${this.endpoint}/especializacao/listarPorAtuacao?idAtuacao=${id}`);
  }
 
}
