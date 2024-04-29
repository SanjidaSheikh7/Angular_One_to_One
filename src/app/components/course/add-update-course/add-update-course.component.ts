import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseServiceService } from 'src/app/services/course-service.service';

@Component({
  selector: 'app-add-update-course',
  templateUrl: './add-update-course.component.html',
  styleUrls: ['./add-update-course.component.css']
})
export class AddUpdateCourseComponent implements OnInit {
  title:'courseForm';
  courseForm:FormGroup;
  course:Course;
  isUpdate: boolean = false;
  isView:boolean=false;
  courseId: number;

  constructor(private http:HttpClient,
    private courseService:CourseServiceService,
    private router:Router,
    private route: ActivatedRoute
    ){}

  ngOnInit():void{
       this.courseForm=new FormGroup({
       id:new FormControl(null,Validators.required),
       courseName:new FormControl(null,Validators.required,),
       courseCredit:new FormControl(null,Validators.required)
    });

    this.route.params.subscribe(params => {
      console.log('Route Params:', params);
      if (params['id']) {
        this.courseId = params['id'];
        this.courseService.getCourseById(this.courseId).subscribe(courseResponse => {
          this.courseForm.patchValue({
            courseName: courseResponse.courseName,
            courseCredit:courseResponse.courseCredit
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
        // this.courseForm.get('courseName')?.disable();
        Object.keys(this.courseForm.controls).forEach(controlName => {
          this.courseForm.get(controlName)?.disable();
        });
      }
    });
  }
  
  onSubmitCourse() {
    this.courseService.onSubmitCourse(this.courseForm, this.courseId, this.isUpdate).subscribe(result => {
      console.warn(result);
      this.router.navigate(['/course']).then(() => {
        this.courseForm.reset();
      });
    });
    
  }
  getSubmitButtonText() {
    return this.isView ? 'View' : (this.isUpdate ? 'Update' : 'Add')
  }
  // onSubmitCourse(courseForm:FormGroup,courseId:number,isUpdate:boolean) {
  //   this.courseService.onSubmitCourse(courseForm, this.courseId, this.isUpdate);
   
  // }
  // onSubmitCourse() {
  //   this.course=this.courseForm.value;
  //   console.log(this.course);
  //   if(this.isUpdate){
  //     this.courseService.updateCourse(this.courseId, this.course).subscribe(result => {
  //       console.warn(result);
  //       this.router.navigate(['/teacher/add']).then(() => {
  //         this.courseForm.reset();
  //       });
  //     });
  //   }else{
  //     this.courseService.addCourse(this.course).subscribe((result)=>{  
  //       console.warn(result);
  //       this.router.navigate(['/teacher/add']).then(() => {
  //         this.courseForm.reset();
  //       });
  //     })
  //     this.courseForm.reset();
  //   }
      
  // }

  
}



