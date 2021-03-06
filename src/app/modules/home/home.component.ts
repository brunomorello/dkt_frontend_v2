import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { CourseService } from "../../services/course.service";
import { CourseSpecializationService } from "../../services/course-specialization.service";
import { Course } from 'src/app/models/Course';
import { Specialization } from 'src/app/models/Specialization';
import { CourseSearchApiResponse } from 'src/app/models/CourseSearchApiResponse';
import { SendGridMailAPIService } from 'src/app/services/send-grid-mail-api.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    // Menu Search JSON using two-way data binding
    menuSearchOptions = {
        postGraduation: true,
        mba: true,
        mainCourse: '0',
        courseSpecialization: '0',
        onSite: true,
        semiOnSite: true,
        onlineCourse: false
    };

    // Customer Newsletter
    customerMailNewsletter = "";

    // controls to display DOM Elements
    displaySearch = false;
    displayDefaultHome = true;
    displayHeaderMenuItens = true;
    courseListBoxFocus = true;
    specListBoxFocus = false;

    // course search result JSON
    searchCouseResult: CourseSearchApiResponse;

    private courseList: Course[];
    private specializationList: Specialization[];
    private specializationListDump: Specialization[];

    // Error Message
    errorMessage: string;

    constructor(
        private courseService: CourseService, 
        private courseSpecService: CourseSpecializationService, 
        private mailService: SendGridMailAPIService,
        private router: Router
    ) { }

    ngOnInit() {
        
       this.courseService.getCourseList()
            .subscribe(response => this.courseList = response.msg);

        this.courseSpecService.getSpecializationList()
            .subscribe(response => this.specializationListDump = response.msg);
            
    }

    loadSpecialization(event) {

        this.removeFocusBox("course");
        this.specListBoxFocus = true;

        //cleanup specializationList array
        this.specializationList = [];

        // Sets an invalid option to initialize select element
        this.menuSearchOptions.courseSpecialization = "0";

        this.specializationListDump.forEach(spec => {
            if(spec.id_atuacao == event.target.value)  
                this.specializationList.push(spec);
        });

    }

    removeFocusBox(boxName: string) {
        if (boxName == "spec") {
            this.specListBoxFocus = false;
        } else if (boxName == "course") {
            this.courseListBoxFocus = false;
        }
    }

    performSearch(menuSearchOptionsForm: NgForm) {

        if (menuSearchOptionsForm.invalid || this.menuSearchOptions.mainCourse == "0" || this.menuSearchOptions.courseSpecialization == "0") {

            this.errorMessage = "Por favor selecione uma Área de atuação e uma Especialização";

            $('.alert').show().focus();

            // hide alert after 2s
            setTimeout(() => {
                $('.alert').hide();
            }, 2000);

            return;
        }

        // controls to display DOM Elements
        // this.displaySearch = true;
        // this.displayDefaultHome = false;
        // this.displayHeaderMenuItens = false;

        // storing course and course specialization
        let mainCouseAux = this.courseList.find(element => element.id == this.menuSearchOptions.mainCourse);
        let courseSpecializationAux = this.specializationListDump.find(element => element.id == this.menuSearchOptions.courseSpecialization);

        let modalidade = [];
        
        if (this.menuSearchOptions.onSite) {
            modalidade.push(1);
        }

        if (this.menuSearchOptions.semiOnSite) {
            modalidade.push(2);
        }

        let queryParams = {
            'atuacao': mainCouseAux.nome,
            'mba': this.menuSearchOptions.mba,
            'pos': this.menuSearchOptions.postGraduation,
            'especializacao': courseSpecializationAux.nome,
            'modalidade': modalidade,
            'pagina': ''
        }

        this.router.navigate(['/courseSearch'], { queryParams });
        
        // this.courseService.searchCourse(searchCouseObj)
        //     .subscribe(response => this.searchCouseResult = response);
        
    }

    receiveEmailNewsletter(customerFormNewsletter: NgForm) {

        let msg = {
            "text": `E-mail recebido para newsletter: ${this.customerMailNewsletter}`
        };

        this.mailService.sendMail(msg)
            .subscribe(resp => {
                console.log(resp);

                if(resp.statusCode != "202" && resp.statusCode != "200") {
                    this.errorMessage = "Erro para receber seu e-mail, contacte a equipe através do e-mail contato@direkte.com.br";
                    
                    $("#newsletter-confirmation")
                        .addClass('alert-danger')
                        .show()
                        .focus();
                }

                this.errorMessage = "E-mail recebido com sucesso! Obrigado";
                
                $('#newsletter-confirmation')
                .removeClass('alert-danger')
                .addClass('alert-success')
                .show()
                .focus();
                
                setTimeout(() => {
                    
                    $('#newsletter-confirmation').hide();
                    
                    this.customerMailNewsletter = "";
                    this.errorMessage = "";
                }, 2000);
            });

    }


}