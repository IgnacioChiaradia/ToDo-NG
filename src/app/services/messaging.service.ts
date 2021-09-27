import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {


  constructor(private angularFireMessaging: AngularFireMessaging) { 
    //this.angularFireMessaging.messages.subscribe((_messaging: AngularFireMessaging) => {
    //    _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    //    _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    //  }
    //)
    
  }


  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe( (token) => {
      console.log('este es el token')
      console.log(token);
      //this.receiveMessage()
    }, (err) => {
    console.error('Unable to get permission to notify.', err);
    }
    );
  }

  
  receiveMessage() {
    this.angularFireMessaging.onMessage(
      (payload) => {
        console.log("new message received. ", payload);
        console.log('----')
        // para probar
       // this.showCustomNotification(payload)
        })
    }
   /* 
    showCustomNotification(payload:any){
      let notify_data = payload['notification'];
      let title = notify_data['title'];
      let options = {
        body: notify_data['body'],
        //icon: '../assets',
        //badge: './assets/images/2.jpg',
        //image: './assets/image/3.jpg',
      };
      console.log('nuevo mensaje recibido', notify_data);
      let notify: Notification = new Notification(title,options)
  
      notify.onclick = event => {
        event.preventDefault();
        window.location.href = 'https://www.google.com.ar'
      }
    }
  */
  }

