import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {HttpService} from '../../../../shared/service/http-service/http.service';
import {SalaryOutsourcingApiService} from '../../../../shared/service/api-service/salary-outsourcing-api/salary-outsourcing-api.service';
import {isUndefined} from 'util';
import {UsersService} from "../../../../shared/service/api-service/users/users.service";
import {LoginService} from "../../../../shared/service/login/login.service";
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-social-assurance-reduce-m',
    templateUrl: './social-assurance-reduce-m.component.html',
    styleUrls: ['./social-assurance-reduce-m.component.css']
})
export class SocialAssuranceReduceMComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    modal_info;
    @Input()
    modal_callback;
    public is_hide_again = false;
    public staff: object;
    public type: string;

    constructor(public modalService: ModalService,
                public httpService: HttpService,
                public usersService: UsersService,
                public loginService: LoginService,
                public assistModalService: AssistModalService,
                public salaryOutsourcingApiService: SalaryOutsourcingApiService) {
    }

    ngOnInit() {
        console.log(this.modal_info);
        this.staff = this.modal_info.staff;
        this.type = this.modal_info.type == 2 ? 'social' : 'fund';
    }

    isShowAgain() {
        this.is_hide_again = !this.is_hide_again;
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
        if (isUndefined(this.modal_info.callback)) {
            if (this.is_hide_again) {
                this.httpService.myGet(this.usersService.getSetModalHide(), {search: {name: this.modal_info.name}})
                    .subscribe(data => {
                        this.loginService.checkModalSetting();
                    });
            }
            this.httpService.myPost(this.salaryOutsourcingApiService.getOutsourcingEdit(), {
                yg_id: `${this.staff['yg_id']}`,
                is_cover: Number(!this.staff[`is_pay_${this.type}`]),
                type: this.modal_info.type,
                op_month: this.modal_info.op_month
            }).subscribe(data => {
                this.assistModalService.openAssistModal('toast', '操作成功', () => {
                    this.modal_callback();
                    this.modalService.setModalName('');
                    this.modalService.emitModalName();
                });

            });
        } else {
            this.modal_info.callback();
        }
    }
}
