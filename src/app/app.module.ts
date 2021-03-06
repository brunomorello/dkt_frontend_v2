import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from './components/footer/footer.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from './modules/home/home.component';
import { SearchCourseComponent } from './modules/search-course/search-course.component';
import { HomeCustomerDoubtsFormEmailComponent } from './modules/home-customer-doubts-form-email/home-customer-doubts-form-email.component';
import { HttpClientModule } from '@angular/common/http';

import * as $ from 'jquery';
import { CourseSearchComponent } from './components/course-search/course-search.component';
import { CoursePreRegistrationComponent } from './components/course-pre-registration/course-pre-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SearchCourseComponent,
    HomeCustomerDoubtsFormEmailComponent,
    CourseSearchComponent,
    CoursePreRegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
