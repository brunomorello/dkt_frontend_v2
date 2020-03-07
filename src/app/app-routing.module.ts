import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./modules/home/home.component";
import { CourseSearchComponent } from "./components/course-search/course-search.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'courseSearch', component: CourseSearchComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
