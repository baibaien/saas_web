import {Component, OnInit} from '@angular/core';
import {AssistModalService} from "../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-assist-modal',
    templateUrl: './assist-modal.component.html',
    styleUrls: ['./assist-modal.component.css']
})
export class AssistModalComponent implements OnInit {

    public modal_name;
    public modal_info;
    public modal_handler;
    constructor() {
        AssistModalService.modal = this;
    }

    ngOnInit() {
    }

    openAssistModal(name, info = '', handler = null) {
        console.log(name, info, handler);
        [this.modal_name, this.modal_info, this.modal_handler] = [name, info, handler];
    }

    closeAssistModal() {
        [this.modal_name, this.modal_info, this.modal_handler] = ['', '', null];
    }
}
