import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { CarListComponent } from './cars/car-list/car-list.component';
import { CarDetailComponent } from './cars/car-detail/car-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { CarRegisterComponent } from './cars/car-register/car-register.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CarEditComponent } from './cars/car-edit/car-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    TopMenuComponent,
    UserListComponent,
    UserDetailComponent,
    CarListComponent,
    CarDetailComponent,
    ConfirmationModalComponent,
    UserEditComponent,
    ErrorMessageComponent,
    CarRegisterComponent,
    CarEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true
    }),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationModalComponent
  ]
})
export class AppModule { }
