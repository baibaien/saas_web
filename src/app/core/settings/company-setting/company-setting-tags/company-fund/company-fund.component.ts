import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../../../../shared/service/modal/modal.service";
import {SettingsService} from "../../../../../shared/service/settings/settings.service";
import {HttpService} from "../../../../../shared/service/http-service/http.service";

@Component({
    selector: 'app-company-fund',
    templateUrl: './company-fund.component.html',
    styleUrls: ['./company-fund.component.css']
})
export class CompanyFundComponent implements OnInit, OnDestroy {

    public modal_name;
    public modal_info;
    public modal_callback;
    public modal_name_emitter;


    public fund_rule;
    public is_show_data = false;


    constructor(public modalService: ModalService,
                public settingsService: SettingsService,
                public httpService: HttpService) {
        this.modal_name_emitter = this.modalService.getModalNameEmit()
            .subscribe(data => {
                this.modal_name = data;
            });
    }

    ngOnInit() {
        this.settingsService.getFundRule().subscribe((res) => {
            this.fund_rule = res.data.data || [];
            this.is_show_data = this.fund_rule.some((val) => {
                return val.count > 0;
            });
        });
    }

    ngOnDestroy() {
        this.modal_name_emitter.unsubscribe();

    }


    showFundRule(data) {
        this.modal_name = 'fund_rule';
        this.modal_info = data;
        this.modal_callback = () => {
            this.ngOnInit();
        };
    }

}
