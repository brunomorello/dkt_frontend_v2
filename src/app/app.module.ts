import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from './components/footer/footer.component';

import { FormsModule } from "@angular/forms";
import { HomeComponent } from './modules/home/home.component';
import { SearchCourseComponent } from './modules/search-course/search-course.component';
import { HomeCustomerDoubtsFormEmailComponent } from './modules/home-customer-doubts-form-email/home-customer-doubts-form-email.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SearchCourseComponent,
    HomeCustomerDoubtsFormEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
