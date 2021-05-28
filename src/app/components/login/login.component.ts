import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router){
    authService.getCurrentUser().subscribe(user=>{
      if(user){
        this.router.navigate(["/home"])
      }
    })
  }

  ngOnInit(): void {}

  loginWithGoogle(){
    this.authService.loginGoogle().then((data)=>{
     // console.log(data)
    })
  }



}
