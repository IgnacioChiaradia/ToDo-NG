import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { title } from 'process';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
//import 'firebase/firestore'

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  createTask: FormGroup;
  submitted: Boolean = false;
  user: firebase.default.User

  // porcentaje de la subida de la imagen
  percentage : Observable<number>;

  // evento input image
  eventInput: any
  // snap de lo que se esta cargando
  snapshot: any

  constructor(private fb: FormBuilder,
      private taskService: TasksService,
      private router: Router,
      private authService: AuthService,
      private toastr: ToastrService
      ) {

    this.createTask = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      email: ["", Validators.email],
      createAt: firebase.default.firestore.FieldValue.serverTimestamp(),//[Date.now()],
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

      const task: any = {
        title: this.createTask.value.title,
        description: this.createTask.value.description,
        email: this.user.email,
        createAt: this.createTask.value.createAt,
        image: null,
        isDone: this.createTask.value.isDone
      }

    // si todos los campos son validos
    if(this.createTask.valid){

      if(this.eventInput){
        // llamo a la funcion de que sube la image y agregar la tarea
        this.addTaskAnduploadFile(task);
      }else{
        // si no se cargo ninguna imagen directamente subo la image asi nomas 
        this.taskService.addTask(task).then(()=>{
          this.showSuccess(task.title);
          this.router.navigate(["/list"]);
        }).catch(error => {
          console.log("error");  
        })

      }

        
    }else{
      this.getFormValidationErrors()
      console.log("Invalid");
    }

  }

  showSuccess(taskTitle: String) {
    this.toastr.success('Tarea ' + taskTitle + " creada con éxito", 'Tarea creada');
  }

  //I stole this from here
  //https://stackoverflow.com/questions/40680321/get-all-validation-errors-from-angular-2-formgroup
  //Stealing is wrong! https://pbs.twimg.com/media/DJ9n5LzXkAAbkL9?format=jpg&name=small
  getFormValidationErrors() {
    Object.keys(this.createTask.controls).forEach(key => {  
    const controlErrors: ValidationErrors = this.createTask.get(key).errors;//get error if any
    const translationThatProbablyShouldntBeHereButIDontKnowEnoghtAngularToKnowWhereToPutIt = {"title": "Titulo", "description": "Descripción"}; //need spanish translation because consistency.
    if (controlErrors != null) {//if there are errors
          Object.keys(controlErrors).forEach(keyError => {//loop errors
            this.toastr.error(translationThatProbablyShouldntBeHereButIDontKnowEnoghtAngularToKnowWhereToPutIt[key] + ' No puede estar vacio'); //show toast            
          });
        }
      });
    }

    // guarda el evento del input osea la imagen que se selecciono
    changeFile = ($event) => {
      this.eventInput = $event
      console.log('changeFile')
      console.log($event)
    }

    // agrega tarea y sube imagen
    addTaskAnduploadFile = (task) => {
      let taskRet = this.taskService.addImage(task,this.eventInput)
      // si devuelve la tarea redirecciono
      if(taskRet){
        this.showSuccess(task.title);
        this.router.navigate(["/list"]);
      }

      
    }
}
