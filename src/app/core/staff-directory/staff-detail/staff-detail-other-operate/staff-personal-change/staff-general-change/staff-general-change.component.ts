import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {minRequired} from '../../../../../../shared/validators/staff-upload-validator';
import {StaffGeneralChangeService} from '../../../../../../shared/service/staff-directory/staff-general-change/staff-general-change.service';
import {ModalService} from "../../../../../../shared/service/modal/modal.service";
import {HttpService} from "../../../../../../shared/service/http-service/http.service";
import {StaffsService} from "../../../../../../shared/service/api-service/staff-directory/staffs/staffs.service";
import {DateService} from "../../../../../../shared/service/date/date.service";
import {AssistModalService} from "../../../../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-staff-general-change',
    templateUrl: './staff-general-change.component.html',
    styleUrls: ['./staff-general-change.component.css']
})
export class StaffGeneralChangeComponent implements OnInit, OnDestroy {

    @Input()
    yg_id;
    @Input()
    yg_name: string;

    @Output()
    isChangeHireDate = new EventEmitter();


    // -->select默认placeholder 请选择/默认值
    public default_text: string;
    // <-----

    // -->变动项统计
    public changed_length = 0;
    // <-----

    // -->设置及表单
    public general_settings: any = {};
    public changeForm: FormGroup = new FormGroup({});
    // <-----

    public position_select_config;
    public office_select_config;
    public department_select_config;
    public contract_select_config;
    // -->当前数据显示
    public batch = {
        leader_id_name: null,
        yg_office_name: null,
        yg_org_id_name: null,
        con_com_id_name: null,
        yg_hire_type_name: null,
        yg_zhiwei_name: null
    };
    // <-----


    // -->未生效数据
    public ineffective_status;
    public ineffective_data;
    // <-----

    // -->表单数据监控
    public value_watcher;
    // <-----

    // -->modal变量
    public modal_name;
    public modal_info;
    public modal_callback;
    public modal_name_emit;
    // <-----

    constructor(public fb: FormBuilder,
                public router: Router,
                public dateService: DateService,
                public httpService: HttpService,
                public staffsService: StaffsService,
                public assistModalService: AssistModalService,
                public staffGeneralChangeService: StaffGeneralChangeService,
                public modalService: ModalService) {
        this.changeForm = fb.group({
            general_msg: fb.group({
                yg_zhiwei: [''],
                yg_office: [''],
                yg_hire_type: [''],
                yg_org_id: [''],
                yg_con_com_id: [''],
                leader_id: [''],
            }, {validator: minRequired}),
            remark: [''],
            effective_at: [this.dateService.getDateNow(), Validators.required]
        });
        this.modal_name_emit = this.modalService.getModalNameEmit()
            .subscribe(data => {
                this.modal_name = data;
            });
    }

