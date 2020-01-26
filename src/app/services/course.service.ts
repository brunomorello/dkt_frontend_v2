import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { CourseApiResponse } from '../models/CourseApiResponse';
import { CourseSearchApiResponse } from '../models/CourseSearchApiResponse';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) { }

    private endpoint = "http://direkte.com.br:10009";

    getCourseList(): Observable<CourseApiResponse> {

        return this.http.get<CourseApiResponse>(`${this.endpoint}/atuacao/listarTodos`);
    
    }

    searchCourse(searchOptions): Observable<CourseSearchApiResponse> {

        const httpHeaders = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        };

        console.log(searchOptions);
    
        return this.http.post<CourseSearchApiResponse>(`${this.endpoint}/curso/listarTodosPesquisa`, searchOptions, httpHeaders);

    }

}