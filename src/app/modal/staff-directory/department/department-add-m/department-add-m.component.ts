import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {StaffOutlineService} from '../../../../shared/service/staff-attendance/staff-outline/staff-outline.service';
import {ModalService} from '../../../../shared/service/modal/modal.service';
import {GlobalFuncService} from "../../../../shared/service/global-func/global-func.service";
import {HttpService} from "app/shared/service/http-service/http.service";
import {OrganizationsService} from "../../../../shared/service/api-service/staff-directory/organizations/organizations.service";
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";
@Component({
    selector: 'app-department-add-m',
    templateUrl: './department-add-m.component.html',
    styleUrls: ['./department-add-m.component.css']
})
export class DepartmentAddMComponent implements OnInit, OnDestroy {
    @Input()
    modal_name;
    @Input()
    modal_info;
    @Input()
    modal_callback;


    public before_submit = false;
    public name_existed = false;

    // 员工列表下拉框
    public staff_outline;

    public formModel;
    public org_strc;

    public value_change;

    public error_list = {
        name: '',
        pid: '',
        leader_id: ''
    };


    // -->辅助模态框
    // public assist_name;
    // public assist_info;
    // public assist_handler;
    // // <-----
    constructor(public modalService: ModalService,
                public fb: FormBuilder,
                public httpService: HttpService,
                public assistModalService: AssistModalService,
                public globalFuncService: GlobalFuncService,
                public staffOutlineService: StaffOutlineService,
                public organizationsService: OrganizationsService) {
        this.formModel = fb.group({
            name: ['', [Validators.required, Validators.maxLength(30)]],
            pid: ['', Validators.required],
            // leader_id: ['', Validators.required]
            leader_id: ['']
        });

        // this.compileData();
        this.staffOutlineService.getStaffOutlineRequest()
            .subscribe((data) => {
                this.staff_outline = this.staffOutlineService.compileData(data.data);
            });
    }

    ngOnInit() {
        this.value_change = this.formModel.valueChanges.subscribe(data => {
            for (let i in this.error_list) {
                this.error_list[i] = '';
            }
        });
        if (this.modal_info) {
            this.org_strc = this.compileData(this.modal_info);
        } else {
            this.httpService.myGet(this.organizationsService.getOrganizations())
                .subscribe(data => {
                    this.org_strc = this.compileData(data.data.data);
                });
        }
    }

    ngOnDestroy() {
        this.value_change.unsubscribe();
    }

    // 下拉框选中
    refreshValue(event) {
    }


    // modal开关控制
    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    addOrgSubmit() {
        this.before_submit = true;
        let tmp_submit = {};
        if (this.formModel.valid) {
            this.before_submit = false;
            tmp_submit = {
                name: this.formModel.value.name,
                pid: this.formModel.value.pid[0].id
            };
            if (this.formModel.value.leader_id.length > 0) {
                tmp_submit['leader_id'] = this.formModel.value.leader_id[0].id;
            }
            this.httpService.myPost(this.organizationsService.getOrganizationsStore(), tmp_submit)
                .subscribe((data) => {
                    this.assistModalService.openAssistModal('toast', '添加成功', () => {
                        if (typeof this.modal_callback === 'function') {
                            this.modal_callback(data.data.data)
                            this.cancelModal();
                        } else {
                            this.globalFuncService.emitInfoListSource();
                        }
                    });
                });
        }
    }

    compileData(data) {
        let tmp = [];
        for (let i of JSON.parse(JSON.stringify(data))) {
            i.text = i.name.toString();
            if (i.id == 0) {
                i.id = '0';
            }
            tmp.push(i);
        }
        return tmp;
    }

    checkName() {
        this.name_existed = false;
    }
}
