import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, ReplaySubject } from 'rxjs'
import * as firebase from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: firebase.default.User
  logged: Boolean = false 

  constructor(private authService: AuthService) {}

  async ngOnInit() {    
    this.authService.getCurrentUser().subscribe(actualUser=>{
      if(actualUser){
        this.user = actualUser;
        this.logged = true
        console.log("my user: " + this.user.displayName)
      } 
    })
  }

  async logout(){    
    await this.authService.logout()
    this.logged = false
  }

}
