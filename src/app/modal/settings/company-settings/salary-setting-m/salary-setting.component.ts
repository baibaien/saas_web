import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {SettingsService} from '../../../../shared/service/settings/settings.service';
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";
import {isUndefined} from "util";
import {HttpService} from "../../../../shared/service/http-service/http.service";
import {AccountSettingsService} from "../../../../shared/service/api-service/account-settings/account-settings.service";

@Component({
    selector: 'app-salary-setting',
    templateUrl: './salary-setting.component.html',
    styleUrls: ['./salary-setting.component.css']
})
export class SalarySettingComponent implements OnInit, OnDestroy {

    @Input() modal_name;
    @Input() modal_info;
    @Input() modal_callback;


    public salary_rule: FormGroup;
    public salary_base: FormGroup;
    public salary_base_watcher;


    public salary_rule_select = {
        work_day_item: [],
        salary_type_item: []
    };
    public salary_base_select = {
        salary_date_item: [],
        salary_cycle_item: [],
        social_cycle_item: []
    };
    public explain;
    public valueChange;

    // -->解释文案控制
    public text_control;
    // <-----

    public single_choose = [{id: 1, name: '简单折算'}];

    constructor(fb: FormBuilder,
                public modalService: ModalService,
                public httpService: HttpService,
                public accountSettingsService: AccountSettingsService,
                public settingService: SettingsService,
                public assistModalService: AssistModalService) {
        this.salary_rule = fb.group({
            work_day: [''],
            salary_type: ['']
        });
        this.salary_base = fb.group({
            salary_date: [''],
            salary_cycle: [''],
            social_cycle: ['']
        });

    }

    ngOnInit() {
        console.log(this.modal_info);
        if (this.modal_info['data'] === 'salary_rule') {
            this.settingService.getModalSalaryRule().subscribe((res) => {
                console.log(res);

                const shown_data = JSON.parse(JSON.stringify(res.data.data));
                // -->发薪日
                let tmp_work_day;
                for (let i in shown_data.work_day_item) {
                    if (shown_data.work_day_item[i].id == shown_data.work_day) {
                        tmp_work_day = shown_data.work_day_item[i];
                    }
                }
                // <-----
                // -->发薪日
                let tmp_salary_type;
                for (let i in shown_data.salary_type_item) {
                    if (shown_data.salary_type_item[i].id == shown_data.salary_type) {
                        tmp_salary_type = shown_data.salary_type_item[i];
                    }
                }
                // <-----
                this.salary_rule.get('work_day').setValue([tmp_work_day]);
                this.salary_rule.get('salary_type').setValue([tmp_salary_type]);

                this.salary_rule_select = {
                    work_day_item: shown_data.work_day_item,
                    salary_type_item: shown_data.salary_type_item
                };
                if (tmp_work_day.id == 2) {
                    this.salary_rule.get('salary_type').setValue([this.salary_rule_select.salary_type_item[0]]);
                    this.salary_rule_select.salary_type_item[1]._status_ = 0;
                } else {
                    this.salary_rule_select.salary_type_item[1]._status_ = 1;

                }
                console.log(this.salary_rule_select);
                this.valueChange = this.salary_rule.valueChanges.subscribe(data => {
                    console.log(data);
                    if (data.work_day[0].id == 2) {
                        this.salary_rule_select.salary_type_item[1]._status_ = 0;
                        if (data.salary_type[0].id == 2) {
                            console.log(this.salary_rule_select);
                            this.salary_rule.get('salary_type').setValue([this.salary_rule_select.salary_type_item[0]]);
                        }
                    } else {
                        this.salary_rule_select.salary_type_item[1]._status_ = 1;

                    }
                });
            });
        } else {

            this.settingService.getModalSalaryBase().subscribe((res) => {
                const shown_data = JSON.parse(JSON.stringify(res.data.data));
                // -->发薪日
                let tmp_salary_date;
                for (let i in shown_data.salary_date_item) {
                    if (shown_data.salary_date_item[i].id == shown_data.salary_date) {
                        tmp_salary_date = shown_data.salary_date_item[i];
                    }
                }
                // <-----
                // -->发薪日
                let tmp_salary_cycle;
                for (let i in shown_data.salary_cycle_item) {
                    if (shown_data.salary_cycle_item[i].id == shown_data.salary_cycle) {
                        tmp_salary_cycle = shown_data.salary_cycle_item[i];
                    }
                }
                // <-----
                // -->发薪日
                let tmp_social_cycle;
                for (let i in shown_data.social_cycle_item) {
                    if (shown_data.social_cycle_item[i].id == shown_data.social_cycle) {
                        tmp_social_cycle = shown_data.social_cycle_item[i];
                    }
                }
                // <-----
                console.log(tmp_salary_date);
                this.salary_base.get('salary_date').setValue(isUndefined(tmp_salary_date) ? '' : [tmp_salary_date]);
                this.salary_base.get('salary_cycle').setValue(isUndefined(tmp_salary_cycle) ? '' : [tmp_salary_cycle]);
                this.salary_base.get('social_cycle').setValue(isUndefined(tmp_social_cycle) ? '' : [tmp_social_cycle]);
                this.salary_base_select = {
                    salary_date_item: shown_data.salary_date_item,
                    salary_cycle_item: shown_data.salary_cycle_item,
                    social_cycle_item: shown_data.social_cycle_item,
                };
                console.log(this.salary_base_select);
                this.explain = shown_data.explain;
                this.salary_base_watcher = this.salary_base.valueChanges.subscribe(data => {
                    console.log(data);
                    const tmp = JSON.parse(JSON.stringify(data));
                    for (let i in tmp) {
                        if (tmp[i] != '') {
                            tmp[i] = tmp[i][0].id;
                        }
                    }
                    this.httpService.myPost(this.accountSettingsService.getSalaryRuleText(), tmp)
                        .subscribe(data1 => {
                            console.log(data1);
                            this.explain = data1.data.data.explain;
                        });
                });
            });
            // }
        }
    }

    ngOnDestroy() {
        if (!isUndefined(this.salary_base_watcher)) {
            this.salary_base_watcher.unsubscribe();
        }
        if (!isUndefined(this.valueChange)) {
            this.valueChange.unsubscribe();
        }
    }

    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    saveMsg() {
        if (this.modal_info.data === 'salary_rule') {
            if (this.salary_rule.valid) {
                this.settingService.updateSalaryRule(this.formatSelect(this.salary_rule.value)).subscribe((res) => {
                    this.assistModalService.openAssistModal('toast', '保存成功', () => {
                        this.cancelModal();
                        if (!isUndefined(this.modal_callback)) {
                            this.modal_callback();
                        }
                    });
                });
            }
        } else {
            if (this.salary_base.valid) {
                this.settingService.updateSalaryBase(this.formatSelect(this.salary_base.value)).subscribe((res) => {
                    this.assistModalService.openAssistModal('toast', '保存成功', () => {
                        this.cancelModal();

                        if (!isUndefined(this.modal_callback)) {
                            this.modal_callback();
                        }
                    });
                });
            }
        }
    }

    formatSelect(data) {
        const result = {};
        for (let i in data) {
            if (data[i] == '') {
                result[i] = '';
            } else {
                result[i] = data[i][0].id;
            }
        }
        return result;
    }
}
