import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
//import { FormValidations } from '../shared/form-validations';
//import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { FormValidations } from '../util/form-validations';
import { ApiService } from '../shared/api.service';
import { Util } from '../util/util';
import { Car } from '../model/car';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;
  user: User;
  car: Car;
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

    this.formulario = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      birthday: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(11), FormValidations.phoneValidator]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(50)]],
      login: [null, [Validators.required, Validators.minLength(8)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(14)]],
      doubleCheckPassword: [null, [Validators.required, FormValidations.equalTo('password')]],
      licensePlate: [null, [Validators.required, Validators.minLength(7), Validators.maxLength(10), FormValidations.plateValidator]],
      year: [null, [Validators.required, Validators.min(1990)]],
      model: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      color: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
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
      this.user = new User();
      this.user.firstName = this.formulario.get('firstName').value;
      this.user.lastName = this.formulario.get('lastName').value;
      this.user.email = this.formulario.get('email').value;
      this.user.birthday = this.formulario.get('birthday').value;
      this.user.login = this.formulario.get('login').value;
      this.user.password = this.formulario.get('password').value;
      this.user.phone = this.formulario.get('phone').value;
      this.user.cars = new Array<Car>();
      this.car = new Car();
      this.car.licensePlate = this.formulario.get('licensePlate').value;
      this.car.model = this.formulario.get('model').value;
      this.car.year = this.formulario.get('year').value;
      this.car.color = this.formulario.get('color').value;
      this.car.amountUse = 0;
      this.user.cars.push(this.car);

      this.saveUser();
    }else{
      this.verificarValidacaoForm(this.formulario);
    }
  }

  saveUser() {
    this.isLoadingResults = true;
    this.api.saveUser(this.user)
      .subscribe(res => {
        this.user = res;
        this.toastr.success("User saved successfully");
        this.formulario.reset();
        this.isLoadingResults = false;
        this.router.navigateByUrl('/');
      }, err => {
        this.toastr.error(Util.getErrorMessage(err), null, {
          enableHtml: true
        });
        this.isLoadingResults = false;
      });
  }
}
