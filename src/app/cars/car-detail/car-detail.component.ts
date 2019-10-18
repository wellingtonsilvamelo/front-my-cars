import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/api.service';
import { Util } from 'src/app/util/util';
import { Car } from 'src/app/model/car';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  formulario: FormGroup;
  car: Car;
  user: User;
  isLoadingResults = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.user = new User();
    this.car = new Car();
    this.getCar();
  }

  getCar() {
    this.isLoadingResults = true;
    this.api.getCar(this.activatedRoute.snapshot.params.id)
      .subscribe(res => {
        this.car = res;
        this.getUser(this.car.userId);
        this.isLoadingResults = false;
      }, err => {
        this.toastr.error(Util.getErrorMessage(err), null, {
          enableHtml: true
        });
        this.isLoadingResults = false;
      });
  }

  getUser(id: number) {
    this.isLoadingResults = true;
    this.api.getUser(id)
      .subscribe(res => {
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
