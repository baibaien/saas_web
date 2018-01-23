import {Component, Input, OnInit} from '@angular/core';
import {AssistModalService} from "../../shared/service/assist-modal-service/assist-modal.service";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
    @Input()
    assist_name;
    @Input()
    assist_info;
    @Input()
    assist_handler;


    constructor(public assistModalService: AssistModalService) {
    }

    ngOnInit() {
    }

    closeModal() {
        this.assistModalService.closeAssistModal();
    }

    runCallBack() {
        if (!isNullOrUndefined(this.assist_handler)) {
            this.assistModalService.closeAssistModal();
            this.assist_handler();
        }
    }
}
