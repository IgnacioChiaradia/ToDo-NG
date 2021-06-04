import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  editTask: FormGroup;
  submitted: Boolean = false;
  task:any | null;
  id:any | null;
  user: firebase.default.User;

  constructor(
    private fb: FormBuilder,
    private aroute: ActivatedRoute,
    private _tasksService: TasksService,
    private authService:AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.id = this.aroute.snapshot.paramMap.get("id");

    this.editTask = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(actualUser=>{
      if(actualUser){ 
        this.user = actualUser;
        this.getTask();
      }else{
        this.router.navigate(["/home"]);
      }
    })
  }

  getTask(){
    this._tasksService.getTask(this.id,this.user.email).subscribe(data =>{
      let thetask = {
        email: data.payload.data()['email'],
        title: data.payload.data()['title'],
        isDone: data.payload.data()['isDone'],
        createAt: data.payload.data()['createAt'],
        description: data.payload.data()['description']
      }
        
      if(thetask.email == this.user.email){
        this.task = thetask;
      }else{
        this.router.navigate(["/home"]);
      }
  })
}

updateTask(){
  console.log(this.task)
  this._tasksService.editTask(this.task, this.id).then(()=>{
    this.toastr.success('Tarea ' + this.task.title + " actualizada con éxito", 'Tarea Actualizada');
    this.router.navigate(["/list"])

  }).catch(err => {
    console.log(err)
    this.toastr.error("Error al intenter actualizada la tarea", "Error")
  })
}

}
