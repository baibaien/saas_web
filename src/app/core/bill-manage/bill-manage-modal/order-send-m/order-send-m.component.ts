import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../../shared/service/modal/modal.service";
import {DateService} from "../../../../shared/service/date/date.service";
import {FormControl, Validators} from "@angular/forms";
import {mailValid} from "../../../../shared/validators/staff-upload-validator";
import {HttpService} from "../../../../shared/service/http-service/http.service";
import {BillManageApiService} from "../../../../shared/service/api-service/bill-manage-api/bill-manage-api.service";
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-order-send-m',
    templateUrl: './order-send-m.component.html',
    styleUrls: ['./order-send-m.component.css']
})
export class OrderSendMComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    modal_info;

    public op_month;

    public email = new FormControl('', [Validators.required, mailValid]);
    public before_submit = false;

    //
    // public assist_name;
    // public assist_info;
    // public assist_handler;

    constructor(public modalService: ModalService,
                public httpService: HttpService,
                public dateService: DateService,
                public assistModalService: AssistModalService,
                public billManageApiService: BillManageApiService) {
    }

    ngOnInit() {
        console.log(this.modal_info);
        this.op_month = this.dateService.formatTimeStamp(this.modal_info.op_month, 'month', 'cn');
    }

    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    submitModal() {
        this.before_submit = true;
        if (this.email.valid) {
            this.before_submit = false;
            const tmp_submit = {
                order_id: this.modal_info.order_id,
                email: this.email.value
            };
            this.httpService.myPost(this.billManageApiService.getSendBillDetail(), tmp_submit)
                .subscribe(data => {
                    console.log(data);
                    this.assistModalService.openAssistModal('toast', '发送成功', () => {
                        this.modalService.setModalName('');
                        this.modalService.emitModalName();
                    });
                    // this.assist_name = 'toast';
                    // this.assist_info = '发送成功';
                    // this.assist_handler = () => {

                        // this.globalMaskControlService.emitBindStatus(false);
                    // };
                });

        }
    }
    shadowCancel() {
        this.cancelModal();
    }
}
