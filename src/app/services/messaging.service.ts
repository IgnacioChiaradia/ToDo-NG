import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  messaging = firebase.messaging();

  constructor(private angularFireMessaging: AngularFireMessaging) { 
    //this.angularFireMessaging.messages.subscribe((_messaging: AngularFireMessaging) => {
    //    _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    //    _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    //  }
    //)
    
  }


  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe( (token) => {
      console.log(token);
      this.receiveMessage()
    },
    (err) => {
    console.error('Unable to get permission to notify.', err);
    }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
        // para probar
        this.showCustomNotification(payload)
        })
    }
    
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
  
  }

