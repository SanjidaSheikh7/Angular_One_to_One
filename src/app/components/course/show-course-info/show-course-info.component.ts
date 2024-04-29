import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { CourseServiceService } from 'src/app/services/course-service.service';

@Component({
  selector: 'app-show-course-info',
  templateUrl: './show-course-info.component.html',
  styleUrls: ['./show-course-info.component.css']
})
export class ShowCourseInfoComponent implements OnInit{

  courses:Course[];
  filteredCourseList: Course[] = [];
  isSearch:boolean=false;
  
  constructor(private courseService:CourseServiceService
  ){}

  ngOnInit():void{
    this.getAllCourses();
    this.filteredCourseList=this.courses;
  }

  public getAllCourses():void{
   this.courseService.getAllCourses().subscribe(
    (response:Course[])=>{
      this.courses=response;
    }
   )
  }

  deleteCourse(courseId: number):void {
    this.courseService.deleteCourse(courseId).subscribe((result)=>{
      this.courses = this.courses.filter(emp => emp.id !== courseId);
    }
    )
  }

  // filterResults(text: string) {
  //   if (!text) {
  //     this.filteredCourseList = [...this.courses];
  //     return;
  //   }
  
  //   this.filteredCourseList = this.courses.filter(
  //     courseSearch => courseSearch?.courseName.toLowerCase().includes(text.toLowerCase())
  //   );
  // }
  // filterResults(searchQuery: string): void {
  //   this.isSearch=true;
  //   searchQuery = searchQuery.toLowerCase(); 
  //   this.filteredCourseList = this.courses.filter(course =>
  //     Object.values(course).some(value => 
  //         (typeof value === 'string' && value.toLowerCase().includes(searchQuery))
  //     )
  // );
  // }

  filterResults(searchQuery: string): void {
    this.isSearch = true;
    searchQuery = searchQuery.toLowerCase(); 

    this.filteredCourseList = this.courses.filter(course => {
        return Object.values(course).some(value => {
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

  // onSubmitCourse() {
  //   this.courseService.onSubmitCourse(this.courseForm, this.courseId, this.isUpdate).subscribe(result => {
  //     console.warn(result);
  //     this.router.navigate(['/course']).then(() => {
  //       this.courseForm.reset();
  //     });
  //   });
  // }
}
