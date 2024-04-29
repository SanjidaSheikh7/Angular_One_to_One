import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUpdateTeacherComponent } from './components/teacher/add-update-teacher/add-update-teacher.component';
import { AddUpdateCourseComponent } from './components/course/add-update-course/add-update-course.component';
import { HeaderComponent } from './components/header/header.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CourseServiceService } from './services/course-service.service';
import { ShowCourseInfoComponent } from './components/course/show-course-info/show-course-info.component';
import { ShowTeacherInfoComponent } from './components/teacher/show-teacher-info/show-teacher-info.component';



@NgModule({
  declarations: [
    AppComponent,
    AddUpdateTeacherComponent,
    AddUpdateCourseComponent,
    HeaderComponent,
    ShowCourseInfoComponent,
    ShowTeacherInfoComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CourseServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
