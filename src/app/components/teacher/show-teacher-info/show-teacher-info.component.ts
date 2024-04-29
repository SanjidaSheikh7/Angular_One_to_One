import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Teacher } from 'src/app/models/teacher';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

@Component({
  selector: 'app-show-teacher-info',
  templateUrl: './show-teacher-info.component.html',
  styleUrls: ['./show-teacher-info.component.css']
})
export class ShowTeacherInfoComponent implements OnInit {
  teachers:Teacher[]=[];
  filteredTeacherList: Teacher[] = [];
  isSearch:boolean=false;
  

  constructor(private teacherService:TeacherServiceService,
    private router:Router,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.getAllTeachers();
  }
  public getAllTeachers():void{
    this.teacherService.getAllTeachers().subscribe(
     (response:Teacher[])=>{
       this.teachers=response;
       console.log(this.teachers);
     }
    )
   }
 
   deleteTeacher(courseId: number):void {
     this.teacherService.deleteTeacher(courseId).subscribe((result)=>{
       this.teachers = this.teachers.filter(emp => emp.id !== courseId);
     }
 
     )
     }
     
    filterResults(searchQuery: string): void {
      this.isSearch = true;
      searchQuery = searchQuery.toLowerCase(); 
  
      this.filteredTeacherList = this.teachers.filter(teacher => {
          return Object.values(teacher).some(value => {
              if (typeof value === 'string') {
                  return value.toLowerCase().includes(searchQuery);
              } else if (typeof value === 'number') {
                 
                  return value.toString().toLowerCase().includes(searchQuery);
              }
              return false; 
          });
      });
  }
  
  
    refreshPage(): void {
      window.location.reload();
  }
}


