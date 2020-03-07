import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { CourseApiResponse } from '../models/CourseApiResponse';
import { CourseSearchApiResponse } from '../models/CourseSearchApiResponse';
import { CourseSearchResponse } from '../models/CourseSearchResponse';
import { CourseSearchByNameApiResponse } from '../models/CourseSearchByNameApiResponse';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) { }

    private endpoint = "http://direkte.com.br:10009";

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

    searchCourseByName(courseName: string) {

        let req = {
            "nomeDoCurso": courseName
        };

        return this.http.post(`${this.endpoint}/curso/listarPorNome/1`, req, this.httpHeaders)
            .pipe(
                map((courseApiResponse: any) => {
                    
                    return new CourseSearchResponse({
                        id: courseApiResponse.msg.cursos[0].id,
                        nome: courseApiResponse.msg.cursos[0].nome,
                        valorTotal: courseApiResponse.msg.cursos[0].valorTotal,
                        valorMensal: courseApiResponse.msg.cursos[0].valorMensal,
                        periodo: courseApiResponse.msg.cursos[0].periodo,
                        duracao: courseApiResponse.msg.cursos[0].duracao,
                        mba: courseApiResponse.msg.cursos[0].mba,
                        pos: courseApiResponse.msg.cursos[0].pos,
                        is_active: courseApiResponse.msg.cursos[0].is_active,
                        id_modalidade: courseApiResponse.msg.cursos[0].id_modalidade,
                        id_instituicao: courseApiResponse.msg.cursos[0].id_instituicao,
                        id_cursoUrl: courseApiResponse.msg.cursos[0].id_cursoUrl,
                        id_cursoUrl_manual: courseApiResponse.msg.cursos[0].id_cursoUrl_manual,
                        id_especializacao: courseApiResponse.msg.cursos[0].id_especializacao,
                        id_atuacao: courseApiResponse.msg.cursos[0].id_atuacao,
                        especializacao: courseApiResponse.msg.cursos[0].especializacao,
                        atuacao: courseApiResponse.msg.cursos[0].atuacao,
                        instituicao: courseApiResponse.msg.cursos[0].instituicao,
                        modalidade: courseApiResponse.msg.cursos[0].modalidade,
                        cursoUrl: courseApiResponse.msg.cursos[0].cursoUrl,
                        cursoUrlManual: courseApiResponse.msg.cursos[0].cursoUrlManual
                    });
                })
            )
    }

}