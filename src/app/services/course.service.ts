import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CourseApiResponse } from '../models/CourseApiResponse';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) { }

    private endpoint = "http://direkte.com.br:10009";

    getCourseList(): Observable<CourseApiResponse> {

        return this.http.get<CourseApiResponse>(`${this.endpoint}/atuacao/listarTodos`);
    
    }

}