import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../../shared/service/modal/modal.service";

@Component({
    selector: 'app-staff-general-change-result-m',
    templateUrl: './staff-general-change-result-m.component.html',
    styleUrls: ['./staff-general-change-result-m.component.css']
})
export class StaffGeneralChangeResultMComponent implements OnInit {
    @Input()
    modal_name;

    @Input()
    modal_info;
    @Input()
    modal_callback;

    constructor(public modalService: ModalService) {

    }

    ngOnInit() {
        console.log(this.modal_info);
    }

    cancelModal() {
                this.modalService.setModalName('');
                this.modalService.emitModalName();
                this.modal_callback();
            }
}
