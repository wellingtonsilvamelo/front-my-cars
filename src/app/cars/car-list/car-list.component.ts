import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { Util } from 'src/app/util/util';
import { Car } from 'src/app/model/car';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  isLoadingResults: Boolean = false;
  returnedArray: Car[] = new Array();
  contentArray: Car[] = new Array();
  itemsPerPage: number = 3;
  currentPage: number = 1;

  constructor(
    private _api: ApiService,
    private toastr: ToastrService,
    private bsModalService: BsModalService) { }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.isLoadingResults = true;
    this._api.getCars()
      .subscribe(res => {
        this.contentArray = res;
        this.isLoadingResults = false;
        this.returnedArray = this.contentArray.slice(this.currentPage - 1, this.itemsPerPage);
        this.pageChanged({ itemsPerPage: this.itemsPerPage, page: this.currentPage });
      }, err => {
        this.toastr.error(Util.getErrorMessage(err), null, {
          enableHtml: true
        });
        this.isLoadingResults = false;
      });
  }

  delete(carId: number) {
    this.isLoadingResults = true;
    this._api.deleteCar(carId)
      .subscribe(res => {
        this.toastr.success("Car removed successfully");
        this.isLoadingResults = false;
        this.getAllCars();
      }, err => {
        this.toastr.error(Util.getErrorMessage(err), null, {
          enableHtml: true
        });
        this.isLoadingResults = false;
      });
  }

  pageChanged(event: PageChangedEvent): void {
    if (this.mountReturnedArray(event).length == 0) {
      event.page--;
      this.mountReturnedArray(event);
    }
  }

  mountReturnedArray(event: PageChangedEvent): Car[] {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    return this.returnedArray = this.contentArray.slice(startItem, endItem);
  }

  showDeleteModal(id: number) {
    const modal = this.bsModalService.show(ConfirmationModalComponent);
    (<ConfirmationModalComponent>modal.content).showConfirmationModal(
      'Remove car',
      'Do you really want remove this car?'
    );

    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {
        this.delete(id);
      }
    });
  }

}
