import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
=======
>>>>>>> b0443d3a0cd043fde6294f899104e8a4b917334f
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {

  tasks: any[] = [];
<<<<<<< HEAD
  user: firebase.default.User;


  constructor(
    private _tasksService: TasksService, 
    private authService:AuthService, 
    private router: Router,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(actualUser=>{
      
      if(actualUser){ 

        this.user = actualUser;        
        this.getTasks();
      }else{
        this.router.navigate(["/home"]);
      }
    })
  }

  getTasks(){
    this._tasksService.getTasksUser(this.user.email).subscribe(data =>{
      this.tasks=[]
      data.forEach((t:any) => {
        let task:any = {};
        task = t.payload.doc.data(); // guardo data
        task.id = t.payload.doc.id; // guardo el id para despues poder modificar
=======

  constructor(private _tasksService: TasksService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this._tasksService.getTasks().subscribe(data =>{
      data.docs.forEach((t:any) => {
        let task:any = {};
        task = t.data() // guardo data
        task.id = t.id; // guardo el id para despues poder modificar
>>>>>>> b0443d3a0cd043fde6294f899104e8a4b917334f
        //console.log(task) // muestro la tares en consola
        this.tasks.push(task); // agregar al arreglo la tarea
      });
    
  })
}

<<<<<<< HEAD
  deleteTask(id: any){
    const taskTitle = this.tasks.find(task=>task.id == id).title //ask if better way
    this._tasksService.deleteTask(id).then(()=>{
      this.toastr.success('Tarea ' + taskTitle + ' eliminada exitosamente');      
    }).catch(()=>{
      console.log("error removing task")
    })
  }

  taskChangeState(id){
    this.tasks.forEach((t) => {
      if(t.id === id){ 
        this.firestore
          .collection('tasks')
          .doc(id)
          .update({isDone: !t.isDone})
      }
    })

  }
}



=======
}

>>>>>>> b0443d3a0cd043fde6294f899104e8a4b917334f
