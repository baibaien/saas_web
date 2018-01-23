import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../../shared/service/modal/modal.service";
import {FormControl} from "@angular/forms";
import {InvoiceApiService} from "../../../../shared/service/api-service/invoice-api/invoice-api.service";
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";
import {HttpService} from "../../../../shared/service/http-service/http.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-invoice-merge-m',
    templateUrl: './invoice-merge-m.component.html',
    styleUrls: ['./invoice-merge-m.component.css']
})
export class InvoiceMergeMComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    modal_info;

    public is_merge = new FormControl('1');

    constructor(public modalService: ModalService,
                public httpService: HttpService,
                public router: Router,
                public invoiceApiService: InvoiceApiService,
                public assistModalService: AssistModalService) {
    }

    ngOnInit() {
    }

    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    submitModal() {
        console.log(this.is_merge.value);
        console.log(this.modal_info);
        this.httpService.myPost(this.invoiceApiService.getApplyInvoice(), {
            order_id: this.modal_info,
            is_merge: this.is_merge.value
        }).subscribe(data => {
            console.log(data);
            this.assistModalService.openAssistModal('toast', '开票成功', () => {
                this.modalService.setModalName('');
                this.modalService.emitModalName();
                this.router.navigate(['/user/invoice-manage/wait-out']);
            });
        });

    }
    shadowCancel() {
        this.cancelModal();
    }
}
