import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { ToastrService } from 'ngx-toastr';
import { Util } from 'src/app/util/util';
import { User } from 'src/app/model/user';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  isLoadingResults: Boolean = false;
  returnedArray: User[] = new Array();
  contentArray: User[] = new Array();
  itemsPerPage: number = 3;
  currentPage: number = 1;

  constructor(
    private _api: ApiService,
    private toastr: ToastrService,
    private bsModalService: BsModalService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.isLoadingResults = true;
    this._api.getUsers()
      .subscribe(res => {
        console.log(res);
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

  delete(userId: number) {
    this.isLoadingResults = true;
    this._api.deleteUser(userId)
      .subscribe(res => {
        this.toastr.success("User removed successfully");
        this.isLoadingResults = false;
        this.getAllUsers();
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

  mountReturnedArray(event: PageChangedEvent): User[] {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    return this.returnedArray = this.contentArray.slice(startItem, endItem);
  }

  showDeleteModal(id: number) {
    const modal = this.bsModalService.show(ConfirmationModalComponent);
    (<ConfirmationModalComponent>modal.content).showConfirmationModal(
      'Remove user',
      'Do you really want remove this user?'
    );

    (<ConfirmationModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {
        this.delete(id);
      }
    });
  }

}
