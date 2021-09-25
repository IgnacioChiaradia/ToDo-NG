import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {}

  getTasks(){
    return this.firestore.collection('tasks').get();
  }

  getTasksUser(email: string): Observable<any>{
    return this.firestore.collection('tasks',ref => ref.where('email', '==', email)).snapshotChanges();
  }

  getTask(id: any, email: string): Observable<any>{
    return this.firestore.collection('tasks',ref => ref.where('email', '==', email)).doc(id).snapshotChanges();
  }

  addTask(task: any): Promise<any>{
    return this.firestore.collection('tasks').add(task)
  }
  
  deleteTask(id: any): Promise<any>{
    return this.firestore.collection('tasks').doc(id).delete();
  }

  editTask(task:any, id:any): Promise<any>{
    return this.firestore
    .collection('tasks')
    .doc(id)
    .update(task)
  }

  addImage(event){
    const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
  }

}
