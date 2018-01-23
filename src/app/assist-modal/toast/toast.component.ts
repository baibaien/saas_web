import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AssistModalService} from "../../shared/service/assist-modal-service/assist-modal.service";
import {isNull, isNullOrUndefined} from "util";

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

    @Input()
    toast_show;
    @Input()
    toast_msg;
    @Input()
    toast_handler;
    @Output()
    toast_hide = new EventEmitter();


    public timer;

    constructor(public assistModalService: AssistModalService) {

    }

    ngOnInit() {
        this.timer = window.setTimeout(() => {
            if (!isNullOrUndefined(this.toast_handler)) {
                this.toast_handler();
            }
            this.assistModalService.closeAssistModal();
        }, 1000);
    }

    closeToast() {
        if (!isNullOrUndefined(this.toast_handler)) {
            this.toast_handler();
        }
        this.assistModalService.closeAssistModal();
        clearTimeout(this.timer);
    }
}
