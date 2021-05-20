import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {

  tasks: any[] = [];

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
        //console.log(task) // muestro la tares en consola
        this.tasks.push(task); // agregar al arreglo la tarea
      });
    
  })
}

}

