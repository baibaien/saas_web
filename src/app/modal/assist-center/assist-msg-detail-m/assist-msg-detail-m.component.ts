import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../shared/service/modal/modal.service";
import {AssistCenterApiService} from "../../../shared/service/api-service/assist-center-api/assist-center-api.service";
import {HttpService} from "../../../shared/service/http-service/http.service";

@Component({
    selector: 'app-assist-msg-detail-m',
    templateUrl: './assist-msg-detail-m.component.html',
    styleUrls: ['./assist-msg-detail-m.component.css']
})
export class AssistMsgDetailMComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    modal_info;


    public answer_list = [];

    constructor(public modalService: ModalService,
                public assistCenterApiCenter: AssistCenterApiService,
                public httpService: HttpService) {
    }

    ngOnInit() {
        this.httpService.myGet(this.assistCenterApiCenter.getMessageDetail(), {
            search: {
                id: this.modal_info.id
            }
        }).subscribe(data => {
            console.log(data);
            this.answer_list = data.data.data.reply;
        });
    }

    deleteRecord() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    submitModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }
}
