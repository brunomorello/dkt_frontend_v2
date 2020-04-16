import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { CourseApiResponse } from '../models/CourseApiResponse';
import { CourseSearchApiResponse } from '../models/CourseSearchApiResponse';
import { CourseSearchResponse } from '../models/CourseSearchResponse';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) { }

    private endpoint = "https://www.direkte.com.br:10009";

    private httpHeaders = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    };

    getCourseList(): Observable<CourseApiResponse> {

        return this.http.get<CourseApiResponse>(`${this.endpoint}/atuacao/listarTodos`);
    
    }

    searchCourse(searchOptions): Observable<CourseSearchApiResponse> {

        return this.http.post<CourseSearchApiResponse>(`${this.endpoint}/curso/listarTodosPesquisa`, searchOptions, this.httpHeaders);

    }

    searchCourseById(courseId: number) {

        return this.http.get(`${this.endpoint}/curso/listarPorId/${courseId}`)
            .pipe(
                map((courseApiResponse: any) => {
                    // console.log(courseApiResponse);
                    
                    return new CourseSearchResponse({
                        id: courseApiResponse.msg[0].id,
                        nome: courseApiResponse.msg[0].nome,
                        valorTotal: courseApiResponse.msg[0].valorTotal,
                        valorMensal: courseApiResponse.msg[0].valorMensal,
                        periodo: courseApiResponse.msg[0].periodo,
                        duracao: courseApiResponse.msg[0].duracao,
                        mba: courseApiResponse.msg[0].mba,
                        pos: courseApiResponse.msg[0].pos,
                        is_active: courseApiResponse.msg[0].is_active,
                        id_modalidade: courseApiResponse.msg[0].id_modalidade,
                        id_instituicao: courseApiResponse.msg[0].id_instituicao,
                        id_cursoUrl: courseApiResponse.msg[0].id_cursoUrl,
                        id_cursoUrl_manual: courseApiResponse.msg[0].id_cursoUrl_manual,
                        id_especializacao: courseApiResponse.msg[0].id_especializacao,
                        id_atuacao: courseApiResponse.msg[0].id_atuacao,
                        especializacao: courseApiResponse.msg[0].especializacao,
                        atuacao: courseApiResponse.msg[0].atuacao,
                        instituicao: courseApiResponse.msg[0].instituicao,
                        modalidade: courseApiResponse.msg[0].modalidade,
                        cursoUrl: courseApiResponse.msg[0].cursoUrl,
                        cursoUrlManual: courseApiResponse.msg[0].cursoUrlManual
                    });
                })
            )
    }

}