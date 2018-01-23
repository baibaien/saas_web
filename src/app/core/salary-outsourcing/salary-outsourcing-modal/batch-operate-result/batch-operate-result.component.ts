import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../../shared/service/modal/modal.service";

@Component({
    selector: 'app-batch-operate-result',
    templateUrl: './batch-operate-result.component.html',
    styleUrls: ['./batch-operate-result.component.css']
})
export class BatchOperateResultComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    modal_info;

    constructor(public modalService: ModalService) {
    }

    ngOnInit() {
    }
    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }
}
