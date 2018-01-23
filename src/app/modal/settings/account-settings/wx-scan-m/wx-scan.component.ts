import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../../shared/service/modal/modal.service';

@Component({
    selector: 'app-wx-scan',
    templateUrl: './wx-scan.component.html',
    styleUrls: ['./wx-scan.component.css']
})
export class WxScanComponent implements OnInit {
    @Input() modal_name;
    @Input() modal_info;
    @Input() modal_callback;

    constructor(public modalService: ModalService) {
    }

    ngOnInit() {
    }

    cancelModal() {
        this.modal_callback();
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

}
