import {Component, Input, OnInit} from '@angular/core';
import {AssistModalService} from "../../shared/service/assist-modal-service/assist-modal.service";
import {isNull, isNullOrUndefined} from "util";

@Component({
    selector: 'app-alert-modal',
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

    @Input()
    modal_name;
    @Input()
    modal_info;
    @Input()
    modal_handler: any;

    public type = 'string';
    constructor(public assistModalService: AssistModalService) {
    }

    ngOnInit() {
        if (this.modal_info.message instanceof  Array) {
            this.type = 'array';
            console.log(this.type);
            console.log(this.modal_info);
        }
    }

    closeAlert() {
        if (!isNullOrUndefined(this.modal_handler)) {
            this.modal_handler();
        }
        this.assistModalService.closeAssistModal();
    }
}
