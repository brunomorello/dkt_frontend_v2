import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./modules/home/home.component";
import { SearchCourseComponent } from "./modules/search-course/search-course.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'searchCourse', component: SearchCourseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
