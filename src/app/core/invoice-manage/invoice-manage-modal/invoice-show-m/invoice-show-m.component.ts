import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../../shared/service/modal/modal.service";

@Component({
    selector: 'app-invoice-show-m',
    templateUrl: './invoice-show-m.component.html',
    styleUrls: ['./invoice-show-m.component.css']
})
export class InvoiceShowMComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    modal_info;


    public invoice_info;

    constructor(public modalService: ModalService) {
    }

    ngOnInit() {
        this.invoice_info = this.modal_info.invoice_info;
        // console.log(this.modal_info);
    }
    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }
}
