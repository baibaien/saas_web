import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ModalService} from "../../../shared/service/modal/modal.service";

@Component({
    selector: 'app-staff-attendance-modal',
    templateUrl: './staff-attendance-modal.component.html',
    styleUrls: ['./staff-attendance-modal.component.css']
})
export class StaffAttendanceModalComponent implements OnInit, OnChanges {
    @Input()
    modal_name;
    @Input()
    modal_info;
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
