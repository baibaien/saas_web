import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HrChangeService} from "../../../../../shared/service/api-service/staff-directory/hr-change/hr-change.service";
import {StaffDetailService} from "../../../../../shared/service/staff-directory/staff-detail/staff-detail.service";
import {HttpService} from "../../../../../shared/service/http-service/http.service";
import {AssistModalService} from "../../../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-staff-change-log',
    templateUrl: './staff-change-log.component.html',
    styleUrls: ['./staff-change-log.component.css']
})
export class StaffChangeLogComponent implements OnInit {

    public user_id: number;
    public user_name;
    // 变更记录列表
    public change_log_url: string;
    public log_data;
    // 变更撤销
    public revoke_change_url: string;

    constructor(public route: ActivatedRoute,
                public httpService: HttpService,
                public hrChangeService: HrChangeService,
                public staffDetail: StaffDetailService,
                public assistModalService: AssistModalService) {
        document.title = '薪酬人事变动记录';
        this.user_id = this.route.snapshot.params['user_id'];
        this.change_log_url = this.hrChangeService.getHrChangeLog();
        this.revoke_change_url = this.hrChangeService.getRevokeChange();
        this.initList();
    }

    ngOnInit() {
    }

    revokeChange(id, yg_id) {
        this.assistModalService.openAssistModal('confirm', '确认撤销？', () => {
            this.httpService.myPost(this.revoke_change_url, JSON.stringify({id: id, yg_id: yg_id}))
                .subscribe((data) => {
                    this.assistModalService.openAssistModal('toast', '撤销成功', () => {
                        this.initList();

                    });
                });
        });

    }

    initList() {
        this.httpService.myGet(this.change_log_url, {search: {yg_id: this.user_id}})
            .subscribe((data) => {
                console.log(data.data.data);
                this.user_name = data.data.meta.append.yg_name;
                this.log_data = data.data.data;
                const list = data.data.meta.append.can_revoke_ids;
                for (let i in list) {
                    console.log(i);
                    for (let j in this.log_data) {
                        if (this.log_data[j].id == list[i]) {
                            this.log_data[j].revoke = 1;
                        }
                    }
                }
                console.log(this.log_data);
            });
    }
}