    ngOnInit() {
        // -->placeholder默认值设置
        if (this.yg_id.length == 1) {
            this.default_text = '请选择';
        } else {
            this.default_text = '默认值';
        }
        this.position_select_config = {
            placeholder: this.default_text,
            allow_clear: true,
            href_text: '添加新岗位',
            href: () => {
                this.modal_name = 'staff_upload_position_update';
                this.modal_info = {
                    type: 'add'
                };
                this.modal_callback = (new_position) => {
                    console.log(new_position);
                    this.general_settings['yg_zhiwei'].push(new_position);
                };
            }
        };
        this.office_select_config = {
            placeholder: this.default_text,
            allow_clear: true,
            max_length: 14,
            href_text: '添加办公地点',
            href: () => {
                this.modal_name = 'staff_office_addr';
                this.modal_info = {
                    type: 'add'
                };
                this.modal_callback = (new_position) => {
                    console.log(new_position);
                    this.general_settings.yg_office.push(new_position);
                };
            }
        };
        this.contract_select_config = {
            placeholder: this.default_text,
            allow_clear: true,
            max_length: 14,
            href_text: '添加合同公司',
            href: () => {
                this.modal_name = 'contract_setting_m';
                this.modal_info = {
                    type: 'add'
                };
                this.modal_callback = (new_position) => {
                    console.log(new_position);
                    this.general_settings.yg_con_com_id.push(new_position);
                };
            }
        };
        this.department_select_config = {
            placeholder: this.default_text,
            allow_clear: true,
            max_length: 14,
            href_text: '添加部门',
            href: () => {
                this.modal_name = 'add_modal';
                this.modal_info = undefined;
                this.modal_callback = (new_position) => {
                    console.log(new_position);
                    this.general_settings.yg_org_id.push(new_position);
                };
            }
        };
        // <-----

        // -->请求参数拼接
        let yg_ids = '';
        for (let i = 0; i < this.yg_id.length; i++) {
            if (i == 0) {
                yg_ids = `yg_id[0]=${this.yg_id[0]}`;
            } else {
                yg_ids += `&yg_id[${i}]=${this.yg_id[i]}`;
            }
        }
        // <-----

        this.staffGeneralChangeService.getYgSettings(yg_ids).subscribe((res) => {
            this.ineffective_data = res.data.ineffective_hr_change;
            this.ineffective_status = !(this.ineffective_data instanceof Array);
            // if (!(this.ineffective_status = !(this.ineffective_data instanceof Array))) {
            //     this.isChangeHireDate.emit(res.data.is_edit_date);
            // }
            this.isChangeHireDate.emit({
                status: this.ineffective_status,
                date: res.data.is_edit_date,
                hire_date: res.data.staffs[0]['yg_hire_date'],
                formal_date: res.data.staffs[0]['yg_formal_date']
            });
            this.general_settings = res.data;
            this.pushNoChoose(this.general_settings.yg_office, '工作地点');
            this.pushNoChoose(this.general_settings.yg_zhiwei, '岗位');
            this.pushNoChoose(this.general_settings.leader_id, '汇报对象');
            this.pushNoChoose(this.general_settings.yg_con_com_id, '公司');
            this.pushNoChoose(this.general_settings.yg_org_id, '部门');
            this.httpService.myGet(this.staffsService.getStaffOutline()).subscribe(data => {

                this.general_settings.leader_id = data.data.filter((val, index) => {
                    return val.status != 2 && this.yg_id.indexOf(String(val.id)) == -1;
                });
                if (this.general_settings.staffs.length === 1) {
                    // -->存放合并后数据
                    let tmp_staff_data;
                    // <-----
                    // -->存放未合并的staff[0]
                    const tmp_staff = JSON.parse(JSON.stringify(this.general_settings.staffs[0]));
                    // <-----
                    if (this.ineffective_status) {
                        tmp_staff_data = Object.assign(this.general_settings.staffs[0], this.general_settings.ineffective_hr_change);
                    } else {
                        tmp_staff_data = this.general_settings.staffs[0];
                    }
                    for (let obj in this.general_settings) {
                        if (obj != 'staffs' && obj != 'ineffective_hr_change') {
                            for (let i = 0; i < this.general_settings[obj].length; i++) {
                                if (Number(tmp_staff[`${obj}`]) == Number(this.general_settings[obj][i]['id'])) {
                                    this.batch[`${obj}_name`] = this.general_settings[obj][i]['name'];
                                }
                                if (Number(this.general_settings.staffs[0][`${obj}`]) == Number(this.general_settings[obj][i]['id'])) {
                                    tmp_staff_data[`${obj}`] = [{
                                        id: tmp_staff_data[`${obj}`],
                                        name: this.general_settings[obj][i]['name']
                                    }];
                                }
                            }
                        }
                    }
                    for (const i in this.changeForm.get('general_msg')['controls']) {
                        if (tmp_staff_data[i] instanceof Array) {
                            this.changeForm.get('general_msg')['controls'][i].setValue(tmp_staff_data[i]);
                        }
                    }
                    if (this.ineffective_status) {
                        this.changeForm.get('remark').setValue(tmp_staff_data.remark);
                        this.changeForm.get('effective_at').setValue(tmp_staff_data.effective_at);
                        this.changeForm.disable();
                    }
                } else {
                    this.getEqualObj(this.general_settings.staffs[0], this.general_settings.staffs);
                }
                const form_value = JSON.parse(JSON.stringify(this.changeForm.get('general_msg').value));
                this.value_watcher = this.changeForm.valueChanges.subscribe(
                    data1 => {
                        this.changed_length = 0;
                        for (let i in data1.general_msg) {
                            if (data1.general_msg[i] === '' && form_value[i] === '') {
                            } else {
                                if (typeof data1.general_msg[i] !== typeof form_value[i]) {
                                    this.changed_length++;
                                } else {
                                    if (data1.general_msg[i][0].id != form_value[i][0].id) {
                                        this.changed_length++;
                                    }
                                }
                            }
                        }
                    }
                );
            });

        });
    }

