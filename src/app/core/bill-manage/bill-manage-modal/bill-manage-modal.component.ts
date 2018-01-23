import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ModalService} from "../../../shared/service/modal/modal.service";

@Component({
    selector: 'app-bill-manage-modal',
    templateUrl: './bill-manage-modal.component.html',
    styleUrls: ['./bill-manage-modal.component.css']
})
export class BillManageModalComponent implements OnInit, OnChanges {
    @Input()
    modal_name;
    @Input()
    modal_info;
    @Output()
    modal_result = new EventEmitter();
    @Input()
    modal_callback;
    public isLock;

    constructor(public modalService: ModalService) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.modalService.setModalName(this.modal_name);
        this.modalService.emitScrollName();
    }

    getLock(event) {
        this.isLock = event;
    }

    emitResult(event) {
        this.modal_result.emit(event);
    }
}
