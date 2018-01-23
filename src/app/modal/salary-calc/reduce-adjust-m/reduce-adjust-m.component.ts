import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ModalService} from "../../../shared/service/modal/modal.service";
import {HttpService} from "../../../shared/service/http-service/http.service";
import {AssistModalService} from "../../../shared/service/assist-modal-service/assist-modal.service";
import {SalaryApiService} from "../../../shared/service/api-service/salary-api/salary-api.service";
import {NumValidators} from "../../../shared/validators/num-validator";

@Component({
    selector: 'app-reduce-adjust-m',
    templateUrl: './reduce-adjust-m.component.html',
    styleUrls: ['./reduce-adjust-m.component.css'],

})
export class ReduceAdjustMComponent implements OnInit {
    @Input()
    modal_name;
    @Input()
    modal_info;
    @Input()
    modal_callback;


    public pay_month;

    public root_form;
    // public change_form;
    public show_data;


    // -->编辑栏变量
    public reduce;
    public before_submit = false;
    public submit_data;
    public error_list = {
        name: {
            existed: false
        }
    };
    // <-----
    public show_edit = false;

    constructor(public modalService: ModalService,
                public fb: FormBuilder,
                public httpService: HttpService,
                public assistModalService: AssistModalService,
                public salaryApiService: SalaryApiService) {
        this.reduce = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(20)]],
            status: []
        });
    }

    ngOnInit() {


        console.log(this.modal_info);
        const date = new Date;
        date.setFullYear(this.modal_info.calc.year);
        date.setMonth(Number(this.modal_info.calc.pay_month) - 1);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        console.log(date);
        this.pay_month = date.getTime() / 1000;
        this.requestList();
    }

    requestList() {
        this.httpService.myGet(this.salaryApiService.getStaffBonusAdjust(), {
            search: {
                pay_month: this.pay_month,
                type: this.modal_info.type,
                yg_id: this.modal_info.staff.yg_id
            }
        }).subscribe(data => {
            console.log(data);
            this.show_data = this.compileData(data);
            this.initForm(this.show_data);
        });
    }


    initForm(data) {
        this.root_form = this.fb.group({
            change_form: this.fb.array([])
        });
        const change_form = this.fb.array([]);
        for (const i in data.yg_item) {
            this.root_form.get('change_form').push(new FormControl(data.yg_item[i].bonus_money || 0, [NumValidators.halfMin(0, 1), NumValidators.isNum]));
        }
    }

    compileData(data) {
        const source_obj = {
            yg_item: data.data.data[0].column,
            reduce_item: data.data.meta.tableHeader.filter((val, index) => {
                return index > 0;
            })
        };
        console.log(source_obj);
        return source_obj;
    }

    /**
     * toggleEdit
     * 函数描述
     * 切换新增项目框
     * @params:
     * @return:
     */
    toggleEdit() {
        this.show_edit = !this.show_edit;
    }


    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    /**
     * submitModal
     * 函数描述
     * 提交变更
     * @params:
     * @return:
     */
    submitModal() {
        const tmp_submit = {
            pay_month: this.pay_month,
            inc_id: this.modal_info.inc_id,
        };
        if (this.root_form.valid) {
            for (let i in this.root_form.get('change_form').value) {
                const tmp = this.root_form.get('change_form').value;
                this.show_data.yg_item[i]['bonus_money'] = tmp[i];
            }
            tmp_submit['info'] = this.show_data.yg_item;
            console.log(tmp_submit);
            this.httpService.myPost(this.salaryApiService.getEditBonus(), tmp_submit).subscribe(data => {
                console.log(data);
                this.assistModalService.openAssistModal('toast', '操作成功', () => {
                    Object.assign(this.modal_info.staff, data.data.salary);
                    Object.assign(this.modal_info.calc, data.data.head);
                    this.modalService.setModalName('');
                    this.modalService.emitModalName();

                });
            });
        }
    }


    /**
     * submitEdit
     * 函数描述
     * 新项目增加
     * @params:
     * @return:
     */
    submitEdit() {
        this.before_submit = true;
        let url;
        if (this.reduce.valid) {
            this.before_submit = false;
            this.submit_data = this.reduce.value;
            url = this.salaryApiService.getAttendanceAdding();
            this.submit_data['type'] = 2;
            this.submit_data['inc_id'] = this.modal_info.inc_id;
            this.submit_data['status'] = Number(this.submit_data['status']);
            this.submit_data['is_annual'] = 0;
            this.httpService.myPost(url, JSON.stringify(this.submit_data))
                .subscribe((data) => {
                    this.assistModalService.openAssistModal('toast', '操作成功', () => {
                        this.toggleEdit();
                        const bonus_tmp = this.show_data.reduce_item;
                        const yg_tmp = this.show_data.yg_item;
                        bonus_tmp.push(JSON.parse(JSON.stringify(bonus_tmp[bonus_tmp.length - 1])));
                        Object.assign(bonus_tmp[bonus_tmp.length - 1], {
                            column_key: data.data.data.id,
                            column_name: data.data.data.name
                        });
                        yg_tmp.push(JSON.parse(JSON.stringify(yg_tmp[yg_tmp.length - 1])));
                        Object.assign(yg_tmp[yg_tmp.length - 1], {
                            bonus_money: 0,
                            is_annual: data.data.data.is_annual,
                            type_id: data.data.data.id
                        });
                        console.log(this.show_data);
                        this.root_form.get('change_form').push(new FormControl(0, [NumValidators.halfMin(0, 1), NumValidators.isNum]));
                    });
                }, error => {
                    const err = error.json();
                    if (err.status_code === 422) {
                        this.error_list.name.existed = true;
                    }
                });
        }
    }
}