    ngOnDestroy() {
        this.value_watcher.unsubscribe();
        this.modal_name_emit.unsubscribe();
    }

    /**
     * pushNoChoose
     * 函数描述
     * 末尾添加不选择字段
     * @params: 目标arr, 名称str
     * @return:
     */
    // -->
    pushNoChoose(arr, str) {
        arr.push({id: -1, name: `无${str}`});
    }

    // <-----


    getEqualObj(arrayItem, array) {
        console.log(arrayItem);
        for (let obj in arrayItem) {
            this.isEqual(obj, arrayItem[obj], array);
        }
    }

    isEqual(item_name, item_val, array) {
        if (item_name != 'yg_id' && item_name != 'yg_hire_date' && item_name != 'yg_name' && item_name != 'yg_formal_date') {
            for (let i = 1; i < array.length; i++) {
                if (array[i][item_name] !== item_val) {
                    this.batch[item_name] = '多个值';
                    console.log(`${item_name}`);
                    console.log(this.changeForm.get('general_msg').get(`${item_name}`));
                    this.changeForm.get('general_msg').get(`${item_name}`).setValue('');
                    return;
                } else {
                    this.general_settings.staffs[item_name] = item_val;
                }
            }
            this.general_settings[`${item_name}`].map((val, index) => {
                if (val.id == item_val) {
                    this.batch[`${item_name}_name`] = `${val.name}`;
                    this.changeForm.get('general_msg').get(`${item_name}`).setValue([val]);
                }
            });
        }
    }


    onSubmit() {
        console.log(this.yg_id);
        const submit_value = {};
        if (this.changed_length == 0) {
            this.assistModalService.openAssistModal('toast', '未发生人事变动', () => {
                if (this.yg_id.length == 1) {
                    this.router.navigate([`/user/staff/staff-detail/${this.yg_id[0]}/operate/staff-change-log`]);
                } else {
                    this.router.navigate([`/user/staff`]);
                }
            });
        } else {
            if (this.yg_id.length === 1) {
                submit_value['yg_id'] = this.yg_id[0];
            } else {
                submit_value['yg_id'] = this.yg_id;
            }
            for (const obj in this.changeForm.value) {
                if (obj === 'general_msg') {
                    for (const sub_obj in this.changeForm.value[obj]) {
                        if (this.changeForm.value[obj][sub_obj] instanceof Array) {
                            if (this.changeForm.value[obj][sub_obj][0].id == -1) {
                                submit_value[sub_obj] = '';
                            } else {
                                submit_value[sub_obj] = this.changeForm.value[obj][sub_obj][0].id;
                            }
                        }
                    }
                } else {
                    if (this.changeForm.value[obj] === '-1') {
                        continue;
                    }
                    submit_value[obj] = this.changeForm.value[obj];
                }
            }
            this.staffGeneralChangeService.postYgChange(submit_value).subscribe((res) => {
                this.assistModalService.openAssistModal('toast', '操作成功', () => {
                    if (this.yg_id.length == 1) {
                        this.router.navigate([`/user/staff/staff-detail/${this.yg_id[0]}/operate/staff-change-log`]);
                    } else {
                        this.router.navigate([`/user/staff`]);
                    }
                });
            }, error => {
                if (this.yg_id.length > 1) {
                    const err = error.json();
                    const err_msg = [];
                    const err_title = '以下员工变动失败';
                    for (const i in err.data) {
                        err_msg.push(err.data[i].yg_name);
                    }
                    this.modal_name = 'staff_general_change_result_m';
                    this.modal_info = {
                        message: err_msg, title: err_title
                    };
                    this.modal_callback = () => {
                        this.router.navigate([`/user/staff`]);

                    };
                } else {
                    // console.log(error.json());
                    this.assistModalService.openAssistModal('alert', error.json().message);
                }
            });
        }
    }


    backToDetail() {
        if (this.yg_id.length == 1) {
            this.router.navigate([`/user/staff/staff-detail/${this.yg_id}`]);
        } else {
            this.router.navigate([`/user/staff`]);
        }
    }
}
