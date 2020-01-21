import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Course } from "../models/course";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    endpoint = "http://direkte.com.br:10009";

    constructor(private http: HttpClient) { }

    getCourseList() {

        // return this.http.get(this.endpoint + "/atuacao/listarTodos")
        //     .pipe<Course[]>(
        //         map((api: any[]) => {
        //             return api.map(
        //                 apiResponse => new Course ({
        //                     id: apiResponse.id,
        //                     nome: apiResponse.nome,
        //                     createdAt: apiResponse.createdAt,
        //                     updatedAt: apiResponse.updatedAt
        //                 })
        //             )
        //         })
        //     )

    }

}