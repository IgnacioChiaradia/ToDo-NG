import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/Operators';



@Injectable({
  providedIn: 'root'
})
export class TasksService {

    // url de la imagen subida
    downloadURL : Observable<string>;

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

  // sube una imagen usando Storage Firebase
  addImage(task, event){
    // guardo imagen
    const file = event.target.files[0];
    // creo la ruta donde se va a guardar
    const filePath = `uploads/${file.name}`;
    // guardo un referencia
    const ref = this.storage.ref(filePath);
    // pongo la subo la iamgen
    const imageTask = ref.put(file);
    // voy viendo la subida
    imageTask.snapshotChanges().pipe(
      finalize(() => {
         ref.getDownloadURL().subscribe((url) => {
           // cuando se termino de subir 
           // agregar a la tarea la url de la imagen
            task.image = url
            // guardo tarea
            this.addTask(task)
         })
        })
      ).subscribe()
      return task
    }    


}
