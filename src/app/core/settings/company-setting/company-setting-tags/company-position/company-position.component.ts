import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../../../../shared/service/modal/modal.service";
import {SettingsService} from "../../../../../shared/service/settings/settings.service";
import {CompanySettingsService} from "../../../../../shared/service/api-service/company-settings/company-settings.service";
import {HttpService} from "../../../../../shared/service/http-service/http.service";
import {GlobalFuncService} from "../../../../../shared/service/global-func/global-func.service";

@Component({
    selector: 'app-company-position',
    templateUrl: './company-position.component.html',
    styleUrls: ['./company-position.component.css']
})
export class CompanyPositionComponent implements OnInit, OnDestroy {
    public modal_name;
    public modal_info;
    public modal_callback;
    public modal_name_emitter;


    public position_data;
    public position_operate;
    public position_data_emitter;
    public pagination;

    public list_url;

    constructor(public modalService: ModalService,
                public settingsService: SettingsService,
                public httpService: HttpService,
                public globalFuncService: GlobalFuncService,
                public companySettingService: CompanySettingsService) {
        this.list_url = this.companySettingService.getPositionList();
        this.position_data_emitter = this.globalFuncService.getInfoListEmit().subscribe((data) => {
            data.subscribe((data1) => {
                this.position_data = data1.data.data;
                this.pagination = data1.data.meta.pagination;
            });
        });
        this.modal_name_emitter = this.modalService.getModalNameEmit()
            .subscribe(data => {
                this.modal_name = data;
            });
        this.position_operate = {
            text: '添加新岗位',
            func: this.addPosition(),
            icon: 'icon_add'
        };
    }

    ngOnInit() {
        this.globalFuncService.resetSubmitData();
        this.globalFuncService.setInfoListSource('get', this.list_url, {});
        this.globalFuncService.emitInfoListSource();
    }

    ngOnDestroy() {
        this.modal_name_emitter.unsubscribe();
        this.position_data_emitter.unsubscribe();

    }

    addPosition() {
        return () => {
            this.modal_name = 'position_setting';
            this.modal_info = {data: {}, type: 'add'};
            this.modal_callback = () => {
                this.globalFuncService.emitInfoListSource();
            };
        };
    }


    showPositionSetting(data) {
        this.modal_name = 'position_setting';
        this.modal_info = data;
        this.modal_callback = () => {
            this.ngOnInit();
        };
    }
}
