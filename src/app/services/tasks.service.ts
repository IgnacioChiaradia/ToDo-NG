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

  getTasksUser(email: string): Observable<any>{
    return this.firestore.collection('tasks',ref => ref.where('email', '==', email)).snapshotChanges();
  }

  addTask(task: any): Promise<any>{
    return this.firestore.collection('tasks').add(task)
  }
  deleteTask(id: any): Promise<any>{
    return this.firestore.collection('tasks').doc(id).delete();
  }
}
