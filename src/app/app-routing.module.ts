import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
<<<<<<< HEAD
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { DetailsTaskComponent } from './components/details-task/details-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';


=======

>>>>>>> b0443d3a0cd043fde6294f899104e8a4b917334f
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'list', component: ListTasksComponent},
<<<<<<< HEAD
  { path: 'create', component: CreateTaskComponent},
  { path: 'details/:id', component: DetailsTaskComponent},
  { path: 'edit/:id', component: EditTaskComponent},
=======
>>>>>>> b0443d3a0cd043fde6294f899104e8a4b917334f
  { path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
<<<<<<< HEAD
    
=======
>>>>>>> b0443d3a0cd043fde6294f899104e8a4b917334f
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
