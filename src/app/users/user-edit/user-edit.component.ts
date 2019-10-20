import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { ApiService } from 'src/app/shared/api.service';
import { FormValidations } from 'src/app/util/form-validations';
import { Car } from 'src/app/model/car';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  formulario: FormGroup;
  user: User;
  isLoadingResults: Boolean = false;
  isUpdate: Boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private api: ApiService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {    
    if(this.activatedRoute.snapshot.params.id){
      this.isUpdate = true;
      this.getUser(this.activatedRoute.snapshot.params.id);
    }

    this.formulario = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      birthday: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(11), FormValidations.phoneValidator]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(50)]]
    }); 
  }

  reset(){
    this.formulario.reset();
  }

  applyCssErr(field: string){
    return {
      'is-invalid': this.isInvalidAndTouched(field)
    }
  }

  isInvalidAndTouched(field: string){
    return this.formulario.get(field).invalid && (this.formulario.get(field).touched || this.formulario.get(field).dirty);
  }

  verificarValidacaoForm(form: FormGroup){
    Object.keys(form.controls).forEach(element => {
      const control = form.get(element);
      control.markAsTouched();
      if(control instanceof FormGroup){
        this.verificarValidacaoForm(control);
      }
    });
  }

  onSubmit(){
    if (this.formulario.valid){
      //TODO - Construir factory
      this.user.firstName = this.formulario.get('firstName').value;
      this.user.lastName = this.formulario.get('lastName').value;
      this.user.email = this.formulario.get('email').value;
      this.user.birthday = this.formulario.get('birthday').value;
      this.user.phone = this.formulario.get('phone').value;

      this.updateUser(this.user.id);
    }
  }

  getUser(id: number) {
    this.isLoadingResults = true;
    this.api.getUser(id)
      .subscribe(res => {
        this.user = res;
        this.popularFormulario(this.user);
        this.isLoadingResults = false;
      }, err => {
        this.toastr.error(Util.getErrorMessage(err), null, {
          enableHtml: true
        });
        this.isLoadingResults = false;
      });
  }

  updateUser(id: number) {
    this.isLoadingResults = true;
    this.api.updateUser(this.user, id)
      .subscribe(res => {
        this.toastr.success("User Updated successfully");
        this.isLoadingResults = false;
        this.router.navigateByUrl("/users");
      }, err => {
        this.toastr.error(Util.getErrorMessage(err), null, {
          enableHtml: true
        });
        this.isLoadingResults = false;
      });
  }

  popularFormulario(data){
    this.formulario.patchValue({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      birthday: new Date(data.birthday),
      login: data.login,
      password: data.password,
      phone: data.phone,
      createdAt: data.createdAt,
      lastLogin: data.lasLogin,
      cars: data.cars
    });
  }

}
