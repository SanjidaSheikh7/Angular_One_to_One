import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class CourseServiceService {
  domain: string;
  course: any;
  courseForm: any;
  isUpdate: any;
  courseService: any;
  router: any;
  constructor(private http:HttpClient) { 
    this.domain='http://localhost:8080'; 
  }
  public getAllCourses():Observable<any>{
    return this.http.get<Course[]>(`${this.domain}/course/v1/all`);
  }
  public getCourseById(courseId:number):Observable<Course>{
    return this.http.get<Course>(`${this.domain}/course/v1/find/${courseId}`);
  }
  public addCourse(course:Course):Observable<Course>{
     return this.http.post<Course>(`${this.domain}/course/v1/add`,course);
  }
  public updateCourse(courseId:number,course:object):Observable<Course>{
    return this.http.put<any>(`${this.domain}/course/v1/update/${courseId}`,course);
  }
  public deleteCourse(courseId:number):Observable<void>{
    return this.http.delete<void>(`${this.domain}/course/v1/delete/${courseId}`);
  }
  // onSubmitCourse(courseForm:FormGroup,courseId:number,isUpdate:boolean) {
  //   // this.course=this.courseForm.value;
  //   // console.log(this.course);
  //   if(this.isUpdate){
  //     return this.courseService.updateCourse(courseId, this.courseForm).subscribe(result => {
  //       console.warn(result);
  //       this.router.navigate(['/teacher/add']).then(() => {
  //         this.courseForm.reset();
  //       });
  //     });
  //   }else{
  //     return this.courseService.addCourse(this.courseForm).subscribe((result)=>{  
  //       console.warn(result);
  //       this.router.navigate(['/teacher/add']).then(() => {
  //         this.courseForm.reset();
  //       });
  //     })
  //     this.courseForm.reset();
  //   }
      
  // }
  onSubmitCourse(courseForm: FormGroup, courseId: number, isUpdate: boolean): Observable<any> {
    if (isUpdate) {
      return this.updateCourse(courseId, courseForm.value);
    } else {
      return this.addCourse(courseForm.value);
    }
  }
}
