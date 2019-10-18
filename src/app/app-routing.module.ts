import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RouteGuard } from './auth/route.guard';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { CarListComponent } from './cars/car-list/car-list.component';
import { CarRegisterComponent } from './cars/car-register/car-register.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { CarDetailComponent } from './cars/car-detail/car-detail.component';
import { CarEditComponent } from './cars/car-edit/car-edit.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' },
    canActivate: [RouteGuard]
  },  
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Sign In' }
  },
  {
    path: 'cars',
    component: CarListComponent,
    data: { title: 'Cars' },
    canActivate: [RouteGuard]
  },
  {
    path: 'car/register',
    component: CarRegisterComponent,
    data: { title: 'Cars Register' },
    canActivate: [RouteGuard]
  },
  {
    path: 'car/detail/:id',
    component: CarDetailComponent,
    data: { title: 'Detail' },
    canActivate: [RouteGuard]
  },
  {
    path: 'car/edit/:id',
    component: CarEditComponent,
    data: { title: 'Edit' },
    canActivate: [RouteGuard]
  },
  {
    path: 'users',
    component: UserListComponent,
    data: { title: 'Users' }
  },
  {
    path: 'user/register',
    component: RegisterComponent,
    data: { title: 'Sign Up' }
  },
  {
    path: 'user/edit/:id',
    component: UserEditComponent,
    data: { title: 'Edit' }
  },
  {
    path: 'user/detail/:id',
    component: UserDetailComponent,
    data: { title: 'Detail' }
  },
  { path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
