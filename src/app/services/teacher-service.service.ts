import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { Teacher } from '../models/teacher';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TeacherServiceService {
  domain: string;
  constructor(private http:HttpClient) { 
    this.domain='http://localhost:8080'; 
  }
  public getAllTeachers():Observable<any>{
    return this.http.get<Teacher[]>(`${this.domain}/teacher/v1/all`);
  }
  public getTeacherById(teacherId:number):Observable<Teacher>{
    return this.http.get<Teacher>(`${this.domain}/teacher/v1/find/${teacherId}`);
  }
  public addTeacher(teacher:Teacher):Observable<Teacher>{
     return this.http.post<Teacher>(`${this.domain}/teacher/v1/add`,teacher);
  }
  public updateTeacher(teacherId:number,teacher:object):Observable<Teacher>{
    return this.http.put<any>(`${this.domain}/teacher/v1/update/${teacherId}`,teacher);
  }
  public deleteTeacher(teacherId:number):Observable<void>{
    return this.http.delete<void>(`${this.domain}/teacher/v1/delete/${teacherId}`);
  }
  onSubmitTeacher(teacherForm: FormGroup, teacherId: number, isUpdate: boolean): Observable<any> {
    if (isUpdate) {
      return this.updateTeacher(teacherId, teacherForm.value);
    } else {
      return this.addTeacher(teacherForm.value);
    }
  }
}
