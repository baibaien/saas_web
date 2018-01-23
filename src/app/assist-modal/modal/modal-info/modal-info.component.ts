import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../shared/service/modal/modal.service';

@Component({
    selector: 'app-modal-info',
    templateUrl: './modal-info.component.html',
    styleUrls: ['./modal-info.component.css']
})
export class ModalInfoComponent implements OnInit {
    @Input() modal_name;
    @Input() modal_obj;

    public list = false;

    constructor(public modalService: ModalService) {
    }

    ngOnInit() {
        if (this.modal_obj.data instanceof Array) {
            this.list = true;
        }
        if (this.modal_obj.type === 'pop') {
            window.setTimeout(() => {
                this.cancelModal();
            }, 800);
        }

    }

    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }
}
