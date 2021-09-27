import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.component.html',
  styleUrls: ['./details-task.component.css']
})
export class DetailsTaskComponent implements OnInit {

  task:any | null;
  id:any | null;
  user: firebase.default.User;
  date: any;

  constructor(
    private aroute: ActivatedRoute,
    private _tasksService: TasksService,
    private authService:AuthService,
    private router: Router
    ) { 
   this.id = this.aroute.snapshot.paramMap.get("id");
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
        image: data.payload.data()['image'],
        createAt: data.payload.data()['createAt'],
        description: data.payload.data()['description']
      }
        
      if(thetask.email == this.user.email){
        this.task = thetask;
        let desp = this.task.description.split(' ');
        console.log(desp)
        this.changeDate(this.task.createAt)
      }else{
        this.router.navigate(["/home"]);
      }
    })
  }

  changeDate(date){
    //this.date = new Date(date).toLocaleDateString('es-AR')
    this.date = date.toDate()
  }

}
