import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Util } from 'src/app/util/util';
import { Car } from 'src/app/model/car';
import { FormValidations } from 'src/app/util/form-validations';
import { ApiService } from 'src/app/shared/api.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-car-register',
  templateUrl: './car-register.component.html',
  styleUrls: ['./car-register.component.css']
})
export class CarRegisterComponent implements OnInit {

  formulario: FormGroup;
  users: User[];
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

    this.getAllUsers();

    this.formulario = this.formBuilder.group({
      licensePlate: [null, [Validators.required, Validators.minLength(7), 
                            Validators.maxLength(10), 
                            FormValidations.plateValidator]],
      user: [null, [Validators.required, Validators.min(1)]],
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
      this.car = new Car();
      this.car.licensePlate = this.formulario.get('licensePlate').value;
      this.car.model = this.formulario.get('model').value;
      this.car.year = this.formulario.get('year').value;
      this.car.color = this.formulario.get('color').value;
      this.car.amountUse = 0;
      this.car.userId = this.formulario.get('user').value;

      this.saveCar();
    }else{
      this.verificarValidacaoForm(this.formulario);
    }
  }

  getAllUsers() {
    this.isLoadingResults = true;
    this.api.getUsers()
      .subscribe(res => {
        this.users = res;
      }, err => {
        this.toastr.error(Util.getErrorMessage(err), null, {
          enableHtml: true
        });
        this.isLoadingResults = false;
      });
  }

  saveCar() {
    this.isLoadingResults = true;
    this.api.saveCar(this.car)
      .subscribe(res => {
        this.car = res;
        this.toastr.success("Car saved successfully");
        this.formulario.reset();
        this.isLoadingResults = false;
        this.router.navigateByUrl("/cars");
      }, err => {
        this.toastr.error(Util.getErrorMessage(err), null, {
          enableHtml: true
        });
        this.isLoadingResults = false;
      });
  }

}
