import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateTeacherComponent } from './components/teacher/add-update-teacher/add-update-teacher.component';
import { AddUpdateCourseComponent } from './components/course/add-update-course/add-update-course.component';
import { ShowCourseInfoComponent } from './components/course/show-course-info/show-course-info.component';
import { ShowTeacherInfoComponent } from './components/teacher/show-teacher-info/show-teacher-info.component';


const routes: Routes = [
  { path: 'teacher', component: ShowTeacherInfoComponent,title:'Home'},
  { path: 'teacherDetails', component: AddUpdateTeacherComponent,title:'Add Teacher' },
  { path: 'teacherDetails/:id', component: AddUpdateTeacherComponent,title:'Add Teacher' },
  { path: 'courseDetails', component: AddUpdateCourseComponent,title:'Add Course' },
  { path: 'courseDetails/:id', component: AddUpdateCourseComponent,title:'Update Course' },
  { path: 'course', component: ShowCourseInfoComponent,title:'Course Information' },
  { path: '', redirectTo:'teacher',pathMatch:'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
