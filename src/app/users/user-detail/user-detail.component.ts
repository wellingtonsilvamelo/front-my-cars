import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/api.service';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  formulario: FormGroup;
  user: User;
  isLoadingResults = false;

  constructor(
    private formBuilder: FormBuilder, 
    //private authService: AuthService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.isLoadingResults = true;
    this.api.getUser(this.activatedRoute.snapshot.params.id)
      .subscribe(res => {
        console.log(res);
        this.user = res;
        this.isLoadingResults = false;
      }, err => {
        this.toastr.error(Util.getErrorMessage(err), null, {
          enableHtml: true
        });
        this.isLoadingResults = false;
      });
  }

}
