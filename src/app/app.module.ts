import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
<<<<<<< HEAD
=======

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

// bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './components/home/home.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
>>>>>>> b0443d3a0cd043fde6294f899104e8a4b917334f

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

// bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './components/home/home.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsTaskComponent } from './components/details-task/details-task.component';


import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
<<<<<<< HEAD
    ListTasksComponent,
    CreateTaskComponent,
    DetailsTaskComponent,
    EditTaskComponent
=======
    ListTasksComponent
>>>>>>> b0443d3a0cd043fde6294f899104e8a4b917334f
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BsDropdownModule.forRoot(),
<<<<<<< HEAD
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right' //this line :(
    })
=======
    BrowserAnimationsModule
>>>>>>> b0443d3a0cd043fde6294f899104e8a4b917334f
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
