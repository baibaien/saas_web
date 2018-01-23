import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../shared/service/modal/modal.service";

@Component({
    selector: 'app-notice-m',
    templateUrl: './notice-m.component.html',
    styleUrls: ['./notice-m.component.css'],
})
export class NoticeMComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    modal_info;

    constructor(public modalService: ModalService) {
    }

    ngOnInit() {
        // console.log(this.modal_info);
        // console.log(this.modal_name);
    }
    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }
}
