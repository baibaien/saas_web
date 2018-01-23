import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../../shared/service/modal/modal.service";
import {SettingsService} from "../../../shared/service/settings/settings.service";
import {Router} from "@angular/router";
import {GlobalFuncService} from "../../../shared/service/global-func/global-func.service";

@Component({
    selector: 'app-company-setting',
    templateUrl: './company-setting.component.html',
    styleUrls: ['./company-setting.component.css']
})
export class CompanySettingComponent implements OnInit, OnDestroy {
    constructor(public modalService: ModalService,
                public settingsService: SettingsService,
                public router: Router,
                public globalFuncService: GlobalFuncService) {
        document.title = '公司设置';
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}
