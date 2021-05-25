import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  createTask: FormGroup;
  submitted: Boolean = false;
  user: firebase.default.User

  constructor(private fb: FormBuilder, private taskService: TasksService, private router: Router, private authService: AuthService) {

    this.createTask = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      email: ["", Validators.email],
      createAt: [Date.now()],
      isDone: [false]
    })

  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(actualUser=>{
      if(actualUser){
        this.user = actualUser;        
      }else{
        this.router.navigate(["/home"])
      }
    })
  }

  addTask(){
    if(this.createTask.valid){
      const task: any = {
        title: this.createTask.value.title,
        description: this.createTask.value.description,
        email: this.user.email,
        createAt: this.createTask.value.createAt,
        isDone: this.createTask.value.isDone
      }
      console.log(task);
      this.taskService.addTask(task).then(()=>{
        console.log("agregado");
        this.router.navigate(["/list"]);
      }).catch(error => {
        console.log("error");  
      })


    }else{
      console.log("No valido wuacho");
    }

  }

}
