import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { ToastrService } from 'ngx-toastr';
import { Util } from '../util/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  user: User;
  isLoadingResults: Boolean = false;

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/users'])
    }

    this.formulario = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      senha: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    }); 
  }

  applyCssErr(field: string){
    return {
      'is-invalid': this.isInvalidAndTouched(field)
    }
  }

  isInvalidAndTouched(field: string){
    return this.formulario.get(field).invalid && (this.formulario.get(field).touched || this.formulario.get(field).dirty);
  }

  onSubmit(){

    if (this.formulario.valid){
      this.user = new User();
      this.user.login = this.formulario.get('username').value;
      this.user.password = this.formulario.get('senha').value;

      this.authService.singIn(this.user).subscribe((res)=>{
        this.router.navigateByUrl('users');
      }, err => {
        this.toastr.error(Util.getErrorMessage(err), null, {
          enableHtml: true
        });
        this.isLoadingResults = false;
      }); 
    }else{
      this.verificarValidacaoForm(this.formulario);
    }
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

}
