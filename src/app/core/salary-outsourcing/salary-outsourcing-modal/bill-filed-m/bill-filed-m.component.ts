import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {HttpService} from '../../../../shared/service/http-service/http.service';
import {SalaryOutsourcingApiService} from '../../../../shared/service/api-service/salary-outsourcing-api/salary-outsourcing-api.service';
import {isUndefined} from "util";
import {Router} from "@angular/router";
import {UsersService} from "../../../../shared/service/api-service/users/users.service";
import {LoginService} from "../../../../shared/service/login/login.service";
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-bill-filed-m',
    templateUrl: './bill-filed-m.component.html',
    styleUrls: ['./bill-filed-m.component.css']
})
export class BillFiledMComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    modal_info;
    public is_hide_again = false;

    constructor(public modalService: ModalService,
                public httpService: HttpService,
                public usersService: UsersService,
                public router: Router,
                public loginService: LoginService,
                public assistModalService: AssistModalService,
                public salaryOutsourcingApiService: SalaryOutsourcingApiService) {
    }

    ngOnInit() {
        console.log(this.modal_info);
    }

    isShowAgain() {
        this.is_hide_again = !this.is_hide_again;
    }

    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    submitModal() {
        const tmp_submit = JSON.parse(JSON.stringify(this.modal_info));
        if (tmp_submit.city == 0) {
            delete tmp_submit.city;
        }
        // console.log(tmp_submit);
        // console.log(this.is_hide_again);
        if (this.is_hide_again) {
            this.httpService.myGet(this.usersService.getSetModalHide(), {search: {name: 'archive_status'}})
                .subscribe(data => {
                    console.log(data);
                    this.loginService.checkModalSetting();
                });
        }

        this.httpService.myGet(this.salaryOutsourcingApiService.getOutsourcingCreateBill(), {search: tmp_submit})
            .subscribe(data => {
                this.assistModalService.openAssistModal('toast', '账单生成成功', () => {
                    this.router.navigate(['/user/bill-manage']);
                });
            });
    }
}
