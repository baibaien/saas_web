import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../../shared/service/modal/modal.service";
import {SalaryApiService} from "../../../shared/service/api-service/salary-api/salary-api.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-salary-edit-remark',
    templateUrl: './salary-edit-remark.component.html',
    styleUrls: ['./salary-edit-remark.component.css']
})
export class SalaryEditRemarkComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    salary_edit_remark;

    @Input()
    modal_callback;


    public remark_local;

    constructor(public modalService: ModalService,
                public assistModalService: AssistModalService,
                public salaryApiService: SalaryApiService,
                public httpService: HttpService) {
    }

    ngOnInit() {
        console.log(this.salary_edit_remark);
        this.remark_local = JSON.parse(JSON.stringify(this.salary_edit_remark.remark));
    }

    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();


    }

    SubmitOperation(event) {
        if (!(event.value.toString().trim() === '' && this.salary_edit_remark.remark.toString().trim() === '')) {
            this.httpService.myPost(this.salaryApiService.getSalaryEditRemark(),
                JSON.stringify({id: this.salary_edit_remark.id, remark: event.value}))
                .subscribe((data) => {
                    this.assistModalService.openAssistModal('toast', '保存成功', () => {
                        this.salary_edit_remark.remark = event.value;
                        this.modalService.setModalName('');
                        this.modalService.emitModalName();

                    });
                }, error => {
                    this.modalService.setModalName('');
                    this.modalService.emitModalName();


                });
        } else {
            this.modalService.setModalName('');
            this.modalService.emitModalName();

        }
    }
}
