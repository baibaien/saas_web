import {Component, OnInit} from '@angular/core';
@Component({
    selector: 'app-account-setting',
    templateUrl: './account-setting.component.html',
    styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {

    constructor() {
        document.title = '账户设置';
    }

    ngOnInit() {
    }


}