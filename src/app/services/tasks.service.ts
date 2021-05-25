import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private firestore: AngularFirestore ) {}

  getTasks(){
    return this.firestore.collection('tasks').get();
  }

  addTask(task: any): Promise<any>{
    return this.firestore.collection('tasks').add(task)
  }
}
