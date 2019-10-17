import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  public active: boolean = false;
    public body: string;
    public title: string;
    public onClose: Subject<boolean>;

    public constructor(
        private bsModalRef: BsModalRef
    ) { }

    public ngOnInit(): void {
        this.onClose = new Subject();
    }

    public showConfirmationModal(title: string, body: string): void {
        this.title = title;
        this.body =  body;
        this.active = true;
    }

    public onConfirm(): void {
        this.active = false;
        this.onClose.next(true);
        this.bsModalRef.hide();
    }

    public onCancel(): void {
        this.active = false;
        this.onClose.next(false);
        this.bsModalRef.hide();
    }

    public hideConfirmationModal(): void {
        this.active = false;
        this.onClose.next(null);
        this.bsModalRef.hide();
    }

}
