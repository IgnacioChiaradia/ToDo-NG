import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todong';
  items:any[]= new Array<any>();
  constructor(firestore: AngularFirestore) {
    firestore.collection('tasks').get().subscribe(data=>{
      data.docs.forEach(t=>{
        console.log(t.data())
      });
    });
    
    
  }
}
