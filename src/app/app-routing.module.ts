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

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' },
    canActivate: [RouteGuard]
  },
  {
    path: 'users',
    component: UserListComponent,
    data: { title: 'Users' }
  },
  {
    path: 'cars',
    component: CarListComponent,
    data: { title: 'Cars' }
  },
  {
    path: 'car/register',
    component: CarRegisterComponent,
    data: { title: 'Cars Register' },
    canActivate: [RouteGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Sign In' }
  },
  {
    path: 'user/register',
    component: RegisterComponent,
    data: { title: 'Sign Up' }
  },
  {
    path: 'user/register/:id',
    component: RegisterComponent,
    data: { title: 'Sign On' }
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
