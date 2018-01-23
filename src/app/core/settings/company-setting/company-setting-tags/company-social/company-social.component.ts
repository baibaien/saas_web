import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../../../../shared/service/modal/modal.service";
import {SettingsService} from "../../../../../shared/service/settings/settings.service";
import {HttpService} from "../../../../../shared/service/http-service/http.service";

@Component({
    selector: 'app-company-social',
    templateUrl: './company-social.component.html',
    styleUrls: ['./company-social.component.css']
})
export class CompanySocialComponent implements OnInit, OnDestroy {

    public modal_name;
    public modal_info;
    public modal_callback;
    public modal_name_emitter;


    public social_rule;
    public is_show_data;

    constructor(public modalService: ModalService,
                public settingsService: SettingsService,
                public httpService: HttpService) {
        this.modal_name_emitter = this.modalService.getModalNameEmit()
            .subscribe(data => {
                this.modal_name = data;
            });
    }

    ngOnInit() {
        this.settingsService.getSocialRule().subscribe((res) => {
            this.social_rule = res.data.data || [];
            console.log(this.social_rule);
            this.is_show_data = this.social_rule.some((value) => {
                return value.count != 0;
            });
            console.log(this.is_show_data);
        });
    }

    ngOnDestroy() {
        this.modal_name_emitter.unsubscribe();

    }


    showSocialRule(data) {
        this.modal_name = 'social_rule';
        this.modal_info = data;
        this.modal_callback = () => {
            this.ngOnInit();
        };
    }

}
