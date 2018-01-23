import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ModalService} from "../../../shared/service/modal/modal.service";

@Component({
    selector: 'app-salary-outsourcing-modal',
    templateUrl: './salary-outsourcing-modal.component.html',
    styleUrls: ['./salary-outsourcing-modal.component.css']
})
export class SalaryOutsourcingModalComponent implements OnInit, OnChanges {
    @Input()
    modal_name;
    @Input()
    modal_info;

    @Input()
    modal_callback;


    @Output()
    modal_result = new EventEmitter();
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
