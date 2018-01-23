import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpService} from "../../../shared/service/http-service/http.service";
import {WithdrawApiService} from "../../../shared/service/api-service/withdraw-api/withdraw-api.service";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WithdrawService} from "../../../shared/service/withdraw/withdraw.service";
import {FormControl, Validators} from "@angular/forms";
import {isUndefined} from "util";

@Component({
    selector: 'app-withdraw-assuare',
    templateUrl: './withdraw-assuare.component.html',
    styleUrls: ['./withdraw-assuare.component.css'],
})
export class WithdrawAssuareComponent implements OnInit {


    public state = {
        count: 0
    };

    public withdraw_status;


    public voucher = new FormControl('', Validators.required);

    constructor(public httpService: HttpService,
                public router: Router,
                public withdrawApiService: WithdrawApiService,
                public withdrawService: WithdrawService,
                public assistModalService: AssistModalService) {
        this.withdraw_status = this.withdrawService.getStatus();
        console.log(this.withdraw_status);
        if (isUndefined(this.withdraw_status)) {
            this.router.navigate(['/user/dashboard/withdraw']);
        }
    }

    ngOnInit() {
    }

    getCaptcha() {
        if (this.state.count == 0) {
            this.getVCode();
        }
    }

    getVCode() {
        this.httpService.myPost(this.withdrawApiService.getWithdrawCaptcha(), {
            id: this.withdraw_status.id,
            type: this.withdraw_status.type
        }).subscribe(data => {
            this.resendCaptcha();
        });
    }

    resendCaptcha() {
        let timer = null;
        this.state.count = 60;
        timer = setInterval(() => {
            this.state.count > 0 ? this.state.count-- : this.state.count = 0;
            // console.log(this.state.count);
            if (this.state.count == 0) {
                clearInterval(timer);
                timer = null;
            }
        }, 1000);
    }

    withdrawAssure() {
        if (this.voucher.valid) {
            this.httpService.myPost(this.withdrawApiService.getWithdrawSure(), {
                id: this.withdraw_status.id,
                captcha: this.voucher.value
            }).subscribe(data => {
                this.assistModalService.openAssistModal('toast', '提现申请已提交', () => {
                    this.router.navigate(['/user/dashboard/']);
                });
            });
        }
    }
}
