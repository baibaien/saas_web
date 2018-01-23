import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {StaffOutlineService} from "../../../../shared/service/staff-attendance/staff-outline/staff-outline.service";
import {ModalService} from "../../../../shared/service/modal/modal.service";
import {HttpService} from "../../../../shared/service/http-service/http.service";
import {OrganizationsService} from "../../../../shared/service/api-service/staff-directory/organizations/organizations.service";
import {GlobalFuncService} from "../../../../shared/service/global-func/global-func.service";
import {AssistModalService} from "../../../../shared/service/assist-modal-service/assist-modal.service";

@Component({
    selector: 'app-department-edit-m',
    templateUrl: './department-edit-m.component.html',
    styleUrls: ['./department-edit-m.component.css']
})
export class DepartmentEditMComponent implements OnInit, OnDestroy {
    @Input()
    modal_name;
    @Input()
    modal_info;
    public before_submit = false;
    public name_existed = false;

    public staff_outline;
    public org_info;
    public org_strc;
    public formModel;

    public value_change;

    // -->辅助modal
    // public assist_name;
    // public assist_info;
    // public assist_handler;

    // <-----
    constructor(public modalService: ModalService,
                public staffOutlineService: StaffOutlineService,
                public httpService: HttpService,
                public assistModalService: AssistModalService,
                public organizationsService: OrganizationsService,
                public globalFuncService: GlobalFuncService,
                public fb: FormBuilder) {
        this.formModel = this.fb.group({
            name: [''],
            pid: [''],
            leader_id: ['']
        });
        this.org_info = this.modalService.getModalData();
        // 默认显示数据
        this.httpService.myGet(this.organizationsService.getOrganizations())
            .subscribe(data => {
                console.log(data);
                this.org_strc = data.data.data;
                console.log(this.org_strc);
                let tmp_name;
                this.org_strc.map((value) => {
                    if (value.id == this.org_info.pid) {
                        tmp_name = value.name;
                    }
                });
                this.formModel = this.fb.group({
                    name: [this.org_info.name, [Validators.required, Validators.maxLength(30)]],
                    pid: [[{
                        id: this.org_info.pid,
                        name: tmp_name,
                    }], Validators.required],
                    leader_id: ['']
                });
                if (this.org_info.leader_id && this.org_info.leader_name) {
                    this.formModel.get('leader_id').setValue([{
                        id: this.org_info.leader_id,
                        name: this.org_info.leader_name
                    }]);
                }
            });
        this.staffOutlineService.getStaffOutlineRequest()
            .subscribe((data) => {
                this.staff_outline = this.staffOutlineService.compileData(data.data);
            });

    }

    ngOnInit() {
        // 部门下拉列表数据
        this.value_change = this.formModel.valueChanges.subscribe(data => {
            this.name_existed = false;
        });

    }

    ngOnDestroy() {
        this.value_change.unsubscribe();
    }

    refreshValue(event) {
    }

    // 删除部门
    deleteOrg() {
        this.assistModalService.openAssistModal('confirm', '确认删除？', () => {
            this.httpService.myDelete(`${this.organizationsService.getOrganizations()}/${this.org_info.id}`)
                .subscribe(data => {
                    this.assistModalService.openAssistModal('toast', '删除成功', () => {
                        this.globalFuncService.emitInfoListSource();
                    });
                });
        });
    }

    // modal开关
    cancelModal() {
        this.modalService.setModalName('');
        this.modalService.emitModalName();
    }

    editOrgSubmit() {
        console.log(this.formModel);
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
            this.httpService.myPost(this.organizationsService.getOrganizationsUpdate(this.org_info.id), tmp_submit)
                .subscribe(data => {
                    this.assistModalService.openAssistModal('toast', '编辑成功', () => {
                        this.globalFuncService.emitInfoListSource();
                    });
                });
        }
    }

    // compileData(data) {
    //     let tmp = [];
    //     for (let i of JSON.parse(JSON.stringify(data))) {
    //         i.name = i.name.toString();
    //         if (i.id == 0) {
    //             i.id = '0';
    //         }
    //         tmp.push(i);
    //     }
    //     return tmp;
    // }

    checkName() {
        this.name_existed = false;
    }
}
