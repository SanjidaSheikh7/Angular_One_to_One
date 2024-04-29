import { Component,Input,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseServiceService } from 'src/app/services/course-service.service';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

@Component({
  selector: 'app-add-update-teacher',
  templateUrl: './add-update-teacher.component.html',
  styleUrls: ['./add-update-teacher.component.css']
})
export class AddUpdateTeacherComponent implements OnInit {
  title:'teacherForm';
  courseList:Course[]=[];
  teacherForm:FormGroup;
  isUpdate:boolean;
  teacherId:number;
  isView:boolean;
  constructor(private courseService:CourseServiceService,
              private teacherService:TeacherServiceService,
              private router:Router,
              private route:ActivatedRoute
  ){}
  ngOnInit():void{
    this.teacherForm=new  FormGroup({
       id:new FormControl(null,Validators.required),
       name:new FormControl(null,Validators.required),
       email:new FormControl(null,[Validators.required,Validators.email]),
       phoneNo:new FormControl(null,Validators.required),
       address:new FormControl(null,Validators.required),
       courseId:new FormControl(null,Validators.required)
    });
    this.getAllCourses();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.teacherId = params['id'];
        this.isUpdate = true;
        this.teacherService.getTeacherById(this.teacherId).subscribe(teacherResponse => {
          this.teacherForm.patchValue({
            name:teacherResponse.name,
            email:teacherResponse.email,
            phoneNo:teacherResponse.phoneNo,
            address:teacherResponse.address,
            courseId:teacherResponse.courseId
          });
        });
      }
    });

    this.route.queryParams.subscribe(params => {
      console.log('Query Params:', params);
      // debugger
      if (params['isUpdate']) {
        this.isUpdate = true;
        console.log(this.isUpdate);
      }
  
      if (params['isView']) {
        this.isView = true; 
        Object.keys(this.teacherForm.controls).forEach(controlName => {
          this.teacherForm.get(controlName)?.disable();
        });
      }
    });

  }
  
  public getAllCourses():void{
    this.courseService.getAllCourses().subscribe(
     (response:Course[])=>{
       this.courseList=response;
     }
    )
   }
   onSubmitTeacher(){
    this.teacherService.onSubmitTeacher(this.teacherForm, this.teacherId, this.isUpdate).subscribe(result => {
      console.warn(result);
      this.router.navigate(['/teacher']).then(() => {
        this.teacherForm.reset();
      });
    });
   }
  //  onCourseSelectionChange(courseName: string): void {
  //   const selectedCourse = this.courseList.find(course => course.courseName === courseName);
  //   if (selectedCourse) {
  //     this.teacherForm.patchValue({
  //       courseId: selectedCourse.id
  //     });
  //   }
  // }
  onCourseSelectionChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.teacherForm.patchValue({
      courseId: selectedValue
    });
}
getSubmitButtonText() {
  return this.isView ? 'View' : (this.isUpdate ? 'Update' : 'Add')
}
}
